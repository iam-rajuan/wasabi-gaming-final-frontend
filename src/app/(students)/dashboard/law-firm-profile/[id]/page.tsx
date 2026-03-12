"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
    ArrowLeft, Calendar, CheckCircle, MapPin, FileText, Globe, Mail, Phone, Star, Users, ChevronRight
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ICONS } from "@/assets";

// Types
interface Position {
    title: string;
    type: string;
    employment: string;
    level: string;
    location: string;
    salary: string;
    posted: string;
    description: string;
}

interface Benefit {
    title: string;
    description: string;
}

interface Value {
    title: string;
    description: string;
}

interface FirmData {
    name: string;
    tagline: string;
    logo: any; // using any for imported image asset
    featured: boolean;
    rating: string;
    ratingMember: number;
    location: string;
    employees: string;
    founded: string;
    openPositions: string;
    website: string;
    email: string;
    phone: string;
    practiceAreas: string[];
    about: string;
    cultureAndValues: Value[];
    benefitsAndPerks: Benefit[];
    positions: Position[];
}


export default function LawFirmProfilePage({ params }: { params: { id: string } }) {
    const [activeTab, setActiveTab] = useState<"overview" | "positions" | "culture">("overview");
    const router = useRouter();

    const firmData: FirmData = {
        name: "DLA Piper",
        tagline: "Global Business Law Firm",
        logo: ICONS.farmLogo,
        featured: true,
        rating: "4.8",
        ratingMember: 534,
        location: "Worldwide",
        employees: "4200+",
        founded: "2005",
        openPositions: "25",
        website: "dlapiper.com",
        email: "graduate.recruitment@dlapiper.com",
        phone: "+44 8700 111 111",
        practiceAreas: [
            "Corporate",
            "Finance",
            "Litigation",
            "Real Estate",
            "IP & Technology",
        ],
        about:
            "DLA Piper is a global law firm with lawyers located in more than 40 countries throughout the Americas, Europe, the Middle East, Africa and Asia Pacific, positioning us to help clients with their legal needs around the world.",
        cultureAndValues: [
            {
                title: "Global network advantage",
                description: "Access to international resources and expertise",
            },
            {
                title: "Innovative legal solutions",
                description: "Cutting-edge approach to complex legal challenges",
            },
            {
                title: "Commitment to diversity",
                description: "Inclusive workplace fostering diverse perspectives",
            },
            {
                title: "Pro bono excellence",
                description: "Dedicated to serving communities through pro bono work",
            },
        ],
        benefitsAndPerks: [
            {
                title: "Competitive compensation",
                description: "Industry-leading salary and bonus structure",
            },
            {
                title: "Global career opportunities",
                description: "International placements and cross-border experience",
            },
            {
                title: "Comprehensive benefits",
                description: "Health, dental, vision, and retirement plans",
            },
            {
                title: "Professional development",
                description: "Continuous learning and career advancement programs",
            },
            {
                title: "Flexible working options",
                description: "Hybrid work models and flexible schedules",
            },
            {
                title: "Employee networks",
                description: "Supportive community and networking groups",
            },
        ],
        positions: [
            {
                title: "Associate Lawyer - Corporate",
                type: "Corporate Law",
                employment: "Full-time",
                level: "Mid",
                location: "Worldwide",
                salary: "£80,000 - £120,000",
                posted: "10/5/2025",
                description:
                    "We are seeking an experienced corporate lawyer to join our dynamic team.",
            },
            {
                title: "Trainee Solicitor",
                type: "General Practice",
                employment: "Full-time",
                level: "Entry",
                location: "Worldwide",
                salary: "£45,000 - £55,000",
                posted: "10/8/2025",
                description:
                    "Excellent opportunity for newly qualified solicitors to gain experience across multiple practice areas.",
            },
            {
                title: "Senior Litigation Partner",
                type: "Litigation",
                employment: "Full-time",
                level: "Partner",
                location: "Worldwide",
                salary: "£150,000+",
                posted: "9/28/2025",
                description:
                    "Leading our litigation practice and developing new client relationships.",
            },
        ],
    };

    const StarRating = ({ rating }: { rating: string }) => {
        const numRating = parseFloat(rating);
        return (
            <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                        key={star}
                        className={`w-4 h-4 ${star <= numRating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                    />
                ))}
                <span className="font-bold text-sm ml-1">{rating}</span>
            </div>
        )
    }

    return (
        <div className="max-w-7xl mx-auto p-4 md:p-8 min-h-screen bg-white">
            {/* Back Button */}
            <Button
                variant="outline"
                onClick={() => router.back()}
                className="mb-8 gap-2 border-gray-200 text-black hover:bg-gray-50"
            >
                <ArrowLeft className="w-4 h-4" /> Back to Law Firms
            </Button>

            {/* Header Card */}
            <div className="rounded-[20px] overflow-hidden border border-gray-200 shadow-sm mb-8">
                <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-8">
                    <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
                        <div className="bg-white p-2 rounded-xl shadow-sm border border-gray-100 w-32 h-32 flex items-center justify-center flex-shrink-0 bg-gradient-to-br from-[#00C950] to-[#009966]">
                            <Image src={firmData.logo} alt={firmData.name} className="object-contain max-w-full max-h-full" />
                        </div>
                        <div className="flex-1">
                            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{firmData.name}</h1>
                            <p className="text-lg text-gray-600 mb-4">{firmData.tagline}</p>

                            <div className="flex flex-wrap gap-4 items-center">
                                <div className="flex items-center gap-2">
                                    <StarRating rating={firmData.rating} />
                                    <span className="text-sm text-gray-500">({firmData.ratingMember} reviews)</span>
                                </div>

                                <div className="flex flex-wrap gap-2">
                                    <Badge variant="secondary" className="gap-1 font-normal bg-white/50 text-gray-700">
                                        <Globe className="w-3 h-3" /> {firmData.location}
                                    </Badge>
                                    <Badge variant="secondary" className="gap-1 font-normal bg-white/50 text-gray-700">
                                        <Users className="w-3 h-3" /> {firmData.employees} employees
                                    </Badge>
                                    <Badge variant="secondary" className="gap-1 font-normal bg-white/50 text-gray-700">
                                        <Calendar className="w-3 h-3" /> Founded {firmData.founded}
                                    </Badge>
                                    <Badge variant="secondary" className="gap-1 font-normal bg-white/50 text-gray-700">
                                        <FileText className="w-3 h-3" /> {firmData.openPositions} open positions
                                    </Badge>
                                </div>
                            </div>

                            <div className="mt-4 flex flex-wrap gap-2">
                                {firmData.practiceAreas.map((area, i) => (
                                    <Badge key={i} variant="outline" className="bg-white border-gray-200 text-gray-600 font-normal">
                                        {area}
                                    </Badge>
                                ))}
                            </div>
                        </div>

                        {firmData.featured && (
                            <Badge className="bg-[#ffff00] text-black hover:bg-[#e6e600] px-4 py-1.5 text-sm font-semibold border-none">
                                Featured Firm
                            </Badge>
                        )}
                    </div>
                </div>

                {/* Contact Info */}
                <div className="bg-gray-50 p-6 border-t border-gray-200 grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="flex items-center gap-3">
                        <Globe className="w-5 h-5 text-gray-400" />
                        <div>
                            <span className="text-xs text-gray-500 block uppercase tracking-wider">Website</span>
                            <span className="font-semibold text-gray-900">{firmData.website}</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <Mail className="w-5 h-5 text-gray-400" />
                        <div>
                            <span className="text-xs text-gray-500 block uppercase tracking-wider">Email</span>
                            <span className="font-semibold text-gray-900">{firmData.email}</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <Phone className="w-5 h-5 text-gray-400" />
                        <div>
                            <span className="text-xs text-gray-500 block uppercase tracking-wider">Phone</span>
                            <span className="font-semibold text-gray-900">{firmData.phone}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tabs Navigation */}
            <div className="bg-gray-100 p-2 rounded-[20px] flex mb-8">
                {(["overview", "positions", "culture"] as const).map(tab => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`flex-1 py-2.5 rounded-[16px] text-sm font-medium transition-all ${activeTab === tab
                                ? "bg-white shadow-sm text-gray-900"
                                : "text-gray-500 hover:bg-gray-200/50"
                            }`}
                    >
                        {tab === "overview" && "Overview"}
                        {tab === "positions" && `Open Positions (${firmData.positions.length})`}
                        {tab === "culture" && "Culture & Benefits"}
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            <div className="space-y-6">
                {activeTab === "overview" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="md:col-span-2 bg-white rounded-[20px] border border-gray-200 p-8">
                            <h3 className="text-xl font-bold mb-4">About {firmData.name}</h3>
                            <p className="text-gray-600 leading-relaxed text-lg">{firmData.about}</p>
                        </div>

                        <div className="bg-white rounded-[20px] border border-gray-200 p-8">
                            <h3 className="text-lg font-bold mb-6">Practice Areas</h3>
                            <div className="space-y-3">
                                {firmData.practiceAreas.map((area, index) => (
                                    <div key={index} className="flex items-center gap-3">
                                        <CheckCircle className="w-5 h-5 text-green-500" />
                                        <span className="text-gray-700">{area}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-white rounded-[20px] border border-gray-200 p-8">
                            <h3 className="text-lg font-bold mb-6">Key Highlights</h3>
                            <div className="space-y-3">
                                {[
                                    "Ranked Top 10 Global Law Firm",
                                    "International Practice Network",
                                    "Award-Winning Legal Team",
                                    "Innovative Technology Solutions",
                                ].map((highlight, index) => (
                                    <div key={index} className="flex items-center gap-3">
                                        <CheckCircle className="w-5 h-5 text-green-500" />
                                        <span className="text-gray-700">{highlight}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === "positions" && (
                    <div className="space-y-4">
                        {firmData.positions.map((title, i) => (
                            <div key={i} className="bg-white border border-gray-200 rounded-[20px] p-6 md:p-8 hover:border-gray-300 transition-colors">
                                <div className="flex flex-col lg:flex-row gap-6 justify-between items-start lg:items-center">
                                    <div className="flex-1 space-y-4">
                                        <div className="flex flex-wrap items-center gap-3">
                                            <h3 className="text-xl font-bold text-gray-900">{title.title}</h3>
                                            <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200 border-none">{title.type}</Badge>
                                            <Badge className="bg-green-100 text-green-700 hover:bg-green-200 border-none">{title.employment}</Badge>
                                            <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-200 border-none">{title.level}</Badge>
                                        </div>

                                        <div className="flex flex-wrap gap-6 text-sm text-gray-500">
                                            <div className="flex items-center gap-2">
                                                <MapPin className="w-4 h-4" /> {title.location}
                                            </div>
                                            <div className="flex items-center gap-2 font-medium text-gray-900">
                                                {title.salary}
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Calendar className="w-4 h-4" /> Posted {title.posted}
                                            </div>
                                        </div>

                                        <p className="text-gray-600">{title.description}</p>
                                    </div>

                                    <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
                                        <Button className="bg-[#ffff00] text-black hover:bg-[#e6e600] h-12 px-8 font-semibold rounded-xl w-full sm:w-auto">
                                            Apply Now
                                        </Button>
                                        <Button variant="outline" className="h-12 px-8 font-medium rounded-xl border-gray-300 w-full sm:w-auto">
                                            View Details
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {activeTab === "culture" && (
                    <div className="space-y-8">
                        <div className="bg-white rounded-[20px] border border-gray-200 p-8">
                            <h3 className="text-xl font-bold mb-6">Culture & Values</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {firmData.cultureAndValues.map((item, i) => (
                                    <div key={i} className="flex gap-4">
                                        <div className="w-10 h-10 rounded-full bg-[#ffff00] flex items-center justify-center flex-shrink-0">
                                            <CheckCircle className="w-5 h-5 text-gray-900" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-900 mb-1">{item.title}</h4>
                                            <p className="text-sm text-gray-600">{item.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-white rounded-[20px] border border-gray-200 p-8">
                            <h3 className="text-xl font-bold mb-6">Benefits & Perks</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {firmData.benefitsAndPerks.map((item, i) => (
                                    <div key={i} className="flex gap-4">
                                        <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0 text-blue-600">
                                            <Star className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-900 mb-1">{item.title}</h4>
                                            <p className="text-sm text-gray-600">{item.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
