import React, { useState } from 'react';
import { Plus, Search, Filter, Package, AlertTriangle, CheckCircle, Clock } from 'lucide-react';

export function ReagentManagement() {
  const [activeCard, setActiveCard] = useState('inventory');

  const stats = [
    { label: '试剂总数', value: '1,247', icon: Package, color: 'from-blue-500 to-cyan-500' },
    { label: '即将过期', value: '23', icon: AlertTriangle, color: 'from-orange-500 to-red-500' },
    { label: '库存充足', value: '1,156', icon: CheckCircle, color: 'from-green-500 to-teal-500' },
    { label: '待入库', value: '68', icon: Clock, color: 'from-purple-500 to-pink-500' }
  ];

  const reagentData = [
    {
      reagent_id: 'REG-2024-001',
      name: 'PCR Master Mix',
      batch_number: 'B20240115',
      type: '酶',
      vendor: 'Thermo Fisher',
      amount: 500,
      unit: 'ml',
      storage_location: 'A1-B2-C3',
      expiry_date: '2024-12-31',
      qc_passed: true,
      status: '库存充足'
    },
    {
      reagent_id: 'REG-2024-002',
      name: 'DNA Extraction Kit',
      batch_number: 'B20240120',
      type: '试剂盒',
      vendor: 'QIAGEN',
      amount: 96,
      unit: 'reactions',
      storage_location: 'A2-B1-C4',
      expiry_date: '2024-06-30',
      qc_passed: true,
      status: '即将过期'
    },
    {
      reagent_id: 'REG-2024-003',
      name: 'Taq DNA Polymerase',
      batch_number: 'B20240118',
      type: '酶',
      vendor: 'NEB',
      amount: 250,
      unit: 'units',
      storage_location: 'A1-B3-C1',
      expiry_date: '2025-03-15',
      qc_passed: true,
      status: '库存充足'
    }
  ];

  const cardOptions = [
    { id: 'inventory', label: '库存一览', count: reagentData.length },
    { id: 'inbound', label: '试剂入库', count: 5 },
    { id: 'requisition', label: '领用申请', count: 12 },
    { id: 'batch', label: '批次管理', count: 8 }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">试剂库房管理</h1>
          <p className="text-gray-600 mt-2">试剂入库 · 库存管理 · 领用申请 · 批次追踪</p>
        </div>
        <button className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-3 rounded-lg hover:from-blue-600 hover:to-cyan-600 transition-all duration-200 flex items-center space-x-2 shadow-lg">
          <Plus className="w-5 h-5" />
          <span>新增试剂</span>
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
          {activeCard === 'inventory' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">试剂库存一览</h2>
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="搜索试剂名称或批次..."
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
                      <th className="text-left py-3 px-4 font-medium text-gray-900">试剂信息</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">批次号</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">供应商</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">库存量</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">存储位置</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">有效期</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">状态</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {reagentData.map((reagent) => (
                      <tr key={reagent.reagent_id} className="hover:bg-gray-50 transition-colors">
                        <td className="py-3 px-4">
                          <div>
                            <div className="font-medium text-gray-900">{reagent.name}</div>
                            <div className="text-sm text-gray-600">{reagent.reagent_id} • {reagent.type}</div>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-gray-900 font-mono text-sm">{reagent.batch_number}</td>
                        <td className="py-3 px-4 text-gray-900">{reagent.vendor}</td>
                        <td className="py-3 px-4 text-gray-900">{reagent.amount} {reagent.unit}</td>
                        <td className="py-3 px-4 text-gray-900 font-mono text-sm">{reagent.storage_location}</td>
                        <td className="py-3 px-4 text-gray-900">{reagent.expiry_date}</td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            reagent.status === '库存充足' ? 'bg-green-100 text-green-800' :
                            reagent.status === '即将过期' ? 'bg-orange-100 text-orange-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {reagent.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeCard === 'inbound' && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-900">试剂入库</h2>
              <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">试剂名称</label>
                    <input type="text" className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-900" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">批次号</label>
                    <input type="text" className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-900" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">试剂类型</label>
                    <select className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-900">
                      <option>引物</option>
                      <option>酶</option>
                      <option>缓冲液</option>
                      <option>其他</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">供应商</label>
                    <input type="text" className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-900" />
                  </div>
                </div>
                <div className="mt-6 flex justify-end">
                  <button className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-2 rounded-lg hover:from-blue-600 hover:to-cyan-600 transition-all duration-200">
                    确认入库
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