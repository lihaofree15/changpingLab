import React, { useState } from 'react';
import { Plus, Search, Filter, Users, Mail, Shield, Edit, Trash2 } from 'lucide-react';

export function UserManagement() {
  const [activeTab, setActiveTab] = useState('users');

  const userData = [
    {
      user_id: 'USER-001',
      name: '李博士',
      email: 'li.doctor@labillion.com',
      role: '实验室主管',
      department: '基因组学实验室',
      status: '活跃',
      last_login: '2024-01-16 09:30:00',
      permissions: ['全部权限']
    },
    {
      user_id: 'USER-002',
      name: '张技师',
      email: 'zhang.tech@labillion.com',
      role: '实验技师',
      department: '样本处理部',
      status: '活跃',
      last_login: '2024-01-16 08:45:00',
      permissions: ['样本管理', '试剂管理', '实验操作']
    },
    {
      user_id: 'USER-003',
      name: '王分析师',
      email: 'wang.analyst@labillion.com',
      role: '数据分析师',
      department: '生物信息学部',
      status: '活跃',
      last_login: '2024-01-16 10:15:00',
      permissions: ['数据分析', '报告生成', 'BI查看']
    },
    {
      user_id: 'USER-004',
      name: '刘助理',
      email: 'liu.assistant@labillion.com',
      role: '实验助理',
      department: '样本处理部',
      status: '离线',
      last_login: '2024-01-15 17:30:00',
      permissions: ['样本登记', '库存查看']
    }
  ];

  const departmentData = [
    {
      dept_id: 'DEPT-001',
      name: '基因组学实验室',
      manager: '李博士',
      members: 8,
      description: '负责基因组测序和分析工作'
    },
    {
      dept_id: 'DEPT-002',
      name: '样本处理部',
      manager: '张技师',
      members: 12,
      description: '负责样本接收、处理和库存管理'
    },
    {
      dept_id: 'DEPT-003',
      name: '生物信息学部',
      manager: '王分析师',
      members: 6,
      description: '负责数据分析和生物信息学研究'
    },
    {
      dept_id: 'DEPT-004',
      name: '质量控制部',
      manager: '陈主任',
      members: 4,
      description: '负责质量控制和标准化管理'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">用户管理</h1>
          <p className="text-gray-600 mt-1">用户账户管理 · 组织架构 · 部门设置</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
          <Plus className="w-4 h-4" />
          <span>新增用户</span>
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl font-bold text-gray-900">45</h3>
            <p className="text-gray-600 text-sm mt-1">总用户数</p>
          </div>
        </div>
        
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center">
              <Shield className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl font-bold text-gray-900">38</h3>
            <p className="text-gray-600 text-sm mt-1">活跃用户</p>
          </div>
        </div>
        
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center">
              <Mail className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl font-bold text-gray-900">4</h3>
            <p className="text-gray-600 text-sm mt-1">部门数量</p>
          </div>
        </div>
        
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 rounded-lg bg-orange-100 flex items-center justify-center">
              <Users className="w-6 h-6 text-orange-600" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl font-bold text-gray-900">8</h3>
            <p className="text-gray-600 text-sm mt-1">角色类型</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            <button
              onClick={() => setActiveTab('users')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'users'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              用户列表
              <span className="ml-2 px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full">
                {userData.length}
              </span>
            </button>
            <button
              onClick={() => setActiveTab('departments')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'departments'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              部门管理
              <span className="ml-2 px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full">
                {departmentData.length}
              </span>
            </button>
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'users' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">用户列表</h2>
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="搜索用户名或邮箱..."
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                    <Filter className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">用户信息</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">角色部门</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">权限</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">最后登录</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">状态</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">操作</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {userData.map((user) => (
                      <tr key={user.user_id} className="hover:bg-gray-50 transition-colors">
                        <td className="py-3 px-4">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                              <span className="text-blue-600 font-medium">{user.name.charAt(0)}</span>
                            </div>
                            <div>
                              <div className="font-medium text-gray-900">{user.name}</div>
                              <div className="text-sm text-gray-600">{user.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="text-sm text-gray-900">{user.role}</div>
                          <div className="text-sm text-gray-600">{user.department}</div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex flex-wrap gap-1">
                            {user.permissions.map((permission, index) => (
                              <span key={index} className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                                {permission}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-900">{user.last_login}</td>
                        <td className="py-3 px-4">
                          <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                            user.status === '活跃' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                          }`}>
                            {user.status}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center space-x-2">
                            <button className="text-blue-600 hover:text-blue-800 transition-colors">
                              <Edit className="w-4 h-4" />
                            </button>
                            <button className="text-red-600 hover:text-red-800 transition-colors">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'departments' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">部门管理</h2>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
                  <Plus className="w-4 h-4" />
                  <span>新增部门</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {departmentData.map((dept) => (
                  <div key={dept.dept_id} className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{dept.name}</h3>
                        <p className="text-sm text-gray-600 mt-1">{dept.description}</p>
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
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">部门主管:</span>
                        <span className="text-gray-900 font-medium">{dept.manager}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">成员数量:</span>
                        <span className="text-gray-900 font-medium">{dept.members}人</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">部门ID:</span>
                        <span className="text-gray-900 font-mono text-xs">{dept.dept_id}</span>
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