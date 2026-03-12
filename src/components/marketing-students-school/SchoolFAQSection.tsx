import React from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

// FAQ Component
export const FAQSection = () => {
  const faqs = [
    {
      question: 'How does Aspiring Legal Network support schools and teachers?',
      answer:
        'Aspiring Legal Network supports schools by providing structured, practical exposure to legal careers. We work with teachers and careers leads to deliver sessions, resources, and tools that help students understand legal pathways, develop key skills, and prepare for future progression.',
    },
    {
      question: 'Which students is Aspiring Legal Network suitable for?',
      answer:
        'Aspiring Legal Network is suitable for students of all ages and stages. Content and activities can be adapted to suit different year groups, cohorts, and levels of experience, from early exploration through to application preparation.',
    },
    {
      question: 'What types of activities and support are available?',
      answer:
        'Support includes careers assemblies, interactive workshops, mock trials, skills sessions, and application focused activities. Schools also have access to tools that support student tracking, engagement monitoring, and progression over time.',
    },
    {
      question: 'Can sessions be delivered in school or online?',
      answer:
        'Yes. Sessions can be delivered in school, online, or at external venues such as universities or professional spaces. Delivery is flexible and designed to fit around school timetables and priorities.',
    },
    {
      question: 'Do students need prior legal knowledge to take part?',
      answer:
        'No prior legal knowledge is required. All sessions are designed to be accessible and age appropriate, with content introduced clearly and progressively.',
    },
    {
      question:
        'How does Aspiring Legal Network align with careers education requirements?',
      answer:
        'Activities are designed to support high quality careers provision by developing awareness, skills, and informed decision making. Schools can use engagement and progression data to evidence impact and support reporting and inspection requirements.',
    },
    {
      question: 'How can schools get involved or request further information?',
      answer:
        'Schools can contact us via the website or by email to discuss their needs.',
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
