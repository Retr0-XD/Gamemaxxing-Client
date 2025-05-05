import * as React from "react"
import { Slot } from "@radix-ui/react-slot"

const Button = React.forwardRef(({ className, variant = "default", size = "default", asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button"
  
  // Simple styling based on variants
  let variantClass = "bg-indigo-600 text-white hover:bg-indigo-700"; // default
  if (variant === "destructive") variantClass = "bg-red-500 text-white hover:bg-red-600";
  if (variant === "outline") variantClass = "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50";
  if (variant === "secondary") variantClass = "bg-gray-200 text-gray-800 hover:bg-gray-300";
  if (variant === "ghost") variantClass = "bg-transparent text-gray-700 hover:bg-gray-100";
  if (variant === "link") variantClass = "bg-transparent text-indigo-600 hover:underline";
  
  // Simple sizing
  let sizeClass = "px-4 py-2"; // default
  if (size === "sm") sizeClass = "px-3 py-1 text-sm";
  if (size === "lg") sizeClass = "px-6 py-3 text-lg";
  if (size === "icon") sizeClass = "p-2";
  
  return (
    <Comp
      className={`inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none disabled:opacity-50 ${variantClass} ${sizeClass} ${className || ""}`}
      ref={ref}
      {...props}
    />
  )
})
Button.displayName = "Button"

export { Button }