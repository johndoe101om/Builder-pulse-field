import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Smartphone,
  Download,
  Star,
  Users,
  Zap,
  Bell,
  MapPin,
  Camera,
  Wifi,
  X,
  Apple,
  Chrome,
  Share,
  Plus,
  Check,
  Sparkles,
  Globe,
  Shield,
  Battery,
  Plane,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface AppFeature {
  icon: any;
  title: string;
  description: string;
}

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

const AppDownload = () => {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [isIOS, setIsIOS] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [showBanner, setShowBanner] = useState(false);
  const [showIOSInstructions, setShowIOSInstructions] = useState(false);

  const appFeatures: AppFeature[] = [
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Instant booking and seamless experience",
    },
    {
      icon: Bell,
      title: "Smart Notifications",
      description: "Get updates about your bookings and deals",
    },
    {
      icon: MapPin,
      title: "Offline Maps",
      description: "Access property locations without internet",
    },
    {
      icon: Camera,
      title: "Quick Photo Upload",
      description: "Share your experiences instantly",
    },
    {
      icon: Shield,
      title: "Secure Payments",
      description: "Enhanced security for mobile transactions",
    },
    {
      icon: Plane,
      title: "Travel Mode",
      description: "Optimized for travelers on the go",
    },
  ];

  useEffect(() => {
    // Check if user is on iOS
    const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    setIsIOS(iOS);

    // Check if app is already installed
    const isInstalled =
      window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as any).standalone === true;
    setIsInstalled(isInstalled);

    // Don't show banner if already installed
    if (isInstalled) return;

    // Show banner after a delay for better UX
    const timer = setTimeout(() => {
      setShowBanner(true);
    }, 3000);

    // Listen for beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      clearTimeout(timer);
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt,
      );
    };
  }, []);

  const handleInstallClick = async () => {
    if (isIOS) {
      setShowIOSInstructions(true);
      return;
    }

    if (!deferredPrompt) {
      // Fallback for browsers that don't support PWA installation
      if (navigator.userAgent.includes("Chrome")) {
        alert(
          'To install: Click the menu (⋮) → "Install StayConnect" or "Add to Home Screen"',
        );
      } else {
        alert(
          'To install: Look for "Add to Home Screen" or "Install" option in your browser menu',
        );
      }
      return;
    }

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === "accepted") {
      setDeferredPrompt(null);
      setShowBanner(false);
    }
  };

  const IOSInstructions = () => (
    <Card className="fixed inset-x-4 bottom-4 z-50 border-blue-200 bg-blue-50">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Apple className="h-5 w-5 text-blue-600" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-blue-900 mb-2">
              Install StayConnect App
            </h3>
            <div className="space-y-2 text-sm text-blue-800">
              <div className="flex items-center gap-2">
                <span className="bg-blue-200 text-blue-900 px-2 py-0.5 rounded text-xs font-medium">
                  1
                </span>
                <span>
                  Tap the <Share className="h-4 w-4 inline mx-1" /> share button
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="bg-blue-200 text-blue-900 px-2 py-0.5 rounded text-xs font-medium">
                  2
                </span>
                <span>
                  Select "Add to Home Screen"{" "}
                  <Plus className="h-4 w-4 inline mx-1" />
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="bg-blue-200 text-blue-900 px-2 py-0.5 rounded text-xs font-medium">
                  3
                </span>
                <span>Tap "Add" to install</span>
              </div>
            </div>
            <div className="flex gap-2 mt-3">
              <Button size="sm" onClick={() => setShowIOSInstructions(false)}>
                Got it!
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowIOSInstructions(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const AppBanner = () => (
    <Card className="fixed inset-x-4 bottom-4 z-50 shadow-2xl border-primary/20 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
      <CardContent className="p-4">
        <div className="flex items-center gap-4">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center">
              <Smartphone className="h-6 w-6 text-blue-600" />
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-white mb-1">
              Get the StayConnect App
            </h3>
            <p className="text-blue-100 text-sm">
              Faster booking, offline access, and exclusive mobile deals
            </p>
            <div className="flex items-center gap-2 mt-1">
              <div className="flex items-center gap-1">
                <Star className="h-3 w-3 fill-current text-yellow-300" />
                <span className="text-xs text-blue-100">4.8</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="h-3 w-3 text-blue-200" />
                <span className="text-xs text-blue-100">1M+ downloads</span>
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              size="sm"
              onClick={handleInstallClick}
              className="bg-white text-blue-600 hover:bg-blue-50"
            >
              <Download className="h-4 w-4 mr-1" />
              Install
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowBanner(false)}
              className="text-white hover:bg-white/20"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const FullAppPromotion = () => (
    <Card className="bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 text-white overflow-hidden relative">
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full transform translate-x-16 -translate-y-16"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full transform -translate-x-12 translate-y-12"></div>

      <CardContent className="p-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <div>
              <Badge className="bg-white/20 text-white border-white/30 mb-4">
                <Sparkles className="h-3 w-3 mr-1" />
                Mobile Experience
              </Badge>
              <h2 className="text-3xl font-bold mb-3">
                Get the StayConnect App
              </h2>
              <p className="text-blue-100 text-lg leading-relaxed">
                Experience lightning-fast booking, offline access to your trips,
                and exclusive mobile-only deals that save you up to 25%.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold">4.8★</div>
                <div className="text-blue-200 text-sm">App Store Rating</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">1M+</div>
                <div className="text-blue-200 text-sm">Downloads</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">50%</div>
                <div className="text-blue-200 text-sm">Faster Booking</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">25%</div>
                <div className="text-blue-200 text-sm">Mobile Discounts</div>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                size="lg"
                onClick={handleInstallClick}
                className="bg-white text-blue-600 hover:bg-blue-50 flex-1"
              >
                <Download className="h-5 w-5 mr-2" />
                {isIOS ? "Install App" : "Get App"}
              </Button>
              {!isInstalled && !isIOS && deferredPrompt && (
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white/30 text-white hover:bg-white/10"
                >
                  <Chrome className="h-5 w-5" />
                </Button>
              )}
            </div>

            {isInstalled && (
              <div className="flex items-center gap-2 p-3 bg-green-500/20 border border-green-400/30 rounded-lg">
                <Check className="h-5 w-5 text-green-300" />
                <span className="text-green-100 font-medium">
                  App is already installed!
                </span>
              </div>
            )}
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold mb-4">App Features</h3>
            <div className="grid grid-cols-1 gap-3">
              {appFeatures.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-3 bg-white/10 rounded-lg"
                  >
                    <div className="p-2 bg-white/20 rounded-lg">
                      <Icon className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <div className="font-medium text-white">
                        {feature.title}
                      </div>
                      <div className="text-blue-200 text-sm">
                        {feature.description}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <>
      {/* Show banner only if not installed and should show */}
      {showBanner && !isInstalled && <AppBanner />}

      {/* Show iOS instructions if requested */}
      {showIOSInstructions && <IOSInstructions />}

      {/* Full app promotion component for use in pages */}
      <FullAppPromotion />
    </>
  );
};

export default AppDownload;

// Hook for PWA installation
export const usePWAInstall = () => {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [isInstallable, setIsInstallable] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setIsInstallable(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt,
      );
    };
  }, []);

  const installApp = async () => {
    if (!deferredPrompt) return false;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === "accepted") {
      setDeferredPrompt(null);
      setIsInstallable(false);
      return true;
    }
    return false;
  };

  return { installApp, isInstallable };
};
