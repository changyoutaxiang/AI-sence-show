import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Language = "zh" | "en";

interface TranslationContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

const translations = {
  zh: {
    // Common
    "common.submit": "提交",
    "common.cancel": "取消",
    "common.back": "返回",
    "common.backToHome": "返回首页",
    "common.loading": "加载中...",
    "common.export": "导出",
    "common.exportJSON": "导出为JSON",
    "common.search": "搜索",
    "common.searchPlaceholder": "搜索标题、描述、问题或解决方案...",
    "common.allCategories": "全部分类",
    
    // Navigation
    "nav.home": "首页",
    "nav.admin": "提交项目",
    "nav.analytics": "数据分析",
    
    // Home Page
    "home.title": "AI原子场景展示中心",
    "home.subtitle": "探索我们团队开发的AI解决方案，助力公司各业务场景",
    "home.exploreButton": "探索项目",
    "home.submitButton": "提交新项目",
    "home.noResults": "未找到匹配的项目",
    "home.tryDifferent": "试试其他关键词或分类",
    
    // Categories
    "category.数据处理": "数据处理",
    "category.自动化": "自动化",
    "category.分析预测": "分析预测",
    "category.文档生成": "文档生成",
    "category.其他": "其他",
    
    // Scenario Card
    "card.owner": "项目负责人",
    
    // Scenario Detail
    "detail.overview": "项目概览",
    "detail.businessProblem": "业务问题",
    "detail.solution": "解决方案",
    "detail.technicalDetails": "技术细节",
    "detail.impact": "业务影响",
    "detail.metadata": "项目信息",
    "detail.team": "团队",
    "detail.timeline": "时间周期",
    "detail.owner": "项目负责人",
    "detail.metrics": "关键指标",
    "detail.resources": "相关资源",
    "detail.requirementDoc": "需求文档",
    "detail.githubRepo": "GitHub仓库",
    "detail.demoManual": "演示手册",
    "detail.installGuide": "安装指南",
    "detail.viewTracked": "已记录浏览",
    "detail.exportScenario": "导出场景数据",
    
    // Comments
    "comments.title": "用户评论",
    "comments.empty": "暂无评论",
    "comments.beFirst": "成为第一个评论的人",
    "comments.commentPlaceholder": "分享您的想法和建议...",
    "comments.namePlaceholder": "您的姓名",
    "comments.postComment": "发表评论",
    "comments.posting": "发表中...",
    "comments.success": "评论成功",
    "comments.successDesc": "您的评论已发表",
    "comments.error": "评论失败",
    "comments.errorDesc": "请重试",
    
    // Admin Page
    "admin.pageTitle": "提交新项目",
    "admin.pageSubtitle": "填写以下信息，将您的AI项目添加到展示中心，让全公司看到您的创新成果",
    "admin.formTitle": "添加原子场景",
    "admin.basicInfo": "基本信息",
    "admin.title": "项目标题",
    "admin.titlePlaceholder": "例：智能客服对话分析系统",
    "admin.description": "简短描述",
    "admin.descriptionPlaceholder": "一句话概括项目核心功能",
    "admin.category": "分类",
    "admin.selectCategory": "选择分类",
    "admin.imageUrl": "项目配图URL",
    "admin.imageUrlPlaceholder": "https://images.unsplash.com/...",
    "admin.imageUrlHelp": "推荐使用Unsplash或其他免费图片服务",
    "admin.detailInfo": "详细信息",
    "admin.businessProblem": "业务问题",
    "admin.businessProblemPlaceholder": "描述此项目要解决的业务痛点",
    "admin.solution": "解决方案",
    "admin.solutionPlaceholder": "说明如何通过AI技术解决该问题",
    "admin.technicalDetails": "技术细节",
    "admin.technicalDetailsPlaceholder": "使用的模型、技术栈、关键实现等",
    "admin.impact": "业务影响",
    "admin.impactPlaceholder": "对业务带来的实际价值和效果",
    "admin.projectInfo": "项目信息",
    "admin.team": "所属团队",
    "admin.teamPlaceholder": "例：AI研发部",
    "admin.timeline": "开发周期",
    "admin.timelinePlaceholder": "例：2024年3月 - 2024年5月",
    "admin.ownerName": "项目负责人",
    "admin.ownerNamePlaceholder": "例：张伟",
    "admin.metrics": "关键指标",
    "admin.metricsPlaceholder": "例：提升效率30%",
    "admin.addMetric": "添加指标",
    "admin.metricsHelp": "最多添加5个关键业务指标",
    "admin.resources": "相关资源（选填）",
    "admin.requirementDoc": "需求文档URL",
    "admin.requirementDocPlaceholder": "https://docs.google.com/...",
    "admin.githubRepo": "GitHub仓库URL",
    "admin.githubRepoPlaceholder": "https://github.com/...",
    "admin.demoManual": "演示手册URL",
    "admin.demoManualPlaceholder": "https://docs.google.com/...",
    "admin.installGuide": "安装指南URL",
    "admin.installGuidePlaceholder": "https://docs.google.com/...",
    "admin.submitButton": "提交项目",
    "admin.submitting": "提交中...",
    "admin.successTitle": "提交成功",
    "admin.successDesc": "新的原子场景已成功添加到展示中心",
    "admin.errorTitle": "提交失败",
    "admin.errorDesc": "请检查表单内容后重试",
    
    // Analytics Page
    "analytics.title": "项目浏览量分析",
    "analytics.subtitle": "查看最受欢迎的AI原子场景",
    "analytics.exportAnalytics": "导出分析数据",
    "analytics.topViewed": "最受欢迎项目",
    "analytics.rank": "排名",
    "analytics.scenario": "项目",
    "analytics.views": "浏览量",
    "analytics.category": "分类",
    "analytics.noData": "暂无浏览数据",
  },
  en: {
    // Common
    "common.submit": "Submit",
    "common.cancel": "Cancel",
    "common.back": "Back",
    "common.backToHome": "Back to Home",
    "common.loading": "Loading...",
    "common.export": "Export",
    "common.exportJSON": "Export as JSON",
    "common.search": "Search",
    "common.searchPlaceholder": "Search title, description, problem or solution...",
    "common.allCategories": "All Categories",
    
    // Navigation
    "nav.home": "Home",
    "nav.admin": "Submit Project",
    "nav.analytics": "Analytics",
    
    // Home Page
    "home.title": "AI Atomic Scenarios Showcase",
    "home.subtitle": "Explore AI solutions developed by our team to empower business scenarios across the company",
    "home.exploreButton": "Explore Projects",
    "home.submitButton": "Submit New Project",
    "home.noResults": "No matching projects found",
    "home.tryDifferent": "Try different keywords or categories",
    
    // Categories
    "category.数据处理": "Data Processing",
    "category.自动化": "Automation",
    "category.分析预测": "Analytics & Prediction",
    "category.文档生成": "Document Generation",
    "category.其他": "Others",
    
    // Scenario Card
    "card.owner": "Project Owner",
    
    // Scenario Detail
    "detail.overview": "Project Overview",
    "detail.businessProblem": "Business Problem",
    "detail.solution": "Solution",
    "detail.technicalDetails": "Technical Details",
    "detail.impact": "Business Impact",
    "detail.metadata": "Project Information",
    "detail.team": "Team",
    "detail.timeline": "Timeline",
    "detail.owner": "Project Owner",
    "detail.metrics": "Key Metrics",
    "detail.resources": "Related Resources",
    "detail.requirementDoc": "Requirement Doc",
    "detail.githubRepo": "GitHub Repo",
    "detail.demoManual": "Demo Manual",
    "detail.installGuide": "Installation Guide",
    "detail.viewTracked": "View tracked",
    "detail.exportScenario": "Export Scenario Data",
    
    // Comments
    "comments.title": "User Comments",
    "comments.empty": "No comments yet",
    "comments.beFirst": "Be the first to comment",
    "comments.commentPlaceholder": "Share your thoughts and suggestions...",
    "comments.namePlaceholder": "Your name",
    "comments.postComment": "Post Comment",
    "comments.posting": "Posting...",
    "comments.success": "Comment posted",
    "comments.successDesc": "Your comment has been published",
    "comments.error": "Failed to post",
    "comments.errorDesc": "Please try again",
    
    // Admin Page
    "admin.pageTitle": "Submit New Project",
    "admin.pageSubtitle": "Fill in the information below to add your AI project to the showcase center and share your innovation with the entire company",
    "admin.formTitle": "Add Atomic Scenario",
    "admin.basicInfo": "Basic Information",
    "admin.title": "Project Title",
    "admin.titlePlaceholder": "e.g., Intelligent Customer Service Analysis System",
    "admin.description": "Brief Description",
    "admin.descriptionPlaceholder": "Summarize the core functionality in one sentence",
    "admin.category": "Category",
    "admin.selectCategory": "Select category",
    "admin.imageUrl": "Project Image URL",
    "admin.imageUrlPlaceholder": "https://images.unsplash.com/...",
    "admin.imageUrlHelp": "Recommended to use Unsplash or other free image services",
    "admin.detailInfo": "Detailed Information",
    "admin.businessProblem": "Business Problem",
    "admin.businessProblemPlaceholder": "Describe the business pain point this project addresses",
    "admin.solution": "Solution",
    "admin.solutionPlaceholder": "Explain how AI technology solves this problem",
    "admin.technicalDetails": "Technical Details",
    "admin.technicalDetailsPlaceholder": "Models used, tech stack, key implementations, etc.",
    "admin.impact": "Business Impact",
    "admin.impactPlaceholder": "Actual value and results delivered to the business",
    "admin.projectInfo": "Project Information",
    "admin.team": "Team",
    "admin.teamPlaceholder": "e.g., AI R&D Department",
    "admin.timeline": "Development Timeline",
    "admin.timelinePlaceholder": "e.g., March 2024 - May 2024",
    "admin.ownerName": "Project Owner",
    "admin.ownerNamePlaceholder": "e.g., John Smith",
    "admin.metrics": "Key Metrics",
    "admin.metricsPlaceholder": "e.g., Improved efficiency by 30%",
    "admin.addMetric": "Add Metric",
    "admin.metricsHelp": "Add up to 5 key business metrics",
    "admin.resources": "Related Resources (Optional)",
    "admin.requirementDoc": "Requirement Doc URL",
    "admin.requirementDocPlaceholder": "https://docs.google.com/...",
    "admin.githubRepo": "GitHub Repo URL",
    "admin.githubRepoPlaceholder": "https://github.com/...",
    "admin.demoManual": "Demo Manual URL",
    "admin.demoManualPlaceholder": "https://docs.google.com/...",
    "admin.installGuide": "Installation Guide URL",
    "admin.installGuidePlaceholder": "https://docs.google.com/...",
    "admin.submitButton": "Submit Project",
    "admin.submitting": "Submitting...",
    "admin.successTitle": "Submission Successful",
    "admin.successDesc": "New atomic scenario has been successfully added to the showcase center",
    "admin.errorTitle": "Submission Failed",
    "admin.errorDesc": "Please check the form content and try again",
    
    // Analytics Page
    "analytics.title": "Project Views Analytics",
    "analytics.subtitle": "View the most popular AI atomic scenarios",
    "analytics.exportAnalytics": "Export Analytics Data",
    "analytics.topViewed": "Most Popular Projects",
    "analytics.rank": "Rank",
    "analytics.scenario": "Project",
    "analytics.views": "Views",
    "analytics.category": "Category",
    "analytics.noData": "No view data available",
  },
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem("language");
    return (saved === "zh" || saved === "en") ? saved : "zh";
  });

  useEffect(() => {
    localStorage.setItem("language", language);
    document.documentElement.lang = language;
  }, [language]);

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.zh] || key;
  };

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  return (
    <TranslationContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </TranslationContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error("useTranslation must be used within LanguageProvider");
  }
  return context;
}
