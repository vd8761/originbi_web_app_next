import React, { useState } from 'react';
import ToggleSwitch from './ui/ToggleSwitch'; 

// Component for a single togglable item
const VisibilityItem: React.FC<{ 
    title: string; 
    subtitle: string; 
    isOn: boolean; 
    onToggle: () => void; 
    disabled?: boolean; 
    isLast?: boolean 
}> = ({ title, subtitle, isOn, onToggle, disabled, isLast }) => (
    // CHANGE: Reduced vertical padding from py-3 to py-2 for a more compact list
    <div className={`flex justify-between items-center py-2 ${!isLast ? 'border-b border-brand-light-tertiary dark:border-white/10' : ''}`}>
        <div>
            {/* Item Title: 16px -> text-16vw */}
            <h4 className="text-16vw text-brand-text-light-primary dark:text-brand-text-primary">{title}</h4>
            
            {/* Subtitle: 14px -> text-14vw */}
            <p className="text-14vw text-brand-text-light-secondary dark:text-brand-text-secondary">{subtitle}</p>
        </div>
        {/* If the ToggleSwitch is too big, its size needs to be adjusted inside its own component definition. */}
        <ToggleSwitch isOn={isOn} onToggle={onToggle} disabled={disabled} />
    </div>
);

// Main Card Component
const PublicVisibilityCard: React.FC = () => {
    const [toggles, setToggles] = useState({
        nameContact: true,
        strengthSummary: true,
        interestAreas: true,
        fullResultsPDF: true,
        strengthsImprovements: false,
        careerRoadmap: false,
    });

    const handleToggle = (key: keyof typeof toggles) => {
        setToggles(prev => ({ ...prev, [key]: !prev[key] }));
    };

    return (
        <div className="bg-brand-light-secondary dark:bg-brand-dark-secondary rounded-2xl h-full flex flex-col">
            <div className="px-6 pt-6 pb-4">
                {/* Public Visibility Title: 24px -> text-24vw */}
                <h3 className="text-24vw mb-1 text-brand-text-light-primary dark:text-brand-text-primary">
                    Public Visibility
                </h3>
                
                {/* Description: 14px -> text-14vw */}
                <p className="text-14vw text-brand-text-light-secondary dark:text-brand-text-secondary">
                    Control what recruiters see on your profile to highlight your strengths and attract the right opportunities.
                </p>
            </div>
            <hr className="border-brand-light-tertiary dark:border-white/10" />
            
            {/* CHANGE: Adjusted padding from pt-4 pb-6 to pt-3 pb-5 for tighter spacing */}
            <div className="px-6 pt-3 pb-5 flex-grow">
                {/* space-y-2 provides separation between items, which is usually necessary */}
                <div className="space-y-2">
                    <VisibilityItem 
                        title="Name & Contact Info" 
                        subtitle="Your basic professional details" 
                        isOn={toggles.nameContact} 
                        onToggle={() => handleToggle('nameContact')} 
                        disabled 
                    />
                    <VisibilityItem 
                        title="Interest Areas" 
                        subtitle="Fields you're curious about" 
                        isOn={toggles.interestAreas} 
                        onToggle={() => handleToggle('interestAreas')} 
                        disabled 
                    />
                    <VisibilityItem 
                        title="Full Results PDF" 
                        subtitle="Your detailed assessment insights" 
                        isOn={toggles.fullResultsPDF} 
                        onToggle={() => handleToggle('fullResultsPDF')} 
                    />
                    <VisibilityItem 
                        title="Strengths & Improvements" 
                        subtitle="Focus areas and growth points" 
                        isOn={toggles.strengthsImprovements} 
                        onToggle={() => handleToggle('strengthsImprovements')} 
                    />
                    <VisibilityItem 
                        title="Career Roadmap" 
                        subtitle="Your future career direction" 
                        isOn={toggles.careerRoadmap} 
                        onToggle={() => handleToggle('careerRoadmap')} 
                        isLast 
                    />
                </div>
            </div>
        </div>
    );
};

export default PublicVisibilityCard;