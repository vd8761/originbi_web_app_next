// components/SignUpForm.tsx

'use client';

import React, { useState, FormEvent } from 'react';
import { signUp } from 'aws-amplify/auth'; 
import { configureAmplify } from '@/lib/aws-amplify-config'; 
import { COUNTRY_CODES } from '@/src/utils/countryCodes'; 
import CountryCodeSelect from '@/components/forms/CountryCodeSelect'; 

interface SignUpFormProps {
    onSignUpSuccess: (email: string) => void;
}

interface AmplifyAuthError extends Error {
    name: string; 
    message: string;
}

const SignUpForm: React.FC<SignUpFormProps> = ({ onSignUpSuccess }) => {
    configureAmplify();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [gender, setGender] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [countryCode, setCountryCode] = useState(COUNTRY_CODES[0].dial_code); 
    
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
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
    
    const selectClasses = (isInvalid: boolean) => `${inputClasses(isInvalid)} appearance-none`;

    const handleSignUp = async (e: FormEvent) => {
        e.preventDefault();
        setError('');

        if (!name.trim()) return setError("Please enter your name.");
        if (!emailRegex.test(email)) return setError("Please enter a valid email address.");
        if (password.length < 8) return setError("Password must be at least 8 characters long.");
        if (!mobileNumber.trim() || mobileNumber.length < 6) return setError("Please enter a valid mobile number.");
        if (!gender) return setError("Please select your gender.");

        try {
            setIsSubmitting(true);
            
            const fullPhoneNumber = `${countryCode}${mobileNumber.trim()}`;
            
            const response = await signUp({
                username: email.trim(),
                password: password,
                options: {
                    userAttributes: {
                        email: email.trim(),
                        // 🟢 FIX FOR SCIM/NAME SCHEMA ERROR: Pass the full name in the 'name' attribute
                        name: name.trim(), 
                        // It's often helpful to still pass the first name separately if required by the schema:
                        given_name: name.trim().split(' ')[0] || '', 
                        
                        phone_number: fullPhoneNumber, 
                        gender: gender,                  
                    },
                },
            });
            
            if (response.nextStep.signUpStep === 'CONFIRM_SIGN_UP') {
                onSignUpSuccess(email.trim()); 
            } else if (response.nextStep.signUpStep === 'DONE') {
                alert("Account created and confirmed! Please proceed to log in.");
            }

        } catch (err: unknown) {
            console.error('Sign Up Error:', err);
            
            let message = 'An unexpected error occurred during sign up.';
            
            if (err && typeof err === 'object' && 'message' in err) {
                const amplifyError = err as AmplifyAuthError;
                
                if (amplifyError.name === 'UsernameExistsException') {
                    message = 'This email address is already registered. Please log in or reset your password.';
                } else if (amplifyError.name === 'InvalidPasswordException') {
                    message = 'Invalid password. Please ensure it meets the policy requirements.';
                } else {
                    message = amplifyError.message.replace('username', 'email');
                }
            }
            
            setError(message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form className="space-y-6" onSubmit={handleSignUp} noValidate>
            {error && (
                <div className="text-sm text-white bg-red-600 p-3 rounded-lg text-center">{error}</div>
            )}
            
            {/* Name Input */}
            <div>
                <label htmlFor="name" className="block text-sm font-medium text-brand-text-secondary mb-2">Full Name</label>
                <input
                    type="text"
                    name="name"
                    id="name"
                    value={name}
                    onChange={(e) => { setName(e.target.value); setError(''); }}
                    className={inputClasses(!!error)}
                    placeholder="John Doe"
                    required
                    disabled={isSubmitting}
                />
            </div>

            {/* Email Input */}
            <div>
                <label htmlFor="email" className="block text-sm font-medium text-brand-text-secondary mb-2">Email Address</label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setError(''); }}
                    className={inputClasses(!!error)}
                    placeholder="you@example.com"
                    required
                    disabled={isSubmitting}
                />
            </div>

            {/* Password Input */}
            <div>
                <label htmlFor="password" className="block text-sm font-medium text-brand-text-secondary mb-2">Password</label>
                <input
                    type="password"
                    name="password"
                    id="password"
                    value={password}
                    onChange={(e) => { setPassword(e.target.value); setError(''); }}
                    className={inputClasses(!!error)}
                    placeholder="••••••••"
                    required
                    disabled={isSubmitting}
                />
            </div>
            
            {/* Mobile Number with Searchable Country Code */}
            <div>
                <label htmlFor="mobile" className="block text-sm font-medium text-brand-text-secondary mb-2">Mobile Number</label>
                <div className="flex space-x-2">
                    <CountryCodeSelect
                        value={countryCode}
                        onChange={setCountryCode}
                        disabled={isSubmitting}
                        isInvalid={!!error}
                    />

                    <input
                        type="tel"
                        name="mobile"
                        id="mobile"
                        value={mobileNumber}
                        onChange={(e) => { setMobileNumber(e.target.value); setError(''); }}
                        className={`${inputClasses(!!error)} w-4/5`} 
                        placeholder="80000 80000"
                        required
                        disabled={isSubmitting}
                    />
                </div>
            </div>

            {/* Gender Dropdown */}
            <div>
                <label htmlFor="gender" className="block text-sm font-medium text-brand-text-secondary mb-2">Gender</label>
                <select
                    name="gender"
                    id="gender"
                    value={gender}
                    onChange={(e) => { setGender(e.target.value); setError(''); }}
                    className={selectClasses(!!error)}
                    required
                    disabled={isSubmitting}
                >
                    <option value="" disabled>Select your gender</option> 
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                </select>
            </div>

            <button
                type="submit"
                disabled={isSubmitting}
                className="w-full text-white bg-brand-green cursor-pointer hover:bg-brand-green/90 focus:ring-4 focus:outline-none focus:ring-brand-green/30 font-medium rounded-full text-lg px-5 py-4 text-center transition-colors duration-300 disabled:bg-brand-green/50 disabled:cursor-not-allowed"
            >
                {isSubmitting ? 'Creating Account...' : 'Sign Up'}
            </button>
        </form>
    );
};

export default SignUpForm;