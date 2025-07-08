import React, { useState } from 'react';
import { Plus, Search, Filter, BarChart3, Play, CheckCircle, FileText } from 'lucide-react';

export function DataAnalysis() {
  const [activeCard, setActiveCard] = useState('tasks');

  const stats = [
    { label: '分析任务', value: '45', icon: BarChart3, color: 'from-indigo-500 to-purple-500' },
    { label: '运行中', value: '8', icon: Play, color: 'from-blue-500 to-cyan-500' },
    { label: '已完成', value: '234', icon: CheckCircle, color: 'from-green-500 to-teal-500' },
    { label: '报告生成', value: '189', icon: FileText, color: 'from-orange-500 to-red-500' }
  ];

  const analysisData = [
    {
      analysis_id: 'ANAL-2024-001',
      sample_ids: ['SMPL-2024-001547', 'SMPL-2024-001548'],
      pipeline: 'WGS',
      params: {
        reference: 'hg38',
        threads: 16,
        version: 'v2.1.0'
      },
      start_time: '2024-01-15 10:00:00',
      status: '运行中',
      progress: 75,
      results_url: '/results/ANAL-2024-001',
      report_status: '未生成'
    },
    {
      analysis_id: 'ANAL-2024-002',
      sample_ids: ['SMPL-2024-001549'],
      pipeline: 'WES',
      params: {
        reference: 'hg38',
        threads: 8,
        version: 'v1.8.2'
      },
      start_time: '2024-01-14 14:30:00',
      status: '成功',
      progress: 100,
      results_url: '/results/ANAL-2024-002',
      report_status: '已生成'
    },
    {
      analysis_id: 'ANAL-2024-003',
      sample_ids: ['SMPL-2024-001550', 'SMPL-2024-001551', 'SMPL-2024-001552'],
      pipeline: 'RNA-seq',
      params: {
        reference: 'hg38',
        threads: 12,
        version: 'v3.0.1'
      },
      start_time: '2024-01-16 09:15:00',
      status: '失败',
      progress: 45,
      results_url: null,
      report_status: '未生成'
    }
  ];

  const cardOptions = [
    { id: 'tasks', label: '分析任务', count: analysisData.length },
    { id: 'pipelines', label: 'Pipeline管理', count: 8 },
    { id: 'results', label: '结果回传', count: 12 },
    { id: 'reports', label: '报告生成', count: 15 }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">数据分析</h1>
          <p className="text-gray-600 mt-2">分析任务 · Pipeline管理 · 结果回传 · 报告生成</p>
        </div>
        <button className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-6 py-3 rounded-lg hover:from-indigo-600 hover:to-purple-600 transition-all duration-200 flex items-center space-x-2 shadow-lg">
          <Plus className="w-5 h-5" />
          <span>新建分析任务</span>
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-200">
              <div className="flex items-center justify-between">
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="mt-4">
                <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
                <p className="text-gray-600 text-sm mt-1">{stat.label}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Top Cards Navigation */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <div className="flex space-x-4">
            {cardOptions.map((card) => (
              <button
                key={card.id}
                onClick={() => setActiveCard(card.id)}
                className={`px-4 py-2 rounded-lg transition-all duration-200 flex items-center space-x-2 ${
                  activeCard === card.id
                    ? 'bg-blue-50 text-blue-600 border border-blue-200'
                    :   'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <span>{card.label}</span>
                <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
                  {card.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Main Content Area */}
        <div className="p-6">
          {activeCard === 'tasks' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">分析任务列表</h2>
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="搜索分析ID或Pipeline..."
                      className="pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                    />
                  </div>
                  <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                    <Filter className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                {analysisData.map((task) => (
                  <div key={task.analysis_id} className="bg-gray-50 rounded-lg p-6 border border-gray-200 hover:shadow-md transition-all duration-200">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{task.analysis_id}</h3>
                        <p className="text-gray-600 text-sm">{task.pipeline} Pipeline • {task.sample_ids.length} 样本</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-3 py-1 text-sm rounded-full ${
                          task.status === '运行中' ? 'bg-blue-100 text-blue-800' :
                          task.status === '成功' ? 'bg-green-100 text-green-800' :
                          task.status === '失败' ? 'bg-red-100 text-red-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {task.status}
                        </span>
                        <span className={`px-3 py-1 text-sm rounded-full ${
                          task.report_status === '已生成' ? 'bg-green-100 text-green-800' :
                          task.report_status === '已签发' ? 'bg-blue-100 text-blue-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {task.report_status}
                        </span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <span className="text-gray-600 text-sm">参考基因组:</span>
                        <span className="text-gray-900 ml-2">{task.params.reference}</span>
                      </div>
                      <div>
                        <span className="text-gray-600 text-sm">线程数:</span>
                        <span className="text-gray-900 ml-2">{task.params.threads}</span>
                      </div>
                      <div>
                        <span className="text-gray-600 text-sm">版本:</span>
                        <span className="text-gray-900 ml-2">{task.params.version}</span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">样本列表:</h4>
                      <div className="flex flex-wrap gap-2">
                        {task.sample_ids.map((sampleId, index) => (
                          <span key={index} className="bg-white text-gray-700 px-2 py-1 rounded text-sm font-mono border border-gray-200">
                            {sampleId}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">分析进度</span>
                        <span className="text-gray-900 font-medium">{task.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full transition-all duration-300 ${
                            task.status === '运行中' ? 'bg-gradient-to-r from-blue-500 to-cyan-500' :
                            task.status === '成功' ? 'bg-gradient-to-r from-green-500 to-teal-500' :
                            task.status === '失败' ? 'bg-gradient-to-r from-red-500 to-orange-500' :
                            'bg-gradient-to-r from-gray-500 to-gray-400'
                          }`}
                          style={{ width: `${task.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeCard === 'pipelines' && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-900">Pipeline管理</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {['WGS', 'WES', 'RNA-seq', 'scRNA-seq'].map((pipeline) => (
                  <div key={pipeline} className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{pipeline} Pipeline</h3>
                    <p className="text-gray-600 text-sm mb-4">
                      {pipeline === 'WGS' ? '全基因组测序分析流程' :
                       pipeline === 'WES' ? '全外显子测序分析流程' :
                       pipeline === 'RNA-seq' ? 'RNA测序分析流程' :
                       '单细胞RNA测序分析流程'}
                    </p>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">版本:</span>
                        <span className="text-gray-900">v2.1.0</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">状态:</span>
                        <span className="text-green-600">可用</span>
                      </div>
                    </div>
                    <button className="w-full mt-4 bg-gray-100 hover:bg-gray-200 text-gray-900 py-2 rounded-lg transition-colors">
                      配置Pipeline
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}