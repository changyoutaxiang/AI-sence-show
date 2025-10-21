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
import { useTranslation } from "@/lib/i18n";

const categories = ["数据处理", "自动化", "分析预测", "文档生成", "其他"];

export default function Admin() {
  const { t } = useTranslation();
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
        title: t("admin.successTitle"),
        description: t("admin.successDesc"),
      });
      form.reset();
      setMetrics([]);
      setTimeout(() => setLocation("/"), 1500);
    },
    onError: () => {
      toast({
        title: t("admin.errorTitle"),
        description: t("admin.errorDesc"),
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
                {t("common.backToHome")}
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              <span className="text-xl font-bold">{t("admin.pageTitle")}</span>
            </div>
          </div>
          <ThemeToggle />
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12">
        <Card className="p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2" data-testid="text-title">{t("admin.formTitle")}</h1>
            <p className="text-muted-foreground" data-testid="text-description">
              {t("admin.pageSubtitle")}
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("admin.title")} *</FormLabel>
                    <FormControl>
                      <Input placeholder={t("admin.titlePlaceholder")} {...field} data-testid="input-title" />
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
                    <FormLabel>{t("admin.description")} *</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder={t("admin.descriptionPlaceholder")} 
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
                    <FormLabel>{t("admin.category")} *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger data-testid="select-category">
                          <SelectValue placeholder={t("admin.selectCategory")} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category} data-testid={`option-category-${category}`}>
                            {t(`category.${category}`)}
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
                    <FormLabel>{t("admin.businessProblem")} *</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder={t("admin.businessProblemPlaceholder")} 
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
                    <FormLabel>{t("admin.solution")} *</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder={t("admin.solutionPlaceholder")} 
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
                    <FormLabel>{t("admin.technicalDetails")} *</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder={t("admin.technicalDetailsPlaceholder")} 
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
                    <FormLabel>{t("admin.impact")} *</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder={t("admin.impactPlaceholder")} 
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
                <FormLabel>{t("admin.metrics")}</FormLabel>
                <div className="flex gap-2">
                  <Input
                    placeholder={t("admin.metricsPlaceholder")}
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
                <p className="text-sm text-muted-foreground">{t("admin.metricsHelp")}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="team"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("admin.team")} *</FormLabel>
                      <FormControl>
                        <Input placeholder={t("admin.teamPlaceholder")} {...field} data-testid="input-team" />
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
                      <FormLabel>{t("admin.timeline")} *</FormLabel>
                      <FormControl>
                        <Input placeholder={t("admin.timelinePlaceholder")} {...field} data-testid="input-timeline" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="ownerName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("admin.ownerName")} *</FormLabel>
                    <FormControl>
                      <Input placeholder={t("admin.ownerNamePlaceholder")} {...field} data-testid="input-owner-name" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="imageUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("admin.imageUrl")} *</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder={t("admin.imageUrlPlaceholder")} 
                        {...field}
                        data-testid="input-image-url"
                      />
                    </FormControl>
                    <p className="text-sm text-muted-foreground">
                      {t("admin.imageUrlHelp")}
                    </p>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">{t("admin.resources")}</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="requirementDocUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("admin.requirementDoc")}</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder={t("admin.requirementDocPlaceholder")} 
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
                        <FormLabel>{t("admin.githubRepo")}</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder={t("admin.githubRepoPlaceholder")} 
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
                        <FormLabel>{t("admin.demoManual")}</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder={t("admin.demoManualPlaceholder")} 
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
                        <FormLabel>{t("admin.installGuide")}</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder={t("admin.installGuidePlaceholder")} 
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
                  {createScenario.isPending ? t("admin.submitting") : t("admin.submitButton")}
                </Button>
                <Link href="/">
                  <Button type="button" variant="outline" data-testid="button-cancel">
                    {t("common.cancel")}
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
