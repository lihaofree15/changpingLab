import React from 'react';
import { TrendingUp, AlertTriangle, BarChart, PieChart } from 'lucide-react';

export function QualityBI() {
  const kpis = [
    { label: '样本周转率', value: '14.2天', trend: 'down', change: '-8%' },
    { label: '错误率', value: '0.12%', trend: 'down', change: '-0.03%' },
    { label: '设备利用率', value: '87%', trend: 'up', change: '+5%' },
    { label: '成本效率', value: '¥284/样本', trend: 'down', change: '-12%' }
  ];

  const bottlenecks = [
    { stage: 'DNA提取', utilization: 89, status: 'high' },
    { stage: '文库制备', utilization: 67, status: 'normal' },
    { stage: '测序', utilization: 94, status: 'critical' },
    { stage: '分析流程', utilization: 72, status: 'normal' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">QA/QC与BI洞察</h1>
          <p className="text-slate-400 mt-2">数据湖仓视图 + 可视化仪表盘</p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi, index) => (
          <div key={index} className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div className={`flex items-center space-x-1 text-sm ${
                kpi.trend === 'up' ? 'text-green-400' : 'text-red-400'
              }`}>
                <TrendingUp className={`w-4 h-4 ${kpi.trend === 'down' ? 'rotate-180' : ''}`} />
                <span>{kpi.change}</span>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-white">{kpi.value}</h3>
            <p className="text-slate-400 text-sm mt-1">{kpi.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bottleneck Analysis */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50">
          <div className="p-6 border-b border-slate-700/50">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5 text-orange-400" />
              <h2 className="text-xl font-semibold text-white">瓶颈分析</h2>
            </div>
          </div>
          <div className="p-6 space-y-4">
            {bottlenecks.map((item, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-slate-300">{item.stage}</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-white font-medium">{item.utilization}%</span>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      item.status === 'critical' ? 'bg-red-500/20 text-red-400' :
                      item.status === 'high' ? 'bg-orange-500/20 text-orange-400' :
                      'bg-green-500/20 text-green-400'
                    }`}>
                      {item.status === 'critical' ? '严重' :
                       item.status === 'high' ? '高' : '正常'}
                    </span>
                  </div>
                </div>
                <div className="w-full bg-slate-600 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-300 ${
                      item.status === 'critical' ? 'bg-red-500' :
                      item.status === 'high' ? 'bg-orange-500' : 'bg-green-500'
                    }`}
                    style={{ width: `${item.utilization}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Predictive Insights */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50">
          <div className="p-6 border-b border-slate-700/50">
            <div className="flex items-center space-x-2">
              <BarChart className="w-5 h-5 text-cyan-400" />
              <h2 className="text-xl font-semibold text-white">预测洞察</h2>
            </div>
          </div>
          <div className="p-6 space-y-4">
            <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <AlertTriangle className="w-4 h-4 text-yellow-400" />
                <span className="text-yellow-400 font-medium">库存预警</span>
              </div>
              <p className="text-slate-300 text-sm">PCR Master Mix将在5天内用完，基于当前使用量预测</p>
            </div>
            
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <TrendingUp className="w-4 h-4 text-blue-400" />
                <span className="text-blue-400 font-medium">产能预测</span>
              </div>
              <p className="text-slate-300 text-sm">预计下月产能将增加15%，建议提前准备试剂</p>
            </div>
            
            <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <PieChart className="w-4 h-4 text-green-400" />
                <span className="text-green-400 font-medium">优化建议</span>
              </div>
              <p className="text-slate-300 text-sm">批次大小优化可降低成本8%，建议调整工作流程</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}