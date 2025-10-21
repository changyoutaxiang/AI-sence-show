import { Badge } from "@/components/ui/badge";
import { useTranslation } from "@/lib/i18n";

const categoryColors = {
  "数据处理": "chart-3",
  "自动化": "chart-2",
  "分析预测": "chart-1",
  "文档生成": "chart-4",
  "其他": "chart-5",
} as const;

interface CategoryBadgeProps {
  category: string;
  className?: string;
}

export function CategoryBadge({ category, className }: CategoryBadgeProps) {
  const { t } = useTranslation();
  const colorKey = category as keyof typeof categoryColors;
  const chartColor = categoryColors[colorKey] || "chart-5";
  
  return (
    <Badge
      variant="secondary"
      className={className}
      style={{
        backgroundColor: `hsl(var(--${chartColor}) / 0.15)`,
        color: `hsl(var(--${chartColor}))`,
        border: `1px solid hsl(var(--${chartColor}) / 0.3)`,
      }}
      data-testid={`badge-category-${category}`}
    >
      {t(`category.${category}`)}
    </Badge>
  );
}
