import React from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

// FAQ Component
export const StudentFAQSection = () => {
  const faqs = [
    {
      question: '1. What is Aspiring Legal Network and how can it help me?',
      answer:
        'Aspiring Legal Network is a platform that helps you explore legal careers and understand the different paths into the profession. It provides access to practical experiences, tools, and guidance so you can learn, build skills, and prepare at your own pace.',
    },
    {
      question: '2. Who is Aspiring Legal Network for?',
      answer:
        'Aspiring Legal Network is for students of all ages and stages. Whether you are just starting to explore law or actively preparing applications, the platform is designed to support you wherever you are in your journey.',
    },
    {
      question: '3. Do I need to know what I want to do yet?',
      answer:
        'No. You do not need to have decided on a career. The platform helps you explore options, learn about different legal roles, and work out what suits you best over time.',
    },
    {
      question: '4. How can Aspiring Legal Network help me prepare for applications?',
      answer:
        'Aspiring Legal Network supports you with CV building, interview practice, application tracking, and insight into what employers look for. This helps you stay organised, practise key skills, and approach applications with more confidence.',
    },
    {
      question: '5. What are the main routes into a legal career?',
      answer:
        'There are several routes into law, including university study, solicitor apprenticeships, and other vocational pathways. Understanding these options early can help you decide which route is right for you.',
    },
    {
      question:
        '6.What skills do law firms look for in candidates?',
      answer:
        'Law firms look for a range of skills beyond academic ability. This includes clear communication, problem solving, teamwork, attention to detail, commercial awareness, and the ability to manage time, take responsibility, and act professionally.',
    },

  ]

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-[1175px] mx-auto text-center">
        <h2
          className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
          style={{ fontFamily: "'Neuton', serif" }}
        >
          Got questions?
        </h2>
        <p className="text-gray-700 text-base md:text-lg max-w-3xl mx-auto mb-12">
          Find answers to common questions about Aspiring Legal Network and how
          it can support you at every stage of your journey.
        </p>

        {/* Accordion */}
        <Accordion type="single" collapsible className="w-full space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="bg-white rounded-lg border-2 overflow-hidden"
              style={{ borderColor: '#FFFF00' }}
            >
              <AccordionTrigger className="px-6 py-5 text-left text-base md:text-lg font-semibold text-gray-900 hover:no-underline hover:bg-gray-50 flex items-center justify-between gap-4">
                <span className="flex items-center gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-black text-white rounded-full flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </span>
                  <span className="text-left">{faq.question}</span>
                </span>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-5 pt-2 text-[#616161] text-left font-semibold leading-relaxed text-sm md:text-base">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
