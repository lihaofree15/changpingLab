import React, { useState } from 'react';
import { Plus, Search, Filter, Workflow, Settings, Play, Pause } from 'lucide-react';

export function WorkflowManagement() {
  const [activeCard, setActiveCard] = useState('workflows');

  const stats = [
    { label: '工作流', value: '12', icon: Workflow, color: 'from-pink-500 to-rose-500' },
    { label: '运行中', value: '5', icon: Play, color: 'from-blue-500 to-cyan-500' },
    { label: '设备节点', value: '28', icon: Settings, color: 'from-green-500 to-teal-500' },
    { label: '暂停中', value: '2', icon: Pause, color: 'from-orange-500 to-red-500' }
  ];

  const workflowData = [
    {
      workflow_id: 'WF-DNA-EXTRACT',
      name: 'DNA抽提标准流程',
      description: '全自动DNA抽提工作流程',
      nodes: [
        {
          node_id: '样本分装',
          type: '人工操作',
          linked_device: null,
          input_format: '原始样本',
          output_format: '分装样本',
          params: { 体积: '200ul' },
          pre_nodes: []
        },
        {
          node_id: '抽提A',
          type: '抽提',
          linked_device: 'MagExtractor01',
          input_format: '样本ID + 类型',
          output_format: 'DNA浓度 + 纯度',
          params: { 体积: '100ul', 转速: '6000rpm' },
          pre_nodes: ['样本分装']
        },
        {
          node_id: '质控检测',
          type: '质控',
          linked_device: 'NanoDrop01',
          input_format: 'DNA样本',
          output_format: '浓度 + 纯度报告',
          params: { 检测体积: '2ul' },
          pre_nodes: ['抽提A']
        }
      ],
      status: '运行中',
      instances_today: 24,
      success_rate: 96.8
    },
    {
      workflow_id: 'WF-LIB-PREP',
      name: '文库制备流程',
      description: '标准文库制备自动化流程',
      nodes: [
        {
          node_id: '片段化',
          type: '片段化',
          linked_device: 'Covaris01',
          input_format: 'DNA样本',
          output_format: '片段化DNA',
          params: { 目标长度: '350bp' },
          pre_nodes: []
        },
        {
          node_id: '末端修复',
          type: '酶反应',
          linked_device: 'Hamilton01',
          input_format: '片段化DNA',
          output_format: '修复DNA',
          params: { 反应时间: '30min' },
          pre_nodes: ['片段化']
        },
        {
          node_id: '接头连接',
          type: '酶反应',
          linked_device: 'Hamilton01',
          input_format: '修复DNA',
          output_format: '文库',
          params: { 接头浓度: '15uM' },
          pre_nodes: ['末端修复']
        }
      ],
      status: '运行中',
      instances_today: 18,
      success_rate: 94.2
    },
    {
      workflow_id: 'WF-QC-CHECK',
      name: '质控检测流程',
      description: '多维度质控检测流程',
      nodes: [
        {
          node_id: '浓度检测',
          type: '质控',
          linked_device: 'Qubit01',
          input_format: '样本',
          output_format: '浓度值',
          params: { 检测范围: '0.1-1000ng/ul' },
          pre_nodes: []
        },
        {
          node_id: '片段分析',
          type: '质控',
          linked_device: 'Bioanalyzer01',
          input_format: '样本',
          output_format: '片段分布图',
          params: { 芯片类型: 'High Sensitivity' },
          pre_nodes: []
        }
      ],
      status: '暂停',
      instances_today: 0,
      success_rate: 98.5
    }
  ];

  const deviceData = [
    {
      device_id: 'MagExtractor01',
      model: 'KingFisher Flex',
      interface_type: 'REST',
      polling_interval: 30,
      status: '运行中',
      current_task: 'DNA抽提批次-B001',
      data_schema: {
        sample_id: 'string',
        start_time: 'datetime',
        end_time: 'datetime',
        concentration: 'float',
        purity_260_280: 'float'
      }
    },
    {
      device_id: 'Hamilton01',
      model: 'Hamilton STARlet',
      interface_type: 'TCP/IP',
      polling_interval: 15,
      status: '空闲',
      current_task: null,
      data_schema: {
        protocol_id: 'string',
        start_time: 'datetime',
        steps_completed: 'int',
        error_code: 'string'
      }
    }
  ];

  const cardOptions = [
    { id: 'workflows', label: '工作流列表', count: workflowData.length },
    { id: 'designer', label: 'DAG设计器', count: 1 },
    { id: 'devices', label: '设备配置', count: deviceData.length },
    { id: 'monitor', label: '运行监控', count: 8 }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">工作流管理</h1>
          <p className="text-slate-400 mt-2">DAG流程设计 · 设备绑定 · 自动化执行 · 实时监控</p>
        </div>
        <button className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-6 py-3 rounded-lg hover:from-pink-600 hover:to-rose-600 transition-all duration-200 flex items-center space-x-2 shadow-lg">
          <Plus className="w-5 h-5" />
          <span>创建工作流</span>
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
          {activeCard === 'workflows' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-white">工作流列表</h2>
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="搜索工作流名称..."
                      className="pl-10 pr-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white placeholder-slate-400"
                    />
                  </div>
                  <button className="p-2 text-slate-400 hover:text-white hover:bg-slate-700/50 rounded-lg transition-colors">
                    <Filter className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                {workflowData.map((workflow) => (
                  <div key={workflow.workflow_id} className="bg-slate-700/30 rounded-lg p-6 border border-slate-600/30 hover:border-slate-500/50 transition-all duration-200">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-white">{workflow.name}</h3>
                        <p className="text-slate-400 text-sm">{workflow.workflow_id} • {workflow.description}</p>
                      </div>
                      <span className={`px-3 py-1 text-sm rounded-full ${
                        workflow.status === '运行中' ? 'bg-green-500/20 text-green-400' :
                        workflow.status === '暂停' ? 'bg-orange-500/20 text-orange-400' :
                        'bg-gray-500/20 text-gray-400'
                      }`}>
                        {workflow.status}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <span className="text-slate-400 text-sm">节点数量:</span>
                        <span className="text-white ml-2">{workflow.nodes.length}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 text-sm">今日执行:</span>
                        <span className="text-white ml-2">{workflow.instances_today}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 text-sm">成功率:</span>
                        <span className="text-white ml-2">{workflow.success_rate}%</span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-slate-300 mb-3">工作流节点:</h4>
                      <div className="flex items-center space-x-4 overflow-x-auto pb-2">
                        {workflow.nodes.map((node, index) => (
                          <div key={node.node_id} className="flex items-center space-x-2 flex-shrink-0">
                            <div className="bg-slate-600/30 rounded-lg p-3 min-w-[120px]">
                              <div className="text-white font-medium text-sm">{node.node_id}</div>
                              <div className="text-slate-400 text-xs">{node.type}</div>
                              {node.linked_device && (
                                <div className="text-cyan-400 text-xs mt-1">{node.linked_device}</div>
                              )}
                            </div>
                            {index < workflow.nodes.length - 1 && (
                              <div className="text-slate-400">→</div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeCard === 'designer' && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-white">DAG工作流设计器</h2>
              <div className="bg-slate-700/30 rounded-lg p-8 border border-slate-600/30">
                <div className="text-center">
                  <Workflow className="w-24 h-24 text-pink-400 mx-auto mb-6" />
                  <h3 className="text-xl font-semibold text-white mb-4">可视化工作流设计</h3>
                  <p className="text-slate-400 mb-6">拖拽式节点创建 · 参数配置 · 设备绑定 · 分支判断</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                    <div className="bg-slate-600/30 rounded-lg p-4">
                      <h4 className="text-white font-medium mb-3">节点类型</h4>
                      <div className="space-y-2 text-sm">
                        <div className="bg-blue-500/20 text-blue-400 px-2 py-1 rounded">人工操作</div>
                        <div className="bg-green-500/20 text-green-400 px-2 py-1 rounded">自动化设备</div>
                        <div className="bg-purple-500/20 text-purple-400 px-2 py-1 rounded">质控检测</div>
                        <div className="bg-orange-500/20 text-orange-400 px-2 py-1 rounded">条件判断</div>
                      </div>
                    </div>
                    <div className="bg-slate-600/30 rounded-lg p-4">
                      <h4 className="text-white font-medium mb-3">连接规则</h4>
                      <div className="space-y-2 text-sm text-slate-300">
                        <div>• 支持多输入单输出</div>
                        <div>• 条件分支判断</div>
                        <div>• 并行执行节点</div>
                        <div>• 循环控制结构</div>
                      </div>
                    </div>
                    <div className="bg-slate-600/30 rounded-lg p-4">
                      <h4 className="text-white font-medium mb-3">参数配置</h4>
                      <div className="space-y-2 text-sm text-slate-300">
                        <div>• 设备参数设置</div>
                        <div>• 输入输出格式</div>
                        <div>• 超时时间配置</div>
                        <div>• 错误处理策略</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeCard === 'devices' && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-white">设备数据采集配置</h2>
              <div className="space-y-4">
                {deviceData.map((device) => (
                  <div key={device.device_id} className="bg-slate-700/30 rounded-lg p-6 border border-slate-600/30">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-white">{device.device_id}</h3>
                        <p className="text-slate-400 text-sm">{device.model}</p>
                      </div>
                      <span className={`px-3 py-1 text-sm rounded-full ${
                        device.status === '运行中' ? 'bg-green-500/20 text-green-400' :
                        device.status === '空闲' ? 'bg-blue-500/20 text-blue-400' :
                        'bg-gray-500/20 text-gray-400'
                      }`}>
                        {device.status}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <span className="text-slate-400 text-sm">接口类型:</span>
                        <span className="text-white ml-2">{device.interface_type}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 text-sm">轮询间隔:</span>
                        <span className="text-white ml-2">{device.polling_interval}秒</span>
                      </div>
                      <div>
                        <span className="text-slate-400 text-sm">当前任务:</span>
                        <span className="text-white ml-2">{device.current_task || '无'}</span>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium text-slate-300 mb-2">数据Schema:</h4>
                      <div className="bg-slate-600/30 rounded p-3 font-mono text-sm">
                        <pre className="text-slate-300">
{JSON.stringify(device.data_schema, null, 2)}
                        </pre>
                      </div>
                    </div>
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