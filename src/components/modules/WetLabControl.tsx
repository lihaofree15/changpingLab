import React from 'react';
import { Zap, Activity, Cpu, BarChart } from 'lucide-react';

export function WetLabControl() {
  const equipmentStatus = [
    { name: '自动化工作站A', status: 'running', progress: 78, task: 'DNA提取' },
    { name: '自动化工作站B', status: 'idle', progress: 0, task: '待分配' },
    { name: 'PCR仪器组', status: 'running', progress: 45, task: '文库制备' },
    { name: 'AGV机器人', status: 'moving', progress: 90, task: '样本转运' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">湿实验过程控制</h1>
          <p className="text-slate-400 mt-2">闪测系统 + 自动化流程执行</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-green-500 to-teal-500 flex items-center justify-center mb-4">
            <Zap className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-white">4</h3>
          <p className="text-slate-400 text-sm mt-1">运行中设备</p>
        </div>
        
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mb-4">
            <Activity className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-white">156</h3>
          <p className="text-slate-400 text-sm mt-1">今日处理样本</p>
        </div>
        
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center mb-4">
            <Cpu className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-white">87%</h3>
          <p className="text-slate-400 text-sm mt-1">系统利用率</p>
        </div>
        
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-4">
            <BarChart className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-white">2.3h</h3>
          <p className="text-slate-400 text-sm mt-1">平均处理时间</p>
        </div>
      </div>

      <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50">
        <div className="p-6 border-b border-slate-700/50">
          <h2 className="text-xl font-semibold text-white">设备实时状态</h2>
        </div>
        <div className="p-6 space-y-4">
          {equipmentStatus.map((equipment, index) => (
            <div key={index} className="bg-slate-700/30 rounded-lg p-4 border border-slate-600/30">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${
                    equipment.status === 'running' ? 'bg-green-400 animate-pulse' :
                    equipment.status === 'moving' ? 'bg-blue-400 animate-pulse' :
                    'bg-gray-400'
                  }`}></div>
                  <h3 className="text-lg font-semibold text-white">{equipment.name}</h3>
                </div>
                <span className={`px-3 py-1 text-sm rounded-full ${
                  equipment.status === 'running' ? 'bg-green-500/20 text-green-400' :
                  equipment.status === 'moving' ? 'bg-blue-500/20 text-blue-400' :
                  'bg-gray-500/20 text-gray-400'
                }`}>
                  {equipment.status === 'running' ? '运行中' :
                   equipment.status === 'moving' ? '移动中' : '空闲'}
                </span>
              </div>
              
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-slate-400">当前任务: {equipment.task}</span>
                <span className="text-white">{equipment.progress}%</span>
              </div>
              
              <div className="w-full bg-slate-600 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-300 ${
                    equipment.status === 'running' ? 'bg-gradient-to-r from-green-500 to-teal-500' :
                    equipment.status === 'moving' ? 'bg-gradient-to-r from-blue-500 to-cyan-500' :
                    'bg-gray-500'
                  }`}
                  style={{ width: `${equipment.progress}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}