import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import type { Scenario } from "@shared/schema";
import { useTranslation } from "@/lib/i18n";

interface ScenarioCardProps {
  scenario: Scenario;
}

export function ScenarioCard({ scenario }: ScenarioCardProps) {
  const { t } = useTranslation();
  
  return (
    <Link href={`/scenario/${scenario.id}`} data-testid={`link-scenario-${scenario.id}`}>
      <Card className="group overflow-hidden hover-elevate active-elevate-2 transition-all duration-200 h-full flex flex-col">
        <div className="relative aspect-video overflow-hidden bg-muted">
          <img
            src={scenario.imageUrl}
            alt={scenario.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            data-testid={`img-scenario-${scenario.id}`}
          />
        </div>
        
        <div className="p-6 flex flex-col gap-4 flex-1">
          <div className="flex-1">
            <h3 className="text-xl font-semibold mb-2 line-clamp-2 group-hover:text-primary transition-colors" data-testid={`text-title-${scenario.id}`}>
              {scenario.title}
            </h3>
            <p className="text-muted-foreground text-sm line-clamp-2" data-testid={`text-description-${scenario.id}`}>
              {scenario.businessProblem}
            </p>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {scenario.metrics.slice(0, 3).map((metric, index) => (
              <Badge
                key={index}
                variant="outline"
                className="text-xs"
                data-testid={`badge-metric-${scenario.id}-${index}`}
              >
                {metric}
              </Badge>
            ))}
          </div>
          
          <div className="text-sm text-muted-foreground" data-testid={`text-owner-${scenario.id}`}>
            {t("card.owner")}：{scenario.ownerName}
          </div>
        </div>
      </Card>
    </Link>
  );
}
