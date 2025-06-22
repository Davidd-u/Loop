import * as React from "react"

import { cn } from "@/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        // Personalidad tipo Input/Button
        "flex min-h-16 h-auto w-full rounded-xl border-2 border-gray-200 bg-white px-4 py-3 text-sm font-medium ring-offset-background placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50 shadow-sm hover:shadow-md transition-all resize-none",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
