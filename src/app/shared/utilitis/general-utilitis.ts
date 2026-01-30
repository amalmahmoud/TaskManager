export interface DueDateStatus {
  label: string;
  severity: 'success' | 'warning' | 'danger' | 'info';
}

export const SEVERITY_MAP = {
  danger: 'text-red-500 font-bold',
  warning: 'text-orange-500',
  info: 'text-blue-500',
  success: 'text-green-500'
};

export function calculateDueDateStatus(dueDate: string | Date,completedAt?: string | Date): DueDateStatus {


if (completedAt) {
    const finishDate = new Date(completedAt);
    const today = new Date();
    
    today.setHours(0, 0, 0, 0);
    finishDate.setHours(0, 0, 0, 0);

    const diffTime = today.getTime() - finishDate.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return { label: 'Completed today', severity: 'success' };
    if (diffDays === 1) return { label: 'Completed yesterday', severity: 'success' };
    if (diffDays < 7) return { label: `Completed ${diffDays} days ago`, severity: 'success' };
    if (diffDays >= 7 && diffDays < 14) return { label: 'Completed Last Week', severity: 'success' };

    const monthDiff = (today.getFullYear() - finishDate.getFullYear()) * 12 + (today.getMonth() - finishDate.getMonth());

    if (monthDiff === 0) return { label: 'Completed earlier this month', severity: 'success' };
    if (monthDiff === 1) return { label: 'Completed Last Month', severity: 'success' };
    if (monthDiff > 1 && monthDiff < 12) return { label: `Completed ${monthDiff} months ago`, severity: 'success' };

    return { 
      label: `Completed ${finishDate.toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}`, 
      severity: 'success' 
    };
  }
  const targetDate = new Date(dueDate);
  const today = new Date();
  
  today.setHours(0, 0, 0, 0);
  targetDate.setHours(0, 0, 0, 0);

  const diffTime = targetDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays < 0) return { label: 'Overdue', severity: 'danger' };
  if (diffDays === 0) return { label: 'Due Today', severity: 'warning' };
  if (diffDays === 1) return { label: 'Due Tomorrow', severity: 'info' };
  if (diffDays < 7) return { label: `Due in ${diffDays} days`, severity: 'info' };
  if (diffDays < 30) {
    const weeks = Math.floor(diffDays / 7);
    return { label: `Due in ${weeks} week${weeks > 1 ? 's' : ''}`, severity: 'success' };
  }

  const monthDiff = (targetDate.getFullYear() - today.getFullYear()) * 12 + (targetDate.getMonth() - today.getMonth());

  if (monthDiff === 1) {
    return { label: 'Due next month', severity: 'success' };
  } 
  if (monthDiff > 1 && monthDiff < 12) {
    return { label: `Due in ${monthDiff} months`, severity: 'success' };
  }

  return { 
    label: targetDate.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }), 
    severity: 'success' 
  };
}