import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { BasicInfoStep } from "@/components/listing/BasicInfoStep";
import { LocationStep } from "@/components/listing/LocationStep";
import { AmenitiesStep } from "@/components/listing/AmenitiesStep";
import { PricingStep } from "@/components/listing/PricingStep";
import { PhotosStep } from "@/components/listing/PhotosStep";
import { RulesStep } from "@/components/listing/RulesStep";
import { PaymentStep } from "@/components/listing/PaymentStep";
import {
  ChevronLeft,
  ChevronRight,
  Check,
  Home as HomeIcon,
  MapPin,
  Star,
  DollarSign,
  Image,
  Shield,
  CreditCard,
} from "lucide-react";
import { ListingFormData } from "@/lib/types";
import { CURRENCY_SYMBOL } from "@/lib/constants";

const AddListing = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  const navigate = useNavigate();

  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid },
    trigger,
  } = useForm<ListingFormData>({
    defaultValues: {
      type: "entire-home",
      location: {
        country: "United States",
        currency: "USD",
      },
      pricing: {
        currency: "USD",
        cleaningFee: 25,
        serviceFee: 15,
      },
      availability: {
        minStay: 1,
        maxStay: 30,
        instantBook: false,
      },
      amenities: [],
      rules: [],
      images: [],
    },
  });

  const steps = [
    {
      id: 0,
      title: "Basic Info",
      description: "Property details and capacity",
      icon: HomeIcon,
      component: BasicInfoStep,
      required: [
        "title",
        "description",
        "type",
        "capacity.guests",
        "capacity.bedrooms",
        "capacity.beds",
        "capacity.bathrooms",
      ],
    },
    {
      id: 1,
      title: "Location",
      description: "Where is your property?",
      icon: MapPin,
      component: LocationStep,
      required: [
        "location.address",
        "location.city",
        "location.state",
        "location.country",
      ],
    },
    {
      id: 2,
      title: "Amenities",
      description: "What does your property offer?",
      icon: Star,
      component: AmenitiesStep,
      required: [],
    },
    {
      id: 3,
      title: "Pricing",
      description: "Set your rates and rules",
      icon: DollarSign,
      component: PricingStep,
      required: [
        "pricing.basePrice",
        "availability.minStay",
        "availability.maxStay",
      ],
    },
    {
      id: 4,
      title: "Photos",
      description: "Add property images",
      icon: Image,
      component: PhotosStep,
      required: [],
    },
    {
      id: 5,
      title: "Rules",
      description: "House rules and policies",
      icon: Shield,
      component: RulesStep,
      required: [],
    },
    {
      id: 6,
      title: "Payment",
      description: "Review and publish",
      icon: CreditCard,
      component: PaymentStep,
      required: [],
    },
  ];

  const currentStepData = steps[currentStep];
  const CurrentStepComponent = currentStepData.component;

  const validateCurrentStep = async () => {
    if (currentStepData.required.length > 0) {
      const isStepValid = await trigger(currentStepData.required as any);
      return isStepValid;
    }
    return true;
  };

  const nextStep = async () => {
    const isValid = await validateCurrentStep();
    if (isValid) {
      setCompletedSteps((prev) => new Set(prev).add(currentStep));
      if (currentStep < steps.length - 1) {
        setCurrentStep(currentStep + 1);
      }
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const goToStep = async (stepIndex: number) => {
    if (stepIndex < currentStep || completedSteps.has(stepIndex)) {
      setCurrentStep(stepIndex);
    } else if (stepIndex === currentStep + 1) {
      await nextStep();
    }
  };

  const onSubmit = async (data: ListingFormData) => {
    console.log("Listing data:", data);

    // Validate required fields
    if (
      !data.title ||
      !data.description ||
      !data.location.address ||
      !data.pricing.basePrice
    ) {
      alert(
        "Please complete all required fields before publishing your listing.",
      );
      return;
    }

    // Check if terms are accepted (in a real app, this would be part of form validation)
    const termsCheckbox = document.getElementById("terms") as HTMLInputElement;
    if (!termsCheckbox?.checked) {
      alert("Please accept the Terms of Service to publish your listing.");
      return;
    }

    // In a real app, this would:
    // 1. Upload images to cloud storage
    // 2. Save listing to database
    // 3. Process payment setup
    // 4. Send confirmation email
    // 5. Activate listing

    alert(
      "🎉 Congratulations! Your listing has been published successfully!\n\nYour property is now live and ready to receive bookings. You will receive an email confirmation shortly.",
    );
    navigate("/host-dashboard");
  };

  const progress = ((currentStep + 1) / steps.length) * 100;
  const watchedData = watch();

  return (
    <div className="min-h-screen flex flex-col">

      <main className="flex-1 bg-gray-50">
        <div className="container py-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Create Your Listing</h1>
            <p className="text-muted-foreground">
              Share your space with travelers from around the world
            </p>
          </div>

          {/* Progress */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">
                  Step {currentStep + 1} of {steps.length}:{" "}
                  {currentStepData.title}
                </h2>
                <Badge variant="outline">
                  {Math.round(progress)}% Complete
                </Badge>
              </div>

              <Progress value={progress} className="mb-6" />

              {/* Step Navigation */}
              <div className="flex justify-between">
                {steps.map((step, index) => {
                  const IconComponent = step.icon;
                  const isCompleted = completedSteps.has(index);
                  const isCurrent = index === currentStep;
                  const isAccessible =
                    index <= currentStep || completedSteps.has(index);

                  return (
                    <button
                      key={step.id}
                      onClick={() => goToStep(index)}
                      disabled={!isAccessible}
                      className={`
                        flex flex-col items-center gap-2 p-2 rounded-lg transition-all
                        ${
                          isCurrent
                            ? "bg-primary text-primary-foreground"
                            : isCompleted
                              ? "bg-green-100 text-green-700 hover:bg-green-200"
                              : isAccessible
                                ? "hover:bg-gray-100"
                                : "opacity-50 cursor-not-allowed"
                        }
                      `}
                    >
                      <div
                        className={`
                        w-8 h-8 rounded-full flex items-center justify-center
                        ${
                          isCurrent
                            ? "bg-white text-primary"
                            : isCompleted
                              ? "bg-green-500 text-white"
                              : "bg-gray-200"
                        }
                      `}
                      >
                        {isCompleted ? (
                          <Check className="h-4 w-4" />
                        ) : (
                          <IconComponent className="h-4 w-4" />
                        )}
                      </div>
                      <div className="text-xs text-center hidden md:block">
                        <div className="font-medium">{step.title}</div>
                        <div className="text-xs opacity-75">
                          {step.description}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Form Content */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <CurrentStepComponent
              register={register}
              control={control}
              watch={watch}
              setValue={setValue}
            />

            {/* Navigation Buttons */}
            <Card className="mt-8">
              <CardContent className="p-6">
                <div className="flex justify-between items-center">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={prevStep}
                    disabled={currentStep === 0}
                  >
                    <ChevronLeft className="h-4 w-4 mr-2" />
                    Previous
                  </Button>

                  <div className="text-sm text-muted-foreground">
                    Step {currentStep + 1} of {steps.length}
                  </div>

                  {currentStep === steps.length - 1 ? (
                    <Button
                      type="submit"
                      size="lg"
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <Check className="h-4 w-4 mr-2" />
                      Publish Listing
                    </Button>
                  ) : (
                    <Button type="button" onClick={nextStep}>
                      Next
                      <ChevronRight className="h-4 w-4 ml-2" />
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </form>

          {/* Listing Preview */}
          {watchedData.title && (
            <Card className="mt-8">
              <CardHeader>
                <CardTitle>Listing Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <div className="font-medium text-gray-700">Title</div>
                    <div>{watchedData.title || "Not set"}</div>
                  </div>
                  <div>
                    <div className="font-medium text-gray-700">Location</div>
                    <div>
                      {watchedData.location?.city && watchedData.location?.state
                        ? `${watchedData.location.city}, ${watchedData.location.state}`
                        : "Not set"}
                    </div>
                  </div>
                  <div>
                    <div className="font-medium text-gray-700">Price</div>
                    <div>
                      {watchedData.pricing?.basePrice
                        ? `${CURRENCY_SYMBOL}${watchedData.pricing.basePrice}/night`
                        : "Not set"}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>

    </div>
  );
};

export { AddListing };
