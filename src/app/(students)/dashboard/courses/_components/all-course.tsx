"use client";
import { Award, BookOpen, CircleCheckBig, GraduationCap, Search, Star, TrendingUp, Users } from 'lucide-react'
import CourseCard from './course-card'
import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';

 
export const metadata = {
    title: 'CourseHub - Learn from Expert-Led Courses',
    description: 'Access high-quality courses designed to help you land your dream job.',
}

export default function AllCourse() {

    const { data: sessionData } = useSession();
    const token = sessionData?.accessToken;

    const { data } = useQuery({
        queryKey: ["dashboardStudents"],
        queryFn: async () => {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/course/dashboard`
            );
            if (!res.ok) throw new Error("Failed to load ");
            return res.json();
        },
    });

    const { data: statss } = useQuery({
        queryKey: ["statss"],
        queryFn: async () => {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/course/header`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }
            );
            if (!res.ok) throw new Error("Failed to load ");
            return res.json();
        },
    });
    
        const { data: rating } = useQuery({
        queryKey: ["rating"],
        queryFn: async () => {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/review/course`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }
            );
            if (!res.ok) throw new Error("Failed to load ");
            return res.json();
        },
    });

    const stats = [
        { label: 'Total My Courses', value: statss?.data?.purchasedCourseCount || 0, icon: BookOpen, bg: "#DBEAFE", textCOlor: "#155DFC" },
        { label: 'Enrolled', value: statss?.data?.enrolledCourseCount || 0, icon: CircleCheckBig, bg: "#DCFCE7", textCOlor: "#00A63E" },
        { label: 'Videos Completed', value: statss?.data?.completedVideoCount || 0, icon: TrendingUp, bg: "#F3E8FF", textCOlor: "#9810FA" },
        { label: 'Certificates', value: statss?.data?.totalCertificate || 0, icon: Award, bg: "#FEF9C2", textCOlor: "#D08700" },
    ]; 


    return (
        <div className="min-h-screen bg-background">
            <main className="container mx-auto px-4 py-10">

                {/* HERO */}
                <section className="mb-10">
                    <div className="rounded-2xl border-2 border-[#FFFF00] bg-[linear-gradient(135deg,#FEFCE8_0%,#FFFFFF_50%,#FAF5FF_100%)]  p-14">
                        <span className="inline-flex  rounded-full bg-[#FFFF00] px-3 py-2 items-center gap-3 text-xs font-semibold text-[#1E1E1E] mb-4 ">
                            <GraduationCap size={20} />  Professional Development
                        </span>

                        <h1 className="text-3xl text-[#1E1E1E] md:text-4xl pt-4  mb-3">
                            Advance Your Career with Expert-Led Courses
                        </h1>

                        <p className="text-[#4A5565] pt-4 max-w-2xl mb-6">
                            Access high-quality courses designed to help you land your dream job.
                            Learn at your own pace with interactive video lessons and practical exercises.
                        </p>

                        <div className="flex flex-wrap gap-6 text-sm">
                            <span className='flex items-center gap-2 text-[16px]'><Award className='text-[#FFFF00]' size={20} /> {data?.data?.totalFreeCourses} Free Courses</span>
                            <span className='flex items-center gap-2 text-[16px]'><Users className='text-[#FFFF00]' size={20} /> {data?.data?.totalStudents} Students</span>
                            <span className='flex items-center gap-2'><Star className='text-[#FFFF00]' size={20} />   {Number(rating?.data?.[0]?.averageRating || 0).toFixed(1)} Average Rating</span>
                        </div>
                    </div>
                </section>

                {/* STATS */}
                <section className="mb-10">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {stats.map((s, i) => (
                            <div
                                key={i}
                                className={`rounded-xl border border-[#0000001A] p-6 flex items-center gap-3 `}
                            >
                                <div
                                    className="h-9 w-9 flex items-center justify-center rounded-full"
                                    style={{ backgroundColor: s.bg }}
                                >
                                    {s.icon && <s.icon style={{ color: s.textCOlor }} size={20} />}
                                </div>

                                <div>
                                    <p className="text-lg ">{s.value}</p>
                                    <p className="text-[16px] text-muted-foreground ">{s.label}</p>
                                   
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
                {/* COURSES */}
                <CourseCard />
            </main>
        </div>
    )
}
