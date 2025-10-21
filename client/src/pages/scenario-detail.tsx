import { useQuery, useMutation } from "@tanstack/react-query";
import { useParams, Link } from "wouter";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Users, Clock, Target, Lightbulb, Code, TrendingUp, Download, User, FileText, Github, Book, Settings, ExternalLink, MessageCircle, Send } from "lucide-react";
import { CategoryBadge } from "@/components/category-badge";
import type { Scenario, Comment } from "@shared/schema";
import { ThemeToggle } from "@/components/theme-toggle";
import { useEffect, useState } from "react";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";

export default function ScenarioDetail() {
  const params = useParams();
  const scenarioId = params.id;
  const { toast } = useToast();
  const [commentText, setCommentText] = useState("");
  const [commenterName, setCommenterName] = useState("");

  const { data: scenario, isLoading } = useQuery<Scenario>({
    queryKey: [`/api/scenarios/${scenarioId}`],
    enabled: !!scenarioId,
  });

  const { data: comments = [], isLoading: isLoadingComments } = useQuery<Comment[]>({
    queryKey: [`/api/scenarios/${scenarioId}/comments`],
    enabled: !!scenarioId,
  });

  const createCommentMutation = useMutation({
    mutationFn: async (data: { commentText: string; commenterName: string }) => {
      return await apiRequest("POST", `/api/scenarios/${scenarioId}/comments`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/scenarios/${scenarioId}/comments`] });
      setCommentText("");
      setCommenterName("");
      toast({
        title: "评论成功",
        description: "您的评论已发布",
      });
    },
    onError: () => {
      toast({
        title: "评论失败",
        description: "请稍后重试",
        variant: "destructive",
      });
    },
  });

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim() || !commenterName.trim()) {
      toast({
        title: "请填写完整信息",
        description: "评论内容和姓名不能为空",
        variant: "destructive",
      });
      return;
    }
    createCommentMutation.mutate({ commentText, commenterName });
  };

  useEffect(() => {
    if (scenarioId) {
      apiRequest("POST", `/api/scenarios/${scenarioId}/view`).catch(() => {});
    }
  }, [scenarioId]);

  const exportScenario = () => {
    if (!scenario) return;
    
    const dataStr = JSON.stringify(scenario, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${scenario.title.replace(/\s+/g, "_")}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    toast({
      title: "导出成功",
      description: "项目数据已导出为JSON文件",
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
          <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
            <div className="h-9 w-32 bg-muted rounded animate-shimmer" style={{
              backgroundImage: "linear-gradient(90deg, hsl(var(--muted)) 0%, hsl(var(--muted) / 0.8) 50%, hsl(var(--muted)) 100%)",
              backgroundSize: "1000px 100%",
            }} />
            <ThemeToggle />
          </div>
        </div>
        <div className="max-w-4xl mx-auto px-6 py-12">
          <div className="space-y-8">
            <div className="h-10 bg-muted rounded w-3/4 animate-shimmer" style={{
              backgroundImage: "linear-gradient(90deg, hsl(var(--muted)) 0%, hsl(var(--muted) / 0.8) 50%, hsl(var(--muted)) 100%)",
              backgroundSize: "1000px 100%",
            }} />
            <div className="aspect-video bg-muted rounded-lg animate-shimmer" style={{
              backgroundImage: "linear-gradient(90deg, hsl(var(--muted)) 0%, hsl(var(--muted) / 0.8) 50%, hsl(var(--muted)) 100%)",
              backgroundSize: "1000px 100%",
            }} />
          </div>
        </div>
      </div>
    );
  }

  if (!scenario) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4" data-testid="text-not-found">项目未找到</h2>
          <Link href="/">
            <Button data-testid="button-back-home">
              <ArrowLeft className="w-4 h-4 mr-2" />
              返回首页
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
          <Link href="/">
            <Button variant="ghost" data-testid="button-back">
              <ArrowLeft className="w-4 h-4 mr-2" />
              返回首页
            </Button>
          </Link>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={exportScenario} data-testid="button-export">
              <Download className="w-4 h-4 mr-2" />
              导出项目
            </Button>
            <ThemeToggle />
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12">
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8" data-testid="breadcrumb">
          <Link href="/" className="hover:text-foreground transition-colors" data-testid="link-breadcrumb-home">
            首页
          </Link>
          <span>/</span>
          <span className="text-foreground" data-testid="text-breadcrumb-current">{scenario.title}</span>
        </nav>

        <div className="space-y-8">
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <CategoryBadge category={scenario.category} />
              {scenario.metrics.map((metric, index) => (
                <Badge key={index} variant="outline" data-testid={`badge-metric-${index}`}>
                  {metric}
                </Badge>
              ))}
            </div>
            
            <h1 className="text-4xl font-bold" data-testid="text-title">{scenario.title}</h1>
            <p className="text-xl text-muted-foreground" data-testid="text-description">{scenario.description}</p>
          </div>

          <div className="relative aspect-video rounded-lg overflow-hidden bg-muted border">
            <img
              src={scenario.imageUrl}
              alt={scenario.title}
              className="w-full h-full object-cover"
              data-testid="img-hero"
            />
          </div>

          <div className="grid gap-6">
            <Card className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-chart-4/20 flex items-center justify-center flex-shrink-0">
                  <Target className="w-5 h-5 text-chart-4" />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-semibold mb-3" data-testid="text-section-problem">业务挑战</h2>
                  <p className="text-muted-foreground leading-relaxed" data-testid="text-problem">
                    {scenario.businessProblem}
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-chart-2/20 flex items-center justify-center flex-shrink-0">
                  <Lightbulb className="w-5 h-5 text-chart-2" />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-semibold mb-3" data-testid="text-section-solution">解决方案</h2>
                  <p className="text-muted-foreground leading-relaxed" data-testid="text-solution">
                    {scenario.solution}
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-chart-1/20 flex items-center justify-center flex-shrink-0">
                  <Code className="w-5 h-5 text-chart-1" />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-semibold mb-3" data-testid="text-section-technical">技术实现</h2>
                  <p className="text-muted-foreground leading-relaxed font-mono text-sm" data-testid="text-technical">
                    {scenario.technicalDetails}
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-chart-3/20 flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-5 h-5 text-chart-3" />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-semibold mb-3" data-testid="text-section-impact">业务价值</h2>
                  <p className="text-muted-foreground leading-relaxed" data-testid="text-impact">
                    {scenario.impact}
                  </p>
                </div>
              </div>
            </Card>
          </div>

          <Card className="p-6 bg-muted/50">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-background flex items-center justify-center flex-shrink-0">
                  <Users className="w-4 h-4 text-muted-foreground" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-1">项目团队</div>
                  <div className="font-medium" data-testid="text-team">{scenario.team}</div>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-background flex items-center justify-center flex-shrink-0">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-1">完成周期</div>
                  <div className="font-medium" data-testid="text-timeline">{scenario.timeline}</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-background flex items-center justify-center flex-shrink-0">
                  <User className="w-4 h-4 text-muted-foreground" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-1">项目负责人</div>
                  <div className="font-medium" data-testid="text-owner">{scenario.ownerName}</div>
                </div>
              </div>
            </div>
          </Card>

          {(scenario.requirementDocUrl || scenario.githubRepoUrl || scenario.demoManualUrl || scenario.installGuideUrl) && (
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">项目资源</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {scenario.requirementDocUrl && (
                  <a 
                    href={scenario.requirementDocUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-lg border hover-elevate active-elevate-2 transition-colors"
                    data-testid="link-requirement-doc"
                  >
                    <div className="w-10 h-10 rounded-lg bg-chart-4/20 flex items-center justify-center flex-shrink-0">
                      <FileText className="w-5 h-5 text-chart-4" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">需求文档</div>
                      <div className="text-sm text-muted-foreground">查看详细需求</div>
                    </div>
                    <ExternalLink className="w-4 h-4 text-muted-foreground" />
                  </a>
                )}

                {scenario.githubRepoUrl && (
                  <a 
                    href={scenario.githubRepoUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-lg border hover-elevate active-elevate-2 transition-colors"
                    data-testid="link-github-repo"
                  >
                    <div className="w-10 h-10 rounded-lg bg-chart-1/20 flex items-center justify-center flex-shrink-0">
                      <Github className="w-5 h-5 text-chart-1" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">Github 仓库</div>
                      <div className="text-sm text-muted-foreground">查看源代码</div>
                    </div>
                    <ExternalLink className="w-4 h-4 text-muted-foreground" />
                  </a>
                )}

                {scenario.demoManualUrl && (
                  <a 
                    href={scenario.demoManualUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-lg border hover-elevate active-elevate-2 transition-colors"
                    data-testid="link-demo-manual"
                  >
                    <div className="w-10 h-10 rounded-lg bg-chart-2/20 flex items-center justify-center flex-shrink-0">
                      <Book className="w-5 h-5 text-chart-2" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">演示手册</div>
                      <div className="text-sm text-muted-foreground">观看演示</div>
                    </div>
                    <ExternalLink className="w-4 h-4 text-muted-foreground" />
                  </a>
                )}

                {scenario.installGuideUrl && (
                  <a 
                    href={scenario.installGuideUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-lg border hover-elevate active-elevate-2 transition-colors"
                    data-testid="link-install-guide"
                  >
                    <div className="w-10 h-10 rounded-lg bg-chart-3/20 flex items-center justify-center flex-shrink-0">
                      <Settings className="w-5 h-5 text-chart-3" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">安装说明</div>
                      <div className="text-sm text-muted-foreground">部署指南</div>
                    </div>
                    <ExternalLink className="w-4 h-4 text-muted-foreground" />
                  </a>
                )}
              </div>
            </Card>
          )}

          <Card className="p-6">
            <div className="flex items-center gap-2 mb-6">
              <MessageCircle className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-semibold">用户评论</h2>
              <Badge variant="outline" className="ml-2">{comments.length}</Badge>
            </div>

            <form onSubmit={handleSubmitComment} className="mb-8 space-y-4">
              <div>
                <Textarea
                  placeholder="写下您的评论..."
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  className="resize-none"
                  rows={4}
                  data-testid="input-comment-text"
                />
              </div>
              <div className="flex gap-4">
                <Input
                  placeholder="您的姓名"
                  value={commenterName}
                  onChange={(e) => setCommenterName(e.target.value)}
                  className="max-w-xs"
                  data-testid="input-commenter-name"
                />
                <Button 
                  type="submit" 
                  disabled={createCommentMutation.isPending}
                  data-testid="button-submit-comment"
                >
                  <Send className="w-4 h-4 mr-2" />
                  {createCommentMutation.isPending ? "发布中..." : "发布评论"}
                </Button>
              </div>
            </form>

            <div className="space-y-4">
              {isLoadingComments ? (
                <div className="text-center text-muted-foreground py-8">加载评论中...</div>
              ) : comments.length === 0 ? (
                <div className="text-center text-muted-foreground py-8">
                  暂无评论，快来发表第一条评论吧！
                </div>
              ) : (
                comments.map((comment) => (
                  <div 
                    key={comment.id} 
                    className="border rounded-lg p-4 hover-elevate transition-all"
                    data-testid={`comment-${comment.id}`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                          <User className="w-4 h-4 text-primary" />
                        </div>
                        <span className="font-medium" data-testid={`comment-name-${comment.id}`}>
                          {comment.commenterName}
                        </span>
                      </div>
                      <span className="text-sm text-muted-foreground" data-testid={`comment-date-${comment.id}`}>
                        {format(new Date(comment.createdAt), "yyyy年MM月dd日 HH:mm")}
                      </span>
                    </div>
                    <p className="text-muted-foreground leading-relaxed" data-testid={`comment-text-${comment.id}`}>
                      {comment.commentText}
                    </p>
                  </div>
                ))
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
