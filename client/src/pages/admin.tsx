import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertScenarioSchema, type InsertScenario } from "@shared/schema";
import { useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Plus, Sparkles } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

const categories = ["数据处理", "自动化", "分析预测", "文档生成", "其他"];

export default function Admin() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [metrics, setMetrics] = useState<string[]>([]);
  const [metricInput, setMetricInput] = useState("");

  const form = useForm<InsertScenario>({
    resolver: zodResolver(insertScenarioSchema),
    defaultValues: {
      title: "",
      description: "",
      businessProblem: "",
      solution: "",
      technicalDetails: "",
      impact: "",
      category: "数据处理",
      imageUrl: "",
      team: "",
      timeline: "",
      metrics: [],
      ownerName: "",
      ownerAvatar: "",
      requirementDocUrl: "",
      githubRepoUrl: "",
      demoManualUrl: "",
      installGuideUrl: "",
    },
  });

  const createScenario = useMutation({
    mutationFn: async (data: InsertScenario) => {
      const response = await apiRequest("POST", "/api/scenarios", data);
      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/scenarios"] });
      toast({
        title: "提交成功",
        description: "新的原子场景已成功添加到展示中心",
      });
      form.reset();
      setMetrics([]);
      setTimeout(() => setLocation("/"), 1500);
    },
    onError: () => {
      toast({
        title: "提交失败",
        description: "请检查表单内容后重试",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertScenario) => {
    createScenario.mutate({ ...data, metrics });
  };

  const addMetric = () => {
    if (metricInput.trim() && metrics.length < 5) {
      const newMetrics = [...metrics, metricInput.trim()];
      setMetrics(newMetrics);
      form.setValue("metrics", newMetrics, { shouldValidate: true });
      setMetricInput("");
    }
  };

  const removeMetric = (index: number) => {
    const newMetrics = metrics.filter((_, i) => i !== index);
    setMetrics(newMetrics);
    form.setValue("metrics", newMetrics, { shouldValidate: true });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" data-testid="button-back">
                <ArrowLeft className="w-4 h-4 mr-2" />
                返回首页
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              <span className="text-xl font-bold">提交新项目</span>
            </div>
          </div>
          <ThemeToggle />
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12">
        <Card className="p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2" data-testid="text-title">添加原子场景</h1>
            <p className="text-muted-foreground" data-testid="text-description">
              填写以下信息，将您的AI项目添加到展示中心，让全公司看到您的创新成果
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>项目标题 *</FormLabel>
                    <FormControl>
                      <Input placeholder="例：智能数据清洗系统" {...field} data-testid="input-title" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>项目简介 *</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="一句话描述项目核心价值..." 
                        {...field}
                        data-testid="input-description"
                        rows={2}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>项目分类 *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger data-testid="select-category">
                          <SelectValue placeholder="选择分类" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category} data-testid={`option-category-${category}`}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="businessProblem"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>业务挑战 *</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="描述该项目要解决的业务问题..." 
                        {...field}
                        data-testid="input-business-problem"
                        rows={4}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="solution"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>解决方案 *</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="描述您的解决方案和实现方法..." 
                        {...field}
                        data-testid="input-solution"
                        rows={4}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="technicalDetails"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>技术实现 *</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="技术栈、核心算法、架构说明..." 
                        {...field}
                        data-testid="input-technical-details"
                        rows={4}
                        className="font-mono text-sm"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="impact"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>业务价值 *</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="量化描述项目带来的业务价值和影响..." 
                        {...field}
                        data-testid="input-impact"
                        rows={4}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="space-y-2">
                <FormLabel>关键指标</FormLabel>
                <div className="flex gap-2">
                  <Input
                    placeholder="例：效率提升80%"
                    value={metricInput}
                    onChange={(e) => setMetricInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addMetric())}
                    data-testid="input-metric"
                  />
                  <Button type="button" onClick={addMetric} disabled={metrics.length >= 5} data-testid="button-add-metric">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                {metrics.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {metrics.map((metric, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="cursor-pointer"
                        onClick={() => removeMetric(index)}
                        data-testid={`badge-metric-${index}`}
                      >
                        {metric} ×
                      </Badge>
                    ))}
                  </div>
                )}
                <p className="text-sm text-muted-foreground">最多添加5个关键指标，点击标签可删除</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="team"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>项目团队 *</FormLabel>
                      <FormControl>
                        <Input placeholder="例：数据智能团队" {...field} data-testid="input-team" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="timeline"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>完成周期 *</FormLabel>
                      <FormControl>
                        <Input placeholder="例：3周" {...field} data-testid="input-timeline" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="ownerName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>项目负责人 *</FormLabel>
                      <FormControl>
                        <Input placeholder="例：张伟" {...field} data-testid="input-owner-name" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="ownerAvatar"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>负责人头像 URL</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="https://api.dicebear.com/7.x/avataaars/svg?seed=..." 
                          {...field}
                          value={field.value || ""}
                          data-testid="input-owner-avatar"
                        />
                      </FormControl>
                      <p className="text-sm text-muted-foreground">
                        可选，推荐使用 DiceBear 或其他头像服务
                      </p>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="imageUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>项目图片 URL *</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="https://images.unsplash.com/..." 
                        {...field}
                        data-testid="input-image-url"
                      />
                    </FormControl>
                    <p className="text-sm text-muted-foreground">
                      推荐使用 Unsplash 或其他图片托管服务的链接
                    </p>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">项目资源链接</h3>
                <p className="text-sm text-muted-foreground">以下链接为可选项，请根据实际情况填写</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="requirementDocUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>需求文档链接</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="https://..." 
                            {...field}
                            value={field.value || ""}
                            data-testid="input-requirement-doc"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="githubRepoUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Github 仓库链接</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="https://github.com/..." 
                            {...field}
                            value={field.value || ""}
                            data-testid="input-github-repo"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="demoManualUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>演示手册链接</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="https://..." 
                            {...field}
                            value={field.value || ""}
                            data-testid="input-demo-manual"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="installGuideUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>安装说明链接</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="https://..." 
                            {...field}
                            value={field.value || ""}
                            data-testid="input-install-guide"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <Button
                  type="submit"
                  disabled={createScenario.isPending}
                  data-testid="button-submit"
                  className="flex-1"
                >
                  {createScenario.isPending ? "提交中..." : "提交项目"}
                </Button>
                <Link href="/">
                  <Button type="button" variant="outline" data-testid="button-cancel">
                    取消
                  </Button>
                </Link>
              </div>
            </form>
          </Form>
        </Card>
      </div>
    </div>
  );
}
