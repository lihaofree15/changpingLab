import React from 'react';
import { StatsGrid } from './dashboard/StatsGrid';
import { SystemStatus } from './dashboard/SystemStatus';
import { WorkflowMonitor } from './dashboard/WorkflowMonitor';
import { RecentActivity } from './dashboard/RecentActivity';
import { CapacityOverview } from './dashboard/CapacityOverview';

export function Dashboard() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Laboratory Operations Dashboard</h1>
          <p className="text-gray-600 mt-1">Real-time monitoring of integrated laboratory systems</p>
        </div>
        <div className="text-sm text-gray-500">
          Last updated: {new Date().toLocaleString()}
        </div>
      </div>

      <StatsGrid />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SystemStatus />
        <WorkflowMonitor />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <CapacityOverview />
        </div>
        <RecentActivity />
      </div>
    </div>
  );
}