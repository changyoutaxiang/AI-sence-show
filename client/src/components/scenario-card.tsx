import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ArrowRight, User } from "lucide-react";
import { Link } from "wouter";
import type { Scenario } from "@shared/schema";

interface ScenarioCardProps {
  scenario: Scenario;
}

export function ScenarioCard({ scenario }: ScenarioCardProps) {
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
          
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2" data-testid={`owner-info-${scenario.id}`}>
              <Avatar className="w-8 h-8">
                <AvatarImage src={scenario.ownerAvatar || undefined} alt={scenario.ownerName} />
                <AvatarFallback>
                  <User className="w-4 h-4" />
                </AvatarFallback>
              </Avatar>
              <span className="text-sm text-muted-foreground" data-testid={`text-owner-${scenario.id}`}>
                {scenario.ownerName}
              </span>
            </div>
            
            <div className="flex items-center gap-2 text-primary text-sm font-medium">
              <span data-testid={`link-detail-${scenario.id}`}>查看详情</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
}
