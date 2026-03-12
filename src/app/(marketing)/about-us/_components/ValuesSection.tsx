import { Scale, Handshake, Users, Trophy } from "lucide-react";

const values = [
    {
        id: 1,
        icon: <Scale className="w-7 h-7" />,
        title: "Equal Access",
        description:
            "We believe everyone deserves a fair start. Aspiring breaks down barriers by making guidance and opportunities simple, clear, and accessible to all.",
        gradient: "linear-gradient(135deg, #858AFF, #505399)",
    },
    {
        id: 2,
        icon: <Handshake className="w-7 h-7" />,
        title: "Mutual Respect",
        description:
            "We value every user equally. Respect means listening, protecting your privacy, and creating a safe space for everyone to grow.",
        gradient: "linear-gradient(135deg, #009F64, #00754A)",
    },
    {
        id: 3,
        icon: <Users className="w-7 h-7" />,
        title: "Strong Community",
        description:
            "We thrive as a community. Collaboration, shared insights, and feedback drive us forward and make every journey stronger.",
        gradient: "linear-gradient(135deg, #8326FF, #4F1799)",
    },
    {
        id: 4,
        icon: <Trophy className="w-7 h-7" />,
        title: "Growth & Empowerment",
        description:
            "We empower you to grow with confidence. Aspiring helps you build skills, showcase your strengths, and move closer to your goals.",
        gradient: "linear-gradient(135deg, #EECC0E, #BAA00B)",
    },
];

export default function ValuesSection() {
    return (
        <div className="py-20 font-['Neuton'] px-4">
            {/* Heading */}
            <div className="max-w-5xl mx-auto mb-16 text-center">
                <h2 className="text-4xl font-bold">Our Values</h2>
                <p className="max-w-3xl mx-auto text-lg text-[#5A5A5A] pt-7 inter">
                    At The Aspiring Legal Network, we're guided by values that go beyond
                    career tools — they define how we empower, connect, and support every
                    individual on their journey into law.
                </p>
            </div>

            {/* Grid */}
            <div className="grid gap-8 mx-auto max-w-7xl sm:grid-cols-2">
                {values.map((item) => (
                    <div
                        key={item.id}
                        className="p-8 transition bg-white border border-gray-100 shadow-lg rounded-2xl hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                    >
                        <div
                            className="flex items-center justify-center w-14 h-14 rounded-2xl shadow-inner"
                            style={{
                                background: item.gradient,
                            }}
                        >
                            <span className="text-2xl text-white">{item.icon}</span>
                        </div>
                        <h3 className="mt-6 text-2xl font-bold">{item.title}</h3>
                        <p className="mt-4 text-[#5A5A5A] text-lg leading-relaxed inter">{item.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
