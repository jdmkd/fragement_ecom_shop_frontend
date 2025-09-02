import { ReactNode } from "react";
import { X } from "lucide-react";
import { Link } from "react-router-dom";

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative bg-gray-100 dark:bg-gray-900">
      <Link to="/" className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
        <X className="h-6 w-6" />
      </Link>
      <main className="flex-1 flex items-center justify-center w-full">
        {children}
      </main>
    </div>
  );
};

export default AuthLayout; 