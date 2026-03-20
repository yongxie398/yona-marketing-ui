import { useEffect, useState } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Dialog, DialogContent } from "../ui/dialog";
import { Trophy, DollarSign, User, Clock, Share2, X } from "lucide-react";

interface FirstSaleCelebrationProps {
  open: boolean;
  onClose: () => void;
  saleAmount: number;
  customerName: string;
  recoveryTime: string;
  campaign: string;
}

export function FirstSaleCelebration({
  open,
  onClose,
  saleAmount,
  customerName,
  recoveryTime,
  campaign,
}: FirstSaleCelebrationProps) {
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (open) {
      setShowConfetti(true);
      // Auto-hide confetti after animation
      const timer = setTimeout(() => setShowConfetti(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [open]);

  const handleShare = () => {
    const shareText = `Just recovered my first sale with Yona AI! 💰 $${saleAmount.toFixed(2)} in revenue automatically recovered. 🎉`;
    
    if (navigator.share) {
      navigator.share({
        title: "Yona AI First Win!",
        text: shareText,
      }).catch(() => {
        // Fallback to clipboard
        navigator.clipboard.writeText(shareText);
        alert("Copied to clipboard!");
      });
    } else {
      navigator.clipboard.writeText(shareText);
      alert("Copied to clipboard!");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[480px] p-0 overflow-hidden border-0">
        {/* Confetti Background */}
        {showConfetti && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {Array.from({ length: 50 }).map((_, i) => (
              <div
                key={i}
                className="absolute animate-confetti"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `-${Math.random() * 20}%`,
                  animationDelay: `${Math.random() * 2}s`,
                  animationDuration: `${2 + Math.random() * 2}s`,
                }}
              >
                <div
                  className="w-3 h-3 rounded-full"
                  style={{
                    backgroundColor: [
                      "#10b981",
                      "#3b82f6",
                      "#f59e0b",
                      "#ec4899",
                      "#8b5cf6",
                    ][Math.floor(Math.random() * 5)],
                  }}
                />
              </div>
            ))}
          </div>
        )}

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <X className="w-5 h-5 text-gray-500" />
        </button>

        {/* Content */}
        <div className="relative bg-gradient-to-br from-emerald-50 via-white to-blue-50 p-8">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full mb-4 shadow-lg animate-bounce">
              <Trophy className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              🎉 CONGRATULATIONS! 🎉
            </h2>
            <p className="text-lg text-gray-700 font-semibold">
              🏆 First Win Achievement Unlocked!
            </p>
            <p className="text-gray-600 mt-2">
              You just recovered your first sale!
            </p>
          </div>

          {/* Sale Details Card */}
          <Card className="p-6 border-2 border-emerald-200 bg-white shadow-xl mb-6">
            <div className="space-y-4">
              {/* Revenue */}
              <div className="text-center pb-4 border-b border-gray-200">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <DollarSign className="w-8 h-8 text-emerald-600" />
                  <span className="text-5xl font-bold text-emerald-900">
                    ${saleAmount.toFixed(2)}
                  </span>
                </div>
                <p className="text-sm font-semibold text-emerald-700">Recovered Revenue</p>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-1 gap-3">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <User className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="text-xs text-gray-600">Customer</p>
                    <p className="font-semibold text-gray-900">{customerName}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Clock className="w-5 h-5 text-purple-600" />
                  <div>
                    <p className="text-xs text-gray-600">Recovery Time</p>
                    <p className="font-semibold text-gray-900">{recoveryTime}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-5 h-5 flex items-center justify-center">
                    <span className="text-lg">🎯</span>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">Campaign</p>
                    <p className="font-semibold text-gray-900">{campaign}</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Motivational Message */}
          <div className="text-center mb-6 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200">
            <p className="text-sm text-gray-700">
              This is just the beginning! Your AI Revenue Agent is working 24/7 
              to recover more sales automatically.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={handleShare}
              className="flex-1 gap-2"
            >
              <Share2 className="w-4 h-4" />
              Share Your Win
            </Button>
            <Button
              onClick={onClose}
              className="flex-1 bg-emerald-600 hover:bg-emerald-700"
            >
              View Dashboard
            </Button>
          </div>
        </div>
      </DialogContent>

      <style>{`
        @keyframes confetti {
          0% {
            transform: translateY(0) rotateZ(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotateZ(720deg);
            opacity: 0;
          }
        }
        .animate-confetti {
          animation: confetti linear forwards;
        }
      `}</style>
    </Dialog>
  );
}
