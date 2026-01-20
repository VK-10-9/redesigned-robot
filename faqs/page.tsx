"use client";

import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

const faqData = [
  {
    category: "Getting Started",
    questions: [
      {
        question: "How do I get started with VishwaDev?",
        answer: "Getting started is easy! Simply sign up for an account, create your developer profile, and start showcasing your projects. You can request a personalized subdomain to create your own professional portfolio."
      },
      {
        question: "What is a subdomain and how do I get one?",
        answer: "A subdomain gives you a personalized URL like 'yourname.vishwadev.tech' where you can showcase your projects and build your developer brand. Click on 'Request Subdomain' on our homepage to apply for yours."
      },
      {
        question: "Is VishwaDev free to use?",
        answer: "Yes! VishwaDev offers free accounts for student developers. You get access to project showcasing, community features, and a personalized subdomain at no cost."
      }
    ]
  },
  {
    category: "Projects & Showcase",
    questions: [
      {
        question: "What types of projects can I showcase?",
        answer: "You can showcase any technology project including web applications, mobile apps, AI/ML projects, IoT devices, blockchain applications, and more. We welcome innovation across all tech domains."
      },
      {
        question: "How do I submit my project?",
        answer: "Use the 'Submit Project' button in the navigation to add your project. Include a description, tech stack, live demo link, and GitHub repository for the best showcase."
      },
      {
        question: "Can I edit my projects after submission?",
        answer: "Yes! You can edit your project details, update descriptions, change links, and modify your showcase at any time through your dashboard."
      }
    ]
  },
  {
    category: "Nex10 Labs",
    questions: [
      {
        question: "What is Nex10 Labs?",
        answer: "Nex10 Labs is our exclusive incubation program that identifies promising student projects and provides mentorship, resources, and funding opportunities to transform them into viable startups."
      },
      {
        question: "How do I apply to Nex10 Labs?",
        answer: "Click on 'Apply to Nex10 Labs' on our homepage or visit the Nex10 section. You'll need to submit your project, business plan, and go through our selection process."
      },
      {
        question: "What support does Nex10 Labs provide?",
        answer: "We provide expert mentorship, seed funding opportunities, access to investor networks, technical resources, and guidance to help transform your project into a successful startup."
      }
    ]
  },
  {
    category: "Community",
    questions: [
      {
        question: "How do I connect with other developers?",
        answer: "Join our Discord community, attend virtual events, participate in our mentorship program, and engage with other developers' projects through comments and collaboration."
      },
      {
        question: "Are there networking events?",
        answer: "Yes! We regularly host virtual workshops, hackathons, tech talks, and networking sessions. Check our Events page for upcoming opportunities."
      },
      {
        question: "Can I become a mentor?",
        answer: "Experienced developers can apply to become mentors in our mentorship program. Contact us through the support page to learn about mentor opportunities."
      }
    ]
  }
];

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-border rounded-lg overflow-hidden">
      <button
        className="w-full p-4 text-left flex justify-between items-center hover:bg-muted transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-medium text-foreground">{question}</span>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-muted-foreground" />
        ) : (
          <ChevronDown className="w-5 h-5 text-muted-foreground" />
        )}
      </button>
      {isOpen && (
        <div className="p-4 pt-0 border-t border-border">
          <p className="text-muted-foreground leading-relaxed">{answer}</p>
        </div>
      )}
    </div>
  );
}

export default function FAQsPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="pt-24 sm:pt-28 lg:pt-32 pb-16 px-4 bg-muted/30">
        <div className="container mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Frequently Asked Questions
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
            Find answers to common questions about VishwaDev, our platform features, and how to get the most out of your developer journey.
          </p>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          {faqData.map((category, categoryIndex) => (
            <div key={categoryIndex} className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-6 border-b border-border pb-2">
                {category.category}
              </h2>
              <div className="space-y-4">
                {category.questions.map((faq, faqIndex) => (
                  <FAQItem
                    key={faqIndex}
                    question={faq.question}
                    answer={faq.answer}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto text-center max-w-2xl">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Still have questions?
          </h2>
          <p className="text-muted-foreground mb-6">
            Can&apos;t find the answer you&apos;re looking for? Our support team is here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/support"
              className="bg-primary text-primary-foreground px-6 py-3 rounded-md font-medium hover:bg-primary/90 transition-colors"
            >
              Contact Support
            </Link>
            <Link
              href="/discord"
              className="border border-border px-6 py-3 rounded-md font-medium hover:bg-muted transition-colors"
            >
              Join Discord</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
