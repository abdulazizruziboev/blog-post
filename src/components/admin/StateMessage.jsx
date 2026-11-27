import { LoaderCircle } from "lucide-react";

export function LoadingState({ text = "Loading..." }) {
  return (
    <div className="flex min-h-60 flex-col items-center justify-center">
      <LoaderCircle className="h-6 w-6 animate-spin text-[#4346EF]" />
      <p className="mt-2 text-sm text-[#6B7280]">{text}</p>
    </div>
  );
}

export function ErrorState({ text, onRetry }) {
  return (
    <div className="flex min-h-60 flex-col items-center justify-center text-center">
      <p className="text-sm text-red-500">{text}</p>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="mt-3 rounded-lg border border-[#E5E7EB] px-3 py-1.5 text-xs font-medium text-[#0F1729] hover:bg-[#F9FAFB] cursor-pointer"
        >
          Try again
        </button>
      )}
    </div>
  );
}
