import { AlertTriangle, ArrowRight, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";

interface RestrictedModeBannerProps {
  onDismiss?: () => void;
}

export function RestrictedModeBanner({ 
  onDismiss 
}: RestrictedModeBannerProps) {
  const [isDismissed, setIsDismissed] = useState(false);

  const handleDismiss = () => {
    setIsDismissed(true);
    onDismiss?.();
  };

  if (isDismissed) return null;

  return (
    <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
              <AlertTriangle className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
              <span className="font-semibold">
                Your AI Agent is active but limited.
              </span>
              <span className="text-amber-100 text-sm sm:text-base">
                We noticed you haven&apos;t confirmed your checkout settings. This may prevent emails from being sent.
              </span>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Link
              to="/configure-agent"
              className="flex items-center gap-2 bg-white text-amber-700 px-4 py-2 rounded-lg font-semibold text-sm hover:bg-amber-50 transition-colors whitespace-nowrap"
            >
              <span className="hidden sm:inline">Complete Setup</span>
              <span className="sm:hidden">Setup</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <button
              onClick={handleDismiss}
              className="p-1.5 hover:bg-white/20 rounded-lg transition-colors"
              aria-label="Dismiss banner"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
