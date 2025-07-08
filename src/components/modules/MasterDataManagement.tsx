import React, { useState } from 'react';
import { Plus, Search, Filter, Database, Settings, FileText, GitBranch } from 'lucide-react';

export function MasterDataManagement() {
  const [activeCard, setActiveCard] = useState('entities');

  const stats = [
    { label: '实体定义', value: '24', icon: Database, color: 'from-teal-500 to-cyan-500' },
    { label: '字段配置', value: '156', icon: Settings, color: 'from-blue-500 to-indigo-500' },
    { label: '数据规范', value: '89', icon: FileText, color: 'from-green-500 to-emerald-500' },
    { label: '版本管理', value: '12', icon: GitBranch, color: 'from-purple-500 to-pink-500' }
  ];

  const entityData = [
    {
      entity: '样本',
      fields: [
        { name: 'sample_id', type: 'string', required: true, description: '样本唯一标识符' },
        { name: 'sample_type', type: 'enum', values: ['血液', '组织', '唾液'], required: true, description: '样本类型' },
        { name: '收样时间', type: 'datetime', required: true, description: '样本收集时间' },
        { name: '质量评分', type: 'number', required: false, description: '样本质量评分(0-10)' }
      ],
      version: 'v2.1',
      status: '已发布'
    },
    {
      entity: '试剂',
      fields: [
        { name: 'reagent_id', type: 'string', required: true, description: '试剂唯一标识符' },
        { name: 'name', type: 'string', required: true, description: '试剂名称' },
        { name: 'batch_number', type: 'string', required: true, description: '批次号' },
        { name: 'expiry_date', type: 'date', required: true, description: '有效期' }
      ],
      version: 'v1.8',
      status: '已发布'
    },
    {
      entity: '测序任务',
      fields: [
        { name: 'seq_task_id', type: 'string', required: true, description: '测序任务ID' },
        { name: 'instrument_id', type: 'string', required: true, description: '测序仪器ID' },
        { name: 'run_mode', type: 'enum', values: ['PE150', 'SE50', 'PE100'], required: true, description: '运行模式' },
        { name: 'status', type: 'enum', values: ['排队中', '运行中', '已完成', '异常'], required: true, description: '任务状态' }
      ],
      version: 'v1.5',
      status: '草稿'
    }
  ];

  const cardOptions = [
    { id: 'entities', label: '实体定义', count: entityData.length },
    { id: 'fields', label: '字段配置', count: 156 },
    { id: 'standards', label: '数据规范', count: 89 },
    { id: 'versions', label: '版本管理', count: 12 }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">主数据管理 (MDM)</h1>
          <p className="text-slate-400 mt-2">实体定义 · 字段配置 · 数据规范 · 版本管理</p>
        </div>
        <button className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white px-6 py-3 rounded-lg hover:from-teal-600 hover:to-cyan-600 transition-all duration-200 flex items-center space-x-2 shadow-lg">
          <Plus className="w-5 h-5" />
          <span>新建实体</span>
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
          {activeCard === 'entities' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-white">实体定义管理</h2>
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="搜索实体名称..."
                      className="pl-10 pr-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white placeholder-slate-400"
                    />
                  </div>
                  <button className="p-2 text-slate-400 hover:text-white hover:bg-slate-700/50 rounded-lg transition-colors">
                    <Filter className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {entityData.map((entity, index) => (
                <div key={index} className="bg-slate-700/30 rounded-lg p-6 border border-slate-600/30">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-white">{entity.entity}</h3>
                      <p className="text-slate-400 text-sm">版本: {entity.version}</p>
                    </div>
                    <span className={`px-3 py-1 text-sm rounded-full ${
                      entity.status === '已发布' ? 'bg-green-500/20 text-green-400' :
                      entity.status === '草稿' ? 'bg-orange-500/20 text-orange-400' :
                      'bg-gray-500/20 text-gray-400'
                    }`}>
                      {entity.status}
                    </span>
                  </div>

                  <div className="space-y-3">
                    <h4 className="text-sm font-medium text-slate-300">字段定义:</h4>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-slate-600">
                            <th className="text-left py-2 px-3 text-slate-400">字段名</th>
                            <th className="text-left py-2 px-3 text-slate-400">类型</th>
                            <th className="text-left py-2 px-3 text-slate-400">必填</th>
                            <th className="text-left py-2 px-3 text-slate-400">描述</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-600/50">
                          {entity.fields.map((field, fieldIndex) => (
                            <tr key={fieldIndex}>
                              <td className="py-2 px-3 text-white font-mono">{field.name}</td>
                              <td className="py-2 px-3 text-slate-300">
                                {field.type}
                                {field.values && (
                                  <span className="text-slate-400 text-xs ml-1">
                                    [{field.values.join(', ')}]
                                  </span>
                                )}
                              </td>
                              <td className="py-2 px-3">
                                <span className={`px-2 py-1 text-xs rounded-full ${
                                  field.required ? 'bg-red-500/20 text-red-400' : 'bg-gray-500/20 text-gray-400'
                                }`}>
                                  {field.required ? '必填' : '可选'}
                                </span>
                              </td>
                              <td className="py-2 px-3 text-slate-300">{field.description}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeCard === 'fields' && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-white">字段配置</h2>
              <div className="bg-slate-700/30 rounded-lg p-6 border border-slate-600/30">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">实体选择</label>
                    <select className="w-full px-3 py-2 bg-slate-600/50 border border-slate-500 rounded-lg text-white">
                      <option>样本</option>
                      <option>试剂</option>
                      <option>测序任务</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">字段名称</label>
                    <input type="text" className="w-full px-3 py-2 bg-slate-600/50 border border-slate-500 rounded-lg text-white" placeholder="字段名称" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">数据类型</label>
                    <select className="w-full px-3 py-2 bg-slate-600/50 border border-slate-500 rounded-lg text-white">
                      <option>string</option>
                      <option>number</option>
                      <option>boolean</option>
                      <option>date</option>
                      <option>datetime</option>
                      <option>enum</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">是否必填</label>
                    <select className="w-full px-3 py-2 bg-slate-600/50 border border-slate-500 rounded-lg text-white">
                      <option>是</option>
                      <option>否</option>
                    </select>
                  </div>
                </div>
                <div className="mt-6">
                  <label className="block text-sm font-medium text-slate-300 mb-2">字段描述</label>
                  <textarea className="w-full px-3 py-2 bg-slate-600/50 border border-slate-500 rounded-lg text-white" rows={3} placeholder="字段描述信息"></textarea>
                </div>
                <div className="mt-6 flex justify-end">
                  <button className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white px-6 py-2 rounded-lg hover:from-teal-600 hover:to-cyan-600 transition-all duration-200">
                    添加字段
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}