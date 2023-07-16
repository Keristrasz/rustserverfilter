import React from "react";
import BodyWrapper from "@/components/layout/BodyWrapper";

const FAQ = () => {
  const faqData = [
    {
      question: "How often are server data updated?",
      answer: "Server data are updated several times per hour.",
    },
    {
      question: "Question 2",
      answer: "Answer 2",
    },
    {
      question: "Question 3",
      answer: "Answer 3",
    },
    {
      question: "Question 4",
      answer: "Answer 4",
    },
    {
      question: "Question 5",
      answer: "Answer 5",
    },
    {
      question: "Question 5",
      answer: "Answer 5",
    },
  ];

  return (
    <BodyWrapper>
      <div className="bg-zinc-800 rounded-lg p-10 pt-6 pb-4 m-4 mt-4 max-w-6xl border border-black">
        <h1 className="text-gray-300 text-center font-semibold text-2xl mb-6">FAQ</h1>
        {faqData.map((faq, index) => (
          <div key={index} className="mb-6">
            <h4 className="text-gray-300">{faq.question}</h4>
            <h3 className="text-gray-200 font-semibold text-lg mb-2">{faq.answer}</h3>
          </div>
        ))}
        <h3 className="text-gray-400 text-center font-semibold text-xl mb-6">
          Do you have specific question? Join discord and ask!
        </h3>
      </div>
    </BodyWrapper>
  );
};

export default FAQ;
