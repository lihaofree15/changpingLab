import React, { useState } from 'react';
import { X, Database, Network, TrendingUp, Workflow, LogOut, Users, Shield, Settings as SettingsIcon } from 'lucide-react';
import { MasterDataManagement } from './modules/MasterDataManagement';
import { APIManagement } from './modules/APIManagement';
import { BIDashboard } from './modules/BIDashboard';
import { WorkflowManagement } from './modules/WorkflowManagement';
import { UserManagement } from './modules/UserManagement';
import { RolePermissions } from './modules/RolePermissions';

interface SettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SettingsPanel({ isOpen, onClose }: SettingsPanelProps) {
  const [activeTab, setActiveTab] = useState('middleware');
  const [activeModule, setActiveModule] = useState('master-data');

  if (!isOpen) return null;

  const middlewareModules = [
    {
      id: 'master-data',
      icon: Database,
      title: '主数据管理',
      description: 'MDM·实体定义·数据规范',
      color: 'from-teal-500 to-cyan-500'
    },
    {
      id: 'api-management',
      icon: Network,
      title: 'API可视化管理',
      description: '接口流转·Schema绑定',
      color: 'from-cyan-500 to-blue-500'
    },
    {
      id: 'bi-dashboard',
      icon: TrendingUp,
      title: 'BI分析仪表盘',
      description: '数据总览·热图·效率统计',
      color: 'from-green-500 to-emerald-500'
    },
    {
      id: 'workflow-management',
      icon: Workflow,
      title: '工作流管理',
      description: 'DAG流程·设备绑定·自动化',
      color: 'from-pink-500 to-rose-500'
    }
  ];

  const renderMiddlewareModule = () => {
    switch (activeModule) {
      case 'master-data':
        return <MasterDataManagement />;
      case 'api-management':
        return <APIManagement />;
      case 'bi-dashboard':
        return <BIDashboard />;
      case 'workflow-management':
        return <WorkflowManagement />;
      default:
        return <MasterDataManagement />;
    }
  };

