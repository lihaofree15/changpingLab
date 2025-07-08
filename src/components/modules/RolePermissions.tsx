import React, { useState } from 'react';
import { Plus, Search, Shield, Users, Settings, Edit, Trash2 } from 'lucide-react';

export function RolePermissions() {
  const [activeTab, setActiveTab] = useState('roles');

  const roleData = [
    {
      role_id: 'ROLE-001',
      name: '实验室主管',
      description: '实验室最高管理权限，可访问所有功能模块',
      users_count: 2,
      permissions: [
        '用户管理', '角色权限', '系统设置', '试剂管理', '样本管理', 
        '实验管理', '数据分析', 'BI查看', '报告审核', '系统监控'
      ],
      created_date: '2024-01-01',
      status: '启用'
    },
    {
      role_id: 'ROLE-002',
      name: '实验技师',
      description: '负责实验操作和样本处理的技术人员',
      users_count: 15,
      permissions: [
        '样本管理', '试剂管理', '实验操作', '设备管理', '质控记录'
      ],
      created_date: '2024-01-01',
      status: '启用'
    },
    {
      role_id: 'ROLE-003',
      name: '数据分析师',
      description: '负责生物信息学分析和数据处理',
      users_count: 8,
      permissions: [
        '数据分析', 'Pipeline管理', '报告生成', 'BI查看', '结果审核'
      ],
      created_date: '2024-01-01',
      status: '启用'
    },
    {
      role_id: 'ROLE-004',
      name: '实验助理',
      description: '协助实验操作的辅助人员',
      users_count: 12,
      permissions: [
        '样本登记', '库存查看', '基础操作'
      ],
      created_date: '2024-01-01',
      status: '启用'
    },
    {
      role_id: 'ROLE-005',
      name: '质控专员',
      description: '负责质量控制和标准化管理',
      users_count: 4,
      permissions: [
        '质控管理', '标准制定', '审核流程', 'BI查看', '报告审核'
      ],
      created_date: '2024-01-01',
      status: '启用'
    },
    {
      role_id: 'ROLE-006',
      name: '项目经理',
      description: '负责项目管理和进度跟踪',
      users_count: 3,
      permissions: [
        '项目管理', '进度跟踪', '资源分配', 'BI查看', '报告查看'
      ],
      created_date: '2024-01-01',
      status: '启用'
    },
    {
      role_id: 'ROLE-007',
      name: '访客',
      description: '临时访问权限，仅可查看基础信息',
      users_count: 1,
      permissions: [
        '基础查看'
      ],
      created_date: '2024-01-01',
      status: '禁用'
    }
  ];

  const permissionCategories = [
    {
      category: '用户管理',
      permissions: [
        { id: 'user_create', name: '创建用户', description: '创建新的用户账户' },
        { id: 'user_edit', name: '编辑用户', description: '修改用户信息' },
        { id: 'user_delete', name: '删除用户', description: '删除用户账户' },
        { id: 'user_view', name: '查看用户', description: '查看用户列表和详情' }
      ]
    },
    {
      category: '样本管理',
      permissions: [
        { id: 'sample_register', name: '样本登记', description: '登记新样本' },
        { id: 'sample_edit', name: '样本编辑', description: '修改样本信息' },
        { id: 'sample_delete', name: '样本删除', description: '删除样本记录' },
        { id: 'sample_view', name: '样本查看', description: '查看样本信息' },
        { id: 'sample_export', name: '样本导出', description: '导出样本数据' }
      ]
    },
    {
      category: '试剂管理',
      permissions: [
        { id: 'reagent_inbound', name: '试剂入库', description: '试剂入库操作' },
        { id: 'reagent_outbound', name: '试剂出库', description: '试剂出库操作' },
        { id: 'reagent_inventory', name: '库存管理', description: '管理试剂库存' },
        { id: 'reagent_view', name: '试剂查看', description: '查看试剂信息' }
      ]
    },
    {
      category: '实验管理',
      permissions: [
        { id: 'experiment_create', name: '创建实验', description: '创建新的实验任务' },
        { id: 'experiment_execute', name: '执行实验', description: '执行实验操作' },
        { id: 'experiment_monitor', name: '实验监控', description: '监控实验进度' },
        { id: 'experiment_qc', name: '质控管理', description: '实验质量控制' }
      ]
    },
    {
      category: '数据分析',
      permissions: [
        { id: 'analysis_create', name: '创建分析', description: '创建分析任务' },
        { id: 'analysis_execute', name: '执行分析', description: '执行数据分析' },
        { id: 'analysis_view', name: '查看结果', description: '查看分析结果' },
        { id: 'pipeline_manage', name: 'Pipeline管理', description: '管理分析流程' }
      ]
    },
    {
      category: '系统管理',
      permissions: [
        { id: 'system_config', name: '系统配置', description: '系统参数配置' },
        { id: 'role_manage', name: '角色管理', description: '管理用户角色' },
        { id: 'permission_assign', name: '权限分配', description: '分配用户权限' },
        { id: 'audit_log', name: '审计日志', description: '查看系统日志' }
      ]
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">角色权限管理</h1>
          <p className="text-gray-600 mt-1">角色定义 · 权限分配 · 访问控制</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
          <Plus className="w-4 h-4" />
          <span>新增角色</span>
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center">
              <Shield className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl font-bold text-gray-900">{roleData.length}</h3>
            <p className="text-gray-600 text-sm mt-1">角色总数</p>
          </div>
        </div>
        
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center">
              <Users className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl font-bold text-gray-900">{roleData.filter(r => r.status === '启用').length}</h3>
            <p className="text-gray-600 text-sm mt-1">启用角色</p>
          </div>
        </div>
        
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
              <Settings className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl font-bold text-gray-900">{permissionCategories.reduce((sum, cat) => sum + cat.permissions.length, 0)}</h3>
            <p className="text-gray-600 text-sm mt-1">权限总数</p>
          </div>
        </div>
        
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 rounded-lg bg-orange-100 flex items-center justify-center">
              <Users className="w-6 h-6 text-orange-600" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl font-bold text-gray-900">{roleData.reduce((sum, role) => sum + role.users_count, 0)}</h3>
            <p className="text-gray-600 text-sm mt-1">分配用户</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            <button
              onClick={() => setActiveTab('roles')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'roles'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              角色管理
              <span className="ml-2 px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full">
                {roleData.length}
              </span>
            </button>
            <button
              onClick={() => setActiveTab('permissions')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'permissions'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              权限配置
              <span className="ml-2 px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full">
                {permissionCategories.length}
              </span>
            </button>
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'roles' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">角色列表</h2>
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="搜索角色名称..."
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {roleData.map((role) => (
                  <div key={role.role_id} className="bg-gray-50 rounded-lg p-6 border border-gray-200 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                          <Shield className="w-5 h-5 text-purple-600" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{role.name}</h3>
                          <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                            role.status === '启用' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                          }`}>
                            {role.status}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button className="text-blue-600 hover:text-blue-800 transition-colors">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="text-red-600 hover:text-red-800 transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-4">{role.description}</p>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">分配用户:</span>
                        <span className="text-gray-900 font-medium">{role.users_count}人</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">权限数量:</span>
                        <span className="text-gray-900 font-medium">{role.permissions.length}项</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">创建时间:</span>
                        <span className="text-gray-900">{role.created_date}</span>
                      </div>
                    </div>

                    <div className="mt-4">
                      <h4 className="text-sm font-medium text-gray-900 mb-2">权限列表:</h4>
                      <div className="flex flex-wrap gap-1">
                        {role.permissions.slice(0, 3).map((permission, index) => (
                          <span key={index} className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                            {permission}
                          </span>
                        ))}
                        {role.permissions.length > 3 && (
                          <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-600">
                            +{role.permissions.length - 3}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'permissions' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">权限配置</h2>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
                  <Plus className="w-4 h-4" />
                  <span>新增权限</span>
                </button>
              </div>

              {permissionCategories.map((category, categoryIndex) => (
                <div key={categoryIndex} className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">{category.category}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {category.permissions.map((permission, permissionIndex) => (
                      <div key={permissionIndex} className="bg-white rounded-lg p-4 border border-gray-200">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900">{permission.name}</h4>
                            <p className="text-sm text-gray-600 mt-1">{permission.description}</p>
                            <div className="text-xs text-gray-500 mt-2 font-mono">{permission.id}</div>
                          </div>
                          <div className="flex items-center space-x-2 ml-4">
                            <button className="text-blue-600 hover:text-blue-800 transition-colors">
                              <Edit className="w-4 h-4" />
                            </button>
                            <button className="text-red-600 hover:text-red-800 transition-colors">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}