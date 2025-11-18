// components/forms/CountryCodeSelect.tsx

import React, { useState, useRef, useEffect } from 'react';
import { CountryCode, COUNTRY_CODES } from '@/src/utils/countryCodes';

interface CountryCodeSelectProps {
    value: string; // The currently selected dial_code, e.g., '+91'
    onChange: (dial_code: string) => void;
    disabled: boolean;
    isInvalid: boolean;
}

// Reusing input classes from SignUpForm for consistent styling
const inputClasses = (isInvalid: boolean) => `
    bg-brand-light-secondary dark:bg-brand-dark-tertiary border 
    text-brand-text-light-primary dark:text-brand-text-primary 
    placeholder:text-brand-text-light-secondary dark:placeholder:text-brand-text-secondary 
    text-sm rounded-full block w-full p-4 transition-colors duration-300 
    ${
        isInvalid
            ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
            : 'border-brand-light-tertiary dark:border-brand-dark-tertiary focus:ring-brand-green focus:border-brand-green'
    }
`;

const CountryCodeSelect: React.FC<CountryCodeSelectProps> = ({ 
    value, 
    onChange, 
    disabled, 
    isInvalid 
}) => {
    
    // Helper function to format the display text (e.g., "IN (+91)")
    const getFormattedCode = (dialCode: string): string => {
        // Find the country object based on the dial code, defaulting to the first one if not found.
        const country = COUNTRY_CODES.find(c => c.dial_code === dialCode) || COUNTRY_CODES[0];
        return `${country.code} (${country.dial_code})`;
    };

    // Initialize searchTerm with the default formatted value.
    const [searchTerm, setSearchTerm] = useState(getFormattedCode(value));
    
    const [isOpen, setIsOpen] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null); // Ref for the input field

    // Filtered list based on search term
    const filteredCodes = COUNTRY_CODES.filter(country => {
        const lowerSearch = searchTerm.toLowerCase().trim();
        return (
            country.name.toLowerCase().includes(lowerSearch) ||
            country.dial_code.includes(searchTerm.trim()) ||
            country.code.toLowerCase().includes(lowerSearch)
        );
    });

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setIsOpen(false);
                // 🟢 FIX: When clicking outside, reset the search term to the actual selected value
                setSearchTerm(getFormattedCode(value));
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [wrapperRef, value]); // Added 'value' dependency

    // Update display text if the value prop changes externally (e.g., component reset)
    useEffect(() => {
        // Only update the display text if the dropdown is closed or if the value is different
        if (!isOpen) {
            setSearchTerm(getFormattedCode(value));
        }
    }, [value, isOpen]);


    const handleSelect = (country: CountryCode) => {
        onChange(country.dial_code); 
        setSearchTerm(getFormattedCode(country.dial_code));
        setIsOpen(false);
        // 🟢 FIX: Manually remove focus from the input to close the soft keyboard/search mode
        inputRef.current?.blur(); 
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
        if (!isOpen) {
             setIsOpen(true);
        }
    };
    
    const handleInputClick = () => {
        setIsOpen(prev => !prev);
    };

    return (
        <div className="relative w-1/5 min-w-[100px]" ref={wrapperRef}> 
            {/* Input field for searching and displaying selected code */}
            <input
                ref={inputRef} // Set the ref here
                type="text"
                value={searchTerm}
                onChange={handleInputChange}
                onClick={handleInputClick}
                onFocus={() => setIsOpen(true)}
                className={`${inputClasses(isInvalid)} text-center cursor-pointer`}
                placeholder="Code"
                required
                disabled={disabled}
                autoComplete="off" // Prevents browser autocomplete on the search field
            />
            {/* Dropdown list */}
            {isOpen && (
                <div className="absolute z-20 w-[200px] mt-1 left-0 bg-white dark:bg-brand-dark-secondary border border-brand-light-tertiary dark:border-brand-dark-tertiary rounded-lg shadow-xl max-h-60 overflow-y-scroll overflow-x-hidden custom-scrollbar">
                    {filteredCodes.length > 0 ? (
                        filteredCodes.map((country) => (
                            <div
                                key={country.code}
                                onClick={() => handleSelect(country)}
                                className={`p-3 text-sm cursor-pointer hover:bg-brand-light-secondary dark:hover:bg-brand-dark-tertiary flex justify-between items-center ${
                                    country.dial_code === value ? 'bg-brand-light-secondary dark:bg-brand-dark-tertiary font-semibold' : ''
                                }`}
                            >
                                <span className="font-medium">{country.code} ({country.dial_code})</span>
                                <span className="text-brand-text-secondary ml-2">{country.name}</span>
                            </div>
                        ))
                    ) : (
                        <div className="p-3 text-sm text-center text-brand-text-secondary">No matching codes found.</div>
                    )}
                </div>
            )}
        </div>
    );
};

export default CountryCodeSelect;