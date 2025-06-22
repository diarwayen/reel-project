import React from 'react';
import dynamic from 'next/dynamic';
import ConnectPort from '@/components/ConnectPort';
import LogGrid from '@/components/LogGrid';
import FilterPanel from '@/components/FilterPanel';
import LiveUpdateToggle from '@/components/LiveUpdateToggle';
import ExportButton from '@/components/ExportButton';
import ClearLogsButton from '@/components/ClearLogsButton';
import LogDetailsModal from '@/components/LogDetailsModal';
import { Server, Eye } from 'lucide-react';

const ThreadPulseChart = dynamic(() => import('@/components/ThreadPulseChart'), { ssr: false });

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto p-6 max-w-7xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-600 rounded-lg">
              <Server className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-200">
                LogViewer Pro
              </h1>
              <p className="text-slate-600 dark:text-slate-400">
                Real-time log monitoring and analysis
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Eye className="h-5 w-5 text-slate-500" />
            <span className="text-sm text-slate-600 dark:text-slate-400">
              Professional Edition
            </span>
          </div>
        </div>

        {/* Connection Section */}
        <div className="mb-6">
          <ConnectPort />
        </div>

        {/* Controls Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="flex items-center gap-2">
            <LiveUpdateToggle />
          </div>
          <div className="flex items-center gap-2 justify-center">
            <ExportButton />
          </div>
          <div className="flex items-center gap-2 justify-end">
            <ClearLogsButton />
          </div>
        </div>

        {/* Thread Pulse Chart */}
        <div className="mb-6">
          <ThreadPulseChart />
        </div>

        {/* Filters */}
        <div className="mb-6">
          <FilterPanel />
        </div>

        {/* Log Grid */}
        <div className="mb-6">
          <LogGrid />
        </div>

        {/* Modal */}
        <LogDetailsModal />
      </div>
    </div>
  );
}