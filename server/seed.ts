import { db } from "./db";
import { scenarios, type InsertScenario } from "@shared/schema";

const sampleScenarios: InsertScenario[] = [
  {
    title: "智能数据清洗系统",
    description: "基于AI的数据质量检测与自动修复工具，大幅提升数据准确性",
    businessProblem: "业务部门每月需要花费大量人工时间清洗Excel数据，错误率高且效率低下。传统方法无法识别复杂的数据异常模式，导致下游分析结果不准确。",
    solution: "开发基于机器学习的智能数据清洗系统，自动识别缺失值、异常值、重复记录等问题，并提供智能修复建议。系统支持自定义规则配置，可根据业务特点进行个性化调优。",
    technicalDetails: "技术栈: Python + Pandas + Scikit-learn。核心算法包括异常检测(Isolation Forest)、缺失值插补(KNN Imputer)、重复记录识别(模糊匹配)。部署为Web服务，提供API接口和可视化界面。",
    impact: "数据清洗效率提升80%，从原本每月40小时降低至8小时。数据准确率从85%提升至98%，显著改善了下游业务决策质量。已在财务、销售、运营三个部门推广使用。",
    category: "数据处理",
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=450&fit=crop",
    team: "数据智能团队",
    timeline: "3周",
    metrics: ["效率提升80%", "准确率98%", "覆盖3部门"],
  },
  {
    title: "合同审批自动化流程",
    description: "AI驱动的合同智能审核与风险预警系统，加速审批流程",
    businessProblem: "法务部门每天需要人工审阅大量销售合同，审批周期长达5-7天，影响业务进度。重复性条款检查占用大量专业人力，且容易因疲劳导致遗漏风险点。",
    solution: "构建智能合同审核系统，利用NLP技术自动提取关键条款，对比标准模板，标记潜在风险点。系统集成审批工作流，自动路由至相关负责人，并提供智能建议。",
    technicalDetails: "技术栈: Python + SpaCy + FastAPI + PostgreSQL。使用命名实体识别(NER)提取合同要素，基于规则引擎和预训练模型进行风险评估。前端采用React构建审核界面。",
    impact: "合同审批周期从7天缩短至2天，法务人员工作量减少60%。高风险条款识别准确率达95%，有效规避了多起潜在法律纠纷。",
    category: "自动化",
    imageUrl: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=450&fit=crop",
    team: "企业效率团队",
    timeline: "4周",
    metrics: ["审批提速71%", "工作量减少60%", "识别率95%"],
  },
  {
    title: "销售预测分析平台",
    description: "机器学习驱动的销售趋势预测与智能决策支持系统",
    businessProblem: "销售团队依赖经验判断市场趋势，缺乏数据支撑，导致库存积压和缺货问题频发。传统Excel分析无法处理多维度数据，预测准确性不足50%。",
    solution: "搭建销售预测分析平台，整合历史销售数据、市场趋势、季节性因素等多维信息，使用时间序列模型和梯度提升算法进行预测。提供可视化仪表盘，支持多场景模拟。",
    technicalDetails: "技术栈: Python + Prophet + XGBoost + Plotly + Flask。数据pipeline采用Apache Airflow调度，模型训练使用MLflow管理。支持A/B测试和模型版本回滚。",
    impact: "销售预测准确率从48%提升至82%，库存周转率提高35%，缺货率降低70%。为公司节省了约500万元的库存成本。",
    category: "分析预测",
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=450&fit=crop",
    team: "商业智能团队",
    timeline: "6周",
    metrics: ["准确率82%", "周转率+35%", "节省500万"],
  },
  {
    title: "会议纪要智能生成",
    description: "语音转文字+AI摘要的会议记录自动化工具",
    businessProblem: "员工每天参加多个会议，手动整理会议纪要耗时且容易遗漏关键信息。会议记录质量参差不齐，影响后续工作跟进效率。",
    solution: "开发会议纪要智能生成系统，实时将语音转为文字，使用AI自动提取关键决策、待办事项和行动计划。支持多人说话场景识别，自动生成结构化的会议报告。",
    technicalDetails: "技术栈: Azure Speech Service + OpenAI GPT-4 + Node.js + MongoDB。采用说话人分离技术(Speaker Diarization)，基于Prompt Engineering优化摘要质量。集成钉钉/企业微信推送。",
    impact: "每场会议节省15-20分钟整理时间，会议纪要完整度提升至95%。员工满意度调查显示，该工具使用率达90%，好评率87%。",
    category: "文档生成",
    imageUrl: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=450&fit=crop",
    team: "协作效率团队",
    timeline: "3周",
    metrics: ["节省20分钟", "完整度95%", "使用率90%"],
  },
  {
    title: "客户情绪分析引擎",
    description: "实时分析客户反馈情绪，快速响应负面评价",
    businessProblem: "客服团队每天收到数千条客户反馈，无法及时识别高优先级投诉，导致客户流失。人工筛选效率低，且情绪判断主观性强。",
    solution: "构建客户情绪分析引擎，实时监控各渠道客户反馈(邮件、在线聊天、社交媒体)，使用情感分析模型自动分类为正面、中性、负面。高优先级负面反馈自动触发告警，推送给相关负责人。",
    technicalDetails: "技术栈: Python + Transformers(BERT) + Redis + Kafka。使用中文预训练模型进行微调，支持领域专用词汇识别。采用流式处理架构，平均响应时间<2秒。",
    impact: "负面反馈响应时间从24小时缩短至30分钟，客户投诉解决率提升40%。通过及时干预，客户流失率降低15%。",
    category: "分析预测",
    imageUrl: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&h=450&fit=crop",
    team: "客户体验团队",
    timeline: "4周",
    metrics: ["响应提速98%", "解决率+40%", "流失率-15%"],
  },
  {
    title: "自动化报表生成器",
    description: "定时生成并分发各类业务报表，解放数据团队",
    businessProblem: "数据分析师每周需要手动制作各部门所需的运营报表，重复工作占据了70%的时间。报表格式不统一，且经常因人为错误导致数据偏差。",
    solution: "开发自动化报表生成器，配置化定义报表模板、数据源和分发规则。系统定时从数据库提取数据，自动计算指标，生成PDF/Excel报表并通过邮件分发。",
    technicalDetails: "技术栈: Python + Jinja2 + WeasyPrint + Celery + MySQL。使用模板引擎渲染报表，支持动态图表(ECharts)。基于Celery实现分布式任务调度，确保高峰期稳定性。",
    impact: "数据分析师从重复性报表工作中解放，可投入更多时间进行深度分析。报表生成从每周8小时降至自动化完成，准确率100%。",
    category: "自动化",
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=450&fit=crop",
    team: "数据服务团队",
    timeline: "3周",
    metrics: ["自动化100%", "节省8小时", "准确率100%"],
  },
];

async function seed() {
  console.log("Seeding database...");
  
  try {
    for (const scenario of sampleScenarios) {
      await db.insert(scenarios).values(scenario);
    }
    
    console.log("Database seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
}

seed();
