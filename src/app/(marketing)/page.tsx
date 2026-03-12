'use client';

import React from 'react';
import StudentHome from '@/components/home/student/studentHome'; // Ensure these are migrated or work with Next.js
import SchoolHome from '@/components/home/School/schoolHome';
import { useAppStore } from '@/store/useAppStore';
import { ActiveSection } from '@/constant/navConstant';

export default function HomePage() {
    const activeSection = useAppStore((state) => state.activeSection);

    // We are using client-side rendering for this choice because it depends on localStorage/store.
    // Ideally, useHydratedStore pattern to avoid mismatch, but simple conditional render works if initial state matches.

    return (
        <div>
            {activeSection === ActiveSection.School ? (
                <SchoolHome />
            ) : (
                <StudentHome />
            )}
        </div>
    );
}
