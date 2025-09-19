"use client";
import React, { useState, useCallback, useMemo } from 'react';
import { Coffee, Heart, Gift } from 'lucide-react';
import CareersCarousal from './CareersCarousel';

// Types
interface JobListing {
    id: string;
    title: string;
    department: string;
    type: 'Full-time' | 'Part-time' | 'Contract';
    experience: string;
    salary: string;
    location: string;
    postedDaysAgo: number;
    description: string;
    requirements: string[];
}

interface WhyWorkWithUsItem {
    id: string;
    icon: React.ComponentType<{ className?: string }>;
    title: string;
    description: string;
}

// Sample data - in real app, this would come from API/CMS
const WHY_WORK_WITH_US: WhyWorkWithUsItem[] = [
    {
        id: '1',
        icon: Gift,
        title: 'Great Benefits',
        description: 'Lorem ipsum dolor sit it amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Idunt ut you labore et dolore magna aliqua.'
    },
    {
        id: '2',
        icon: Heart,
        title: 'Work-Life Balance',
        description: 'Lorem ipsum dolor sit it amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    },
    {
        id: '3',
        icon: Coffee,
        title: 'Amazing Culture',
        description: 'Lorem ipsum dolor sit it amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Idunt ut you labore et dolore magna aliqua.'
    }
];

const JOB_LISTINGS: JobListing[] = [
    {
        id: '1',
        title: 'Senior Frontend Developer',
        department: 'Engineering Department',
        type: 'Full-time',
        experience: '3yr experience',
        salary: '$3K - 4K',
        location: 'Location lorem ipsum',
        postedDaysAgo: 2,
        description: 'Ut enim ad minim veniam, eius mode ut tempor incid idunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.',
        requirements: [
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            'Ut enim ad minim veniam, eius mode ut tempor incid idunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.',
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
        ]
    },
    {
        id: '2',
        title: 'UX/UI Designer',
        department: 'Design Department',
        type: 'Full-time',
        experience: '3yr experience',
        salary: '$3K - 4K',
        location: 'Location lorem ipsum',
        postedDaysAgo: 2,
        description: 'Ut enim ad minim veniam, eius mode ut tempor incid idunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.',
        requirements: [
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            'Ut enim ad minim veniam, eius mode ut tempor incid idunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.'
        ]
    },
    {
        id: '3',
        title: 'Marketing Specialist',
        department: 'Marketing Department',
        type: 'Full-time',
        experience: '3yr experience',
        salary: '$3K - 4K',
        location: 'Location lorem ipsum',
        postedDaysAgo: 2,
        description: 'Ut enim ad minim veniam, eius mode ut tempor incid idunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.',
        requirements: [
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            'Ut enim ad minim veniam, eius mode ut tempor incid idunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.',
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
        ]
    }
];

// Optimized components
const WhyWorkCard = React.memo(({ item }: { item: WhyWorkWithUsItem }) => {
    const IconComponent = item.icon;

    return (
        <div className="border-2 border-yellow-300 p-6 sm:p-8 bg-white hover:shadow-lg transition-shadow duration-300 group">
            <div className="text-center">
                <div className="mb-4 flex justify-center">
                    <IconComponent className="w-12 h-12 sm:w-16 sm:h-16 text-yellow-400 group-hover:scale-110 transition-transform duration-300" />
                </div>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                    {item.description}
                </p>
            </div>
        </div>
    );
});

WhyWorkCard.displayName = 'WhyWorkCard';

const JobListItem = React.memo(({
    job,
    isSelected,
    onClick
}: {
    job: JobListing;
    isSelected: boolean;
    onClick: () => void;
}) => (
    <div
        className={`p-4 sm:p-6 border-b border-gray-200 cursor-pointer transition-all duration-200 hover:bg-gray-50 ${isSelected ? 'bg-yellow-50 border-l-4 border-l-yellow-400' : ''
            }`}
        onClick={onClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && onClick()}
        aria-label={`View details for ${job.title} position`}
    >
        <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-gray-900 text-base sm:text-lg">{job.title}</h3>
            <span className="text-yellow-500 text-xs sm:text-sm font-medium">
                {job.postedDaysAgo}d ago
            </span>
        </div>

        <p className="text-gray-600 text-sm sm:text-base mb-3">{job.type}</p>

        <div className="flex flex-wrap gap-3 sm:gap-4 text-xs sm:text-sm text-gray-500">
            <span className="flex items-center gap-1">
                <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
                {job.experience}
            </span>
            <span className="flex items-center gap-1">
                <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
                {job.salary}
            </span>
        </div>

        <div className="mt-3 flex justify-end">
            <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center hover:bg-yellow-500 transition-colors">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
            </div>
        </div>
    </div>
));

JobListItem.displayName = 'JobListItem';

const JobDetails = React.memo(({ job }: { job: JobListing }) => (
    <div className="bg-yellow-50 border-2 border-yellow-300 p-6 sm:p-8">
        <div className="mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                {job.title} of {job.department}
            </h2>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-4">
                {job.description}
            </p>

            <div className="space-y-2 mb-6">
                <div className="flex items-center gap-2 text-sm sm:text-base text-gray-700">
                    <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
                    <span>{job.experience}</span>
                </div>
                <div className="flex items-center gap-2 text-sm sm:text-base text-gray-700">
                    <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
                    <span>{job.salary}</span>
                </div>
                <div className="flex items-center gap-2 text-sm sm:text-base text-gray-700">
                    <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
                    <span>{job.location}</span>
                </div>
            </div>
        </div>

        <div>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">Requirements</h3>
            <div className="space-y-3">
                {job.requirements.map((requirement, index) => (
                    <p key={index} className="text-gray-600 text-sm sm:text-base leading-relaxed">
                        {requirement}
                    </p>
                ))}
            </div>
        </div>
    </div>
));

JobDetails.displayName = 'JobDetails';

export default function CareersPage() {
    const [selectedJobId, setSelectedJobId] = useState<string | null>(null);

    // Memoized selected job to prevent unnecessary re-renders
    const selectedJob = useMemo(() =>
        JOB_LISTINGS.find(job => job.id === selectedJobId),
        [selectedJobId]
    );

    // Optimized job selection handler
    const handleJobSelect = useCallback((jobId: string) => {
        setSelectedJobId(current => current === jobId ? null : jobId);
    }, []);

    return (
        <div className=" bg-gray-50">
            <div>
                <CareersCarousal />
            </div>
            {/* Hero Section */}
            <section className="bg-white py-12">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-6">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                        dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                        ex ea commodo.
                    </p>
                    <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-12">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                        dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                    </p>

                    <h1 className="text-3xl sm:text-4xl lg:text-5xl text-gray-900" style={{fontFamily: 'fairplay'}}>
                        Why work with us?
                    </h1>
                </div>
            </section>

            {/* Why Work With Us Section */}
            <section className="py-8 sm:py-10 bg-white" aria-labelledby="why-work-heading">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                        {/* Left column - single card */}
                        <div className="md:col-span-1">
                            <WhyWorkCard item={WHY_WORK_WITH_US[0]} />
                        </div>

                        {/* Right column - stacked cards */}
                        {/* <div className="md:col-span-1 lg:col-span-2 space-y-6 lg:space-y-8"> */}
                        <div className="sm:pt-20">

                            <WhyWorkCard item={WHY_WORK_WITH_US[1]} />
                        </div>
                        <div className="md:col-span-1">

                            <WhyWorkCard item={WHY_WORK_WITH_US[2]} />
                        </div>
                    </div>
                </div>
            </section>

            {/* Current Openings Section */}
            <section className="py-12 sm:py-16 lg:py-20 bg-gray-50" aria-labelledby="openings-heading">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 id="openings-heading" className="text-3xl sm:text-4xl lg:text-5xl text-gray-900 text-center mb-12 sm:mb-16" style={{fontFamily: 'fairplay'}}>
                        Current Openings
                    </h2>

                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8" style={{fontFamily: 'arial'}}>
                        {/* Job Listings */}
                        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm overflow-hidden">
                            <div className="divide-y divide-gray-200">
                                {JOB_LISTINGS.map((job) => (
                                    <JobListItem
                                        key={job.id}
                                        job={job}
                                        isSelected={selectedJobId === job.id}
                                        onClick={() => handleJobSelect(job.id)}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Job Details */}
                        <div className="lg:col-span-3">
                            {selectedJob ? (
                                <JobDetails job={selectedJob} />
                            ) : (
                                <div className="bg-white border-2 border-dashed border-gray-300 rounded-lg p-8 sm:p-12 text-center">
                                    <div className="max-w-sm mx-auto">
                                        <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                        <h3 className="text-lg font-medium text-gray-900 mb-2">Select a job to view details</h3>
                                        <p className="text-gray-500 text-sm">
                                            Click on any job listing to see the full description and requirements.
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section className="bg-white py-8 sm:py-12" aria-labelledby="contact-heading">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <p className="text-gray-600 text-sm sm:text-base"
                        style={{fontFamily: 'arial'}}
                     >
                        <span className="text-yellow-500 font-medium">Don't see any post for you?</span>{' '}
                        Email your resume to{' '}
                        <a
                            href="mailto:abc@example.com"
                            className="text-yellow-500 hover:text-yellow-600 transition-colors underline"
                        >
                            abc@example.com
                        </a>
                    </p>
                </div>
            </section>
        </div>
    );
}