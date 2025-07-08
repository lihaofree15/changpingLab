import React, { useState } from 'react';
import { Plus, Search, Filter, TestTube, QrCode, Upload, Map } from 'lucide-react';

export function SampleLibrary() {
  const [activeCard, setActiveCard] = useState('status');

  const stats = [
    { label: '样本总数', value: '12,847', icon: TestTube, color: 'from-blue-500 to-cyan-500' },
    { label: '今日登记', value: '156', icon: Plus, color: 'from-green-500 to-teal-500' },
    { label: '已出库', value: '2,340', icon: Upload, color: 'from-orange-500 to-red-500' },
    { label: '库位使用率', value: '78%', icon: Map, color: 'from-purple-500 to-pink-500' }
  ];

  const sampleData = [
    {
      sample_id: 'SMPL-2024-001547',
      sample_name: 'Patient-A-Blood',
      donor_id: 'DONOR-001547',
      sample_type: '血液',
      disease_type: '糖尿病',
      storage_status: '已入库',
      location: {
        freezer: 'F-01',
        shelf: 'S-02',
        box: 'B-03',
        position: 'P-A1'
      },
      metadata: {
        收样时间: '2024-01-15 10:30:00',
        样本质量评分: 9.2,
        标签: ['GWAS研究', '高优先级']
      }
    },
    {
      sample_id: 'SMPL-2024-001548',
      sample_name: 'Patient-B-Tissue',
      donor_id: 'DONOR-001548',
      sample_type: '组织',
      disease_type: '肺癌',
      storage_status: '已出库',
      location: {
        freezer: 'F-02',
        shelf: 'S-01',
        box: 'B-05',
        position: 'P-B2'
      },
      metadata: {
        收样时间: '2024-01-14 14:20:00',
        样本质量评分: 8.7,
        标签: ['癌症研究', '紧急']
      }
    },
    {
      sample_id: 'SMPL-2024-001549',
      sample_name: 'Patient-C-Saliva',
      donor_id: 'DONOR-001549',
      sample_type: '唾液',
      disease_type: '健康对照',
      storage_status: '冻存',
      location: {
        freezer: 'F-01',
        shelf: 'S-03',
        box: 'B-01',
        position: 'P-C3'
      },
      metadata: {
        收样时间: '2024-01-16 09:15:00',
        样本质量评分: 7.8,
        标签: ['对照组']
      }
    }
  ];

  const cardOptions = [
    { id: 'status', label: '样本状态', count: sampleData.length },
    { id: 'register', label: '样本登记', count: 8 },
    { id: 'location', label: '库位管理', count: 15 },
    { id: 'batch', label: '批量操作', count: 3 }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">样本库管理</h1>
          <p className="text-gray-600 mt-2">样本登记 · 库位管理 · 批量导入导出 · 条码追踪</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="bg-gradient-to-r from-green-500 to-teal-500 text-white px-4 py-2 rounded-lg hover:from-green-600 hover:to-teal-600 transition-all duration-200 flex items-center space-x-2">
            <QrCode className="w-4 h-4" />
            <span>扫码登记</span>
          </button>
          <button className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-4 py-2 rounded-lg hover:from-blue-600 hover:to-cyan-600 transition-all duration-200 flex items-center space-x-2">
            <Upload className="w-4 h-4" />
            <span>批量导入</span>
          </button>
        </div>
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
          {activeCard === 'status' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">样本状态总览</h2>
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="搜索样本ID或供体ID..."
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
                      <th className="text-left py-3 px-4 font-medium text-gray-900">样本信息</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">供体ID</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">样本类型</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">疾病类型</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">存储位置</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">质量评分</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">状态</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {sampleData.map((sample) => (
                      <tr key={sample.sample_id} className="hover:bg-gray-50 transition-colors">
                        <td className="py-3 px-4">
                          <div>
                            <div className="font-medium text-gray-900">{sample.sample_name}</div>
                            <div className="text-sm text-gray-600">{sample.sample_id}</div>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-gray-900 font-mono text-sm">{sample.donor_id}</td>
                        <td className="py-3 px-4 text-gray-900">{sample.sample_type}</td>
                        <td className="py-3 px-4 text-gray-900">{sample.disease_type}</td>
                        <td className="py-3 px-4 text-gray-900 font-mono text-sm">
                          {sample.location.freezer}-{sample.location.shelf}-{sample.location.box}-{sample.location.position}
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center space-x-2">
                            <span className="text-gray-900">{sample.metadata.样本质量评分}</span>
                            <div className="w-16 bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-gradient-to-r from-green-500 to-teal-500 h-2 rounded-full"
                                style={{ width: `${sample.metadata.样本质量评分 * 10}%` }}
                              ></div>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            sample.storage_status === '已入库' ? 'bg-green-100 text-green-800' :
                            sample.storage_status === '已出库' ? 'bg-blue-100 text-blue-800' :
                            sample.storage_status === '冻存' ? 'bg-purple-100 text-purple-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {sample.storage_status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeCard === 'location' && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-900">库位管理</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">3D库位可视化</h3>
                  <div className="bg-white rounded-lg h-64 flex items-center justify-center border border-gray-200">
                    <div className="text-center">
                      <Map className="w-16 h-16 text-blue-500 mx-auto mb-4" />
                      <p className="text-gray-600">3D样本库可视化界面</p>
                      <p className="text-gray-500 text-sm mt-1">点击查看详细位置信息</p>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">库位使用统计</h3>
                  <div className="space-y-4">
                    {['F-01', 'F-02', 'F-03'].map((freezer, index) => (
                      <div key={freezer} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-700">{freezer} 冷冻柜</span>
                          <span className="text-gray-900 font-medium">{85 - index * 10}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full"
                            style={{ width: `${85 - index * 10}%` }}
                          ></div>
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