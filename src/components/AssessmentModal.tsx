import React, { useState } from 'react';
import { X, FileText, Download, User, Mail, Phone } from 'lucide-react';
import { format } from 'date-fns';
import { Assessment } from '../types/assessment';

interface AssessmentModalProps {
  assessment: Assessment;
  onClose: () => void;
  onUpdateStatus: (status: Assessment['status']) => void;
}

export function AssessmentModal({ assessment, onClose, onUpdateStatus }: AssessmentModalProps) {
  const [notes, setNotes] = useState(assessment.reviewerNotes || '');

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            Assessment Details
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Vendor Information</h3>
              <dl className="space-y-3">
                <div>
                  <dt className="text-sm font-medium text-gray-500">Vendor Name</dt>
                  <dd className="mt-1 text-sm text-gray-900">{assessment.vendorName}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Service Name</dt>
                  <dd className="mt-1 text-sm text-gray-900">{assessment.serviceName}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Deployment Type</dt>
                  <dd className="mt-1 text-sm text-gray-900">{assessment.deploymentType}</dd>
                </div>
              </dl>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Contact Information</h3>
              <dl className="space-y-3">
                <div className="flex items-center">
                  <User className="h-4 w-4 text-gray-400 mr-2" />
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Name</dt>
                    <dd className="mt-1 text-sm text-gray-900">{assessment.contactInfo.name}</dd>
                  </div>
                </div>
                <div className="flex items-center">
                  <Mail className="h-4 w-4 text-gray-400 mr-2" />
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Email</dt>
                    <dd className="mt-1 text-sm text-gray-900">{assessment.contactInfo.email}</dd>
                  </div>
                </div>
                <div className="flex items-center">
                  <Phone className="h-4 w-4 text-gray-400 mr-2" />
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Phone</dt>
                    <dd className="mt-1 text-sm text-gray-900">{assessment.contactInfo.phone}</dd>
                  </div>
                </div>
              </dl>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Use Case</h3>
            <p className="text-sm text-gray-600 whitespace-pre-wrap">{assessment.useCase}</p>
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Documents</h3>
            
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-2">Security Certifications</h4>
                <div className="space-y-2">
                  {assessment.documents.certifications.map((doc, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center">
                        <FileText className="h-5 w-5 text-gray-400 mr-2" />
                        <span className="text-sm text-gray-900">{doc}</span>
                      </div>
                      <button className="text-indigo-600 hover:text-indigo-700">
                        <Download className="h-5 w-5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-2">Additional Documents</h4>
                <div className="space-y-2">
                  {assessment.documents.additional.map((doc, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center">
                        <FileText className="h-5 w-5 text-gray-400 mr-2" />
                        <span className="text-sm text-gray-900">{doc}</span>
                      </div>
                      <button className="text-indigo-600 hover:text-indigo-700">
                        <Download className="h-5 w-5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Review Notes</h3>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={4}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="Add your review notes here..."
            />
          </div>

          <div className="mt-6 flex justify-between items-center">
            <div className="text-sm text-gray-500">
              Submitted: {format(new Date(assessment.submittedAt), 'PPP')}
            </div>
            <div className="space-x-3">
              <button
                onClick={() => onUpdateStatus('needs_info')}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Request More Info
              </button>
              <button
                onClick={() => onUpdateStatus('rejected')}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Reject
              </button>
              <button
                onClick={() => onUpdateStatus('approved')}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Approve
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}