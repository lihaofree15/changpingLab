import React from 'react';
import { Network, CheckCircle, AlertTriangle, XCircle, Activity, Zap } from 'lucide-react';

export function IntegrationStatus() {
  const integrations = [
    {
      system: 'Feishu Multi-dimensional Tables',
      description: 'Inventory and lightweight process management',
      status: 'Connected',
      lastSync: '2 minutes ago',
      endpoints: 8,
      health: 98,
      icon: '📊'
    },
    {
      system: '3D Sample Library System',
      description: 'Biological sample lifecycle management',
      status: 'Connected',
      lastSync: '5 minutes ago',
      endpoints: 12,
      health: 95,
      icon: '🧪'
    },
    {
      system: 'Bioligent LIMS',
      description: 'Laboratory information management system',
      status: 'Warning',
      lastSync: '15 minutes ago',
      endpoints: 15,
      health: 87,
      icon: '⚗️'
    },
    {
      system: 'Sequanta Flash System',
      description: 'Sequencing workflow management',
      status: 'Connected',
      lastSync: '3 minutes ago',
      endpoints: 6,
      health: 92,
      icon: '🧬'
    },
    {
      system: 'Tencent Cloud Omics',
      description: 'Cloud-based genomics analysis platform',
      status: 'Connected',
      lastSync: '1 minute ago',
      endpoints: 20,
      health: 99,
      icon: '☁️'
    }
  ];

  const apiMetrics = [
    { label: 'Total API Calls (24h)', value: '45,782', change: '+12%' },
    { label: 'Average Response Time', value: '145ms', change: '-5%' },
    { label: 'Success Rate', value: '99.2%', change: '+0.1%' },
    { label: 'Active Connections', value: '61', change: '+3' }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Connected':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'Warning':
        return <AlertTriangle className="w-5 h-5 text-orange-500" />;
      case 'Disconnected':
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Activity className="w-5 h-5 text-gray-500" />;
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">System Integration Status</h1>
          <p className="text-gray-600 mt-1">API Gateway and Enterprise Service Bus monitoring</p>
        </div>
        <div className="flex items-center space-x-2 text-sm text-green-600">
          <CheckCircle className="w-4 h-4" />
          <span>All Systems Operational</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {apiMetrics.map((metric, index) => (
          <div key={index} className="bg-white rounded-lg p-4 border border-gray-200">
            <h3 className="text-sm font-medium text-gray-600">{metric.label}</h3>
            <div className="flex items-center justify-between mt-2">
              <span className="text-2xl font-bold text-gray-900">{metric.value}</span>
              <span className="text-sm text-green-600">{metric.change}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <Network className="w-5 h-5 text-blue-600" />
            <h2 className="text-lg font-semibold text-gray-900">Connected Systems</h2>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {integrations.map((integration, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <div className="text-3xl">{integration.icon}</div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900">{integration.system}</h3>
                    <p className="text-gray-600 mt-1">{integration.description}</p>
                    
                    <div className="flex items-center space-x-6 mt-4">
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(integration.status)}
                        <span className={`text-sm font-medium ${
                          integration.status === 'Connected' ? 'text-green-600' : 
                          integration.status === 'Warning' ? 'text-orange-600' : 'text-red-600'
                        }`}>
                          {integration.status}
                        </span>
                      </div>
                      
                      <div className="text-sm text-gray-600">
                        <span className="font-medium">Last sync:</span> {integration.lastSync}
                      </div>
                      
                      <div className="text-sm text-gray-600">
                        <span className="font-medium">Endpoints:</span> {integration.endpoints}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-900">{integration.health}%</div>
                  <div className="text-sm text-gray-600">Health Score</div>
                  <div className="w-24 bg-gray-200 rounded-full h-2 mt-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-300 ${
                        integration.health > 95 ? 'bg-green-500' :
                        integration.health > 85 ? 'bg-orange-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${integration.health}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Zap className="w-5 h-5 text-blue-600" />
          <h2 className="text-lg font-semibold text-gray-900">Integration Architecture</h2>
        </div>
        
        <div className="bg-blue-50 rounded-lg p-6">
          <div className="text-center">
            <div className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold mb-4">
              Data Middle Platform (Central Hub)
            </div>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mt-6">
              {integrations.map((system, index) => (
                <div key={index} className="bg-white rounded-lg p-3 text-center border">
                  <div className="text-xl mb-2">{system.icon}</div>
                  <div className="text-sm font-medium text-gray-900">{system.system.split(' ')[0]}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}