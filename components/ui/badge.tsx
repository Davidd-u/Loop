import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transform hover:scale-105",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-sm hover:shadow-md",
        secondary:
          "border-transparent bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 hover:from-gray-200 hover:to-gray-300",
        destructive:
          "border-transparent bg-gradient-to-r from-red-500 to-red-600 text-white shadow-sm hover:shadow-md",
        outline:
          "text-gray-700 border-2 border-gray-300 bg-white hover:bg-gray-50 shadow-sm",
        success:
          "border-transparent bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-sm hover:shadow-md",
        warning:
          "border-transparent bg-gradient-to-r from-yellow-400 to-orange-400 text-white shadow-sm hover:shadow-md",
        info: "border-transparent bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-sm hover:shadow-md",
        purple:
          "border-transparent bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-sm hover:shadow-md",
        gold: "border-transparent bg-gradient-to-r from-yellow-500 to-yellow-600 text-white shadow-sm hover:shadow-md",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
