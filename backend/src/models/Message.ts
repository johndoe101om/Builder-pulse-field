import mongoose, { Schema } from "mongoose";
import { IMessage } from "../types/index.js";

const messageSchema = new Schema<IMessage>(
  {
    senderId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiverId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    bookingId: {
      type: Schema.Types.ObjectId,
      ref: "Booking",
      default: null,
    },
    content: {
      type: String,
      required: true,
      trim: true,
      maxlength: 2000,
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
    read: {
      type: Boolean,
      default: false,
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
messageSchema.index({ senderId: 1 });
messageSchema.index({ receiverId: 1 });
messageSchema.index({ bookingId: 1 });
messageSchema.index({ timestamp: -1 });
messageSchema.index({ read: 1 });

// Compound indexes for common queries
messageSchema.index({ senderId: 1, receiverId: 1, timestamp: -1 });
messageSchema.index({ receiverId: 1, read: 1 });
messageSchema.index({ bookingId: 1, timestamp: -1 });

// Virtual for sender population
messageSchema.virtual("sender", {
  ref: "User",
  localField: "senderId",
  foreignField: "_id",
  justOne: true,
});

// Virtual for receiver population
messageSchema.virtual("receiver", {
  ref: "User",
  localField: "receiverId",
  foreignField: "_id",
  justOne: true,
});

// Static method to get conversation between two users
messageSchema.statics.getConversation = async function (
  userId1: string,
  userId2: string,
  page = 1,
  limit = 50,
) {
  const skip = (page - 1) * limit;

  const messages = await this.find({
    $or: [
      { senderId: userId1, receiverId: userId2 },
      { senderId: userId2, receiverId: userId1 },
    ],
  })
    .sort({ timestamp: -1 })
    .skip(skip)
    .limit(limit)
    .populate("senderId", "firstName lastName avatar")
    .populate("receiverId", "firstName lastName avatar");

  return messages.reverse(); // Return in chronological order
};

// Static method to get unread message count
messageSchema.statics.getUnreadCount = async function (userId: string) {
  return await this.countDocuments({
    receiverId: userId,
    read: false,
  });
};

// Static method to mark messages as read
messageSchema.statics.markAsRead = async function (
  senderId: string,
  receiverId: string,
) {
  return await this.updateMany(
    { senderId, receiverId, read: false },
    { read: true },
  );
};

// Static method to get recent conversations
messageSchema.statics.getRecentConversations = async function (
  userId: string,
  limit = 20,
) {
  const conversations = await this.aggregate([
    {
      $match: {
        $or: [
          { senderId: new mongoose.Types.ObjectId(userId) },
          { receiverId: new mongoose.Types.ObjectId(userId) },
        ],
      },
    },
    {
      $addFields: {
        otherUserId: {
          $cond: [
            { $eq: ["$senderId", new mongoose.Types.ObjectId(userId)] },
            "$receiverId",
            "$senderId",
          ],
        },
      },
    },
    {
      $sort: { timestamp: -1 },
    },
    {
      $group: {
        _id: "$otherUserId",
        lastMessage: { $first: "$$ROOT" },
        unreadCount: {
          $sum: {
            $cond: [
              {
                $and: [
                  { $eq: ["$receiverId", new mongoose.Types.ObjectId(userId)] },
                  { $eq: ["$read", false] },
                ],
              },
              1,
              0,
            ],
          },
        },
      },
    },
    {
      $sort: { "lastMessage.timestamp": -1 },
    },
    {
      $limit: limit,
    },
    {
      $lookup: {
        from: "users",
        localField: "_id",
        foreignField: "_id",
        as: "user",
      },
    },
    {
      $unwind: "$user",
    },
    {
      $project: {
        _id: 0,
        userId: "$_id",
        user: {
          id: "$user._id",
          firstName: "$user.firstName",
          lastName: "$user.lastName",
          avatar: "$user.avatar",
        },
        lastMessage: "$lastMessage",
        unreadCount: 1,
      },
    },
  ]);

  return conversations;
};

const Message = mongoose.model<IMessage>("Message", messageSchema);

export default Message;
