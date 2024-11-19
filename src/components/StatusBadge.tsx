import React from 'react';
import { Assessment } from '../types/assessment';

const statusConfig = {
  pending: {
    color: 'bg-yellow-100 text-yellow-800',
    label: 'Pending Review',
  },
  approved: {
    color: 'bg-green-100 text-green-800',
    label: 'Approved',
  },
  rejected: {
    color: 'bg-red-100 text-red-800',
    label: 'Rejected',
  },
  needs_info: {
    color: 'bg-blue-100 text-blue-800',
    label: 'Needs Info',
  },
};

interface StatusBadgeProps {
  status: Assessment['status'];
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const config = statusConfig[status];
  
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
      {config.label}
    </span>
  );
}