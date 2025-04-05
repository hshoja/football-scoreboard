import React from "react";
import { useLanguage } from "../context/LanguageContext";

interface FarsiTextProps {
  children: React.ReactNode;
  className?: string;
  withDigitSpacing?: boolean;
  autoDirection?: boolean;
  as?: React.ElementType;
}

/**
 * A component that properly displays text with Farsi typography optimizations
 * - Automatically handles RTL/LTR text direction based on content
 * - Applies proper digit spacing for better readability
 * - Uses the current language context for number formatting
 */
export default function FarsiText({
  children,
  className = "",
  withDigitSpacing = false,
  autoDirection = true,
  as: Component = "span",
}: FarsiTextProps) {
  const { language, formatNumber } = useLanguage();

  // Only process string content
  const content = typeof children === "string" ? children : children;

  // Determine text direction if autoDirection is enabled
  const textDirection =
    autoDirection && typeof children === "string"
      ? isRTLText(children)
        ? "rtl"
        : "ltr"
      : "";

  // Build class names
  const classNames = [
    className,
    textDirection,
    withDigitSpacing ? "digit-spacing" : "",
    language === "fa" ? "fa-text" : "",
  ]
    .filter(Boolean)
    .join(" ");

  // Format numbers if the content is numeric and in Farsi language
  const formattedContent =
    typeof children === "number" && language === "fa"
      ? formatNumber(children)
      : content;

  return <Component className={classNames}>{formattedContent}</Component>;
}

/**
 * Determines if a string should be displayed in RTL direction
 * @param text The text to check
 * @returns true if the text should be displayed RTL
 */
function isRTLText(text: string) {
  if (!text) return false;

  // Count Farsi characters
  const farsiChars =
    text.match(
      /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/g
    )?.length || 0;

  // Count Latin characters
  const latinChars = text.match(/[a-zA-Z]/g)?.length || 0;

  // If more than 40% of characters are Farsi, use RTL
  return farsiChars > 0 && farsiChars / (farsiChars + latinChars) > 0.4;
}
