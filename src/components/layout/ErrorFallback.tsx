import { FallbackProps } from "react-error-boundary";
import { AlertCircle, RotateCcw } from "lucide-react";

export function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-zinc-900 border border-red-500/30 rounded-2xl p-6 md:p-8 text-center shadow-2xl">
        <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <AlertCircle className="w-8 h-8 text-red-500" />
        </div>
        <h2 className="text-xl font-bold text-white mb-2">
          Something went wrong
        </h2>
        <p className="text-gray-400 text-sm mb-6 bg-black/50 p-3 rounded-lg border border-white/5 overflow-x-auto text-left font-mono">
          {(error as Error)?.message || "An unknown error occurred."}
        </p>
        <button
          onClick={resetErrorBoundary}
          className="w-full flex items-center justify-center gap-2 bg-white text-black hover:bg-gray-200 py-3 rounded-xl font-medium transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          Try Again
        </button>
      </div>
    </div>
  );
}
