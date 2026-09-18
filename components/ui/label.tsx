import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Adapted from Aceternity UI's Label (https://ui.aceternity.com/registry/label.json).
 * The original wraps @radix-ui/react-label for click-passthrough to a
 * nested custom control and double-click-select prevention. This site's
 * form fields are plain <input>/<textarea> elements (no nested custom
 * controls), where a native <label htmlFor> already gives the same
 * click-to-focus behavior, so this skips adding a new dependency for it.
 */
const Label = React.forwardRef<HTMLLabelElement, React.LabelHTMLAttributes<HTMLLabelElement>>(
  ({ className, ...props }, ref) => (
    <label
      ref={ref}
      className={cn(
        "block font-mono text-xs uppercase leading-none tracking-wider text-mist-500 peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
        className,
      )}
      {...props}
    />
  ),
);
Label.displayName = "Label";

export { Label };
