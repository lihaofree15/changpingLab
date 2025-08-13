import React from 'react';
import { Package, Clock, CheckCircle, AlertCircle } from 'lucide-react';

export function SamplePreparation() {
  const workOrders = [
    {
      id: 'WO-2024-001',
      project: 'GWAS-Diabetes-2024',
      samples: 48,
      status: 'in-progress',
      progress: 75,
      estimatedTime: '2小时',
      assignee: '自动化工作站A'
    },
    {
      id: 'WO-2024-002',
      project: 'Cancer-Genomics-2024', 
      samples: 32,
      status: 'pending',
      progress: 0,
      estimatedTime: '3小时',
      assignee: '待分配'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">样本出库与实验准备</h1>
          <p className="text-slate-400 mt-2">LIMS对接样本出库流程、试剂准备任务工单系统</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mb-4">
            <Package className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-white">12</h3>
          <p className="text-slate-400 text-sm mt-1">待出库工单</p>
        </div>
        
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center mb-4">
            <Clock className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-white">8</h3>
          <p className="text-slate-400 text-sm mt-1">进行中</p>
        </div>
        
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-green-500 to-teal-500 flex items-center justify-center mb-4">
            <CheckCircle className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-white">156</h3>
          <p className="text-slate-400 text-sm mt-1">今日完成</p>
        </div>
        
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-4">
            <AlertCircle className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-white">3</h3>
          <p className="text-slate-400 text-sm mt-1">异常工单</p>
        </div>
      </div>

      <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50">
        <div className="p-6 border-b border-slate-700/50">
          <h2 className="text-xl font-semibold text-white">出库工单列表</h2>
        </div>
        <div className="p-6 space-y-4">
          {workOrders.map((order) => (
            <div key={order.id} className="bg-slate-700/30 rounded-lg p-4 border border-slate-600/30">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-white">{order.id}</h3>
                  <p className="text-slate-400 text-sm">{order.project}</p>
                </div>
                <span className={`px-3 py-1 text-sm rounded-full ${
                  order.status === 'in-progress' ? 'bg-orange-500/20 text-orange-400' :
                  order.status === 'pending' ? 'bg-blue-500/20 text-blue-400' :
                  'bg-green-500/20 text-green-400'
                }`}>
                  {order.status === 'in-progress' ? '进行中' : 
                   order.status === 'pending' ? '待处理' : '已完成'}
                </span>
              </div>
              
              <div className="grid grid-cols-3 gap-4 text-sm mb-4">
                <div>
                  <span className="text-slate-400">样本数量:</span>
                  <span className="text-white ml-2">{order.samples}</span>
                </div>
                <div>
                  <span className="text-slate-400">预计时间:</span>
                  <span className="text-white ml-2">{order.estimatedTime}</span>
                </div>
                <div>
                  <span className="text-slate-400">分配给:</span>
                  <span className="text-white ml-2">{order.assignee}</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-400">进度</span>
                  <span className="text-white">{order.progress}%</span>
                </div>
                <div className="w-full bg-slate-600 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${order.progress}%` }}
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