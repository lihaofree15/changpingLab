import React, { useState } from 'react';
import { TrendingUp, BarChart3, PieChart, Activity, AlertTriangle, CheckCircle } from 'lucide-react';

export function BIDashboard() {
  const [activeCard, setActiveCard] = useState('overview');

  const stats = [
    { label: '数据总览', value: '实时', icon: TrendingUp, color: 'from-green-500 to-emerald-500' },
    { label: '样本流转', value: '2.8K', icon: Activity, color: 'from-blue-500 to-cyan-500' },
    { label: '批次质控', value: '98.5%', icon: CheckCircle, color: 'from-green-500 to-teal-500' },
    { label: '效率统计', value: '↑15%', icon: BarChart3, color: 'from-purple-500 to-pink-500' }
  ];

  const chartConfigs = [
    {
      chart_type: 'line',
      title: '样本每日处理量',
      x_axis: '日期',
      y_axis: '样本数',
      data_source: 'workflow_stats',
      refresh_interval: 300,
      data: [
        { date: '01-10', samples: 145 },
        { date: '01-11', samples: 167 },
        { date: '01-12', samples: 189 },
        { date: '01-13', samples: 156 },
        { date: '01-14', samples: 203 },
        { date: '01-15', samples: 178 },
        { date: '01-16', samples: 234 }
      ]
    },
    {
      chart_type: 'bar',
      title: '各阶段处理时间',
      x_axis: '处理阶段',
      y_axis: '平均时间(小时)',
      data_source: 'stage_timing',
      refresh_interval: 600,
      data: [
        { stage: '样本接收', time: 2.1 },
        { stage: 'DNA抽提', time: 4.5 },
        { stage: '文库制备', time: 6.2 },
        { stage: '测序', time: 18.3 },
        { stage: '数据分析', time: 12.7 }
      ]
    },
    {
      chart_type: 'pie',
      title: '样本类型分布',
      data_source: 'sample_types',
      refresh_interval: 1800,
      data: [
        { type: '血液', count: 1247, percentage: 45 },
        { type: '组织', count: 892, percentage: 32 },
        { type: '唾液', count: 456, percentage: 16 },
        { type: '其他', count: 189, percentage: 7 }
      ]
    }
  ];

  const cardOptions = [
    { id: 'overview', label: '数据总览', count: 4 },
    { id: 'heatmap', label: '样本流转热图', count: 1 },
    { id: 'qc', label: '批次质控', count: 12 },
    { id: 'efficiency', label: '工作效率统计', count: 8 }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">BI分析仪表盘</h1>
          <p className="text-slate-400 mt-2">数据总览 · 样本流转热图 · 批次质控 · 工作效率统计</p>
        </div>
        <div className="flex items-center space-x-2 text-sm text-green-400">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span>实时更新</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 hover:border-slate-600/50 transition-all duration-200">
              <div className="flex items-center justify-between">
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="mt-4">
                <h3 className="text-2xl font-bold text-white">{stat.value}</h3>
                <p className="text-slate-400 text-sm mt-1">{stat.label}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Top Cards Navigation */}
      <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50">
        <div className="p-6 border-b border-slate-700/50">
          <div className="flex space-x-4">
            {cardOptions.map((card) => (
              <button
                key={card.id}
                onClick={() => setActiveCard(card.id)}
                className={`px-4 py-2 rounded-lg transition-all duration-200 flex items-center space-x-2 ${
                  activeCard === card.id
                    ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                    : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
                }`}
              >
                <span>{card.label}</span>
                <span className="bg-slate-600 text-slate-300 px-2 py-1 rounded-full text-xs">
                  {card.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Main Content Area */}
        <div className="p-6">
          {activeCard === 'overview' && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-white">数据总览仪表盘</h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Line Chart */}
                <div className="bg-slate-700/30 rounded-lg p-6 border border-slate-600/30">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-white">{chartConfigs[0].title}</h3>
                    <div className="text-xs text-slate-400">每{chartConfigs[0].refresh_interval}秒更新</div>
                  </div>
                  <div className="h-64 flex items-end justify-between space-x-2">
                    {chartConfigs[0].data.map((item, index) => (
                      <div key={index} className="flex flex-col items-center flex-1">
                        <div 
                          className="w-full bg-gradient-to-t from-cyan-500 to-blue-500 rounded-t"
                          style={{ height: `${(item.samples / 250) * 200}px` }}
                        ></div>
                        <div className="text-xs text-slate-400 mt-2">{item.date}</div>
                        <div className="text-xs text-white">{item.samples}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bar Chart */}
                <div className="bg-slate-700/30 rounded-lg p-6 border border-slate-600/30">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-white">{chartConfigs[1].title}</h3>
                    <div className="text-xs text-slate-400">每{chartConfigs[1].refresh_interval}秒更新</div>
                  </div>
                  <div className="space-y-4">
                    {chartConfigs[1].data.map((item, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-300">{item.stage}</span>
                          <span className="text-white">{item.time}h</span>
                        </div>
                        <div className="w-full bg-slate-600 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-green-500 to-teal-500 h-2 rounded-full"
                            style={{ width: `${(item.time / 20) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Pie Chart */}
              <div className="bg-slate-700/30 rounded-lg p-6 border border-slate-600/30">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-white">{chartConfigs[2].title}</h3>
                  <div className="text-xs text-slate-400">每{chartConfigs[2].refresh_interval}秒更新</div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-center justify-center">
                    <div className="relative w-48 h-48">
                      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 via-green-500 to-orange-500"></div>
                      <div className="absolute inset-4 rounded-full bg-slate-700"></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-white">2,784</div>
                          <div className="text-sm text-slate-400">总样本数</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    {chartConfigs[2].data.map((item, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className={`w-4 h-4 rounded-full ${
                            index === 0 ? 'bg-blue-500' :
                            index === 1 ? 'bg-purple-500' :
                            index === 2 ? 'bg-green-500' : 'bg-orange-500'
                          }`}></div>
                          <span className="text-slate-300">{item.type}</span>
                        </div>
                        <div className="text-right">
                          <div className="text-white font-semibold">{item.count}</div>
                          <div className="text-slate-400 text-sm">{item.percentage}%</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeCard === 'heatmap' && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-white">样本流转热图</h2>
              <div className="bg-slate-700/30 rounded-lg p-8 border border-slate-600/30">
                <div className="text-center">
                  <Activity className="w-24 h-24 text-cyan-400 mx-auto mb-6" />
                  <h3 className="text-xl font-semibold text-white mb-4">样本流转热力图</h3>
                  <p className="text-slate-400 mb-6">实时展示样本在各个处理阶段的流转情况和瓶颈分析</p>
                  
                  <div className="grid grid-cols-5 gap-4 mt-8">
                    {['样本接收', 'DNA抽提', '文库制备', '测序', '数据分析'].map((stage, index) => (
                      <div key={stage} className="bg-slate-600/30 rounded-lg p-4">
                        <h4 className="text-white font-medium mb-2">{stage}</h4>
                        <div className={`w-full h-16 rounded ${
                          index === 2 ? 'bg-red-500/30' : // 瓶颈阶段
                          index === 1 || index === 3 ? 'bg-orange-500/30' : // 高负载
                          'bg-green-500/30' // 正常
                        } flex items-center justify-center`}>
                          <span className="text-white font-bold">
                            {index === 2 ? '94%' : index === 1 || index === 3 ? '78%' : '65%'}
                          </span>
                        </div>
                        <div className="text-xs text-slate-400 mt-2">
                          {index === 2 ? '瓶颈' : index === 1 || index === 3 ? '高负载' : '正常'}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeCard === 'qc' && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-white">批次质控统计</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-slate-700/30 rounded-lg p-6 border border-slate-600/30">
                  <h3 className="text-lg font-semibold text-white mb-4">质控通过率</h3>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-green-400 mb-2">98.5%</div>
                    <div className="text-slate-400">本月平均通过率</div>
                  </div>
                  <div className="mt-6 space-y-3">
                    {[
                      { stage: 'DNA抽提质控', rate: 99.2 },
                      { stage: '文库质控', rate: 97.8 },
                      { stage: '测序质控', rate: 98.5 }
                    ].map((item, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-300">{item.stage}</span>
                          <span className="text-white">{item.rate}%</span>
                        </div>
                        <div className="w-full bg-slate-600 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-green-500 to-teal-500 h-2 rounded-full"
                            style={{ width: `${item.rate}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="bg-slate-700/30 rounded-lg p-6 border border-slate-600/30">
                  <h3 className="text-lg font-semibold text-white mb-4">质控异常统计</h3>
                  <div className="space-y-4">
                    {[
                      { type: '浓度不达标', count: 12, trend: 'down' },
                      { type: '纯度异常', count: 8, trend: 'up' },
                      { type: '降解严重', count: 5, trend: 'down' },
                      { type: '污染检出', count: 2, trend: 'stable' }
                    ].map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-slate-600/30 rounded">
                        <div>
                          <div className="text-white font-medium">{item.type}</div>
                          <div className="text-slate-400 text-sm">本月发生次数</div>
                        </div>
                        <div className="text-right">
                          <div className="text-xl font-bold text-white">{item.count}</div>
                          <div className={`text-xs ${
                            item.trend === 'down' ? 'text-green-400' :
                            item.trend === 'up' ? 'text-red-400' : 'text-slate-400'
                          }`}>
                            {item.trend === 'down' ? '↓ 减少' :
                             item.trend === 'up' ? '↑ 增加' : '→ 稳定'}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}