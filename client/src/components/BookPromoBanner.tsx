import { useState } from "react";
import { Button } from "@/components/ui/button";
import { X, BookOpen, Download, Sparkles } from "lucide-react";
import { Link } from "wouter";

export default function BookPromoBanner() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="relative bg-gradient-to-r from-blue-600 via-cyan-500 to-green-500 text-white overflow-hidden">
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container relative">
        <div className="flex items-center justify-between gap-6 py-4 md:py-6">
          {/* Content */}
          <div className="flex-1 flex flex-col md:flex-row items-center gap-4 md:gap-6">
            {/* Book Cover Thumbnail */}
            <div className="flex-shrink-0 hidden sm:block">
              <div className="relative group">
                <div className="absolute -inset-1 bg-white/20 rounded-lg blur-sm group-hover:blur-md transition-all" />
                <img
                  src="/images/ketowell-book-cover.png"
                  alt="KetoWell Book"
                  className="relative w-20 h-28 md:w-24 md:h-32 object-cover rounded-lg shadow-2xl transform group-hover:scale-105 transition-transform"
                />
              </div>
            </div>

            {/* Text Content */}
            <div className="flex-1 text-center md:text-left space-y-2">
              <div className="flex items-center justify-center md:justify-start gap-2">
                <Sparkles className="h-5 w-5 animate-pulse" />
                <span className="text-xs md:text-sm font-semibold uppercase tracking-wider bg-white/20 px-3 py-1 rounded-full">
                  New Release
                </span>
              </div>
              
              <h3 className="text-xl md:text-2xl lg:text-3xl font-bold leading-tight">
                Free Book: Transform Your Health with Ketogenic Living
              </h3>
              
              <p className="text-sm md:text-base text-white/90 max-w-2xl">
                Download our comprehensive 303-page guide with 200+ studies on reversing diabetes, 
                enhancing cognition, and achieving sustainable health transformation.
              </p>

              {/* Stats */}
              <div className="flex items-center justify-center md:justify-start gap-4 md:gap-6 text-xs md:text-sm pt-2">
                <div className="flex items-center gap-1">
                  <BookOpen className="h-4 w-4" />
                  <span className="font-semibold">56,620 words</span>
                </div>
                <div className="flex items-center gap-1">
                  <Download className="h-4 w-4" />
                  <span className="font-semibold">Free PDF</span>
                </div>
                <div className="hidden sm:flex items-center gap-1">
                  <Sparkles className="h-4 w-4" />
                  <span className="font-semibold">Evidence-Based</span>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="flex-shrink-0">
              <Link href="/book">
                <Button
                  size="lg"
                  className="bg-white text-blue-600 hover:bg-white/90 font-bold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all"
                >
                  <Download className="mr-2 h-5 w-5" />
                  Get Free Book
                </Button>
              </Link>
            </div>
          </div>

          {/* Close Button */}
          <button
            onClick={() => setIsVisible(false)}
            className="absolute top-2 right-2 md:relative md:top-0 md:right-0 flex-shrink-0 p-2 hover:bg-white/10 rounded-full transition-colors"
            aria-label="Close banner"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
