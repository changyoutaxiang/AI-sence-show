import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ScenarioCard } from "@/components/scenario-card";
import { ScenarioSkeleton } from "@/components/scenario-skeleton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sparkles, Search } from "lucide-react";
import type { Scenario } from "@shared/schema";
import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageToggle } from "@/components/language-toggle";
import { Link } from "wouter";
import { useTranslation } from "@/lib/i18n";

const categories = ["全部", "数据处理", "自动化", "分析预测", "文档生成", "其他"];

export default function Home() {
  const { t, language } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState("全部");
  const [searchQuery, setSearchQuery] = useState("");

  const { data: scenarios, isLoading } = useQuery<Scenario[]>({
    queryKey: ["/api/scenarios"],
  });

  const filteredScenarios = scenarios?.filter((scenario) => {
    const matchesCategory = selectedCategory === "全部" || scenario.category === selectedCategory;
    const matchesSearch = searchQuery === "" || 
      scenario.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      scenario.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      scenario.businessProblem.toLowerCase().includes(searchQuery.toLowerCase()) ||
      scenario.solution.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getCategoryLabel = (category: string) => {
    if (category === "全部") {
      return t("common.allCategories");
    }
    return t(`category.${category}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold" data-testid="text-logo">
              {language === "zh" ? "AI原子场景" : "AI Scenarios"}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <LanguageToggle />
            <ThemeToggle />
          </div>
        </div>
      </div>

      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-chart-3/5 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,hsl(var(--primary)/0.08),transparent_50%)] pointer-events-none" />
        
        <div className="relative max-w-7xl mx-auto px-6 py-24">
          <div className="max-w-3xl">
            <h1 className="text-5xl lg:text-6xl font-bold mb-6 animate-fade-in" data-testid="text-hero-title">
              {t("home.title")}
            </h1>
            <p className="text-xl text-muted-foreground mb-8 animate-fade-in" style={{ animationDelay: "0.1s" }} data-testid="text-hero-subtitle">
              {t("home.subtitle")}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-24">
        <div className="sticky top-[73px] z-40 py-6 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 space-y-4">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder={t("common.searchPlaceholder")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
              data-testid="input-search"
            />
          </div>
          
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                data-testid={`button-category-${category}`}
                className="rounded-full"
              >
                {getCategoryLabel(category)}
              </Button>
            ))}
          </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <ScenarioSkeleton key={i} />
            ))}
          </div>
        ) : filteredScenarios && filteredScenarios.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" data-testid="grid-scenarios">
            {filteredScenarios.map((scenario) => (
              <ScenarioCard key={scenario.id} scenario={scenario} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center">
              <Sparkles className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2" data-testid="text-empty-title">
              {t("home.noResults")}
            </h3>
            <p className="text-muted-foreground" data-testid="text-empty-description">
              {t("home.tryDifferent")}
            </p>
          </div>
        )}
      </div>

      <footer className="border-t py-12 bg-card">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground" data-testid="text-footer">
              {language === "zh" 
                ? "© 2025 AI原子场景展示中心. 持续创新，服务业务。" 
                : "© 2025 AI Atomic Scenarios Showcase. Innovation for Business."}
            </p>
            <div className="flex flex-wrap items-center gap-4 text-sm">
              <Link href="/admin">
                <Button variant="default" size="sm" data-testid="link-admin">
                  <Sparkles className="w-3 h-3 mr-1" />
                  {t("nav.admin")}
                </Button>
              </Link>
              <Link href="/analytics">
                <Button variant="outline" size="sm" data-testid="link-analytics">
                  {t("nav.analytics")}
                </Button>
              </Link>
              <a href="#" className="hover:text-foreground transition-colors text-muted-foreground" data-testid="link-contact">
                {language === "zh" ? "联系我们" : "Contact"}
              </a>
              <a href="#" className="hover:text-foreground transition-colors text-muted-foreground" data-testid="link-team">
                {language === "zh" ? "团队介绍" : "Team"}
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
