"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

// Language types
export type Language = "en" | "fa";

// Translation dictionary structure
interface Translations {
  [key: string]: {
    en: string;
    fa: string;
  };
}

// Translation dictionary
const translations: Translations = {
  // Common
  appName: {
    en: "Football Tournament Manager",
    fa: "مدیریت مسابقات فوتبال",
  },
  appNameShort: {
    en: "Football Manager",
    fa: "مدیریت فوتبال",
  },
  tournamentManager: {
    en: "Football Tournament Manager",
    fa: "مدیریت مسابقات فوتبال",
  },
  createTournament: {
    en: "Create New Tournament",
    fa: "ایجاد مسابقه جدید",
  },
  cancel: {
    en: "Cancel",
    fa: "لغو",
  },
  save: {
    en: "Save",
    fa: "ذخیره",
  },
  delete: {
    en: "Delete",
    fa: "حذف",
  },
  open: {
    en: "Open",
    fa: "باز کردن",
  },
  back: {
    en: "Back to Tournaments",
    fa: "بازگشت به مسابقات",
  },
  close: {
    en: "Close Tournament",
    fa: "بستن مسابقه",
  },

  // Navigation
  tournaments: {
    en: "Tournaments",
    fa: "مسابقات",
  },
  matches: {
    en: "Matches",
    fa: "بازی ها",
  },
  standings: {
    en: "Standings",
    fa: "جدول رده بندی",
  },
  openMenu: {
    en: "Open menu",
    fa: "باز کردن منو",
  },
  closeMenu: {
    en: "Close menu",
    fa: "بستن منو",
  },

  // Tournament creation
  tournamentName: {
    en: "Tournament Name",
    fa: "نام مسابقه",
  },
  tournamentFormat: {
    en: "Tournament Format",
    fa: "فرمت مسابقه",
  },
  homeAndAway: {
    en: "Home and Away (double round-robin)",
    fa: "رفت و برگشت (دو بار بازی هر تیم)",
  },
  addTeams: {
    en: "Add Teams",
    fa: "افزودن تیم ها",
  },
  add: {
    en: "Add",
    fa: "افزودن",
  },
  teams: {
    en: "Teams",
    fa: "تیم ها",
  },
  remove: {
    en: "Remove",
    fa: "حذف",
  },
  enterTeamName: {
    en: "Enter team name",
    fa: "نام تیم را وارد کنید",
  },
  noTeamsAdded: {
    en: "No teams added yet",
    fa: "هنوز تیمی اضافه نشده است",
  },

  // Tournament list
  yourTournaments: {
    en: "Your Tournaments",
    fa: "مسابقات شما",
  },
  noTournaments: {
    en: "You don't have any tournaments yet",
    fa: "شما هنوز مسابقه ای ندارید",
  },
  noTournamentFound: {
    en: "No tournament found",
    fa: "مسابقه‌ای یافت نشد",
  },
  createFirstTournament: {
    en: "Create Your First Tournament",
    fa: "ایجاد اولین مسابقه",
  },
  created: {
    en: "Created",
    fa: "ایجاد شده",
  },
  format: {
    en: "Format",
    fa: "فرمت",
  },

  // Match view
  homeTeam: {
    en: "Home Team",
    fa: "تیم میزبان",
  },
  awayTeam: {
    en: "Away Team",
    fa: "تیم مهمان",
  },
  singleGame: {
    en: "Single Game Format",
    fa: "فرمت تک بازی",
  },
  homeAwayFormat: {
    en: "Home & Away Format",
    fa: "فرمت رفت و برگشت",
  },
  viewMatches: {
    en: "View Matches",
    fa: "مشاهده بازی‌ها",
  },

  // Standings page
  tournamentSummary: {
    en: "Tournament Summary",
    fa: "خلاصه مسابقات",
  },
  pointsSystem: {
    en: "Points System",
    fa: "سیستم امتیازدهی",
  },
  win: {
    en: "Win",
    fa: "برد",
  },
  draw: {
    en: "Draw",
    fa: "مساوی",
  },
  loss: {
    en: "Loss",
    fa: "باخت",
  },
  totalMatches: {
    en: "Total Matches",
    fa: "کل بازی‌ها",
  },

  // Standings table
  played: {
    en: "P",
    fa: "ب",
  },
  won: {
    en: "W",
    fa: "ب",
  },
  drawn: {
    en: "D",
    fa: "م",
  },
  lost: {
    en: "L",
    fa: "ش",
  },
  goalsFor: {
    en: "GF",
    fa: "گز",
  },
  goalsAgainst: {
    en: "GA",
    fa: "گخ",
  },
  goalDifference: {
    en: "GD",
    fa: "تگ",
  },
  points: {
    en: "Pts",
    fa: "امتیاز",
  },
  swipeToSeeMore: {
    en: "Swipe to see more",
    fa: "برای دیدن بیشتر بکشید",
  },
  tapToExpand: {
    en: "Tap on a team to see full stats",
    fa: "برای مشاهده آمار کامل روی تیم کلیک کنید",
  },
  playedFull: {
    en: "Played",
    fa: "بازی‌ها",
  },
  wonFull: {
    en: "Won",
    fa: "برد",
  },
  drawnFull: {
    en: "Drawn",
    fa: "مساوی",
  },
  lostFull: {
    en: "Lost",
    fa: "شکست",
  },
  goalsForFull: {
    en: "Goals For",
    fa: "گل زده",
  },
  goalsAgainstFull: {
    en: "Goals Against",
    fa: "گل خورده",
  },
  goalDifferenceFull: {
    en: "Goal Difference",
    fa: "تفاضل گل",
  },
  pointsFull: {
    en: "Points",
    fa: "امتیازات",
  },
  noStandingsAvailable: {
    en: "No standings available",
    fa: "جدول رده‌بندی در دسترس نیست",
  },
  team: {
    en: "Team",
    fa: "تیم",
  },

  // Match status
  pending: {
    en: "Pending",
    fa: "در انتظار",
  },
  completed: {
    en: "Completed",
    fa: "انجام شده",
  },
  enterResult: {
    en: "Enter Result",
    fa: "ثبت نتیجه",
  },
  editResult: {
    en: "Edit",
    fa: "ویرایش",
  },
  saveResult: {
    en: "Save Result",
    fa: "ذخیره نتیجه",
  },
  cancelEdit: {
    en: "Cancel",
    fa: "انصراف",
  },

  // Tournament status
  notStarted: {
    en: "Not started",
    fa: "شروع نشده",
  },
  inProgress: {
    en: "In progress",
    fa: "در حال انجام",
  },
  tournamentCompleted: {
    en: "Completed",
    fa: "تکمیل شده",
  },

  // Language selection
  languageSelect: {
    en: "Select Language",
    fa: "انتخاب زبان",
  },
  english: {
    en: "English",
    fa: "انگلیسی",
  },
  farsi: {
    en: "Farsi",
    fa: "فارسی",
  },
  languagePrompt: {
    en: "Please select your preferred language:",
    fa: "لطفاً زبان مورد نظر خود را انتخاب کنید:",
  },

  // Typography examples
  typographyExample: {
    en: "Typography Examples",
    fa: "نمونه‌های تایپوگرافی",
  },
  headingStyles: {
    en: "Heading Styles",
    fa: "سبک‌های سرفصل",
  },
  paragraphStyles: {
    en: "Paragraph Styles",
    fa: "سبک‌های پاراگراف",
  },
  numberFormatting: {
    en: "Number Formatting",
    fa: "قالب‌بندی اعداد",
  },
  standardNumbers: {
    en: "Standard Numbers",
    fa: "اعداد استاندارد",
  },
  digitSpacingExample: {
    en: "With Digit Spacing",
    fa: "با فاصله‌گذاری رقم‌ها",
  },
  farsiTextComponent: {
    en: "FarsiText Component",
    fa: "کامپوننت متن فارسی",
  },
  autoDirection: {
    en: "Auto Direction",
    fa: "جهت خودکار",
  },
  mixedContent: {
    en: "Mixed Content",
    fa: "محتوای ترکیبی",
  },
  digitSpacing: {
    en: "Digit Spacing",
    fa: "فاصله‌گذاری ارقام",
  },

  // Offline page
  offline: {
    en: "You're Offline",
    fa: "شما آفلاین هستید",
  },
  offlineDesc: {
    en: "It seems you're not connected to the internet right now",
    fa: "به نظر می‌رسد در حال حاضر به اینترنت متصل نیستید",
  },
  checkingConnection: {
    en: "Checking connection...",
    fa: "در حال بررسی اتصال...",
  },
  tryAgain: {
    en: "Try Again",
    fa: "تلاش مجدد",
  },
  availableOffline: {
    en: "Available Offline",
    fa: "در دسترس آفلاین",
  },
  home: {
    en: "Home",
    fa: "خانه",
  },

  // Accessibility
  accessibility: {
    en: "Accessibility",
    fa: "دسترسی‌پذیری",
  },
  increaseFontSize: {
    en: "Increase Font Size",
    fa: "افزایش اندازه متن",
  },
  decreaseFontSize: {
    en: "Decrease Font Size",
    fa: "کاهش اندازه متن",
  },
  resetFontSize: {
    en: "Reset Font Size",
    fa: "بازنشانی اندازه متن",
  },

  // Sound settings
  mute: {
    en: "Mute Sounds",
    fa: "بی‌صدا کردن",
  },
  unmute: {
    en: "Unmute Sounds",
    fa: "فعال کردن صدا",
  },
  soundSettings: {
    en: "Sound Settings",
    fa: "تنظیمات صدا",
  },
  volume: {
    en: "Volume",
    fa: "میزان صدا",
  },

  // Info page
  aboutApp: {
    en: "About Football Tournament Manager",
    fa: "درباره مدیریت مسابقات فوتبال",
  },
  dataPrivacy: {
    en: "Data Privacy & Storage",
    fa: "حریم خصوصی و ذخیره‌سازی داده‌ها",
  },
  localStorageInfo: {
    en: "All your tournament data is stored securely on your local device using browser's localStorage. Your data never leaves your device and is not sent to any server.",
    fa: "تمام اطلاعات مسابقات شما به صورت امن در دستگاه شما با استفاده از localStorage مرورگر ذخیره می‌شود. داده‌های شما هرگز از دستگاهتان خارج نمی‌شود و به هیچ سروری ارسال نمی‌شود.",
  },
  dataSafetyInfo: {
    en: "Your tournament data remains private and secure on your device. This means:",
    fa: "داده‌های مسابقات شما خصوصی و ایمن در دستگاه شما باقی می‌ماند. این به این معنی است:",
  },
  offlineAccess: {
    en: "You can access your tournaments even when offline",
    fa: "حتی در حالت آفلاین می‌توانید به مسابقات خود دسترسی داشته باشید",
  },
  noServerStorage: {
    en: "No data is sent to our servers",
    fa: "هیچ داده‌ای به سرورهای ما ارسال نمی‌شود",
  },
  deviceLimited: {
    en: "Your data is only available on this device/browser",
    fa: "داده‌های شما فقط در این دستگاه/مرورگر در دسترس است",
  },
  clearingBrowserData: {
    en: "Clearing browser data will also remove your tournament data",
    fa: "پاک کردن داده‌های مرورگر، داده‌های مسابقات شما را نیز حذف خواهد کرد",
  },
  exportFeature: {
    en: "We recommend occasionally exporting important tournaments if you wish to preserve them long-term or transfer them to another device.",
    fa: "توصیه می‌کنیم برای حفظ طولانی‌مدت یا انتقال به دستگاه دیگر، گاهی مسابقات مهم خود را صادر کنید.",
  },
  support: {
    en: "Support & Contact",
    fa: "پشتیبانی و تماس",
  },
  needHelp: {
    en: "Need help or have suggestions for improvement? Reach out to us:",
    fa: "به کمک نیاز دارید یا پیشنهادی برای بهبود دارید؟ با ما تماس بگیرید:",
  },
  copyToClipboard: {
    en: "Copy to clipboard",
    fa: "کپی در کلیپ‌بورد",
  },
  emailCopied: {
    en: "Email copied to clipboard!",
    fa: "ایمیل در کلیپ‌بورد کپی شد!",
  },
  appVersion: {
    en: "App Version",
    fa: "نسخه برنامه",
  },
  backToHome: {
    en: "Back to Home",
    fa: "بازگشت به صفحه اصلی",
  },
  winner: {
    en: "Winner",
    fa: "برنده",
  },
};

