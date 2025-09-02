import { toast as sonnerToast } from "sonner";
import { CheckCircle2, AlertTriangle, XCircle, Info } from "lucide-react";
import React from "react";

type ToastType = "success" | "warning" | "error" | "info";

interface ShowToastProps {
  type: ToastType;
  title: string;
  description?: string;
  duration?: number;
}

const getToastIcon = (type: ToastType) => {
  switch (type) {
    case "success":
      return (<CheckCircle2 className="h-5 w-5 text-green-500 dark:text-green-400" />);
    case "warning":
      return (<AlertTriangle className="h-5 w-5 text-yellow-500 dark:text-yellow-400" />);
    case "error":
      return (<XCircle className="h-5 w-5 text-red-500 dark:text-red-400" />);
    case "info":
      return (<Info className="h-5 w-5 text-blue-500 dark:text-blue-400" />);
    default:
      return null;
  }
};

const getToastClassNames = (type: ToastType) => {
  const baseClasses = "bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-l-4";
  switch (type) {
    case "success":
      return `${baseClasses} border-green-500`;
    case "warning":
      return `${baseClasses} border-yellow-500`;
    case "error":
      return `${baseClasses} border-red-500`;
    case "info":
      return `${baseClasses} border-blue-500`;
    default:
      return `${baseClasses} border-gray-300 dark:border-gray-600`;
  }
};

const showToast = ({ type, title, description, duration = 5000 }: ShowToastProps) => {
  sonnerToast.custom(
    (t) => (
      <div
        className={`flex items-start w-full max-w-md p-4 rounded-lg shadow-lg ${getToastClassNames(type)}`}
        
      >
        <div className="flex-shrink-0 mt-0.5">
          {getToastIcon(type)}
        </div>
        <div className="ml-3 flex-1">
          <p className="text-sm font-semibold leading-none tracking-tight">{title}</p>
          {description && <p className="text-sm mt-1 opacity-90">{description}</p>}
        </div>
        <button
          onClick={() => sonnerToast.dismiss(t)}
          className={`ml-4 flex-shrink-0 opacity-70 hover:opacity-100 ${type === 'warning' ? 'text-gray-900' : 'text-white'}`}
        >
          <span className="sr-only">Close</span>
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    ),
    {
      duration,
      position: "top-right",
    }
  );
};

export { showToast }; 