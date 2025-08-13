import React, { useState } from 'react';
import { Plus, Search, Filter, Network, Link, Code, Activity } from 'lucide-react';

export function APIManagement() {
  const [activeCard, setActiveCard] = useState('apis');

  const stats = [
    { label: 'API接口', value: '45', icon: Network, color: 'from-cyan-500 to-blue-500' },
    { label: '活跃连接', value: '23', icon: Link, color: 'from-green-500 to-teal-500' },
    { label: 'Schema绑定', value: '67', icon: Code, color: 'from-purple-500 to-pink-500' },
    { label: '调用次数', value: '12.5K', icon: Activity, color: 'from-orange-500 to-red-500' }
  ];

  const apiData = [
    {
      api_id: 'API-SAMPLE-001',
      path: '/api/sample/register',
      method: 'POST',
      description: '样本登记接口',
      input_schema: {
        sample_id: 'string',
        sample_name: 'string',
        sample_type: 'enum'
      },
      output_schema: {
        status: 'string',
        sample_id: 'string',
        message: 'string'
      },
      status: '活跃',
      calls_today: 156,
      avg_response_time: '145ms'
    },
    {
      api_id: 'API-REAGENT-001',
      path: '/api/reagent/inventory',
      method: 'GET',
      description: '试剂库存查询接口',
      input_schema: {
        reagent_type: 'string',
        location: 'string'
      },
      output_schema: {
        reagents: 'array',
        total_count: 'number'
      },
      status: '活跃',
      calls_today: 89,
      avg_response_time: '98ms'
    },
    {
      api_id: 'API-SEQ-001',
      path: '/api/sequencing/submit',
      method: 'POST',
      description: '测序任务提交接口',
      input_schema: {
        sample_ids: 'array',
        instrument_id: 'string',
        run_mode: 'enum'
      },
      output_schema: {
        task_id: 'string',
        status: 'string',
        estimated_time: 'number'
      },
      status: '维护中',
      calls_today: 0,
      avg_response_time: 'N/A'
    }
  ];

  const cardOptions = [
    { id: 'apis', label: 'API接口', count: apiData.length },
    { id: 'flow', label: '接口流转', count: 12 },
    { id: 'schema', label: 'Schema绑定', count: 67 },
    { id: 'monitor', label: '监控统计', count: 8 }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">API可视化管理</h1>
          <p className="text-slate-400 mt-2">接口流转图谱 · Schema绑定 · 双向联动展示</p>
        </div>
        <button className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-6 py-3 rounded-lg hover:from-cyan-600 hover:to-blue-600 transition-all duration-200 flex items-center space-x-2 shadow-lg">
          <Plus className="w-5 h-5" />
          <span>注册API</span>
        </button>
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
          {activeCard === 'apis' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-white">API接口列表</h2>
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="搜索API路径或描述..."
                      className="pl-10 pr-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white placeholder-slate-400"
                    />
                  </div>
                  <button className="p-2 text-slate-400 hover:text-white hover:bg-slate-700/50 rounded-lg transition-colors">
                    <Filter className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                {apiData.map((api) => (
                  <div key={api.api_id} className="bg-slate-700/30 rounded-lg p-6 border border-slate-600/30 hover:border-slate-500/50 transition-all duration-200">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-lg font-semibold text-white">{api.api_id}</h3>
                          <span className={`px-2 py-1 text-xs rounded font-mono ${
                            api.method === 'GET' ? 'bg-green-500/20 text-green-400' :
                            api.method === 'POST' ? 'bg-blue-500/20 text-blue-400' :
                            api.method === 'PUT' ? 'bg-orange-500/20 text-orange-400' :
                            'bg-red-500/20 text-red-400'
                          }`}>
                            {api.method}
                          </span>
                        </div>
                        <p className="text-slate-400 text-sm font-mono">{api.path}</p>
                        <p className="text-slate-300 text-sm mt-1">{api.description}</p>
                      </div>
                      <span className={`px-3 py-1 text-sm rounded-full ${
                        api.status === '活跃' ? 'bg-green-500/20 text-green-400' :
                        api.status === '维护中' ? 'bg-orange-500/20 text-orange-400' :
                        'bg-gray-500/20 text-gray-400'
                      }`}>
                        {api.status}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <span className="text-slate-400 text-sm">今日调用:</span>
                        <span className="text-white ml-2 font-semibold">{api.calls_today}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 text-sm">平均响应:</span>
                        <span className="text-white ml-2">{api.avg_response_time}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 text-sm">状态:</span>
                        <span className={`ml-2 ${api.status === '活跃' ? 'text-green-400' : 'text-orange-400'}`}>
                          {api.status}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="text-sm font-medium text-slate-300 mb-2">输入Schema:</h4>
                        <div className="bg-slate-600/30 rounded p-3 font-mono text-sm">
                          <pre className="text-slate-300">
{JSON.stringify(api.input_schema, null, 2)}
                          </pre>
                        </div>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-slate-300 mb-2">输出Schema:</h4>
                        <div className="bg-slate-600/30 rounded p-3 font-mono text-sm">
                          <pre className="text-slate-300">
{JSON.stringify(api.output_schema, null, 2)}
                          </pre>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeCard === 'flow' && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-white">API接口流转图谱</h2>
              <div className="bg-slate-700/30 rounded-lg p-8 border border-slate-600/30">
                <div className="text-center">
                  <Network className="w-24 h-24 text-cyan-400 mx-auto mb-6" />
                  <h3 className="text-xl font-semibold text-white mb-4">API流转可视化</h3>
                  <p className="text-slate-400 mb-6">图谱状接口流转展示，支持数据流联动分析</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                    <div className="bg-slate-600/30 rounded-lg p-4">
                      <h4 className="text-white font-medium mb-2">样本模块</h4>
                      <div className="space-y-2 text-sm">
                        <div className="text-slate-300">• 样本登记 API</div>
                        <div className="text-slate-300">• 样本查询 API</div>
                        <div className="text-slate-300">• 样本更新 API</div>
                      </div>
                    </div>
                    <div className="bg-slate-600/30 rounded-lg p-4">
                      <h4 className="text-white font-medium mb-2">测序模块</h4>
                      <div className="space-y-2 text-sm">
                        <div className="text-slate-300">• 任务提交 API</div>
                        <div className="text-slate-300">• 状态查询 API</div>
                        <div className="text-slate-300">• 结果获取 API</div>
                      </div>
                    </div>
                    <div className="bg-slate-600/30 rounded-lg p-4">
                      <h4 className="text-white font-medium mb-2">分析模块</h4>
                      <div className="space-y-2 text-sm">
                        <div className="text-slate-300">• 分析启动 API</div>
                        <div className="text-slate-300">• 进度查询 API</div>
                        <div className="text-slate-300">• 报告生成 API</div>
                      </div>
                    </div>
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