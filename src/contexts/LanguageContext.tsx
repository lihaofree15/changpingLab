import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'zh' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  zh: {
    // Header
    'search.placeholder': '搜索样本、项目或分析结果...',
    'notifications': '通知',
    'profile.name': '李博士',
    'profile.role': '实验室主管',
    'language.switch': '切换语言',
    
    // Navigation Cards
    'nav.project-management': '项目与用户管理',
    'nav.sample-reception': '样本接收与登记',
    'nav.sample-preparation': '样本出库与实验准备',
    'nav.wetlab-control': '湿实验过程控制',
    'nav.sequencing-data': '测序数据管理',
    'nav.analysis-results': '分析与回传',
    'nav.quality-bi': 'QA/QC与BI洞察',
    
    // Project Management
    'project.title': '项目与用户管理',
    'project.subtitle': '主数据管理 - 项目/人员/权限',
    'project.create': '创建项目',
    'project.active': '活跃项目',
    'project.users': '用户总数',
    'project.permissions': '权限组',
    'project.recent': '最近活动',
    
    // Sample Reception
    'sample.reception.title': '样本接收与登记',
    'sample.reception.subtitle': '三维样本库系统 + 样本主数据管理',
    'sample.batch.import': '批量导入',
    'sample.barcode.scan': '条码扫描',
    'sample.location.view': '位置视图',
    
    // Common
    'status.online': '在线',
    'status.processing': '处理中',
    'status.completed': '已完成',
    'status.pending': '待处理',
    'view.details': '查看详情',
    'export.report': '导出报告',
    'refresh.data': '刷新数据'
  },
  en: {
    // Header
    'search.placeholder': 'Search samples, projects, or analysis results...',
    'notifications': 'Notifications',
    'profile.name': 'Dr. Li',
    'profile.role': 'Lab Manager',
    'language.switch': 'Switch Language',
    
    // Navigation Cards
    'nav.project-management': 'Project & User Management',
    'nav.sample-reception': 'Sample Reception & Registration',
    'nav.sample-preparation': 'Sample Preparation & Outbound',
    'nav.wetlab-control': 'Wet Lab Process Control',
    'nav.sequencing-data': 'Sequencing Data Management',
    'nav.analysis-results': 'Analysis & Results',
    'nav.quality-bi': 'QA/QC & BI Insights',
    
    // Project Management
    'project.title': 'Project & User Management',
    'project.subtitle': 'Master Data Management - Projects/Personnel/Permissions',
    'project.create': 'Create Project',
    'project.active': 'Active Projects',
    'project.users': 'Total Users',
    'project.permissions': 'Permission Groups',
    'project.recent': 'Recent Activity',
    
    // Sample Reception
    'sample.reception.title': 'Sample Reception & Registration',
    'sample.reception.subtitle': '3D Sample Library System + Sample Master Data Management',
    'sample.batch.import': 'Batch Import',
    'sample.barcode.scan': 'Barcode Scan',
    'sample.location.view': 'Location View',
    
    // Common
    'status.online': 'Online',
    'status.processing': 'Processing',
    'status.completed': 'Completed',
    'status.pending': 'Pending',
    'view.details': 'View Details',
    'export.report': 'Export Report',
    'refresh.data': 'Refresh Data'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('zh');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}