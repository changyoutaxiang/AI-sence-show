import { Button } from "@/components/ui/button";
import { useTranslation } from "@/lib/i18n";
import { Languages } from "lucide-react";

export function LanguageToggle() {
  const { language, setLanguage, t } = useTranslation();

  const toggleLanguage = () => {
    setLanguage(language === "zh" ? "en" : "zh");
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleLanguage}
      data-testid="button-language-toggle"
      title={t("common.languageToggle")}
    >
      <Languages className="h-5 w-5" />
      <span className="sr-only">{t("common.languageToggleAria")}</span>
    </Button>
  );
}
