import React from 'react';

const PersonalityCard: React.FC = () => {
    return (
        <div className="rounded-2xl relative h-full">
            <img 
                src="/Analytical_Leader.png"
                alt="Analytical Leader Character" 
                className="absolute w-auto object-contain"
            />
        </div>
    );
};

export default PersonalityCard;