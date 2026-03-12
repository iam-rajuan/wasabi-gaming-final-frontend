import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQSection = () => {
  const faqs = [
    {
      question: "Is the Aspiring Legal Network free to join?",
      answer: "Yes! Creating a profile and accessing many of our resources is completely free.",
    },
    {
      question: "Can I use the resume builder if I have no experience?",
      answer: "Absolutely. Our builder is designed to help you highlight transferable skills, education, and extracurriculars to create a strong profile.",
    },
    {
      question: "How do the events work?",
      answer: "We host varied events including virtual webinars, networking sessions, and workshops. You can browse and register for events directly through your dashboard.",
    },
    {
      question: "Who are the mentors?",
      answer: "Our mentors are experienced legal professionals, including trainee solicitors, associates, and partners from top law firms.",
    },
  ];

  return (
    <div className="py-16 bg-[#FFFEF0]">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-4xl text-center font-bold mb-4 neuton text-gray-900">
          Got questions?
        </h2>
        <p className="text-center text-gray-600 mb-12 source">
          Find answers to commonly asked questions about the Aspiring Legal Network
        </p>

        <div className="bg-white rounded-3xl p-6 shadow-sm">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-lg font-semibold text-gray-900 text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default FAQSection;
