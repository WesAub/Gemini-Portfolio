

import { Project, ResumeData } from "./types";

export const MOCK_PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Style',
    description: 'A digital exploration of the 1957 typeface designed by Max Miedinger. Focusing on clarity, simplicity, and neutrality. The project explores grid systems and the mathematical precision of Swiss design.',
    category: 'Typography',
    imageUrl: 'https://picsum.photos/seed/helvetica/800/1000',
    year: '2023',
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Shoots',
    description: 'Photography series capturing the raw concrete aesthetic of post-war architectural movements. Stark shadows, massive forms, and an honest expression of materials.',
    category: 'Photography',
    imageUrl: 'https://picsum.photos/seed/arch/800/600',
    year: '2024',
    createdAt: new Date().toISOString(),
  },
  {
    id: '3',
    title: 'Dance Workshops',
    description: 'UI/UX case study for a financial dashboard that removes all color to focus purely on data hierarchy and spacing. A study in subtractive design.',
    category: 'Interface',
    imageUrl: 'https://picsum.photos/seed/ui/800/800',
    year: '2022',
    createdAt: new Date().toISOString(),
  },
  {
    id: '4',
    title: 'Vogue',
    description: 'Identity system for a modern art museum. The dynamic logo responds to the aspect ratio of the canvas it is placed upon.',
    category: 'Branding',
    imageUrl: 'https://picsum.photos/seed/brand/800/1200',
    year: '2023',
    createdAt: new Date().toISOString(),
  },
  {
    id: '5',
    title: 'Theatre',
    description: 'Identity system for a modern art museum. The dynamic logo responds to the aspect ratio of the canvas it is placed upon.',
    category: 'Branding',
    imageUrl: 'https://picsum.photos/seed/brand/800/1200',
    year: '2023',
    createdAt: new Date().toISOString(),
  }
];

export const ENGINEER_RESUME: ResumeData = {
  title: "Engineering",
  summary: "Computer Engineering student with robust full-stack development experience, specializing in React, VueJS, Python, and .NET environments. Proven track record in optimizing system performance, developing interactive GUIs, and managing cloud deployments. Passionate about scalable architecture and clean code.",
  pdfUrl: "#", 
  experience: [
    {
      role: "Implementations Consultant",
      company: "Orion Health Ltd. | St. John's, NL",
      period: "May 2024 - Dec 2025",
      description: "• Contributed to product configuration, documentation, and testing at System, Integration, and Performance testing stages.\n• Developed and modified search queries using SQL server technology to perform data extraction and manipulation for interfacing complex JSON and XML data sets.\n• Integrated various software products using TCP/IP, REST and Web Service technologies.\n• Hosted AWS development environments for deploying solution packages during configuration and testing.\n• Implemented CI/CD pipelines using Gitlab to streamline deployment"
    },
    {
      role: "Full Stack Software Developer",
      company: "Angler Solutions Inc. | St. John's, NL",
      period: "Sept 2023 - Dec 2023",
      description: "• Developed an interactive web application GUI dashboard using FIGMA, VueJS and NuxtJS to simulate renewable energy models.\n• Developed Python scripts that simulate renewable energy systems to generate output metrics.\n• Coded FastAPI endpoints to store, update and retrieve model scenario data from PostgreSQL.\n• Developed unit and functional test cases using PyTest."
    },
    {
      role: "Web Content Assistant",
      company: "Memorial University of Newfoundland | St. John's, NL",
      period: "Jan 2023 - Apr 2023",
      description: "• Improved website loading efficiency for seven department websites by effectively organizing media using the TerminalFour (T4) content delivery API.\n• Enforced standard image dimension protocols on 20 websites."
    },
    {
      role: "IT Technician",
      company: "Memorial University of Newfoundland | St. John's, NL",
      period: "May 2022 - Sep 2022",
      description: "• Deployed virtual machines to run Ubuntu bash scripts for automating system backups.\n• Managed user login access and server privileges using TCP/IP protocols.\n• Troubleshot computer errors from client support requests using Command Line on Windows, Mac and Linux."
    }
  ],
  projects: [
    {
      role: "\"InternComp\" Job Board Web Application",
      company: "React JS, PostgreSQL, NodeJS, Figma",
      period: "Sept 2024 – Dec 2024",
      description: "Designed the GUI in FIGMA for a job board for co-op students seeking job internships and developed the frontend using React JS, PostgreSQL database and NodeJS backend."
    },
    {
      role: "\"Kanflo\" Kanban Board Web Application",
      company: "C#, XML, .NET",
      period: "Jan 2024 – April 2024",
      description: "Developed the front end of a Kanban board application for effective project management using XML with a C# backend as part of a group software project."
    },
    {
      role: "Generative Text Web App GUI",
      company: "Python, OpenAI, HTML, CSS, JS",
      period: "April 2023",
      description: "Developed the front end of a web application that employs Python scripts and Open-AI to generate 3D part modelling guides for Onshape CAD software."
    },
    {
      role: "Bounce Health Innovation Hackathon",
      company: "UI/UX, Figma",
      period: "Mar 2023",
      description: "Designed and pitched the GUI of a mobile application, \"Triago\", that optimizes access to emergency healthcare triage services as part of a team."
    }
  ],
  leadership: [
    {
      role: "Student Branch Committee Chair",
      company: "Eng Society ‘A’ | IEEE Region 7",
      period: "Jan 2024 - Present",
      description: "Organized and facilitated Capture the Flag Cyber Security workshop and the annual IEEE Xtreme coding competition."
    },
    {
      role: "Community Engagement Leader",
      company: "National Society of Black Engineers (NSBE)",
      period: "Jan 2023 - Present",
      description: "Organized an “Industry Engagement Day” virtual career fair, hosting over 10 companies and 50 attendees. Created promotional video content for social media."
    }
  ],
  education: [
    {
      role: "B.Eng. Computer Engineering (Co-op)",
      company: "Memorial University of Newfoundland",
      period: "Class of 2026",
      description: "Term 8 Computer Engineering Student."
    }
  ],
  skills: [
    "C/C++ / C# / .NET", "Python / Pandas / NumPy", "JavaScript / React / VueJS", "PostgreSQL / Prisma / SQL", "AWS / Docker / GCP", "Git / GitLab / Ansible", "Figma / UI/UX"
  ]
};

