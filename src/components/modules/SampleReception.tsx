import React from 'react';
import { Upload, QrCode, Map, Plus, Search, Filter } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

export function SampleReception() {
  const { t } = useLanguage();

  const stats = [
    { label: '今日接收', value: '156', color: 'from-green-500 to-teal-500' },
    { label: '待处理', value: '23', color: 'from-orange-500 to-red-500' },
    { label: '库存总数', value: '12,847', color: 'from-blue-500 to-cyan-500' },
    { label: '存储位置', value: '2,340', color: 'from-purple-500 to-pink-500' }
  ];

  const recentSamples = [
    {
      id: 'SMPL-2024-001547',
      externalId: 'COHORT-A-0001',
      type: '全血',
      location: 'A1-B2-C3',
      status: 'received',
      time: '10:30'
    },
    {
      id: 'SMPL-2024-001548', 
      externalId: 'COHORT-A-0002',
      type: '唾液',
      location: 'A1-B2-C4',
      status: 'processing',
      time: '10:25'
    },
    {
      id: 'SMPL-2024-001549',
      externalId: 'COHORT-B-0001',
      type: '血浆',
      location: 'A2-B1-C1',
      status: 'stored',
      time: '10:20'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">{t('sample.reception.title')}</h1>
          <p className="text-slate-400 mt-2">{t('sample.reception.subtitle')}</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="bg-gradient-to-r from-green-500 to-teal-500 text-white px-4 py-2 rounded-lg hover:from-green-600 hover:to-teal-600 transition-all duration-200 flex items-center space-x-2">
            <Upload className="w-4 h-4" />
            <span>{t('sample.batch.import')}</span>
          </button>
          <button className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-4 py-2 rounded-lg hover:from-blue-600 hover:to-cyan-600 transition-all duration-200 flex items-center space-x-2">
            <QrCode className="w-4 h-4" />
            <span>{t('sample.barcode.scan')}</span>
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
            <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center mb-4`}>
              <div className="w-6 h-6 bg-white/20 rounded"></div>
            </div>
            <h3 className="text-2xl font-bold text-white">{stat.value}</h3>
            <p className="text-slate-400 text-sm mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sample List */}
        <div className="lg:col-span-2 bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50">
          <div className="p-6 border-b border-slate-700/50">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-white">最近接收样本</h2>
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="搜索样本..."
                    className="pl-10 pr-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white placeholder-slate-400 text-sm"
                  />
                </div>
                <button className="p-2 text-slate-400 hover:text-white hover:bg-slate-700/50 rounded-lg transition-colors">
                  <Filter className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentSamples.map((sample) => (
                <div key={sample.id} className="bg-slate-700/30 rounded-lg p-4 border border-slate-600/30 hover:border-slate-500/50 transition-all duration-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center">
                        <div className="w-5 h-5 bg-white/20 rounded"></div>
                      </div>
                      <div>
                        <h3 className="font-semibold text-white">{sample.id}</h3>
                        <p className="text-sm text-slate-400">{sample.externalId} • {sample.type}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          sample.status === 'received' ? 'bg-green-500/20 text-green-400' :
                          sample.status === 'processing' ? 'bg-orange-500/20 text-orange-400' :
                          'bg-blue-500/20 text-blue-400'
                        }`}>
                          {sample.status === 'received' ? '已接收' : 
                           sample.status === 'processing' ? '处理中' : '已存储'}
                        </span>
                      </div>
                      <p className="text-sm text-slate-400 mt-1">位置: {sample.location}</p>
                      <p className="text-xs text-slate-500">{sample.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 3D Location View */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50">
          <div className="p-6 border-b border-slate-700/50">
            <div className="flex items-center space-x-2">
              <Map className="w-5 h-5 text-cyan-400" />
              <h2 className="text-xl font-semibold text-white">{t('sample.location.view')}</h2>
            </div>
          </div>
          <div className="p-6">
            <div className="bg-slate-700/30 rounded-lg p-4 h-64 flex items-center justify-center border border-slate-600/30">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Map className="w-8 h-8 text-white" />
                </div>
                <p className="text-slate-400 text-sm">3D样本库可视化</p>
                <p className="text-slate-500 text-xs mt-1">点击查看详细位置信息</p>
              </div>
            </div>
            
            <div className="mt-4 space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-400">A区使用率</span>
                <span className="text-white">78%</span>
              </div>
              <div className="w-full bg-slate-600 rounded-full h-2">
                <div className="bg-gradient-to-r from-green-500 to-teal-500 h-2 rounded-full" style={{ width: '78%' }}></div>
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-400">B区使用率</span>
                <span className="text-white">65%</span>
              </div>
              <div className="w-full bg-slate-600 rounded-full h-2">
                <div className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full" style={{ width: '65%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}