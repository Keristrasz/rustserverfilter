import React from "react";
import BodyWrapper from "@/components/layout/BodyWrapper";

const FAQ = () => {
  const faqData = [
    {
      question: "How is NEXT WIPE determined?",
      answer:
        "Future wipes are calculcated based on previous wipe, and wipe rotation (weekly, bi-weekly, monthly). If these information are provided, NEXT WIPE date is calculated and assigned to the server information. If server has no information about previous wipe or wipe rotation, there is nothing assigned to it. Also if admin decides to wipe the server earlier or later, data can not be ever accurate. I provide just the estimate of next (future) wipe.",
    },
    {
      question: "How is GROUP SIZE (solo, duo, trio) or RATE (2x, 3x) of server determined?",
      answer:
        "Server name is analyzed by an algorithm and if certain key words are present, information like 2x or trio is assigned to the server. If they are not present, nothing is assigned and you cannot sort or filter by it.",
    },
    {
      question: "How is SCORE determined?",
      answer:
        "Every time server answers to a call for information update, 1 point is added, if it does not answer 1 point is subtracted. Servers are updated hundreds times per week",
    },
    {
      question: "How often are server data updated?",
      answer: "Server data are updated several times per hour, depending on server popularity",
    },
    {
      question: "What is the recommended way to search for servers?",
      answer:
        "Use score to filter not stable servers (at least 500+). Always look at player history to see how many people were playing on the server, be careful these information can be faked and there is a lot of fake servers. You can filter some of them by exluding countries with a lot of fake servers (for some reason a lot of fake servers are in Russia).",
    },
    {
      question: "How do you sort or use advanced filter?",
      answer:
        "For sorting click on the head of table column title. For advanced filter you need to expand search form.",
    },
  ];

  return (
    <BodyWrapper>
      <h1 className="text-xs mt-4 text-gray-400">Frequently asked questions</h1>
      <div className="bg-zinc-800 rounded-lg p-10 pt-6 pb-4 m-4 max-w-4xl border border-black">
        <h3 className="text-gray-300 text-center font-semibold text-2xl mb-2">FAQ</h3>
        {faqData.map((faq, index) => (
          <div key={index} className="mb-6">
            <h2 className="text-gray-400 font-semibold text-lg mb-2">{faq.question}</h2>
            <p className="text-gray-200">{faq.answer}</p>
          </div>
        ))}
        <h3 className="text-gray-400 text-center font-semibold text-xl mb-2">
          Do you have specific question? Join discord and ask!
        </h3>
      </div>
    </BodyWrapper>
  );
};

export default FAQ;
