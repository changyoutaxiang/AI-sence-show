import React from 'react';
import { ThumbsUp, ThumbsDown } from 'lucide-react';
export interface ProjectCardProps {
  image: string;
  title: string;
  description: string;
  metrics: Array<{
    label: string;
    value: string;
  }>;
  projectManager: {
    name: string;
    avatar: string;
  };
  likes: number;
  dislikes: number;
  'data-id'?: string;
}
export const ProjectCard: React.FC<ProjectCardProps> = ({
  image,
  title,
  description,
  metrics,
  projectManager,
  likes,
  dislikes,
  'data-id': dataId
}) => {
  return <div data-id={dataId} className="w-full max-w-2xl bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl overflow-hidden shadow-2xl">
      {/* Project Image/Preview */}
      <div className="relative w-full h-64 overflow-hidden">
        <img src={image} alt={title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent" />
      </div>
      {/* Card Content */}
      <div className="p-6 space-y-6 relative">
        {/* Project Manager Avatar - Vertically Centered Right */}
        <div className="absolute top-1/2 -translate-y-1/2 right-6 flex flex-col items-center gap-2">
          <img src={projectManager.avatar} alt={projectManager.name} className="w-20 h-20 rounded-full object-cover ring-2 ring-blue-500 shadow-lg" />
          <p className="text-sm text-white font-medium">
            {projectManager.name}
          </p>
        </div>
        {/* Title - with padding to avoid avatar overlap */}
        <h2 className="text-3xl font-bold text-white pr-32">{title}</h2>
        {/* Description */}
        <p className="text-gray-300 text-base leading-relaxed line-clamp-3 pr-32">
          {description}
        </p>
        {/* Metrics */}
        <div className="flex flex-wrap gap-3">
          {metrics.map((metric, index) => <div key={index} className="px-4 py-2 bg-gray-800/60 rounded-lg border border-gray-700">
              <span className="text-white font-medium">{metric.label}</span>
            </div>)}
        </div>
        {/* Likes and Dislikes */}
        <div className="flex items-center gap-4 pt-4 border-t border-gray-700">
          <div className="flex items-center gap-2">
            <ThumbsUp className="w-5 h-5 text-green-400" />
            <span className="text-white font-medium">{likes}</span>
          </div>
          <div className="flex items-center gap-2">
            <ThumbsDown className="w-5 h-5 text-red-400" />
            <span className="text-white font-medium">{dislikes}</span>
          </div>
        </div>
      </div>
    </div>;
};