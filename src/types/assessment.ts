export interface Assessment {
  id: string;
  submittedAt: string;
  status: 'pending' | 'approved' | 'rejected' | 'needs_info';
  vendorName: string;
  serviceName: string;
  deploymentType: string;
  useCase: string;
  numUsers: number;
  numRecords: number;
  vendorWebsite?: string;
  contactInfo: {
    name: string;
    email: string;
    phone: string;
  };
  documents: {
    certifications: string[];
    additional: string[];
  };
  reviewerNotes?: string;
  lastUpdated: string;
}