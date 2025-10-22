import { Link } from "wouter";
import type { Scenario } from "@shared/schema";
import { ProjectCard } from "@/components/project-card";

interface ScenarioCardProps {
  scenario: Scenario;
}

// Generate avatar URL using UI Avatars API
function generateAvatarUrl(name: string): string {
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=3b82f6&color=fff&size=128&bold=true`;
}

export function ScenarioCard({ scenario }: ScenarioCardProps) {
  // Transform metrics array from string[] to {label: string}[]
  const transformedMetrics = scenario.metrics.map(metric => ({
    label: metric,
  }));

  return (
    <Link href={`/scenario/${scenario.id}`} data-testid={`link-scenario-${scenario.id}`}>
      <div className="h-full">
        <ProjectCard
          image={scenario.imageUrl}
          title={scenario.title}
          description={scenario.businessProblem}
          metrics={transformedMetrics}
          projectManager={{
            name: scenario.ownerName,
            avatar: generateAvatarUrl(scenario.ownerName),
          }}
          data-id={scenario.id}
        />
      </div>
    </Link>
  );
}
