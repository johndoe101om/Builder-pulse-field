import mongoose, { Schema } from "mongoose";
import { IReview } from "../types/index.js";

const reviewSchema = new Schema<IReview>(
  {
    bookingId: {
      type: Schema.Types.ObjectId,
      ref: "Booking",
      required: true,
    },
    propertyId: {
      type: Schema.Types.ObjectId,
      ref: "Property",
      required: true,
    },
    reviewerId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      required: true,
      trim: true,
      maxlength: 1000,
    },
    type: {
      type: String,
      required: true,
      enum: ["guest-to-host", "host-to-guest"],
    },
    helpfulVotes: {
      type: Number,
      default: 0,
      min: 0,
    },
    reportedCount: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  },
);

// Indexes
reviewSchema.index({ bookingId: 1 });
reviewSchema.index({ propertyId: 1 });
reviewSchema.index({ reviewerId: 1 });
reviewSchema.index({ type: 1 });
reviewSchema.index({ rating: -1 });
reviewSchema.index({ createdAt: -1 });
reviewSchema.index({ helpfulVotes: -1 });

// Compound indexes for common queries
reviewSchema.index({ propertyId: 1, type: 1 });
reviewSchema.index({ reviewerId: 1, type: 1 });
reviewSchema.index({ propertyId: 1, rating: -1 });

// Unique compound index to prevent duplicate reviews
reviewSchema.index({ bookingId: 1, reviewerId: 1, type: 1 }, { unique: true });

// Virtual for reviewer population
reviewSchema.virtual("reviewer", {
  ref: "User",
  localField: "reviewerId",
  foreignField: "_id",
  justOne: true,
});

// Virtual for booking population
reviewSchema.virtual("booking", {
  ref: "Booking",
  localField: "bookingId",
  foreignField: "_id",
  justOne: true,
});

// Virtual for property population
reviewSchema.virtual("property", {
  ref: "Property",
  localField: "propertyId",
  foreignField: "_id",
  justOne: true,
});

// Post-save middleware to update property and user ratings
reviewSchema.post("save", async function () {
  if (this.type === "guest-to-host") {
    // Update property rating
    const Property = mongoose.model("Property");
    const property = await Property.findById(this.propertyId);
    if (property) {
      await property.updateRating();
    }
  } else if (this.type === "host-to-guest") {
    // Update user rating
    const User = mongoose.model("User");
    const user = await User.findById(this.reviewerId);
    if (user) {
      await user.updateRating();
    }
  }
});

// Post-remove middleware to update ratings
reviewSchema.post("findOneAndDelete", async function (doc) {
  if (doc) {
    if (doc.type === "guest-to-host") {
      const Property = mongoose.model("Property");
      const property = await Property.findById(doc.propertyId);
      if (property) {
        await property.updateRating();
      }
    } else if (doc.type === "host-to-guest") {
      const User = mongoose.model("User");
      const user = await User.findById(doc.reviewerId);
      if (user) {
        await user.updateRating();
      }
    }
  }
});

// Static method for getting review analytics
reviewSchema.statics.getAnalytics = async function (
  propertyId?: string,
  hostId?: string,
) {
  const matchStage: any = {};

  if (propertyId) {
    matchStage.propertyId = new mongoose.Types.ObjectId(propertyId);
  }

  if (hostId) {
    // For host analytics, we need to find properties owned by the host
    const Property = mongoose.model("Property");
    const hostProperties = await Property.find({ hostId }).select("_id");
    const propertyIds = hostProperties.map((p) => p._id);
    matchStage.propertyId = { $in: propertyIds };
  }

  const pipeline = [
    { $match: { ...matchStage, type: "guest-to-host" } },
    {
      $group: {
        _id: null,
        totalReviews: { $sum: 1 },
        averageRating: { $avg: "$rating" },
        ratingDistribution: {
          $push: "$rating",
        },
      },
    },
    {
      $addFields: {
        ratingBreakdown: {
          $arrayToObject: {
            $map: {
              input: [1, 2, 3, 4, 5],
              as: "rating",
              in: {
                k: { $toString: "$$rating" },
                v: {
                  $size: {
                    $filter: {
                      input: "$ratingDistribution",
                      cond: { $eq: ["$$this", "$$rating"] },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  ];

  const result = await this.aggregate(pipeline);
  return (
    result[0] || {
      totalReviews: 0,
      averageRating: 0,
      ratingBreakdown: { "1": 0, "2": 0, "3": 0, "4": 0, "5": 0 },
    }
  );
};

// Static method for sentiment analysis (simplified)
reviewSchema.statics.getSentimentAnalysis = async function (
  propertyId: string,
) {
  const reviews = await this.find({
    propertyId: new mongoose.Types.ObjectId(propertyId),
    type: "guest-to-host",
  }).select("comment rating");

  // Simple sentiment analysis based on rating and keywords
  const sentimentData = reviews.map((review) => {
    const comment = review.comment.toLowerCase();
    const positiveWords = [
      "amazing",
      "excellent",
      "perfect",
      "wonderful",
      "great",
      "fantastic",
      "love",
      "beautiful",
      "clean",
      "comfortable",
    ];
    const negativeWords = [
      "terrible",
      "awful",
      "bad",
      "dirty",
      "uncomfortable",
      "horrible",
      "worst",
      "noisy",
      "broken",
    ];

    const positiveCount = positiveWords.filter((word) =>
      comment.includes(word),
    ).length;
    const negativeCount = negativeWords.filter((word) =>
      comment.includes(word),
    ).length;

    let sentiment = "neutral";
    if (review.rating >= 4 && positiveCount > negativeCount) {
      sentiment = "positive";
    } else if (review.rating <= 2 || negativeCount > positiveCount) {
      sentiment = "negative";
    }

    return {
      reviewId: review._id,
      sentiment,
      rating: review.rating,
      positiveWords: positiveCount,
      negativeWords: negativeCount,
    };
  });

  const sentimentCounts = {
    positive: sentimentData.filter((s) => s.sentiment === "positive").length,
    negative: sentimentData.filter((s) => s.sentiment === "negative").length,
    neutral: sentimentData.filter((s) => s.sentiment === "neutral").length,
  };

  return {
    totalReviews: reviews.length,
    sentimentBreakdown: sentimentCounts,
    sentimentPercentage: {
      positive:
        reviews.length > 0
          ? ((sentimentCounts.positive / reviews.length) * 100).toFixed(1)
          : 0,
      negative:
        reviews.length > 0
          ? ((sentimentCounts.negative / reviews.length) * 100).toFixed(1)
          : 0,
      neutral:
        reviews.length > 0
          ? ((sentimentCounts.neutral / reviews.length) * 100).toFixed(1)
          : 0,
    },
    details: sentimentData,
  };
};

const Review = mongoose.model<IReview>("Review", reviewSchema);

export default Review;
