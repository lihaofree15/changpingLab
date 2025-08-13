import React from 'react';
import { Database, Upload, Settings, Cloud } from 'lucide-react';

export function SequencingData() {
  const sequencingRuns = [
    {
      id: 'RUN-2024-001',
      platform: 'NovaSeq 6000',
      samples: 48,
      status: 'completed',
      progress: 100,
      dataSize: '2.3TB',
      uploadStatus: 'uploading'
    },
    {
      id: 'RUN-2024-002',
      platform: 'MiSeq v3',
      samples: 24,
      status: 'running',
      progress: 67,
      dataSize: '1.1TB',
      uploadStatus: 'pending'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">测序数据管理</h1>
          <p className="text-slate-400 mt-2">数据采集 + Omics平台接口可视化配置</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mb-4">
            <Database className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-white">15.6TB</h3>
          <p className="text-slate-400 text-sm mt-1">本月数据量</p>
        </div>
        
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-green-500 to-teal-500 flex items-center justify-center mb-4">
            <Upload className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-white">8</h3>
          <p className="text-slate-400 text-sm mt-1">上传中批次</p>
        </div>
        
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-4">
            <Cloud className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-white">156</h3>
          <p className="text-slate-400 text-sm mt-1">云端分析任务</p>
        </div>
        
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center mb-4">
            <Settings className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-white">12</h3>
          <p className="text-slate-400 text-sm mt-1">分析模板</p>
        </div>
      </div>

      <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50">
        <div className="p-6 border-b border-slate-700/50">
          <h2 className="text-xl font-semibold text-white">测序批次状态</h2>
        </div>
        <div className="p-6 space-y-4">
          {sequencingRuns.map((run) => (
            <div key={run.id} className="bg-slate-700/30 rounded-lg p-4 border border-slate-600/30">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-white">{run.id}</h3>
                  <p className="text-slate-400 text-sm">{run.platform} • {run.samples} 样本</p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-3 py-1 text-sm rounded-full ${
                    run.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                    run.status === 'running' ? 'bg-blue-500/20 text-blue-400' :
                    'bg-gray-500/20 text-gray-400'
                  }`}>
                    {run.status === 'completed' ? '已完成' : 
                     run.status === 'running' ? '运行中' : '待开始'}
                  </span>
                  <span className={`px-3 py-1 text-sm rounded-full ${
                    run.uploadStatus === 'uploading' ? 'bg-orange-500/20 text-orange-400' :
                    run.uploadStatus === 'completed' ? 'bg-green-500/20 text-green-400' :
                    'bg-gray-500/20 text-gray-400'
                  }`}>
                    {run.uploadStatus === 'uploading' ? '上传中' :
                     run.uploadStatus === 'completed' ? '已上传' : '待上传'}
                  </span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                <div>
                  <span className="text-slate-400">数据大小:</span>
                  <span className="text-white ml-2">{run.dataSize}</span>
                </div>
                <div>
                  <span className="text-slate-400">测序进度:</span>
                  <span className="text-white ml-2">{run.progress}%</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-400">测序进度</span>
                  <span className="text-white">{run.progress}%</span>
                </div>
                <div className="w-full bg-slate-600 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${run.progress}%` }}
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