import React, { Component } from 'react';
import { ProjectCard } from './src/ProjectCard';
export function ComponentPreview() {
  return <div className="min-h-screen w-full bg-gray-950 p-8 flex items-center justify-center">
      <div className="space-y-8 w-full max-w-4xl">
        {/* Default State */}
        <ProjectCard image="/%E6%88%AA%E5%B1%8F2025-10-21_23.10.34.png" title="智能数据清洗系统" description="业务部门每月需要花费大量人工时间清洗Excel数据，错误率高且效率低下。传统方法无法识别复杂的数据异常模式，导致下游..." metrics={[{
        label: '效率提升80%',
        value: '80%'
      }, {
        label: '准确率98%',
        value: '98%'
      }, {
        label: '覆盖3部门',
        value: '3'
      }]} projectManager={{
        name: '张伟',
        avatar: 'https://i.pravatar.cc/150?img=12'
      }} likes={156} dislikes={8} />
        {/* Alternative Example */}
        <ProjectCard image="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop" title="客户关系管理平台" description="构建统一的客户数据平台，整合多渠道客户信息，提供360度客户视图，支持精准营销和个性化服务..." metrics={[{
        label: '客户增长45%',
        value: '45%'
      }, {
        label: '响应速度提升3倍',
        value: '3x'
      }, {
        label: '满意度92%',
        value: '92%'
      }]} projectManager={{
        name: '李明',
        avatar: 'https://i.pravatar.cc/150?img=33'
      }} likes={243} dislikes={12} />
      </div>
    </div>;
}