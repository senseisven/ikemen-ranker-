export interface Submission {
  id: string;
  name: string;
  category: string;
  links: string;
  reason: string;
  submittedAt: string;
}

const SUBMISSIONS_KEY = 'ikemen_submissions';

export const getSubmissions = (): Submission[] => {
  if (typeof window === 'undefined') return [];
  try {
    const stored = localStorage.getItem(SUBMISSIONS_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

export const addSubmission = (data: Omit<Submission, 'id' | 'submittedAt'>): Submission => {
  const submission: Submission = {
    ...data,
    id: `sub-${Date.now()}`,
    submittedAt: new Date().toISOString()
  };
  
  try {
    const submissions = getSubmissions();
    submissions.push(submission);
    localStorage.setItem(SUBMISSIONS_KEY, JSON.stringify(submissions));
  } catch {
    // Silent fail for localStorage issues
  }
  
  return submission;
};
