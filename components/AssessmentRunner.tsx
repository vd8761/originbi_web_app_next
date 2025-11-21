'use client';

import React, { useState, useEffect, useRef } from 'react';
import CheckCircleIcon from './icons/CheckCircleIcon';
import StepperUpArrowIcon from './icons/StepperUpArrowIcon';
import StepperDownArrowIcon from './icons/StepperDownArrowIcon';
import StepperPendingDotIcon from './icons/StepperPendingDotIcon';

// --- Interfaces & Mock Data ---

interface Option {
  id: string;
  text: string;
}

interface Question {
  id: number;
  preamble?: string;
  text: string;
  options: Option[];
}

interface AssessmentRunnerProps {
  onBack: () => void;
}

const questions: Question[] = [
  {
    id: 1,
    // Split text to handle formatting: Preamble (Regular) + Text (Bold/New Line)
    preamble: "You walk into a lab and see a glowing blue liquid.",
    text: "What do you do?",
    options: [
      { id: 'a', text: "Ask the scientist what it is" },
      { id: 'b', text: "Watch from distance" },
      { id: 'c', text: "Take notes – could be useful later" },
      { id: 'd', text: "Wonder if it's safe to touch" },
    ]
  },
  {
    id: 2,
    preamble: "You want to finish a task early, but your team prefers last-minute work.",
    text: "How do you deal with it?",
    options: [
      { id: 'a', text: "Take notes - could be useful later" }, 
      { id: 'b', text: "Ask the scientist what it is" },
      { id: 'c', text: "Watch from distance" },
      { id: 'd', text: "Wonder if it's safe to touch" },
    ]
  },
];

// --- VerticalStepper Component ---

