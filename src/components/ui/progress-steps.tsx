'use client';

import { Check } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const steps = [
  { id: '01', name: 'Setup', href: '/setup' },
  { id: '02', name: 'Portfolio', href: '/portfolio' },
  { id: '03', name: 'Results', href: '/results' },
];

export function ProgressSteps() {
  const pathname = usePathname();

  const getCurrentStep = () => {
    switch (pathname) {
      case '/setup':
        return 0;
      case '/portfolio':
        return 1;
      case '/results':
        return 2;
      default:
        return 0;
    }
  };

  const currentStep = getCurrentStep();

  return (
    <nav className="mb-8">
      <ol className="flex items-center justify-center space-x-4 md:space-x-8">
        {steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isCurrent = index === currentStep;

          const StepContent = (
            <div className="flex items-center group">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full border-2 transition-colors ${
                  isCompleted
                    ? 'bg-purple-600 border-purple-600 text-white'
                    : isCurrent
                    ? 'border-purple-600 text-purple-600 bg-white dark:bg-gray-950'
                    : 'border-gray-300 dark:border-gray-700 text-gray-500 dark:text-gray-400'
                } group-hover:border-purple-600 group-hover:text-purple-600`}
              >
                {isCompleted ? (
                  <Check className="h-5 w-5" />
                ) : (
                  <span className="text-sm font-medium">{step.id}</span>
                )}
              </div>
              <span
                className={`ml-3 text-sm font-medium transition-colors ${
                  index <= currentStep
                    ? 'text-purple-600 dark:text-purple-200'
                    : 'text-gray-500 dark:text-gray-400'
                } group-hover:text-purple-600`}
              >
                {step.name}
              </span>
            </div>
          );

          return (
            <li key={step.id} className="flex items-center">
              {isCompleted ? (
                <Link href={step.href} className="group">
                  {StepContent}
                </Link>
              ) : (
                <div className="cursor-default">{StepContent}</div>
              )}
              {index < steps.length - 1 && (
                <div className="hidden md:block ml-4 h-0.5 w-12 bg-gray-300 dark:bg-gray-700" />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