export const SERVICE_RESUME: ResumeData = {
  title: "Service",
  summary: "Energetic and detail oriented bar back and server with experience in high-volume hospitality. Excellent communicator with strong organizational skills, capable of working well under pressure. Quick to learn and thriving in collaborative environments.",
  pdfUrl: "#", 
  experience: [
    {
      role: "Host / Server",
      company: "Papillon Cocktail Bar | St. John's, NL",
      period: "Aug 2024 – Present",
      description: "• Greeted and seated guests, providing recommendations for a positive first impression.\n• Accurately noted and entered cocktail orders, ensuring customer satisfaction.\n• Delivered timely table service to guests, checking in to ensure an excellent drinking experience.\n• Maintained cleanliness of the bar and tables in accordance with health and safety guidelines."
    },
    {
      role: "Bar Back",
      company: "Papillon Cocktail Bar | St. John's, NL",
      period: "June 2024 – Aug 2024",
      description: "• Supported front staff by ensuring cocktail glasses and utensils were thoroughly washed and promptly made available.\n• Supported bartenders by frequently resetting used mixers and restocking ingredients and supplies as needed.\n• Maintained bar sanitation by frequently wiping surfaces using surface sanitizers solutions. \n• Maintained kitchen sanitation using a thorough cleaning regimen at closing."
    },
    {
      role: "Home Support Worker",
      company: "Provincial Home Care | St. John's, NL",
      period: "Oct 2022 – Jan 2023 ",
      description: "• Provided personal care support to elderly and handicapped clients for daily grooming ensuring good hygiene and comfort.\n• Prepared and served 3 healthy meals daily in a timely manner. \n• Served and applied presribed medication to clients in a timely manner with food and water as needed. \n• Documented daily regiment noting client moods and reporting incidents for heatlhcare provider records and monitoring."
    }
  ],
  education: [
    {
      role: "B.Eng. Computer Engineering",
      company: "Memorial University of Newfoundland | St. John's, NL",
      period: "2021 — 2026",
      description: "Focus on technical problem solving and team collaboration."
    }
  ],
  skills: [
    "Customer Service", "Verbal Communication", "Time Management", "Team Collaboration", "Problem Solving", "Detail Oriented", "Organization", "Inventory Management", "Sanitation", "Excellent Hygiene"
  ]
};