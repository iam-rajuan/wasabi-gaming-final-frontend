"use client";
import { useState } from "react";
import {
  FileText,
  Brain,
  Briefcase,
  Target,
  Scale,
  Sparkles,
  Star,
} from "lucide-react";
import image3 from "../../../assets/images/blacko 1.png";
interface FeatureCardProps {
  title: string;
  description: string;
  buttonText: string;
  icon: React.ElementType;
  image: string;
  delay?: number;
}

const FeatureCard = ({
  title,
  description,
  buttonText,
  icon: Icon,
  image,
  delay = 0,
}: FeatureCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-500 hover:scale-105 hover:shadow-2xl flex flex-col h-full "
      style={{ animationDelay: `${delay}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Section */}
      <div className="relative h-48 bg-white overflow-hidden p-2 cursor-pointer">
        <img
          src={image}
          alt={title}
          className={`w-full h-full object-cover transition-all duration-700 ${isHovered ? "scale-110 brightness-110" : "scale-100"
            }`}
        />
        <div className="absolute inset-0 bg-transparent"></div>

        {/* Floating Icon */}
        <div
          className={`absolute top-4 right-4 yellow p-3 rounded-full shadow-lg transition-all duration-500 ${isHovered ? "scale-110 rotate-12" : "scale-100 rotate-0"
            }`}
        >
          <Icon className="w-6 h-6 text-gray-900" />
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6 flex flex-col justify-between flex-grow cursor-pointer">
        <div className="space-y-4">
          <h3 className="text-xl font-semibold main-color leading-tight source">
            {title}
          </h3>
          <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
        </div>

        <button className="w-full mt-6 yellow hover:bg-[#ffef12] text-gray-900 font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg group flex items-center justify-center gap-2">
          <span>{buttonText}</span>
          <Sparkles className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
        </button>
      </div>

      {/* Animated Bottom Border */}
      <div
        className={`h-1 bg-gradient-to-r from-[#ffef12] via- to-yellow-400 transform transition-all duration-500 ${isHovered ? "scale-x-100" : "scale-x-0"
          }`}
      ></div>
    </div>
  );
};

const StarDecoration = () => (
  <div className="relative">
    {/* <Star className="w-16 h-16 text-gray-900 fill-gray-900 animate-pulse" /> */}
    <div className="absolute -top-2 -left-2">
      <Star className="w-6 h-6 text-gray-700 fill-gray-700 animate-ping" />
    </div>
    <div className="absolute -bottom-2 -right-2">
      <Star className="w-4 h-4 text-gray-700 fill-gray-700 animate-bounce" />
    </div>
  </div>
);

const BannerCard = () => {
  const cards = [
    {
      title: "Build and Perfect Your CV & Cover Letter Every Time!",
      description:
        "Update your profile anytime, upload your documents, and create tailored CVs and cover letters for every application.",
      buttonText: "Start Building Now!",
      icon: FileText,
      image:
        "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&q=80",
    },
    {
      title: "Psychometric Tests",
      description:
        "Psychometric tests assess cognitive abilities, problem-solving, and behavior, measuring skills like numerical, verbal, and abstract reasoning. They help employers understand a candidate's strengths and potential for specific job roles.",
      buttonText: "Take a test",
      icon: Brain,
      image:
        "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&q=80",
    },
    {
      title: "Track & Browse Applications with Ease",
      description:
        "Keep track of all your job applications, from screening to interviews. Easily browse opportunities and never miss a deadline.",
      buttonText: "Track New Application",
      icon: Briefcase,
      image:
        "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80",
    },
    {
      title: "Mock Interview Simulation",
      description:
        "Practice interviews with AI. Our AI-powered mock interview tool includes a live conversation experience and simulates 30 rounds to prepare you for job interviews.",
      buttonText: "Take a test", 
      icon: Target,
      image:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80",
    },
    {
      title: "AI Assessment Centre",
      description:
        "Discover your cognitive strengths and ideal career paths with our comprehensive assessment tools.",
      buttonText: "Start Test",
      icon: Brain,
      image:
        "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80",
    },
    {
      title: "Discover Top Law Firms for Your Legal Career",
      description:
        "Explore leading law firms, learn about their practice areas, cultures, and opportunities. Find the perfect match for your legal career aspirations.",
      buttonText: "Discover Law firm profiles",
      icon: Scale,
      image:
        "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&q=80",
    },
  ];

  return (
    <div className="min-h-screen py-12 px-4 relative overflow-hidden ">

      {/* Decorative Stars */}
      <div className="absolute top-20 left-10 opacity-20 animate-float">
        <Star className="w-8 h-8 text-yellow-600 fill-yellow-600" />
      </div>
      <div
        className="absolute top-40 right-20 opacity-20 animate-float"
        style={{ animationDelay: "1s" }}
      >
        <Star className="w-12 h-12 text-yellow-600 fill-yellow-600" />
      </div>
      <div
        className="absolute bottom-20 left-1/4 opacity-20 animate-float"
        style={{ animationDelay: "2s" }}
      >
        <Star className="w-6 h-6 text-yellow-600 fill-yellow-600" />
      </div>

      <div className=" mx-auto">
        {/* Grid Layout - 4 Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {cards.slice(0, 4).map((card, index) => (
            <div
              key={index}
              className="animate-fadeInUp h-full"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <FeatureCard {...card} delay={index * 100} />
            </div>
          ))}
        </div>

        {/* Grid Layout - 2 Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {cards.slice(4, 6).map((card, index) => (
            <div
              key={index + 4}
              className="animate-fadeInUp h-full"
              style={{ animationDelay: `${(index + 4) * 150}ms` }}
            >
              <FeatureCard {...card} delay={(index + 4) * 100} />
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-16">
          <StarDecoration />
        </div>
      </div>

      {/* Floating Orbs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-yellow-300/10 rounded-full blur-3xl animate-pulse"></div>
      <div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-300/10 rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: "2s" }}
      ></div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(10deg);
          }
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out forwards;
          opacity: 0;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default BannerCard;
