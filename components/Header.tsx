'use client';

import React, { useState, useRef, useEffect } from 'react';
import NotificationWithDotIcon from './icons/NotificationWithDotIcon';
import NotificationIcon from './icons/NotificationIcon';
import ChevronDownIcon from './icons/ChevronDownIcon';
import DashboardIcon from './icons/DashboardIcon';
import JobsIcon from './icons/JobsIcon';
import RoadmapIcon from './icons/RoadmapIcon';
import VideosIcon from './icons/VideosIcon';
import ProfileIcon from './icons/ProfileIcon';
import SettingsIcon from './icons/SettingsIcon';
import ThemeToggle from './ui/ThemeToggle';
import LogoutIcon from './icons/LogoutIcon';
import MenuIcon from './icons/MenuIcon';
import { useTheme } from '../contexts/ThemeContext';

interface HeaderProps {
    onLogout: () => void;
}

const NavItem: React.FC<{ icon: React.ReactNode; label: string; active?: boolean; isMobile?: boolean }> = ({ icon, label, active, isMobile }) => {
    const showText = active || isMobile;
    
    return (
        <div className="relative group">
            <a href="#" className={`flex items-center gap-1 sm:gap-2 rounded-lg transition-colors duration-200 whitespace-nowrap ${active ? 'bg-brand-green text-white px-2 sm:px-3 py-1.5 sm:py-2' : 'text-brand-text-light-secondary dark:text-brand-text-secondary hover:bg-brand-light-tertiary dark:hover:bg-brand-dark-tertiary hover:text-brand-text-light-primary dark:hover:text-white px-1.5 sm:px-2 py-1.5'}`}>
                <span className="flex-shrink-0">{icon}</span>
                 <span className={`font-medium text-xs sm:text-sm whitespace-nowrap ${showText ? 'inline' : 'hidden md:hidden lg:inline'}`}>{label}</span>
            </a>
            {/* Tooltip for tablet view */}
            <div className={`absolute left-1/2 -translate-x-1/2 top-full mt-2 w-max px-2 py-1 bg-black/80 dark:bg-brand-dark-tertiary text-white text-xs rounded-md shadow-lg
                opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10
                ${active || isMobile ? 'hidden' : 'hidden md:block lg:hidden'}`}>
                {label}
            </div>
        </div>
    );
};


const NotificationItem: React.FC<{ icon: React.ReactNode; title: string; time: string; isNew?: boolean }> = ({ icon, title, time, isNew }) => (
    <div className="flex items-start space-x-3 p-3 hover:bg-brand-light-tertiary dark:hover:bg-brand-dark-tertiary/60 transition-colors duration-200">
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-brand-light-tertiary dark:bg-brand-dark-tertiary flex items-center justify-center">
            {icon}
        </div>
        <div className="flex-grow">
            <p className="text-sm font-medium text-brand-text-light-primary dark:text-brand-text-primary">{title}</p>
            <p className="text-xs text-brand-text-light-secondary dark:text-brand-text-secondary">{time}</p>
        </div>
        {isNew && <div className="w-2 h-2 bg-brand-green rounded-full mt-1 flex-shrink-0"></div>}
    </div>
);

