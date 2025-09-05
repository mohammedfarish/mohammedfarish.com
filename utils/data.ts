export const siteURL = ("https://" + process.env.DOMAIN) as NonNullable<string>;

export const siteName = "Mohammed Farish";

export const siteDescription = "Software Engineer, Web Developer and an Entrepreneur.";

export const LLMEndpoint = process.env.LLM_ENDPOINT;
export const newLLMWebhook = process.env.NEW_LLM_WEBHOOK;
export const newLLMWebhookAPIKey = process.env.NEW_LLM_WEBHOOK_API_KEY;

export const aboutMe = {
  introduction: {
    name: "Mohammed Farish",
    about: "Software and full-stack web developer",
    basedOutOf: "Abu Dhabi, UAE",
    ethinicity: "Indian",
  },
  personalBackground: {
    education: [
      {
        degree: "Mechanical Engineering",
        institution: "RR Institute of Technology",
        location: "Bangalore, Karnataka, India",
        graduationYear: "2018",
      },
      {
        degree: "High School",
        institution: "Apex Public School",
        location: "Kozhikode, Kerala, India",
        graduationYear: "2014",
      },
      {
        degree: "Middle School",
        institution: "Indian Islahi Islamic School",
        location: "Abu Dhabi, UAE",
        graduationYear: "2013",
      },
    ],
    interests: ["Photography", "Traveling", "Coding", "Podcasts"],
  },
  professionalExperience: [
    {
      positions: ["Co-Founder", "Lead Engineer"],
      company: "Amnuz Technologies",
      duration: "2019 - Present",
      website: "https://www.amnuz.com",
      companyGoal: "Build and manage tools that simplify business workflows.",
    },
    {
      positions: ["IT Engineer"],
      company: "Telkom Communications",
      duration: "2021 - Present",
      website: "https://www.telkomcommunications.com",
      companyGoal: "Develop and manage industry grade Communications Infrastructure",
    },
  ],
  notableProjects: [
    {
      title: "Trinity",
      description:
        "Built the indutry's most advanced seat reservation syatem for travel agents in the UAE. The trinity software is now serving over 1M users monthly and is growning at a rapid pace.",
    },
    {
      title: "WhatsApp Agent",
      description: "Developed the world's first WhatsApp based travel agent, that allows its users to search and send flight booking enquiries.",
    },
  ],
  skills: {
    primary: ["Python", "Go", "JavaScript"],
    secondary: ["Vector Databases", "Adobe Creative Suite", "Git"],
    tools: ["Visual Studio Code", "Insomnia", "Slack"],
  },
  missionStatement: "Develop and deploy softwares that improve the lives of millions of people around the world.",
  links: {
    connect: {
      email: "contact@mohammedfarish.com",
      socialMedia: {
        twitter: "https://twitter.com/faaaaaarish",
        linkedin: "https://www.linkedin.com/in/mohammedfarish/",
        instagram: "https://www.instagram.com/mohammed_farish/",
        facebook: "https://www.facebook.com/weezy978/",
      },
      contactForm: "/",
    },
    blog: "/blog",
  },
  closingRemarks:
    "Thank you for taking the time to learn more about me. I look forward to the opportunity to collaborate and create something amazing together!",
};

export const chatwootAPIToken = process.env.CHATWOOT_API_TOKEN || "";
