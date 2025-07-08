import React, { useState } from 'react';
import { Plus, Search, Filter, Cpu, Play, Pause, CheckCircle } from 'lucide-react';

export function SequencingManagement() {
  const [activeCard, setActiveCard] = useState('tasks');

  const stats = [
    { label: '测序任务', value: '23', icon: Cpu, color: 'from-orange-500 to-red-500' },
    { label: '运行中', value: '5', icon: Play, color: 'from-blue-500 to-cyan-500' },
    { label: '已完成', value: '156', icon: CheckCircle, color: 'from-green-500 to-teal-500' },
    { label: '排队中', value: '12', icon: Pause, color: 'from-purple-500 to-pink-500' }
  ];

  const sequencingData = [
    {
      seq_task_id: 'SEQ-2024-001',
      instrument_id: 'NovaSeq01',
      start_time: '2024-01-15 08:00:00',
      expected_runtime: 24,
      flowcell_id: 'FC-001',
      lane_assignments: [
        { lane: 1, sample_id: 'SMPL-2024-001547', barcode: 'ATCG1234' },
        { lane: 2, sample_id: 'SMPL-2024-001548', barcode: 'GCTA5678' }
      ],
      run_mode: 'PE150',
      operator: '张技师',
      status: '运行中',
      progress: 65
    },
    {
      seq_task_id: 'SEQ-2024-002',
      instrument_id: 'MiSeq01',
      start_time: '2024-01-14 14:00:00',
      expected_runtime: 18,
      flowcell_id: 'FC-002',
      lane_assignments: [
        { lane: 1, sample_id: 'SMPL-2024-001549', barcode: 'TTAG9012' }
      ],
      run_mode: 'PE100',
      operator: '李技师',
      status: '已完成',
      progress: 100
    },
    {
      seq_task_id: 'SEQ-2024-003',
      instrument_id: 'NovaSeq02',
      start_time: '2024-01-16 10:00:00',
      expected_runtime: 30,
      flowcell_id: 'FC-003',
      lane_assignments: [
        { lane: 1, sample_id: 'SMPL-2024-001550', barcode: 'CCGG3456' },
        { lane: 2, sample_id: 'SMPL-2024-001551', barcode: 'AAGG7890' }
      ],
      run_mode: 'PE150',
      operator: '王技师',
      status: '排队中',
      progress: 0
    }
  ];

  const cardOptions = [
    { id: 'tasks', label: '上机任务', count: sequencingData.length },
    { id: 'lanes', label: 'Lane分配', count: 8 },
    { id: 'qc', label: '文库质控', count: 15 },
    { id: 'demux', label: '拆分统计', count: 6 }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">测序管理</h1>
          <p className="text-gray-600 mt-2">上机任务 · Lane分配 · 文库质控 · 拆分统计</p>
        </div>
        <button className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-lg hover:from-orange-600 hover:to-red-600 transition-all duration-200 flex items-center space-x-2 shadow-lg">
          <Plus className="w-5 h-5" />
          <span>新建测序任务</span>
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
          {activeCard === 'tasks' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">测序任务列表</h2>
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="搜索任务ID或仪器..."
                      className="pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                    />
                  </div>
                  <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                    <Filter className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                {sequencingData.map((task) => (
                  <div key={task.seq_task_id} className="bg-gray-50 rounded-lg p-6 border border-gray-200 hover:shadow-md transition-all duration-200">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{task.seq_task_id}</h3>
                        <p className="text-gray-600 text-sm">{task.instrument_id} • {task.run_mode} • {task.operator}</p>
                      </div>
                      <span className={`px-3 py-1 text-sm rounded-full ${
                        task.status === '运行中' ? 'bg-blue-100 text-blue-800' :
                        task.status === '已完成' ? 'bg-green-100 text-green-800' :
                        task.status === '排队中' ? 'bg-purple-100 text-purple-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {task.status}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <span className="text-gray-600 text-sm">Flow Cell:</span>
                        <span className="text-gray-900 ml-2 font-mono">{task.flowcell_id}</span>
                      </div>
                      <div>
                        <span className="text-gray-600 text-sm">开始时间:</span>
                        <span className="text-gray-900 ml-2">{task.start_time}</span>
                      </div>
                      <div>
                        <span className="text-gray-600 text-sm">预计运行:</span>
                        <span className="text-gray-900 ml-2">{task.expected_runtime}小时</span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Lane分配:</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {task.lane_assignments.map((assignment, index) => (
                          <div key={index} className="bg-white rounded p-2 text-sm border border-gray-200">
                            <span className="text-gray-600">Lane {assignment.lane}:</span>
                            <span className="text-gray-900 ml-2">{assignment.sample_id}</span>
                            <span className="text-gray-600 ml-2">({assignment.barcode})</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">运行进度</span>
                        <span className="text-gray-900 font-medium">{task.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full transition-all duration-300 ${
                            task.status === '运行中' ? 'bg-gradient-to-r from-blue-500 to-cyan-500' :
                            task.status === '已完成' ? 'bg-gradient-to-r from-green-500 to-teal-500' :
                            'bg-gradient-to-r from-purple-500 to-pink-500'
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

          {activeCard === 'lanes' && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-900">Lane分配管理</h2>
              <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">测序仪器</label>
                    <select className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-900">
                      <option>NovaSeq01</option>
                      <option>NovaSeq02</option>
                      <option>MiSeq01</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Flow Cell ID</label>
                    <input type="text" className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-900" placeholder="FC-004" />
                  </div>
                </div>
                <div className="mt-6">
                  <h3 className="text-sm font-medium text-gray-700 mb-3">Lane样本分配</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[1, 2, 3, 4].map((lane) => (
                      <div key={lane} className="bg-white rounded p-4 border border-gray-200">
                        <h4 className="text-gray-900 font-medium mb-2">Lane {lane}</h4>
                        <select className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded text-gray-900 text-sm">
                          <option>选择样本...</option>
                          <option>SMPL-2024-001547</option>
                          <option>SMPL-2024-001548</option>
                        </select>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mt-6 flex justify-end">
                  <button className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-2 rounded-lg hover:from-orange-600 hover:to-red-600 transition-all duration-200">
                    保存Lane分配
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