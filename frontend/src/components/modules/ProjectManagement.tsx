import React from 'react';
import { Plus, Users, FolderOpen, Shield, Activity, Calendar, TrendingUp } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

export function ProjectManagement() {
  const { t } = useLanguage();

  const stats = [
    { label: t('project.active'), value: '23', icon: FolderOpen, color: 'from-blue-500 to-cyan-500' },
    { label: t('project.users'), value: '156', icon: Users, color: 'from-green-500 to-teal-500' },
    { label: t('project.permissions'), value: '8', icon: Shield, color: 'from-purple-500 to-pink-500' },
    { label: '样本总数', value: '12,847', icon: Activity, color: 'from-orange-500 to-red-500' }
  ];

  const projects = [
    {
      id: 'GWAS-2024-001',
      name: '糖尿病GWAS研究',
      pi: '张伟博士',
      status: 'active',
      progress: 67,
      samples: 2000,
      startDate: '2024-01-01',
      team: 12
    },
    {
      id: 'CANCER-2024-002', 
      name: '肺癌基因组学研究',
      pi: '李明博士',
      status: 'active',
      progress: 34,
      samples: 1500,
      startDate: '2024-02-15',
      team: 8
    },
    {
      id: 'PHARM-2024-003',
      name: '药物基因组学面板',
      pi: '王雷博士',
      status: 'planning',
      progress: 8,
      samples: 800,
      startDate: '2024-03-01',
      team: 6
    }
  ];

  const recentActivities = [
    { action: '创建新项目', project: 'GWAS-2024-001', user: '张伟博士', time: '2小时前' },
    { action: '添加团队成员', project: 'CANCER-2024-002', user: '李明博士', time: '4小时前' },
    { action: '更新权限配置', project: 'PHARM-2024-003', user: '王雷博士', time: '6小时前' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">{t('project.title')}</h1>
          <p className="text-slate-400 mt-2">{t('project.subtitle')}</p>
        </div>
        <button className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-6 py-3 rounded-lg hover:from-cyan-600 hover:to-blue-600 transition-all duration-200 flex items-center space-x-2 shadow-lg">
          <Plus className="w-5 h-5" />
          <span>{t('project.create')}</span>
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
                <TrendingUp className="w-5 h-5 text-green-400" />
              </div>
              <div className="mt-4">
                <h3 className="text-2xl font-bold text-white">{stat.value}</h3>
                <p className="text-slate-400 text-sm mt-1">{stat.label}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Projects List */}
        <div className="lg:col-span-2 bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50">
          <div className="p-6 border-b border-slate-700/50">
            <h2 className="text-xl font-semibold text-white">活跃项目</h2>
          </div>
          <div className="p-6 space-y-4">
            {projects.map((project) => (
              <div key={project.id} className="bg-slate-700/30 rounded-lg p-4 border border-slate-600/30 hover:border-slate-500/50 transition-all duration-200">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold text-white">{project.name}</h3>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        project.status === 'active' ? 'bg-green-500/20 text-green-400' :
                        project.status === 'planning' ? 'bg-blue-500/20 text-blue-400' :
                        'bg-gray-500/20 text-gray-400'
                      }`}>
                        {project.status === 'active' ? '进行中' : project.status === 'planning' ? '计划中' : '已完成'}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm text-slate-400 mb-3">
                      <div>项目ID: <span className="text-slate-300">{project.id}</span></div>
                      <div>负责人: <span className="text-slate-300">{project.pi}</span></div>
                      <div>样本数: <span className="text-slate-300">{project.samples}</span></div>
                      <div>团队: <span className="text-slate-300">{project.team}人</span></div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-400">项目进度</span>
                        <span className="text-slate-300">{project.progress}%</span>
                      </div>
                      <div className="w-full bg-slate-600 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${project.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50">
          <div className="p-6 border-b border-slate-700/50">
            <h2 className="text-xl font-semibold text-white">{t('project.recent')}</h2>
          </div>
          <div className="p-6 space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2"></div>
                <div className="flex-1">
                  <p className="text-sm text-white font-medium">{activity.action}</p>
                  <p className="text-xs text-slate-400 mt-1">{activity.project} • {activity.user}</p>
                  <p className="text-xs text-slate-500 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}