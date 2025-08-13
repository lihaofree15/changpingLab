import React from 'react';
import { FolderOpen, Calendar, Users, BarChart } from 'lucide-react';

export function ProjectManagement() {
  const projects = [
    {
      id: 'GWAS-2024-001',
      name: 'Diabetes GWAS Study',
      pi: 'Dr. Zhang Wei',
      status: 'Active',
      progress: 67,
      samplesTotal: 2000,
      samplesProcessed: 1340,
      startDate: '2024-01-01',
      expectedEnd: '2024-06-30',
      budget: '¥1,200,000',
      spent: '¥804,000'
    },
    {
      id: 'CANCER-2024-002',
      name: 'Lung Cancer Genomics',
      pi: 'Dr. Li Ming',
      status: 'Active',
      progress: 34,
      samplesTotal: 1500,
      samplesProcessed: 510,
      startDate: '2024-02-15',
      expectedEnd: '2024-08-15',
      budget: '¥800,000',
      spent: '¥272,000'
    },
    {
      id: 'PHARM-2024-003',
      name: 'Pharmacogenomics Panel',
      pi: 'Dr. Wang Lei',
      status: 'Planning',
      progress: 8,
      samplesTotal: 800,
      samplesProcessed: 64,
      startDate: '2024-03-01',
      expectedEnd: '2024-07-01',
      budget: '¥500,000',
      spent: '¥40,000'
    }
  ];

  const getStatusColor = (status: string) => {
    const colors = {
      'Active': 'bg-green-100 text-green-800',
      'Planning': 'bg-blue-100 text-blue-800',
      'Completed': 'bg-gray-100 text-gray-800',
      'On Hold': 'bg-orange-100 text-orange-800'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Project Management</h1>
          <p className="text-gray-600 mt-1">End-to-end project tracking and resource allocation</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          New Project
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Active Projects', value: '23', icon: FolderOpen, color: 'blue' },
          { label: 'Total Samples', value: '4,300', icon: BarChart, color: 'teal' },
          { label: 'Avg. Completion', value: '68%', icon: Calendar, color: 'green' },
          { label: 'Team Members', value: '45', icon: Users, color: 'orange' }
        ].map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-lg p-4 border border-gray-200">
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 rounded-lg bg-${stat.color}-100 flex items-center justify-center`}>
                  <Icon className={`w-5 h-5 text-${stat.color}-600`} />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-white rounded-xl border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Project Overview</h2>
        </div>

        <div className="divide-y divide-gray-200">
          {projects.map((project) => (
            <div key={project.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-3">
                    <h3 className="text-lg font-semibold text-gray-900">{project.name}</h3>
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(project.status)}`}>
                      {project.status}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <div className="text-sm text-gray-600">Project ID</div>
                      <div className="font-medium text-gray-900">{project.id}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Principal Investigator</div>
                      <div className="font-medium text-gray-900">{project.pi}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Timeline</div>
                      <div className="font-medium text-gray-900">{project.startDate} - {project.expectedEnd}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Budget Status</div>
                      <div className="font-medium text-gray-900">{project.spent} / {project.budget}</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">Sample Progress</span>
                        <span className="text-sm text-gray-600">{project.samplesProcessed} / {project.samplesTotal}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div 
                          className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                          style={{ width: `${(project.samplesProcessed / project.samplesTotal) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">Overall Progress</span>
                        <span className="text-sm text-gray-600">{project.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div 
                          className="bg-green-600 h-3 rounded-full transition-all duration-300"
                          style={{ width: `${project.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}