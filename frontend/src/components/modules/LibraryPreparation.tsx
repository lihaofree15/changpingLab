import React, { useState } from 'react';
import { Plus, Search, Filter, Dna, CheckCircle, AlertTriangle, Clock } from 'lucide-react';

export function LibraryPreparation() {
  const [activeCard, setActiveCard] = useState('records');

  const stats = [
    { label: '抽提任务', value: '89', icon: Dna, color: 'from-purple-500 to-pink-500' },
    { label: '质控通过', value: '76', icon: CheckCircle, color: 'from-green-500 to-teal-500' },
    { label: '质控失败', value: '8', icon: AlertTriangle, color: 'from-red-500 to-orange-500' },
    { label: '进行中', value: '5', icon: Clock, color: 'from-blue-500 to-cyan-500' }
  ];

  const extractionData = [
    {
      workflow_id: 'WF-2024-001',
      sample_id: 'SMPL-2024-001547',
      operator: '张技师',
      equipment_id: 'MagExtractor01',
      extract_method: '磁珠法',
      start_time: '2024-01-15 09:00:00',
      end_time: '2024-01-15 11:30:00',
      concentration: 45.6,
      purity_ratio_260_280: 1.85,
      qc_pass: true,
      remarks: '抽提质量良好'
    },
    {
      workflow_id: 'WF-2024-002',
      sample_id: 'SMPL-2024-001548',
      operator: '李技师',
      equipment_id: 'MagExtractor02',
      extract_method: '磁珠法',
      start_time: '2024-01-15 10:00:00',
      end_time: '2024-01-15 12:15:00',
      concentration: 38.2,
      purity_ratio_260_280: 1.92,
      qc_pass: true,
      remarks: '浓度略低但符合要求'
    },
    {
      workflow_id: 'WF-2024-003',
      sample_id: 'SMPL-2024-001549',
      operator: '王技师',
      equipment_id: 'MagExtractor01',
      extract_method: '酚氯仿法',
      start_time: '2024-01-15 14:00:00',
      end_time: '2024-01-15 16:45:00',
      concentration: 52.8,
      purity_ratio_260_280: 1.78,
      qc_pass: false,
      remarks: '纯度不达标，需重新抽提'
    }
  ];

  const cardOptions = [
    { id: 'records', label: '文库构建记录', count: extractionData.length },
    { id: 'plan', label: '抽提计划', count: 12 },
    { id: 'qc', label: '质控记录', count: 8 },
    { id: 'failure', label: '失败记录上报', count: 3 }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">建库与抽提</h1>
          <p className="text-gray-600 mt-2">抽提计划 · 文库构建记录 · 质控管理 · 失败记录上报</p>
        </div>
        <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-200 flex items-center space-x-2 shadow-lg">
          <Plus className="w-5 h-5" />
          <span>新建抽提任务</span>
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
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
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
          {activeCard === 'records' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">抽提记录</h2>
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="搜索工作流ID或样本ID..."
                      className="pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                    />
                  </div>
                  <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                    <Filter className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-medium text-gray-900">工作流信息</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">样本ID</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">操作员</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">设备</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">抽提方法</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">浓度</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">纯度</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">质控结果</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {extractionData.map((record) => (
                      <tr key={record.workflow_id} className="hover:bg-gray-50 transition-colors">
                        <td className="py-3 px-4">
                          <div>
                            <div className="font-medium text-gray-900">{record.workflow_id}</div>
                            <div className="text-sm text-gray-600">
                              {record.start_time} - {record.end_time}
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-gray-900 font-mono text-sm">{record.sample_id}</td>
                        <td className="py-3 px-4 text-gray-900">{record.operator}</td>
                        <td className="py-3 px-4 text-gray-900">{record.equipment_id}</td>
                        <td className="py-3 px-4 text-gray-900">{record.extract_method}</td>
                        <td className="py-3 px-4 text-gray-900">{record.concentration} ng/μL</td>
                        <td className="py-3 px-4 text-gray-900">{record.purity_ratio_260_280}</td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            record.qc_pass ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {record.qc_pass ? '通过' : '失败'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeCard === 'plan' && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-900">抽提计划</h2>
              <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">样本批次</label>
                    <select className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-900">
                      <option>BATCH-2024-001 (48样本)</option>
                      <option>BATCH-2024-002 (32样本)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">抽提方法</label>
                    <select className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-900">
                      <option>磁珠法</option>
                      <option>酚氯仿法</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">指定设备</label>
                    <select className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-900">
                      <option>MagExtractor01</option>
                      <option>MagExtractor02</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">预计开始时间</label>
                    <input type="datetime-local" className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-900" />
                  </div>
                </div>
                <div className="mt-6 flex justify-end">
                  <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-200">
                    创建抽提计划
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