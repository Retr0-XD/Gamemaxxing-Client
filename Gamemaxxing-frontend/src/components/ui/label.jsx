import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"

const Label = React.forwardRef(({ className, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className="block text-sm font-medium text-gray-700 mb-1"
    {...props}
  />
))
Label.displayName = LabelPrimitive.Root.displayName

export { Label }