// Context type
interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  formatNumber: (num: number) => string;
  dir: string;
  showLanguageDialog: boolean;
  setShowLanguageDialog: (show: boolean) => void;
}

// Create context with default values
const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  setLanguage: () => {},
  t: () => "",
  formatNumber: (num: number) => num.toString(),
  dir: "ltr",
  showLanguageDialog: false,
  setShowLanguageDialog: () => {},
});

// Custom hook to use language context
export const useLanguage = () => useContext(LanguageContext);

// Provider component
export const LanguageProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  // State for language and dialog visibility
  const [language, setLanguageState] = useState<Language>("en");
  const [showLanguageDialog, setShowLanguageDialog] = useState(true);
  const [dir, setDir] = useState("ltr");

  // Update HTML dir attribute when language changes
  useEffect(() => {
    if (language === "fa") {
      document.documentElement.dir = "rtl";
      document.documentElement.lang = "fa";
      setDir("rtl");
    } else {
      document.documentElement.dir = "ltr";
      document.documentElement.lang = "en";
      setDir("ltr");
    }
  }, [language]);

  // Load language preference from localStorage on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem("language");
    if (savedLanguage === "en" || savedLanguage === "fa") {
      setLanguageState(savedLanguage);
      setShowLanguageDialog(false);
    }
  }, []);

  // Set language and save to localStorage
  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("language", lang);
    setShowLanguageDialog(false);
  };

  // Translation function
  const t = (key: string): string => {
    const translationObj = translations[key];
    if (!translationObj) {
      console.warn(`Translation key "${key}" not found`);
      return key;
    }
    return translationObj[language] || key;
  };

  // Format number based on language
  const formatNumber = (num: number): string => {
    if (language === "fa") {
      // Convert to Persian/Farsi numerals
      return num
        .toString()
        .replace(
          /\d/g,
          (d) => ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"][parseInt(d)]
        );
    }
    return num.toString();
  };

  // Context value
  const contextValue: LanguageContextType = {
    language,
    setLanguage,
    t,
    formatNumber,
    dir,
    showLanguageDialog,
    setShowLanguageDialog,
  };

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
};
