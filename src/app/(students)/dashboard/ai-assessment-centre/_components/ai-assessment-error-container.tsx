import { AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"

type ErrorContainerProps = {
  message?: string
  onRetry?: () => void
}

export function ErrorContainer({
  message = "Something went wrong while loading assessments.",
  onRetry,
}: ErrorContainerProps) {
  return (
    <div className="border border-red-200 bg-red-50 rounded-xl p-6 flex flex-col items-center text-center gap-4 mb-12">
      <AlertTriangle className="w-10 h-10 text-red-500" />

      <div className="space-y-1">
        <h3 className="text-lg font-semibold text-red-700">
          Failed to load data
        </h3>
        <p className="text-sm text-red-600">
          {message}
        </p>
      </div>

      {onRetry && (
        <Button
          variant="outline"
          className="border-red-300 text-red-600 hover:bg-red-100"
          onClick={onRetry}
        >
          Try Again
        </Button>
      )}
    </div>
  )
}
