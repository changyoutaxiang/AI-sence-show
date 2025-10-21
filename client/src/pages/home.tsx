import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ScenarioCard } from "@/components/scenario-card";
import { ScenarioSkeleton } from "@/components/scenario-skeleton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sparkles, Search } from "lucide-react";
import type { Scenario } from "@shared/schema";
import { ThemeToggle } from "@/components/theme-toggle";
import { Link } from "wouter";

const categories = ["全部", "数据处理", "自动化", "分析预测", "文档生成", "其他"];

export default function Home() {
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

  return (
    <div className="min-h-screen bg-background">
      <div className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold" data-testid="text-logo">AI原子场景</span>
          </div>
          <ThemeToggle />
        </div>
      </div>

      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-chart-3/5 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,hsl(var(--primary)/0.08),transparent_50%)] pointer-events-none" />
        
        <div className="relative max-w-7xl mx-auto px-6 py-24">
          <div className="max-w-3xl">
            <h1 className="text-5xl lg:text-6xl font-bold mb-6 animate-fade-in" data-testid="text-hero-title">
              AI原子场景展示中心
            </h1>
            <p className="text-xl text-muted-foreground mb-8 animate-fade-in" style={{ animationDelay: "0.1s" }} data-testid="text-hero-subtitle">
              探索我们团队打造的AI解决方案，每一个"原子场景"都是针对实际业务需求的精准解答，帮助全公司提升效率、优化流程、创造价值。
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
              placeholder="搜索项目标题、描述、业务问题..."
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
                {category}
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
            <h3 className="text-xl font-semibold mb-2" data-testid="text-empty-title">暂无项目</h3>
            <p className="text-muted-foreground" data-testid="text-empty-description">
              该分类下还没有原子场景项目
            </p>
          </div>
        )}
      </div>

      <footer className="border-t py-12 bg-card">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground" data-testid="text-footer">
              © 2025 AI原子场景展示中心. 持续创新，服务业务。
            </p>
            <div className="flex flex-wrap items-center gap-4 text-sm">
              <Link href="/admin">
                <Button variant="default" size="sm" data-testid="link-admin">
                  <Sparkles className="w-3 h-3 mr-1" />
                  提交项目
                </Button>
              </Link>
              <Link href="/analytics">
                <Button variant="outline" size="sm" data-testid="link-analytics">
                  数据分析
                </Button>
              </Link>
              <a href="#" className="hover:text-foreground transition-colors text-muted-foreground" data-testid="link-contact">联系我们</a>
              <a href="#" className="hover:text-foreground transition-colors text-muted-foreground" data-testid="link-team">团队介绍</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
