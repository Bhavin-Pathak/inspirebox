import { useState, useEffect, useRef } from "react";
import { Copy, Check, RefreshCw } from "lucide-react";

const Inspirebox = () => {
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);
  const [quoteLoading, setQuoteLoading] = useState(false); // For new quote loading
  const hasFetched = useRef(false); // Prevent duplicate API calls

  // Fetch random quote on component mount
  useEffect(() => {
    // Prevent duplicate API calls in React Strict Mode
    if (hasFetched.current) return;

    fetchRandomQuote();
    hasFetched.current = true;
  }, []);

  const fetchRandomQuote = async (isNewQuote = false) => {
    try {
      if (isNewQuote) {
        setQuoteLoading(true);
        setFadeIn(false); // Start fade out animation
      } else {
        setLoading(true);
        setFadeIn(false); // Reset animation
      }

      const response = await fetch("https://dummyjson.com/quotes/random");
      const data = await response.json();
      console.log("Fetched Quote:", data);
      setQuote(data);

      if (isNewQuote) {
        setQuoteLoading(false);
      } else {
        setLoading(false);
      }

      // Trigger fade-in animation
      setTimeout(() => setFadeIn(true), 100);
    } catch (error) {
      console.error("Error fetching quote:", error);
      // Fallback quote if API fails
      setQuote({
        quote:
          "Never give up because you never know if the next try is going to be the one that works.",
        author: "Mary Kay Ash",
      });

      if (isNewQuote) {
        setQuoteLoading(false);
      } else {
        setLoading(false);
      }
      setTimeout(() => setFadeIn(true), 100);
    }
  };

  const getNewQuote = () => {
    fetchRandomQuote(true); // Pass true to indicate it's a new quote request
  };

  const copyToClipboard = async () => {
    if (!quote) return;

    const textToCopy = `${quote.quote}`;

    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = textToCopy;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
        {/* Neon Light Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          <div
            className="absolute top-1/3 right-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"
            style={{ animationDelay: "2s" }}
          ></div>
          <div
            className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-orange-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"
            style={{ animationDelay: "4s" }}
          ></div>
          <div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-15 animate-pulse"
            style={{ animationDelay: "6s" }}
          ></div>
        </div>

        <div className="text-white text-xl font-medium">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden p-4">
      {/* Neon Light Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 sm:w-96 h-64 sm:h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div
          className="absolute top-1/3 right-1/4 w-64 sm:w-96 h-64 sm:h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute bottom-1/4 left-1/3 w-64 sm:w-96 h-64 sm:h-96 bg-orange-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"
          style={{ animationDelay: "4s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 sm:w-72 h-48 sm:h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-15 animate-pulse"
          style={{ animationDelay: "6s" }}
        ></div>
        <div
          className="absolute top-3/4 right-1/3 w-48 sm:w-80 h-48 sm:h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      {/* Quote Card */}
      <div
        className={`relative z-10 max-w-2xl mx-auto transform transition-all duration-1000 ${
          fadeIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        {/* Glassmorphism Card */}
        <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-3xl p-6 sm:p-8 md:p-12 shadow-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2 tracking-wide">
              Quote of the Day
            </h1>
          </div>

          {/* Quote Content */}
          <div className="text-center mb-8">
            <div className="relative">
              <div className="text-4xl sm:text-6xl text-white/30 absolute -top-4 -left-2 sm:-left-4 font-serif">
                "
              </div>
              <div className="text-4xl sm:text-6xl text-white/30 absolute -bottom-8 -right-2 sm:-right-4 font-serif">
                "
              </div>

              <div
                className={`transition-opacity duration-500 ${
                  quoteLoading ? "opacity-50" : "opacity-100"
                }`}
              >
                <p className="text-lg sm:text-xl md:text-2xl text-white leading-relaxed font-medium px-4 sm:px-8 mb-6">
                  {quote?.quote}
                </p>
              </div>
            </div>

            <div className="h-px bg-gradient-to-r from-transparent via-white/30 to-transparent mb-6"></div>

            <div
              className={`transition-opacity duration-500 ${
                quoteLoading ? "opacity-50" : "opacity-100"
              }`}
            >
              <p className="text-base sm:text-lg text-white/80 font-medium italic">
                — {quote?.author}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center gap-4 flex-wrap">
            <button
              onClick={copyToClipboard}
              className="group flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25 focus:outline-none focus:ring-4 focus:ring-purple-500/30"
            >
              {copied ? (
                <>
                  <Check className="w-5 h-5 text-green-300" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                  <span>Copy Quote</span>
                </>
              )}
            </button>

            <button
              onClick={getNewQuote}
              disabled={quoteLoading}
              className="group flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-orange-600 to-pink-600 hover:from-orange-700 hover:to-pink-700 text-white font-medium rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-orange-500/25 focus:outline-none focus:ring-4 focus:ring-orange-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {quoteLoading ? (
                <>
                  <RefreshCw className="w-5 h-5 animate-spin" />
                  <span>Loading...</span>
                </>
              ) : (
                <>
                  <RefreshCw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
                  <span>New Quote</span>
                </>
              )}
            </button>
          </div>

          {/* Decorative Elements */}
          <div className="absolute -top-1 -left-1 w-20 h-20 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full opacity-20 filter blur-xl"></div>
          <div className="absolute -bottom-1 -right-1 w-20 h-20 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full opacity-20 filter blur-xl"></div>
        </div>

        {/* Floating Elements */}
        <div
          className="absolute -top-4 -right-4 w-8 h-8 bg-orange-400 rounded-full opacity-60 animate-bounce"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute -bottom-4 -left-4 w-6 h-6 bg-pink-400 rounded-full opacity-60 animate-bounce"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute top-1/2 -left-8 w-4 h-4 bg-cyan-400 rounded-full opacity-60 animate-bounce"
          style={{ animationDelay: "3s" }}
        ></div>
      </div>

      {/* Bottom Text */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white/60 text-sm text-center px-4">
        <p>&copy; {new Date().getFullYear()} All rights reserved.</p>
        <p>
          Designed and Developed by{" "}
          <span className="text-white/60 font-semibold hover:text-white/60 transition-colors">
            Bhavin Pathak
          </span>
        </p>
      </div>
    </div>
  );
};

export default Inspirebox;
