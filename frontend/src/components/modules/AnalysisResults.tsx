import React from 'react';
import { BarChart3, FileText, CheckCircle, Clock } from 'lucide-react';

export function AnalysisResults() {
  const analysisJobs = [
    {
      id: 'ANALYSIS-2024-001',
      project: 'GWAS-Diabetes-2024',
      type: 'GWAS分析',
      status: 'completed',
      progress: 100,
      samples: 2000,
      results: '已生成报告'
    },
    {
      id: 'ANALYSIS-2024-002',
      project: 'Cancer-Genomics-2024',
      type: '变异检测',
      status: 'running',
      progress: 78,
      samples: 1500,
      results: '分析中'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">分析与回传</h1>
          <p className="text-slate-400 mt-2">分析流程选择 + 结果自动入LIMS</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mb-4">
            <BarChart3 className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-white">23</h3>
          <p className="text-slate-400 text-sm mt-1">分析任务</p>
        </div>
        
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-green-500 to-teal-500 flex items-center justify-center mb-4">
            <CheckCircle className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-white">156</h3>
          <p className="text-slate-400 text-sm mt-1">已完成</p>
        </div>
        
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center mb-4">
            <Clock className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-white">8</h3>
          <p className="text-slate-400 text-sm mt-1">进行中</p>
        </div>
        
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-4">
            <FileText className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-white">89</h3>
          <p className="text-slate-400 text-sm mt-1">生成报告</p>
        </div>
      </div>

      <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50">
        <div className="p-6 border-b border-slate-700/50">
          <h2 className="text-xl font-semibold text-white">分析任务状态</h2>
        </div>
        <div className="p-6 space-y-4">
          {analysisJobs.map((job) => (
            <div key={job.id} className="bg-slate-700/30 rounded-lg p-4 border border-slate-600/30">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-white">{job.id}</h3>
                  <p className="text-slate-400 text-sm">{job.project} • {job.type}</p>
                </div>
                <span className={`px-3 py-1 text-sm rounded-full ${
                  job.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                  job.status === 'running' ? 'bg-blue-500/20 text-blue-400' :
                  'bg-gray-500/20 text-gray-400'
                }`}>
                  {job.status === 'completed' ? '已完成' : 
                   job.status === 'running' ? '运行中' : '待开始'}
                </span>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                <div>
                  <span className="text-slate-400">样本数量:</span>
                  <span className="text-white ml-2">{job.samples}</span>
                </div>
                <div>
                  <span className="text-slate-400">结果状态:</span>
                  <span className="text-white ml-2">{job.results}</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-400">分析进度</span>
                  <span className="text-white">{job.progress}%</span>
                </div>
                <div className="w-full bg-slate-600 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${job.progress}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}