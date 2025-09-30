import React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

type BreadcrumbItem = {
  label: string;
  href?: string;
};

type BreadcrumbProps = {
  items: BreadcrumbItem[];
};

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <nav className="flex mb-6" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-3">
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            {index > 0 && (
              <ChevronRight className="h-4 w-4 text-gray-400 mx-2" />
            )}
            {item.href ? (
              <Link 
                href={item.href} 
                className="text-sm font-medium text-gray-500 hover:text-[#002B50] transition-colors"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-sm font-medium text-gray-700">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;