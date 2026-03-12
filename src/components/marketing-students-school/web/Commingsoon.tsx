'use client'

import Image from 'next/image'
import React, { useState, useEffect, KeyboardEvent } from 'react'

type TimeLeft = {
  days: number
  hours: number
  minutes: number
  seconds: number
}

const ComingSoon: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 30,
    hours: 8,
    minutes: 32,
    seconds: 45,
  })

  const [email, setEmail] = useState<string>('')
  const [subscribed, setSubscribed] = useState<boolean>(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { days, hours, minutes, seconds } = prev

        if (seconds > 0) {
          seconds--
        } else {
          seconds = 59
          if (minutes > 0) {
            minutes--
          } else {
            minutes = 59
            if (hours > 0) {
              hours--
            } else {
              hours = 23
              if (days > 0) {
                days--
              }
            }
          }
        }

        return { days, hours, minutes, seconds }
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const handleSubscribe = (): void => {
    if (!email) return

    setSubscribed(true)

    setTimeout(() => {
      setEmail('')
      setSubscribed(false)
    }, 3000)
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      handleSubscribe()
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-50 via-yellow-100 to-amber-100 relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute inset-0 overflow-hidden">
  {/* <Image
    src="/wasab.png"
    alt="Coming Soon Background"
    fill
    priority
    className="object-cover opacity-20"
  /> */}
</div>

      <section className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        {/* Logo */}
        <div className="mb-8 inline-block">
          <div className="w-24 h-24 rounded-2xl flex items-center justify-center shadow-2xl hover:scale-110 transition">
            <Image
              src="/wasab.png"
              alt="Wasabi Gaming Logo"
              width={80}
              height={80}
              className="object-contain"
            />
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 via-amber-500 to-yellow-600 mb-4 animate-pulse">
          Coming Soon
        </h1>

        <p className="text-xl md:text-2xl text-gray-700 font-medium mb-12 max-w-2xl mx-auto">
          We&apos;re crafting something extraordinary for you. Get ready for an amazing experience!
        </p>

        {/* Countdown */}
        <div className="grid grid-cols-4 gap-4 md:gap-8 mb-12 max-w-2xl mx-auto">
          {[
            { label: 'Days', value: timeLeft.days },
            { label: 'Hours', value: timeLeft.hours },
            { label: 'Minutes', value: timeLeft.minutes },
            { label: 'Seconds', value: timeLeft.seconds },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-xl p-4 md:p-6 hover:scale-105 transition"
            >
              <div className="text-3xl md:text-5xl font-bold text-amber-500 mb-2">
                {String(item.value).padStart(2, '0')}
              </div>
              <div className="text-xs md:text-sm text-gray-600 font-semibold uppercase tracking-wider">
                {item.label}
              </div>
            </div>
          ))}
        </div>

        {/* Email */}
        <div className="mb-12">
          <h3 className="text-lg md:text-xl text-gray-700 font-semibold mb-4">
            Be the first to know when we launch!
          </h3>

          {!subscribed ? (
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 rounded-xl border-2 border-yellow-300 focus:border-amber-500 focus:outline-none text-gray-700 shadow-lg"
              />
              <button
                onClick={handleSubscribe}
                className="px-8 py-4 bg-gradient-to-r from-yellow-400 to-amber-500 text-white font-bold rounded-xl shadow-lg hover:scale-105 transition"
              >
                Notify Me
              </button>
            </div>
          ) : (
            <div className="bg-green-100 border-2 border-green-400 rounded-xl px-6 py-4 max-w-md mx-auto">
              <p className="text-green-700 font-semibold">
                ✓ Thank you! We&apos;ll notify you soon.
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}

export default ComingSoon

// "use client";

// import Image from "next/image";
// import React, { useEffect, useState, KeyboardEvent } from "react";

// type TimeLeft = {
//   days: number;
//   hours: number;
//   minutes: number;
//   seconds: number;
// };

// const ComingSoon: React.FC = () => {
//   const [timeLeft, setTimeLeft] = useState<TimeLeft>({
//     days: 30,
//     hours: 8,
//     minutes: 32,
//     seconds: 45,
//   });

//   const [email, setEmail] = useState<string>("");
//   const [subscribed, setSubscribed] = useState<boolean>(false);
//   const [isHovered, setIsHovered] = useState<boolean>(false);

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setTimeLeft((prev) => {
//         let { days, hours, minutes, seconds } = prev;

//         if (seconds > 0) {
//           seconds--;
//         } else {
//           seconds = 59;
//           if (minutes > 0) {
//             minutes--;
//           } else {
//             minutes = 59;
//             if (hours > 0) {
//               hours--;
//             } else {
//               hours = 23;
//               if (days > 0) {
//                 days--;
//               }
//             }
//           }
//         }

//         return { days, hours, minutes, seconds };
//       });
//     }, 1000);

//     return () => clearInterval(timer);
//   }, []);

//   const handleSubscribe = (): void => {
//     if (!email) return;

//     setSubscribed(true);

//     setTimeout(() => {
//       setEmail("");
//       setSubscribed(false);
//     }, 3000);
//   };

//   const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>): void => {
//     if (e.key === "Enter") {
//       handleSubscribe();
//     }
//   };

//   return (
//     <main className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
//       {/* Grid */}
//       <div className="absolute inset-0 bg-grid-pattern opacity-20" />

//       {/* Orbs */}
//       <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500 rounded-full blur-3xl opacity-20 animate-pulse" />
//       <div
//         className="absolute top-1/3 right-1/4 w-96 h-96 bg-yellow-500 rounded-full blur-3xl opacity-20 animate-pulse"
//         style={{ animationDelay: "1s" }}
//       />
//       <div
//         className="absolute bottom-1/4 left-1/2 w-96 h-96 bg-pink-500 rounded-full blur-3xl opacity-20 animate-pulse"
//         style={{ animationDelay: "2s" }}
//       />

//       {/* Floating particles */}
//       <div className="absolute inset-0">
//         {Array.from({ length: 20 }).map((_, i) => (
//           <div
//             key={i}
//             className="absolute w-2 h-2 bg-yellow-400 rounded-full opacity-30"
//             style={{
//               left: `${Math.random() * 100}%`,
//               top: `${Math.random() * 100}%`,
//               animation: `float ${
//                 5 + Math.random() * 10
//               }s ease-in-out infinite`,
//               animationDelay: `${Math.random() * 5}s`,
//             }}
//           />
//         ))}
//       </div>

//       {/* Styles */}
//       <style jsx>{`
//         @keyframes float {
//           0%,
//           100% {
//             transform: translate(0, 0);
//           }
//           50% {
//             transform: translate(10px, -20px);
//           }
//         }

//         .bg-grid-pattern {
//           background-image: linear-gradient(
//               rgba(255, 255, 255, 0.05) 1px,
//               transparent 1px
//             ),
//             linear-gradient(
//               90deg,
//               rgba(255, 255, 255, 0.05) 1px,
//               transparent 1px
//             );
//           background-size: 50px 50px;
//         }
//       `}</style>

//       <section className="relative z-10 text-center px-4 max-w-5xl mx-auto">
//         {/* Logo */}
//         <div className="mb-8 inline-block relative">
//           <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-3xl blur-2xl opacity-50 animate-pulse" />

//           <div
//             className="relative w-28 h-28 rounded-3xl bg-gradient-to-br from-yellow-400 via-amber-500 to-orange-500 flex items-center justify-center shadow-2xl transition-all duration-500"
//             onMouseEnter={() => setIsHovered(true)}
//             onMouseLeave={() => setIsHovered(false)}
//             style={{
//               transform: isHovered
//                 ? "scale(1.1) rotate(5deg)"
//                 : "scale(1) rotate(0deg)",
//             }}
//           >
//             <Image
//               src="/Icon.png" // 👉 public folder image
//               alt="Wasabi Gaming Logo"
//               width={64}
//               height={64}
//               priority
//               className="object-contain"
//             />
//           </div>
//         </div>

//         {/* Heading */}
//         <h1 className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-500 mb-6">
//           Coming Soon
//         </h1>

//         {/* Countdown */}
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 max-w-3xl mx-auto">
//           {[
//             { label: "Days", value: timeLeft.days },
//             { label: "Hours", value: timeLeft.hours },
//             { label: "Minutes", value: timeLeft.minutes },
//             { label: "Seconds", value: timeLeft.seconds },
//           ].map((item, index) => (
//             <div
//               key={index}
//               className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 hover:scale-105 transition"
//             >
//               <div className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-br from-yellow-400 to-amber-500">
//                 {String(item.value).padStart(2, "0")}
//               </div>
//               <div className="text-xs text-gray-400 mt-2 uppercase tracking-widest">
//                 {item.label}
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Email */}
//         <div className="max-w-xl mx-auto">
//           {!subscribed ? (
//             <div className="flex flex-col sm:flex-row gap-3">
//               <input
//                 type="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 onKeyDown={handleKeyDown}
//                 placeholder="your@email.com"
//                 className="flex-1 px-6 py-4 rounded-xl bg-white/10 border border-white/20 text-white"
//               />
//               <button
//                 onClick={handleSubscribe}
//                 className="px-8 py-4 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-xl font-bold text-gray-900 hover:scale-105 transition"
//               >
//                 Notify Me
//               </button>
//             </div>
//           ) : (
//             <p className="text-green-400 font-semibold">
//               ✓ You’re on the list!
//             </p>
//           )}
//         </div>
//       </section>
//     </main>
//   );
// };

// export default ComingSoon;