const VerticalStepper: React.FC<{ currentStep: number; totalSteps: number }> = ({ currentStep, totalSteps }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to active step
  useEffect(() => {
    if (containerRef.current) {
        // Simple logic to scroll the active element into view
        const activeElement = containerRef.current.querySelector(`[data-step="${currentStep}"]`);
        if (activeElement) {
            activeElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }
  }, [currentStep]);

  const renderSteps = () => {
    const steps = [];
    // Render all steps, let CSS/Scroll handle visibility window
    for (let i = 1; i <= totalSteps; i++) {
      const isActive = i === currentStep;
      const isCompleted = i < currentStep;

      steps.push(
        <div key={i} data-step={i} className="flex flex-col items-center relative shrink-0">
          {/* Connection Line */}
          {i > 1 && (
            <div className={`w-[2px] h-6 -mt-1 mb-1 relative z-0 transition-colors duration-300 ${isCompleted || isActive ? 'bg-[#1ED36A]' : 'bg-[#303438]'}`} />
          )}
          
          {/* Step Circle */}
          <div 
            className={`
              rounded-full flex items-center justify-center font-bold text-xs transition-all duration-300 relative z-20
              ${isActive 
                ? 'w-10 h-10 scale-110' // Active: Larger, Icon handling below
                : 'w-10 h-10 bg-[#24272B] border border-[#303438] text-[#718096] text-base' // Others: Dark circle, Number
              }
              ${isCompleted ? 'border-[#1ED36A] text-[#1ED36A]' : ''} 
            `}
          >
            {isActive ? (
                // Show Icon ONLY for Active Question
                <StepperPendingDotIcon className="w-12 h-12 drop-shadow-[0_0_8px_rgba(30,211,106,0.4)]" />
            ) : (
                // Show Number for Completed and Pending
                i
            )}
          </div>
        </div>
      );
    }
    return steps;
  };

  return (
    <div className="flex flex-col items-center w-16 pt-8 lg:pt-16 shrink-0 h-full">
      {/* Up Arrow Button */}
      <button className="p-2 text-[#718096] hover:text-[#1ED36A] transition-colors mb-2 border border-[#303438] rounded-full bg-[#1A1D21] z-10">
        <StepperUpArrowIcon className="w-4 h-4" />
      </button>
      
      {/* Stepper Steps Container */}
      <div 
        ref={containerRef}
        className="flex flex-col items-center my-2 max-h-[calc(100vh-300px)] overflow-y-auto scrollbar-hide [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']"
      >
        {renderSteps()}
      </div>

      {/* Down Arrow Button */}
      <button className="p-2 text-[#718096] hover:text-[#1ED36A] transition-colors mt-2 border border-[#303438] rounded-full bg-[#1A1D21] z-10">
        <StepperDownArrowIcon className="w-4 h-4" />
      </button>
    </div>
  );
};

// --- CircularProgress Component ---

const CircularProgress: React.FC<{ current: number; total: number }> = ({ current, total }) => {
    const percentage = Math.round((current / total) * 100);
    
    const radius = 36; 
    const stroke = 6;
    const normalizedRadius = radius - stroke / 2;
    const circumference = normalizedRadius * 2 * Math.PI;
    
    const strokeDashoffset = circumference - (percentage / 100) * circumference;
  
    return (
      <div className="relative w-[90px] h-[90px] flex items-center justify-center bg-[#1A1D21] rounded-full shadow-lg border border-[#24272B]">
        <svg height="100%" width="100%" className="transform -rotate-90 p-1">
           {/* Background Track */}
           <circle
             stroke="#303438"
             strokeWidth={stroke}
             fill="transparent"
             r={normalizedRadius}
             cx="50%"
             cy="50%"
           />
           {/* Progress Indicator */}
           <circle
             stroke="#1ED36A"
             strokeWidth={stroke}
             strokeDasharray={circumference + ' ' + circumference}
             style={{ strokeDashoffset, transition: 'stroke-dashoffset 0.5s ease-in-out' }}
             strokeLinecap="round"
             fill="transparent"
             r={normalizedRadius}
             cx="50%"
             cy="50%"
           />
        </svg>
        <div className="absolute flex flex-col items-center justify-center leading-none">
            <span className="text-xl font-bold text-white mb-0.5" style={{ fontSize: '20px', fontWeight: 500 }}>{percentage}%</span>
            <span className="text-[10px] text-[#A0AEC0] font-medium tracking-wide" style={{ fontSize: '16px', fontWeight: 600 }}>{current}/{total}</span>
        </div>
      </div>
    );
  };

// --- AssessmentRunner Component ---

const AssessmentRunner: React.FC<AssessmentRunnerProps> = ({ onBack }) => {
  const [currentQIndex, setCurrentQIndex] = useState(0); // Start at 0 (Q1)
  const [selectedOption, setSelectedOption] = useState<string | null>(null); 

  const currentQuestion = questions[currentQIndex % questions.length];
  const totalQuestions = 75;
  const currentNumber = currentQIndex + 1; 

  const handleOptionSelect = (id: string) => {
    setSelectedOption(id);
  };

  const handleNext = () => {
    if (currentNumber < totalQuestions) {
        setCurrentQIndex(prev => prev + 1);
        setSelectedOption(null); 
    } else {
        console.log('Assessment Completed!');
    }
  };

  return (
    <div className="flex justify-center bg-transparent w-full">
        <div className="flex flex-col lg:flex-row w-full h-full min-h-[calc(100vh-64px)] max-w-[1400px] gap-6 lg:gap-16 px-4 pb-4">
            
            {/* Left Sidebar - Vertical Stepper (Hidden on mobile) */}
            <div className="hidden lg:flex flex-col items-center w-24 shrink-0">
               <VerticalStepper currentStep={currentNumber} totalSteps={totalQuestions} />
            </div>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col relative min-w-0">
                
                {/* Top Progress Indicator (Desktop - positioned absolute) */}
                <div className="absolute -top-12 right-0 hidden lg:block z-10">
                    <CircularProgress current={currentNumber} total={totalQuestions} />
                </div>
                {/* Mobile Progress (Flex-end) */}
                <div className="lg:hidden flex justify-end mb-6 mt-2">
                    <CircularProgress current={currentNumber} total={totalQuestions} />
                </div>

                {/* Question Container */}
                <div className="flex-grow flex flex-col justify-center w-full max-w-5xl lg:pr-10 overflow-y-auto scrollbar-hide [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
                    
                    {/* Text Section */}
                    <div className="mb-8 lg:mb-12">
                        {currentQuestion.preamble && (
                            <p className="text-lg lg:text-xl text-brand-text-light-secondary dark:text-[#A0AEC0] mb-3 font-normal leading-relaxed" style={{ fontWeight: 400 }}>
                                {currentQuestion.preamble}
                            </p>
                        )}
                        <h1 className="text-2xl lg:text-[40px] font-semibold text-brand-text-light-primary dark:text-white leading-tight mt-2" style={{ fontWeight: 600 }}>
                            {currentQuestion.text}
                        </h1>
                    </div>

                    {/* Options List */}
                    <div className="space-y-4 lg:space-y-5">
                        {currentQuestion.options.map((option) => {
                            const isSelected = selectedOption === option.id;
                            return (
                                <button
                                    key={option.id}
                                    onClick={() => handleOptionSelect(option.id)}
                                    className={`
                                        w-full p-4 lg:p-5 rounded-xl text-left flex items-center gap-4 lg:gap-5 transition-all duration-200 border group
                                        ${isSelected 
                                            ? 'bg-[#1ED36A] border-[#1ED36A] shadow-[0_4px_14px_0_rgba(30,211,106,0.39)] scale-[1.01]' 
                                            : 'bg-brand-light-secondary dark:bg-[#24272B] border-transparent hover:bg-brand-light-tertiary dark:hover:bg-[#2D3136]'
                                        }
                                    `}
                                >
                                    <div className="flex-shrink-0">
                                        {isSelected ? (
                                            <CheckCircleIcon className="w-6 h-6 lg:w-7 lg:h-7" />
                                        ) : (
                                            <div className="w-6 h-6 lg:w-7 lg:h-7 rounded-full border-[1.5px] border-[#3E4247] bg-[#303438] group-hover:border-[#555]" />
                                        )}
                                    </div>
                                    
                                    <span 
                                        className={`text-base lg:text-lg font-medium ${isSelected ? 'text-white' : 'text-brand-text-light-primary dark:text-[#E2E8F0]'}`}
                                        style={{ fontSize: '24px', fontWeight: 400 }}
                                    >
                                        {option.text}
                                    </span>
                                </button>
                            );
                        })}
                    </div>

                </div>

                {/* Footer Navigation */}
                <div className="w-full max-w-5xl flex justify-between items-center mt-auto pt-6 pb-4 shrink-0 lg:pr-10">
                    <button 
                        onClick={onBack}
                        className="px-6 py-3 rounded-full border border-[#303438] text-brand-text-light-primary dark:text-white transition-colors hover:bg-brand-light-tertiary dark:hover:bg-[#24272B]"
                        style={{ fontSize: '16px', fontWeight: 400 }}
                    >
                        {currentNumber === 1 ? 'Back to Dashboard' : 'Previous'}
                    </button>

                    <button 
                        onClick={handleNext}
                        disabled={!selectedOption}
                        className={`
                            px-8 py-3 rounded-full text-white transition-all shadow-lg
                            ${selectedOption 
                                ? 'bg-[#1ED36A] hover:bg-[#1ED36A]/90 shadow-[#1ED36A]/20 cursor-pointer transform hover:-translate-y-0.5' 
                                : 'bg-[#303438] text-[#718096] cursor-not-allowed'
                            }
                        `}
                        style={{ fontSize: '20px', fontWeight: 500 }}
                    >
                        Next Question
                    </button>
                </div>
            </div>
        </div>
    </div>
  );
};

export default AssessmentRunner;