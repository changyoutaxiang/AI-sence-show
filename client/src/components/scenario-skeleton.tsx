import { Card } from "@/components/ui/card";

export function ScenarioSkeleton() {
  return (
    <Card className="overflow-hidden h-full flex flex-col">
      <div className="relative aspect-video bg-muted animate-shimmer" style={{
        backgroundImage: "linear-gradient(90deg, hsl(var(--muted)) 0%, hsl(var(--muted) / 0.8) 50%, hsl(var(--muted)) 100%)",
        backgroundSize: "1000px 100%",
      }} />
      
      <div className="p-6 flex flex-col gap-4 flex-1">
        <div className="flex-1">
          <div className="h-6 bg-muted rounded w-3/4 mb-2 animate-shimmer" style={{
            backgroundImage: "linear-gradient(90deg, hsl(var(--muted)) 0%, hsl(var(--muted) / 0.8) 50%, hsl(var(--muted)) 100%)",
            backgroundSize: "1000px 100%",
          }} />
          <div className="h-4 bg-muted rounded w-full animate-shimmer" style={{
            backgroundImage: "linear-gradient(90deg, hsl(var(--muted)) 0%, hsl(var(--muted) / 0.8) 50%, hsl(var(--muted)) 100%)",
            backgroundSize: "1000px 100%",
          }} />
        </div>
        
        <div className="flex gap-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-6 w-20 bg-muted rounded animate-shimmer" style={{
              backgroundImage: "linear-gradient(90deg, hsl(var(--muted)) 0%, hsl(var(--muted) / 0.8) 50%, hsl(var(--muted)) 100%)",
              backgroundSize: "1000px 100%",
            }} />
          ))}
        </div>
      </div>
    </Card>
  );
}
