import { Landmark, Briefcase, Smile } from "lucide-react";
import Image from "next/image";

interface Stat {
    icon: string;
    value: string;
    label: string;
    color: string;
    bg: string;
    iconColor: string;
}

const StatsSection = () => {
    const stats: Stat[] = [
        { icon: "/law-11.png", value: "9+", label: "Law Firms Listed", color: "#bddaff", bg: "bg-blue-50", iconColor: "#1e1e1e" },
        { icon: "/law-12.png", value: "500+", label: "Open Positions", color: "#b8f7cf", bg: "bg-green-50", iconColor: "#00a63e" },
        { icon: "/law-13.png", value: "95%", label: "Satisfaction Rate", color: "#e9d4ff", bg: "bg-purple-50", iconColor: "#8000fa" },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {stats.map((stat, i) => (
                <div
                    key={i}
                    className={`border-2 rounded-3xl p-4 md:p-6 flex items-center ${stat.bg}`}
                    style={{ borderColor: stat.color }}
                >
                    <div style={{ color: stat.iconColor }}>
                       <Image src={stat.icon} width={1000} height={1000} alt={stat.label} className="w-8 h-8 md:w-12 md:h-12 object-cover" />
                    </div>
                    <div className="ml-3 md:ml-4">
                        <div className="text-xl md:text-3xl font-medium text-gray-900">{stat.value}</div>
                        <div className="text-xs md:text-sm text-gray-600">{stat.label}</div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default StatsSection;
