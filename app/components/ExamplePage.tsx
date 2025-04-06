"use client";

import React from "react";
import { useLanguage } from "../context/LanguageContext";
import FarsiText from "./FarsiText";

export default function ExamplePage() {
  const { t, language, formatNumber } = useLanguage();

  return (
    <div className="space-y-8">
      <section className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
        <h1 className="text-2xl font-bold mb-4">{t("typographyExample")}</h1>

        <div className="space-y-6">
          {/* Heading Examples */}
          <div>
            <h2 className="text-xl font-semibold mb-2">{t("headingStyles")}</h2>
            <div className="space-y-2">
              <h1 className="text-3xl">
                {language === "fa"
                  ? "سرفصل اول (عنوان اصلی)"
                  : "Heading 1 (Main Title)"}
              </h1>
              <h2 className="text-2xl">
                {language === "fa"
                  ? "سرفصل دوم (زیرعنوان)"
                  : "Heading 2 (Subtitle)"}
              </h2>
              <h3 className="text-xl">
                {language === "fa" ? "سرفصل سوم (بخش)" : "Heading 3 (Section)"}
              </h3>
              <h4 className="text-lg">
                {language === "fa"
                  ? "سرفصل چهارم (زیربخش)"
                  : "Heading 4 (Subsection)"}
              </h4>
            </div>
          </div>

          {/* Paragraph Examples */}
          <div>
            <h2 className="text-xl font-semibold mb-2">
              {t("paragraphStyles")}
            </h2>
            <p className="mb-2">
              {language === "fa"
                ? "این یک نمونه متن فارسی است که برای نمایش بهتر تایپوگرافی فارسی طراحی شده است. این متن شامل حروف، اعداد و علائم مختلف فارسی می‌باشد."
                : "This is an example English text designed to showcase typography. It includes various English characters, numbers, and symbols."}
            </p>
            <p>
              {language === "fa"
                ? "فاصله‌گذاری و کرنینگ در فارسی برای خوانایی بهتر متن بسیار مهم است. این متن با استفاده از ویژگی‌های تایپوگرافی بهینه‌سازی شده است."
                : "Spacing and kerning in English are important for better text readability. This text has been optimized using typography features."}
            </p>
          </div>

          {/* Number Formatting Examples */}
          <div>
            <h2 className="text-xl font-semibold mb-2">
              {t("numberFormatting")}
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-lg font-medium mb-1">
                  {t("standardNumbers")}
                </h3>
                <ul className="space-y-1">
                  <li>
                    1234: {language === "fa" ? formatNumber(1234) : "1234"}
                  </li>
                  <li>
                    567.89:{" "}
                    {language === "fa" ? formatNumber(567.89) : "567.89"}
                  </li>
                  <li>-42: {language === "fa" ? formatNumber(-42) : "-42"}</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-1">
                  {t("digitSpacingExample")}
                </h3>
                <ul className="space-y-1">
                  <li className="digit-spacing">
                    1234: {language === "fa" ? formatNumber(1234) : "1234"}
                  </li>
                  <li className="digit-spacing">
                    567.89:{" "}
                    {language === "fa" ? formatNumber(567.89) : "567.89"}
                  </li>
                  <li className="digit-spacing">
                    -42: {language === "fa" ? formatNumber(-42) : "-42"}
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* FarsiText Component Examples */}
          <div>
            <h2 className="text-xl font-semibold mb-2">
              {t("farsiTextComponent")}
            </h2>
            <div className="space-y-2">
              <div>
                <h3 className="text-lg font-medium mb-1">
                  {t("autoDirection")}
                </h3>
                <FarsiText autoDirection>
                  {language === "fa"
                    ? "این متن به صورت خودکار جهت راست به چپ می‌گیرد."
                    : "This text will automatically get LTR direction."}
                </FarsiText>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-1">
                  {t("mixedContent")}
                </h3>
                <FarsiText autoDirection>
                  {language === "fa"
                    ? "این متن شامل انگلیسی (English) و فارسی است و جهت آن به صورت هوشمند تعیین می‌شود."
                    : "This text contains English and Farsi (فارسی) and its direction is intelligently determined."}
                </FarsiText>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-1">
                  {t("digitSpacing")}
                </h3>
                <FarsiText withDigitSpacing>
                  {language === "fa"
                    ? "این متن شامل اعداد ۱۲۳۴۵۶۷۸۹۰ است که با فاصله‌گذاری بهتر نمایش داده می‌شوند."
                    : "This text contains numbers 1234567890 that are displayed with better spacing."}
                </FarsiText>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
