import React from 'react';
import { 
  Package, 
  TestTube, 
  Dna, 
  Cpu, 
  BarChart3, 
  ArrowRight
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface NavigationCardsProps {
  activeModule: string;
  onModuleChange: (module: string) => void;
}

export function NavigationCards({ activeModule, onModuleChange }: NavigationCardsProps) {
  const { t } = useLanguage();

  const applicationModules = [
    {
      id: 'reagent-management',
      icon: Package,
      title: '试剂库房管理',
      description: '试剂入库·库存·领用',
      color: 'from-emerald-500 to-green-500',
      status: 'active'
    },
    {
      id: 'sample-library',
      icon: TestTube,
      title: '样本库管理',
      description: '样本登记·库位·批量操作',
      color: 'from-blue-500 to-cyan-500',
      status: 'active'
    },
    {
      id: 'library-preparation',
      icon: Dna,
      title: '建库与抽提',
      description: '抽提计划·质控·失败上报',
      color: 'from-purple-500 to-pink-500',
      status: 'processing'
    },
    {
      id: 'sequencing-management',
      icon: Cpu,
      title: '测序管理',
      description: '上机任务·Lane分配·拆分',
      color: 'from-orange-500 to-red-500',
      status: 'processing'
    },
    {
      id: 'data-analysis',
      icon: BarChart3,
      title: '数据分析',
      description: 'Pipeline·结果回传·报告',
      color: 'from-indigo-500 to-purple-500',
      status: 'active'
    }
  ];

  return (
    <div className="px-6 py-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 px-2">🔹 应用层模块 (试剂库房 → 样本库 → 建库抽提 → 测序 → 分析)</h2>
          <div className="relative">
            {/* Flow Connection Lines */}
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-300/50 via-indigo-300/50 to-purple-300/50 transform -translate-y-1/2 z-0"></div>
            
            <div className="relative z-10 grid grid-cols-5 gap-4">
              {applicationModules.map((module, index) => {
                const Icon = module.icon;
                const isActive = activeModule === module.id;
                
                return (
                  <div key={module.id} className="relative">
                    <button
                      onClick={() => onModuleChange(module.id)}
                      className={`w-full p-4 rounded-xl border transition-all duration-300 hover:scale-105 ${
                        isActive
                          ? 'bg-white border-blue-300 shadow-lg shadow-blue-500/20'
                          : 'bg-white/70 border-gray-200 hover:bg-white hover:border-gray-300'
                      }`}
                    >
                      <div className="flex flex-col items-center space-y-3">
                        <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${module.color} flex items-center justify-center shadow-lg`}>
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        
                        <div className="text-center">
                          <h3 className={`text-sm font-semibold ${isActive ? 'text-gray-900' : 'text-gray-700'}`}>
                            {module.title}
                          </h3>
                          <p className="text-xs text-gray-500 mt-1">{module.description}</p>
                        </div>
                        
                        <div className="flex items-center space-x-1">
                          <div className={`w-2 h-2 rounded-full ${
                            module.status === 'active' ? 'bg-green-500' : 
                            module.status === 'processing' ? 'bg-orange-500 animate-pulse' : 'bg-gray-400'
                          }`}></div>
                          <span className="text-xs text-gray-500">
                            {module.status === 'active' ? '运行中' : 
                             module.status === 'processing' ? '处理中' : '离线'}
                          </span>
                        </div>
                      </div>
                    </button>
                    
                    {/* Flow Arrow */}
                    {index < applicationModules.length - 1 && (
                      <div className="absolute top-1/2 -right-2 transform -translate-y-1/2 z-20">
                        <div className="w-4 h-4 bg-white rounded-full border-2 border-blue-300 flex items-center justify-center">
                          <ArrowRight className="w-2 h-2 text-blue-500" />
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}