const Header: React.FC<HeaderProps> = ({ onLogout }) => {
    const { theme, toggleTheme } = useTheme();
    const [isProfileOpen, setProfileOpen] = useState(false);
    const [isLangOpen, setLangOpen] = useState(false);
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isNotificationsOpen, setNotificationsOpen] = useState(false);
    const [language, setLanguage] = useState('ENG');
    const [hasNotification, setHasNotification] = useState(true);
    const profileMenuRef = useRef<HTMLDivElement>(null);
    const langMenuRef = useRef<HTMLDivElement>(null);
    const notificationsMenuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
                setProfileOpen(false);
            }
            if (langMenuRef.current && !langMenuRef.current.contains(event.target as Node)) {
                setLangOpen(false);
            }
            if (notificationsMenuRef.current && !notificationsMenuRef.current.contains(event.target as Node)) {
                setNotificationsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
    
    const handleLangChange = (lang: string) => {
        setLanguage(lang);
        setLangOpen(false);
    }

    const handleNotificationClick = () => {
        setNotificationsOpen(p => !p);
        if (hasNotification) {
            setHasNotification(false);
        }
    };

    const notifications = [
        {
            icon: <RoadmapIcon className="w-4 h-4 text-brand-text-light-secondary dark:text-brand-text-secondary" />,
            title: 'New Roadmap Unlocked!',
            time: '2 hours ago',
            isNew: true
        },
        {
            icon: <JobsIcon className="w-4 h-4 text-brand-text-light-secondary dark:text-brand-text-secondary" />,
            title: '3 new job matches for you',
            time: 'Yesterday',
            isNew: true
        },
        {
            icon: <ProfileIcon className="w-4 h-4 text-brand-text-light-secondary dark:text-brand-text-secondary" />,
            title: 'Your profile is 85% complete',
            time: '3 days ago',
            isNew: false
        }
    ];

    const logoSrc = theme === 'dark'
        ? '/Origin-BI-white-logo.png'
        : '/Origin-BI-Logo-01.png';

    return (
        <header className="bg-brand-light-secondary dark:bg-brand-dark-secondary px-3 sm:px-4 md:px-6 py-2.5 sm:py-3 flex items-center justify-between sticky top-0 z-50 min-h-[56px] sm:min-h-[64px]">
            {/* Left side: Logo + Nav */}
            <div className="flex items-center gap-1 sm:gap-2 md:gap-3 flex-1 min-w-0 overflow-x-auto scrollbar-hide">
                 {/* Mobile Menu Button */}
                <button 
                    className="md:hidden text-brand-text-light-primary dark:text-white"
                    onClick={() => setMobileMenuOpen(p => !p)}
                    aria-controls="mobile-menu"
                    aria-expanded={isMobileMenuOpen}
                    aria-label="Open main menu"
                >
                    <MenuIcon className="w-6 h-6" />
                </button>
                <img src={logoSrc} alt="OriginBI Logo" className="h-7 sm:h-8 flex-shrink-0 mr-1 sm:mr-2" />
                <nav className="hidden md:flex items-center gap-0.5 lg:gap-1 flex-shrink-0">
                    <NavItem icon={<DashboardIcon className="w-19vw h-16vw" />} label="Dashboard" active />
                    <NavItem icon={<JobsIcon className="w-19vw h-16vw" />} label="Jobs" />
                    <NavItem icon={<RoadmapIcon className="w-19vw h-16vw" />} label="Road Map" />
                    <NavItem icon={<VideosIcon className="w-19vw h-16vw" />} label="Videos" />
                    <NavItem icon={<ProfileIcon className="w-19vw h-16vw" />} label="Profile" />
                    <NavItem icon={<SettingsIcon className="w-19vw h-16vw" />} label="Settings" />
                </nav>
            </div>

            {/* Right side: Controls */}
            <div className="flex items-center gap-1 sm:gap-2 md:gap-3 lg:gap-4 flex-shrink-0">
                <div className="flex items-center gap-1 sm:gap-2">
                    <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
                    <div className="relative" ref={langMenuRef}>
                        <button onClick={() => setLangOpen(p => !p)} className="bg-brand-light-tertiary dark:bg-brand-dark-tertiary text-brand-text-light-primary dark:text-white flex items-center justify-center gap-1 sm:gap-2 px-2 sm:px-4 h-9 sm:h-10 rounded-full font-semibold text-xs sm:text-sm hover:opacity-90 transition-opacity whitespace-nowrap">
                            <span>{language}</span>
                            <ChevronDownIcon className="w-4 h-4" />
                        </button>
                        {isLangOpen && (
                            <div className="absolute right-0 top-full mt-2 w-32 bg-brand-light-secondary dark:bg-brand-dark-tertiary rounded-lg shadow-lg py-1">
                                <button onClick={() => handleLangChange('ENG')} className="w-full text-left px-4 py-2 text-sm text-brand-text-light-primary dark:text-brand-text-primary hover:bg-brand-light-tertiary dark:hover:bg-brand-dark-secondary/60">English</button>
                                <button onClick={() => handleLangChange('TAM')} className="w-full text-left px-4 py-2 text-sm text-brand-text-light-primary dark:text-brand-text-primary hover:bg-brand-light-tertiary dark:hover:bg-brand-dark-secondary/60">Tamil</button>
                            </div>
                        )}
                    </div>
                     <div className="relative" ref={notificationsMenuRef}>
                        <button onClick={handleNotificationClick} className="bg-brand-light-tertiary dark:bg-brand-dark-tertiary w-10 h-10 rounded-full flex items-center justify-center text-brand-text-light-primary dark:text-white hover:opacity-80 transition-opacity">
                            {hasNotification ? (
                                <NotificationWithDotIcon className="w-5 h-5" />
                            ) : (
                                <NotificationIcon className="w-5 h-5" />
                            )}
                        </button>
                         {isNotificationsOpen && (
                            <div className="absolute right-0 top-full mt-2 w-72 sm:w-80 max-w-[calc(100vw-2rem)] bg-brand-light-secondary dark:bg-brand-dark-secondary rounded-2xl shadow-lg border border-brand-light-tertiary dark:border-brand-dark-tertiary z-50">
                                <div className="p-4 border-b border-brand-light-tertiary dark:border-brand-dark-tertiary">
                                    <h3 className="font-bold text-lg text-brand-text-light-primary dark:text-brand-text-primary">Notifications</h3>
                                </div>
                                <div className="divide-y divide-brand-light-tertiary dark:divide-brand-dark-tertiary">
                                    {notifications.map((item, index) => (
                                        <NotificationItem key={index} {...item} />
                                    ))}
                                </div>
                                <div className="p-2">
                                    <a href="#" className="block w-full text-center text-sm font-semibold text-brand-green py-2 rounded-lg hover:bg-brand-dark-green/50 dark:hover:bg-brand-dark-tertiary/60 transition-colors">
                                        View All
                                    </a>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                
                <div className="w-px h-8 bg-gray-300 dark:bg-brand-dark-tertiary hidden lg:block"></div>

                {/* Profile Dropdown */}
                <div className="relative" ref={profileMenuRef}>
                     <button onClick={() => setProfileOpen(prev => !prev)} className="flex items-center space-x-3 focus:outline-none">
                        <img src="https://i.pravatar.cc/40?u=monishwar" alt="User Avatar" className="w-10 h-10 rounded-full" />
                        <div className="text-left hidden lg:block">
                            <p className="font-semibold text-base leading-tight text-brand-text-light-primary dark:text-brand-text-primary">Monishwar Rajasekaran</p>
                            <p className="text-sm text-brand-text-light-secondary dark:text-brand-text-secondary leading-tight">MonishwarRaja@originbi.com</p>
                        </div>
                        <ChevronDownIcon className={`w-5 h-5 text-brand-text-light-secondary dark:text-brand-text-secondary transition-transform hidden lg:block ${isProfileOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {isProfileOpen && (
                        <div className="absolute right-0 top-full mt-2 w-60 sm:w-64 max-w-[calc(100vw-1rem)] bg-brand-light-secondary dark:bg-brand-dark-secondary rounded-xl shadow-2xl z-50 border border-brand-light-tertiary dark:border-brand-dark-tertiary/50 overflow-hidden">
                            <div className="p-4 border-b border-brand-light-tertiary dark:border-brand-dark-tertiary lg:hidden">
                                <p className="font-semibold text-sm text-brand-text-light-primary dark:text-white truncate">Monishwar Rajasekaran</p>
                                <p className="text-xs text-brand-text-light-secondary dark:text-brand-text-secondary truncate">MonishwarRaja@originbi.com</p>
                            </div>
                            <div className="p-2">
                                <button onClick={onLogout} className="w-full flex items-center px-3 py-2 text-sm font-medium text-brand-text-light-primary dark:text-white rounded-lg hover:bg-brand-light-tertiary dark:hover:bg-brand-dark-tertiary transition-colors">
                                    <LogoutIcon className="w-5 h-5 mr-3" />
                                    <span>Logout</span>
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

             {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div id="mobile-menu" className="md:hidden absolute top-full left-0 right-0 w-screen bg-brand-light-secondary dark:bg-brand-dark-secondary shadow-lg z-40 border-t border-brand-light-tertiary dark:border-brand-dark-tertiary">
                    <nav className="flex flex-col p-4 space-y-1" onClick={() => setMobileMenuOpen(false)}>
                        <NavItem icon={<DashboardIcon />} label="Dashboard" active isMobile />
                        <NavItem icon={<JobsIcon />} label="Jobs" isMobile />
                        <NavItem icon={<RoadmapIcon />} label="Road Map" isMobile />
                        <NavItem icon={<VideosIcon />} label="Videos" isMobile />
                        <NavItem icon={<ProfileIcon />} label="Profile" isMobile />
                        <NavItem icon={<SettingsIcon />} label="Settings" isMobile />
                    </nav>
                </div>
            )}
        </header>
    );
};

export default Header;