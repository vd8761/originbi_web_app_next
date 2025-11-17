import React from 'react';
import { SessionItem as SessionItemType } from '../lib/types';

// NOTE: The SVG dimensions (viewBox, path coordinates, strokeWidth) 
// will need manual scaling or resizing if the progress circle size itself needs to be responsive.
// For now, we only scale the text inside it.

const SemiCircularProgress: React.FC<{ progress: number }> = ({ progress }) => {
    const radius = 100;
    const stroke = 12;
    const normalizedRadius = radius - stroke / 2;
    const circumference = normalizedRadius * Math.PI;
    const strokeDashoffset = circumference - (progress / 100) * circumference;

    return (
        <div className="relative w-auto h-auto">
            <svg height="100%" width="100%" viewBox="0 0 224 118">
                <path
                    className="stroke-gray-200 dark:stroke-white/10"
                    d="M 12 106 A 100 100 0 0 1 212 106"
                    fill="none"
                    strokeWidth={stroke}
                    strokeLinecap="round"
                />
                <path
                    className="stroke-brand-green"
                    d="M 12 106 A 100 100 0 0 1 212 106"
                    fill="none"
                    strokeWidth={stroke}
                    strokeDasharray={circumference + ' ' + circumference}
                    style={{ strokeDashoffset }}
                    strokeLinecap="round"
                />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-end">
                {/* 14px - Call Progress (Regular - 400) -> text-14vw, font-normal */}
                <span className="text-14vw font-normal text-brand-green">Call Progress</span> 
                
                {/* 48px - 05/10 (SemiBold - 600) -> text-48vw, font-semibold */}
                <span className="text-48vw font-semibold leading-none text-brand-text-light-primary dark:text-brand-text-primary mt-4">
                    05
                    {/* 48px / 10 is Regular - 400. Using font-normal for 400 weight */}
                    <span className="text-48vw font-semibold leading-none text-brand-text-light-primary dark:text-brand-text-primary">/10</span>
                </span>
            </div>
        </div>
    );
};


const SessionItem: React.FC<{ session: SessionItemType }> = ({ session }) => (
    <div className="flex justify-between items-center">
        <div>
            {/* 18px - Free Session (SemiBold - 600) -> text-18vw, font-semibold */}
            <p className="text-18vw text-brand-text-light-primary dark:text-brand-text-primary">{session.title}</p>
            
            {/* 14px - 2 Hrs (Regular - 400) -> text-14vw, font-normal */}
            <p className="text-14vw font-normal text-brand-text-light-secondary dark:text-brand-text-secondary">{session.duration}</p>
        </div>
        <div className="text-right">
            {/* 16px - 12 July 2025 (SemiBold - 600) -> text-16vw, font-semibold */}
            <p className="text-16vw text-brand-text-light-primary dark:text-brand-text-primary">{session.date}</p>
            
            {/* 14px - 08:30 AM - 10:30 AM (Regular - 400) -> text-14vw, font-normal */}
            <p className="text-14vw text-brand-text-light-secondary dark:text-brand-text-secondary">{session.time}</p>
        </div>
    </div>
);


const ConsultantCallCard: React.FC = () => {
    const sessions: SessionItemType[] = [
        { title: 'Free Session', duration: '2 Hrs', date: '12 July 2025', time: '08:30 AM - 10:30 AM' },
        { title: 'Free Session', duration: '2 Hrs', date: '12 July 2025', time: '08:30 AM - 10:30 AM' },
    ];
    
    return (
        <div className="bg-brand-light-secondary dark:bg-brand-dark-secondary p-6 rounded-2xl flex flex-col h-full">
            {/* 24px - Consultant Call (SemiBold - 600) -> text-24vw, font-semibold */}
            <h3 className="text-24vw text-brand-text-light-primary dark:text-brand-text-primary">Consultant Call</h3>
            
            <div className="flex-grow flex justify-center items-center my-6">
                <SemiCircularProgress progress={50} />
            </div>
            <div>
                <div className="flex justify-between items-center">
                    {/* 24px - Recent Sessions (SemiBold - 600) -> text-24vw, font-semibold */}
                    <h4 className="text-24vw text-brand-text-light-primary dark:text-brand-text-primary">Recent Sessions</h4>
                    
                    {/* 16px - View All (Medium - 500) -> text-16vw, font-medium */}
                    {/* Note: Tailwind uses font-medium for 500 weight */}
                    <a href="#" className="text-16vw text-brand-green font-medium">View All</a>
                </div>
                <hr className="border-brand-light-tertiary dark:border-white/10 my-4" />
                <div className="space-y-4">
                    {sessions.map((session, index) => (
                        <SessionItem key={index} session={session} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ConsultantCallCard;