import { useState } from 'react';

interface FormData {
  vendorName: string;
  serviceName: string;
  deploymentType: string;
  useCase: string;
  numUsers: string;
  numRecords: string;
  vendorWebsite: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
}

interface SubmissionState {
  isSubmitting: boolean;
  isSuccess: boolean;
  error: string | null;
}

export function useFormSubmission() {
  const [submissionState, setSubmissionState] = useState<SubmissionState>({
    isSubmitting: false,
    isSuccess: false,
    error: null,
  });

  const submitForm = async (formData: FormData) => {
    setSubmissionState({ isSubmitting: true, isSuccess: false, error: null });

    try {
      // Simulate API call with 1s delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Here you would typically make an API call to submit the form data
      // For now, we'll just log it to the console
      console.log('Form submitted successfully:', formData);

      setSubmissionState({
        isSubmitting: false,
        isSuccess: true,
        error: null,
      });
    } catch (error) {
      setSubmissionState({
        isSubmitting: false,
        isSuccess: false,
        error: 'An error occurred while submitting the form. Please try again.',
      });
    }
  };

  return {
    ...submissionState,
    submitForm,
    resetSubmission: () => setSubmissionState({
      isSubmitting: false,
      isSuccess: false,
      error: null,
    }),
  };
}