import React, { useState } from 'react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  SortingState,
} from '@tanstack/react-table';
import { format } from 'date-fns';
import { ChevronDown, ChevronUp, Search, Filter } from 'lucide-react';
import { Assessment } from '../types/assessment';
import { StatusBadge } from '../components/StatusBadge';
import { AssessmentModal } from '../components/AssessmentModal';

const columnHelper = createColumnHelper<Assessment>();

const columns = [
  columnHelper.accessor('submittedAt', {
    header: 'Submitted',
    cell: info => format(new Date(info.getValue()), 'MMM d, yyyy'),
  }),
  columnHelper.accessor('vendorName', {
    header: 'Vendor',
  }),
  columnHelper.accessor('serviceName', {
    header: 'Service',
  }),
  columnHelper.accessor('deploymentType', {
    header: 'Type',
  }),
  columnHelper.accessor('status', {
    header: 'Status',
    cell: info => <StatusBadge status={info.getValue()} />,
  }),
  columnHelper.accessor('lastUpdated', {
    header: 'Last Updated',
    cell: info => format(new Date(info.getValue()), 'MMM d, yyyy'),
  }),
];

export function AdminDashboard() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [selectedAssessment, setSelectedAssessment] = useState<Assessment | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<Assessment['status'] | 'all'>('all');

  // Mock data - in real app, fetch from API
  const [data] = useState<Assessment[]>([
    {
      id: '1',
      submittedAt: '2024-03-10T10:00:00Z',
      status: 'pending',
      vendorName: 'CloudTech Solutions',
      serviceName: 'Data Storage Service',
      deploymentType: 'SaaS (Software as a Service)',
      useCase: 'Cloud storage for company documents',
      numUsers: 50,
      numRecords: 10000,
      contactInfo: {
        name: 'John Doe',
        email: 'john@cloudtech.com',
        phone: '123-456-7890',
      },
      documents: {
        certifications: ['ISO27001.pdf'],
        additional: ['SLA.pdf', 'NDA.pdf'],
      },
      lastUpdated: '2024-03-10T10:00:00Z',
    },
    // Add more mock data as needed
  ]);

  const filteredData = data.filter(assessment => {
    const matchesSearch = 
      assessment.vendorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      assessment.serviceName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || assessment.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const table = useReactTable({
    data: filteredData,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h1 className="text-2xl font-semibold text-gray-900">Vendor Risk Assessments</h1>
          </div>

          <div className="p-6">
            <div className="flex gap-4 mb-6">
              <div className="flex-1 relative">
                <input
                  type="text"
                  placeholder="Search vendors or services..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>

              <div className="relative">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as Assessment['status'] | 'all')}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 appearance-none"
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                  <option value="needs_info">Needs Info</option>
                </select>
                <Filter className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  {table.getHeaderGroups().map(headerGroup => (
                    <tr key={headerGroup.id}>
                      {headerGroup.headers.map(header => (
                        <th
                          key={header.id}
                          onClick={header.column.getToggleSortingHandler()}
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                        >
                          <div className="flex items-center gap-2">
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                            {header.column.getIsSorted() && (
                              {
                                asc: <ChevronUp className="h-4 w-4" />,
                                desc: <ChevronDown className="h-4 w-4" />,
                              }[header.column.getIsSorted() as string]
                            )}
                          </div>
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {table.getRowModel().rows.map(row => (
                    <tr
                      key={row.id}
                      onClick={() => setSelectedAssessment(row.original)}
                      className="hover:bg-gray-50 cursor-pointer"
                    >
                      {row.getVisibleCells().map(cell => (
                        <td
                          key={cell.id}
                          className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {selectedAssessment && (
        <AssessmentModal
          assessment={selectedAssessment}
          onClose={() => setSelectedAssessment(null)}
          onUpdateStatus={(status) => {
            console.log('Update status:', status);
            // In a real app, make API call to update status
            setSelectedAssessment(null);
          }}
        />
      )}
    </div>
  );
}