export const faqData = [
  {
    question: "How is NEXT WIPE determined?",
    answer:
      "Future wipes are calculcated based on previous wipe, and wipe rotation (weekly, bi-weekly, monthly). If these information are provided, NEXT WIPE date is calculated and assigned to the server information. If server has no information about previous wipe or wipe rotation, there is nothing assigned to it. Also if admin decides to wipe the server earlier or later, data can not be ever accurate. I provide just the estimate of next (future) wipe.",
  },
  {
    question:
      "How is GROUP SIZE (solo, duo, trio) or RATE (2x, 3x) of server determined?",
    answer:
      "Server name is analyzed by an algorithm and if certain key words are present, information like 2x or trio is assigned to the server. If they are not present, nothing is assigned and you cannot sort or filter by it.",
  },
  {
    question: "How is SCORE determined?",
    answer:
      "Every time server answers to a call for information update, 0.01 point is added, if it does not answer 0.01 point is subtracted. Servers are updated hundreds times per week",
  },
  {
    question: "How often are server data updated?",
    answer:
      "Server data are updated several times per hour, depending on server popularity",
  },
  {
    question: "How do you sort or use advanced filter?",
    answer:
      "For sorting click on the head of table column title. For advanced filter you need to expand search form.",
  },
  {
    question: "What is the recommended way to search for rust servers?",
    answer:
      "Use server score (at least 50+) to filter stable server. Always look at player history to see how many people were playing on the server, be careful these information can be faked and there is a lot of fake servers. You can filter some of them by exluding countries with a lot of fake servers (for some reason a lot of fake servers are in Russia).",
  },
  {
    question: "How to join rust server with ip?",
    answer:
      "Click on the server in the home page, then copy or click the Game IP, which is going to automatically copy the command to connect to the server. Now you can simple open Rust, press F1 to open console, paste - ctrl + v, and press enter. Command should look like: client.connect XX.XX.X.XXX:XXXXX",
  },
  {
    question: "How to get rust server ip?",
    answer:
      "You can find server IP in server details. You can follow the previous question for that.",
  },
  {
    question: "When do rust servers wipe? What time does rust wipe? When does rust wipe?",
    answer:
      "On our website we provide estimate of next wipe based on previous wipe and wipe rotation. You can check it out at home page.",
  },
];
