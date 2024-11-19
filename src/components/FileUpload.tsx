import React from 'react';
import { Upload } from 'lucide-react';

interface FileUploadProps {
  accept?: string;
  multiple?: boolean;
  onChange: (files: FileList | null) => void;
}

export function FileUpload({ accept, multiple, onChange }: FileUploadProps) {
  return (
    <div className="relative">
      <input
        type="file"
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        accept={accept}
        multiple={multiple}
        onChange={(e) => onChange(e.target.files)}
      />
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors">
        <Upload className="w-8 h-8 text-gray-400 mb-2" />
        <p className="text-sm text-gray-600">
          Drag and drop files here, or click to select
        </p>
      </div>
    </div>
  );
}