  const renderSystemModule = () => {
    switch (activeModule) {
      case 'user-management':
        return <UserManagement />;
      case 'role-permissions':
        return <RolePermissions />;
      default:
        return <UserManagement />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose}></div>
      
      <div className="absolute right-0 top-0 h-full w-full max-w-6xl bg-white shadow-xl">
        <div className="flex h-full">
          {/* Sidebar */}
          <div className="w-64 bg-gray-50 border-r border-gray-200 flex flex-col">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">系统设置</h2>
                <button
                  onClick={onClose}
                  className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <nav className="flex-1 p-4 space-y-2">
              <button
                onClick={() => setActiveTab('middleware')}
                className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-left transition-all duration-200 ${
                  activeTab === 'middleware'
                    ? 'bg-blue-50 text-blue-700 border border-blue-200'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                <Database className={`w-5 h-5 ${activeTab === 'middleware' ? 'text-blue-600' : 'text-gray-400'}`} />
                <span className="font-medium">中台层模块</span>
              </button>

              <button
                onClick={() => setActiveTab('system')}
                className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-left transition-all duration-200 ${
                  activeTab === 'system'
                    ? 'bg-blue-50 text-blue-700 border border-blue-200'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                <SettingsIcon className={`w-5 h-5 ${activeTab === 'system' ? 'text-blue-600' : 'text-gray-400'}`} />
                <span className="font-medium">系统设置</span>
              </button>

              <button
                onClick={() => setActiveTab('account')}
                className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-left transition-all duration-200 ${
                  activeTab === 'account'
                    ? 'bg-blue-50 text-blue-700 border border-blue-200'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                <Users className={`w-5 h-5 ${activeTab === 'account' ? 'text-blue-600' : 'text-gray-400'}`} />
                <span className="font-medium">账户管理</span>
              </button>
            </nav>

            <div className="p-4 border-t border-gray-200">
              <button className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-red-600 hover:bg-red-50 hover:text-red-700 transition-all duration-200">
                <LogOut className="w-5 h-5" />
                <span className="font-medium">退出登录</span>
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 flex flex-col">
            {activeTab === 'middleware' && (
              <>
                <div className="p-6 border-b border-gray-200 bg-white">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">🟧 中台层模块 (LABILLION 数据中台)</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {middlewareModules.map((module) => {
                      const Icon = module.icon;
                      const isActive = activeModule === module.id;
                      
                      return (
                        <button
                          key={module.id}
                          onClick={() => setActiveModule(module.id)}
                          className={`p-4 rounded-lg border transition-all duration-200 text-left ${
                            isActive
                              ? 'bg-blue-50 border-blue-200 shadow-sm'
                              : 'bg-white border-gray-200 hover:bg-gray-50 hover:border-gray-300'
                          }`}
                        >
                          <div className="flex items-center space-x-3">
                            <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${module.color} flex items-center justify-center`}>
                              <Icon className="w-5 h-5 text-white" />
                            </div>
                            <div>
                              <h4 className={`font-medium ${isActive ? 'text-blue-900' : 'text-gray-900'}`}>
                                {module.title}
                              </h4>
                              <p className="text-sm text-gray-600">{module.description}</p>
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
                <div className="flex-1 overflow-auto p-6 bg-gray-50">
                  {renderMiddlewareModule()}
                </div>
              </>
            )}

            {activeTab === 'system' && (
              <>
                <div className="p-6 border-b border-gray-200 bg-white">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">系统设置</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      onClick={() => setActiveModule('user-management')}
                      className={`p-4 rounded-lg border transition-all duration-200 text-left ${
                        activeModule === 'user-management'
                          ? 'bg-blue-50 border-blue-200 shadow-sm'
                          : 'bg-white border-gray-200 hover:bg-gray-50 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center">
                          <Users className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h4 className={`font-medium ${activeModule === 'user-management' ? 'text-blue-900' : 'text-gray-900'}`}>
                            用户管理
                          </h4>
                          <p className="text-sm text-gray-600">用户账户·组织架构</p>
                        </div>
                      </div>
                    </button>

                    <button
                      onClick={() => setActiveModule('role-permissions')}
                      className={`p-4 rounded-lg border transition-all duration-200 text-left ${
                        activeModule === 'role-permissions'
                          ? 'bg-blue-50 border-blue-200 shadow-sm'
                          : 'bg-white border-gray-200 hover:bg-gray-50 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                          <Shield className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h4 className={`font-medium ${activeModule === 'role-permissions' ? 'text-blue-900' : 'text-gray-900'}`}>
                            角色权限
                          </h4>
                          <p className="text-sm text-gray-600">角色定义·权限分配</p>
                        </div>
                      </div>
                    </button>
                  </div>
                </div>
                <div className="flex-1 overflow-auto p-6 bg-gray-50">
                  {renderSystemModule()}
                </div>
              </>
            )}

            {activeTab === 'account' && (
              <div className="flex-1 p-6 bg-gray-50">
                <div className="max-w-2xl">
                  <h3 className="text-xl font-semibold text-gray-900 mb-6">账户管理</h3>
                  
                  <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
                    <h4 className="text-lg font-medium text-gray-900 mb-4">个人信息</h4>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">用户名</label>
                        <input type="text" value="李博士" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">邮箱</label>
                        <input type="email" value="li.doctor@labillion.com" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">角色</label>
                        <input type="text" value="实验室主管" disabled className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500" />
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg border border-gray-200 p-6">
                    <h4 className="text-lg font-medium text-gray-900 mb-4">安全设置</h4>
                    <div className="space-y-4">
                      <button className="w-full text-left px-4 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                        <div className="font-medium text-gray-900">修改密码</div>
                        <div className="text-sm text-gray-600">更新您的登录密码</div>
                      </button>
                      <button className="w-full text-left px-4 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                        <div className="font-medium text-gray-900">双因素认证</div>
                        <div className="text-sm text-gray-600">增强账户安全性</div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}