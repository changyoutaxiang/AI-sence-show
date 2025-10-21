import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, TrendingUp, Eye, Sparkles, Download } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageToggle } from "@/components/language-toggle";
import { CategoryBadge } from "@/components/category-badge";
import type { Scenario } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "@/lib/i18n";

interface AnalyticsData {
  scenarioId: string;
  viewCount: number;
  scenario: Scenario;
}

export default function Analytics() {
  const { t } = useTranslation();
  const { toast } = useToast();
  const { data: analytics, isLoading } = useQuery<AnalyticsData[]>({
    queryKey: ["/api/analytics"],
  });

  const totalViews = analytics?.reduce((sum, item) => sum + item.viewCount, 0) || 0;

  const exportAnalytics = () => {
    if (!analytics) return;
    
    const exportData = analytics.map(item => ({
      [t("analytics.rank")]: analytics.indexOf(item) + 1,
      [t("analytics.scenario")]: item.scenario.title,
      [t("analytics.category")]: item.scenario.category,
      [t("analytics.views")]: item.viewCount,
      [t("detail.team")]: item.scenario.team,
      [t("detail.timeline")]: item.scenario.timeline,
    }));
    
    const dataStr = JSON.stringify(exportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `analytics_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    toast({
      title: t("analytics.exportSuccess"),
      description: t("analytics.exportSuccessDesc"),
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" data-testid="button-back">
                <ArrowLeft className="w-4 h-4 mr-2" />
                {t("common.backToHome")}
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              <span className="text-xl font-bold">{t("nav.analytics")}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={exportAnalytics} data-testid="button-export-analytics">
              <Download className="w-4 h-4 mr-2" />
              {t("analytics.exportAnalytics")}
            </Button>
            <LanguageToggle />
            <ThemeToggle />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2" data-testid="text-title">{t("analytics.title")}</h1>
          <p className="text-muted-foreground" data-testid="text-description">
            {t("analytics.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{t("analytics.totalScenarios")}</p>
                <p className="text-3xl font-bold" data-testid="text-total-scenarios">
                  {analytics?.length || 0}
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-chart-2/20 flex items-center justify-center">
                <Eye className="w-6 h-6 text-chart-2" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{t("analytics.totalViews")}</p>
                <p className="text-3xl font-bold" data-testid="text-total-views">
                  {totalViews}
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-chart-3/20 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-chart-3" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{t("analytics.avgViews")}</p>
                <p className="text-3xl font-bold" data-testid="text-avg-views">
                  {analytics?.length ? Math.round(totalViews / analytics.length) : 0}
                </p>
              </div>
            </div>
          </Card>
        </div>

        <Card className="p-6">
          <h2 className="text-2xl font-semibold mb-6" data-testid="text-section-title">{t("analytics.topViewed")}</h2>
          
          {isLoading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-24 bg-muted rounded-lg animate-shimmer" style={{
                  backgroundImage: "linear-gradient(90deg, hsl(var(--muted)) 0%, hsl(var(--muted) / 0.8) 50%, hsl(var(--muted)) 100%)",
                  backgroundSize: "1000px 100%",
                }} />
              ))}
            </div>
          ) : analytics && analytics.length > 0 ? (
            <div className="space-y-4" data-testid="list-analytics">
              {analytics.map((item, index) => (
                <Link key={item.scenarioId} href={`/scenario/${item.scenarioId}`}>
                  <Card className="p-6 hover-elevate active-elevate-2 transition-all duration-200">
                    <div className="flex items-start gap-6">
                      <div className="text-4xl font-bold text-muted-foreground/30 w-12 flex-shrink-0">
                        #{index + 1}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4 mb-3">
                          <div className="flex-1">
                            <h3 className="text-xl font-semibold mb-2" data-testid={`text-scenario-title-${index}`}>
                              {item.scenario.title}
                            </h3>
                            <p className="text-muted-foreground text-sm line-clamp-2">
                              {item.scenario.description}
                            </p>
                          </div>
                          <CategoryBadge category={item.scenario.category} />
                        </div>
                        
                        <div className="flex items-center gap-6 text-sm">
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Eye className="w-4 h-4" />
                            <span data-testid={`text-view-count-${index}`}>{item.viewCount} {t("analytics.viewCount")}</span>
                          </div>
                          <div className="text-muted-foreground">
                            {item.scenario.team}
                          </div>
                          <div className="text-muted-foreground">
                            {item.scenario.timeline}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
                <TrendingUp className="w-8 h-8 text-muted-foreground" />
              </div>
              <p className="text-muted-foreground" data-testid="text-empty">{t("analytics.noData")}</p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
