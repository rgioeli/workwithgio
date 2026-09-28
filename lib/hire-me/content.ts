/**
 * Hire-me page content.
 *
 * Resume: place the PDF at public/Robert-Gioeli-Resume.pdf
 * TODO: add public/Robert-Gioeli-Resume.pdf
 */
export const RESUME_PDF_PATH = "/Robert-Gioeli-Resume.pdf";

export const CONTACT_EMAIL = "robert.c.gioeli@gmail.com";

export const HIRE_ME_URL = "https://workwithgio.com/hire-me";

export type ProjectScreenshot = {
  title: string;
  description: string;
  image: string | null;
  alt: string;
};

export type Project = {
  name: string;
  type: string;
  description: string;
  highlights: string[];
  technologies: string[];
  projectUrl: string | null;
  screenshots: ProjectScreenshot[];
};

export type Experience = {
  company: string;
  title: string;
  dates: string;
  summary: string;
  bullets: string[];
};

export const techGroups: { label: string; items: string[] }[] = [
  {
    label: "Languages",
    items: ["TypeScript", "JavaScript", "HTML", "CSS", "SQL"],
  },
  {
    label: "Frontend",
    items: ["React", "Next.js", "Tailwind CSS", "Shadcn UI"],
  },
  {
    label: "Backend / Application",
    items: [
      "Next.js server-side development",
      "Node.js",
      "REST APIs",
      "Prisma ORM",
    ],
  },
  {
    label: "Databases",
    items: ["PostgreSQL", "Neon"],
  },
  {
    label: "Authentication",
    items: ["NextAuth"],
  },
  {
    label: "APIs / Integrations",
    items: ["Twilio", "Google APIs", "Stripe", "LEAP CRM APIs"],
  },
  {
    label: "Development / Deployment",
    items: ["Git", "GitHub", "Vercel", "Railway", "Docker"],
  },
];

export const projects: Project[] = [
  {
    name: "BAM Fitness",
    type: "Gym Website and Lead Management System",
    description:
      "Built a custom website and lead management application that allows potential members to submit inquiries while giving employees an internal system for managing those leads.",
    highlights: [
      "Built the customer-facing website and lead intake system.",
      "Built an admin dashboard where employees can search leads, update lead status, create appointments, view activity timelines, and track customers through the sales process.",
      "Used NextAuth for secure administrator authentication and protected admin access.",
      "Integrated Twilio SMS for customer messaging and lead follow-up.",
      "Built and maintained the PostgreSQL database and production application.",
    ],
    technologies: [
      "Next.js",
      "TypeScript",
      "React",
      "Prisma",
      "PostgreSQL",
      "NextAuth",
      "Twilio",
      "Vercel",
      "Neon",
      "Git/GitHub",
    ],
    projectUrl: null,
    screenshots: [
      {
        title: "Admin Lead Dashboard",
        description:
          "Show the main BAM Fitness admin dashboard with leads, lead statuses, customer information, and the sales pipeline visible.",
        image: "/hire-me/bam-fitness/admin-lead-dashboard.png",
        alt: "BAM Fitness admin lead dashboard",
      },
      {
        title: "Lead Details & Activity Timeline",
        description:
          "Show an individual customer lead with contact information, lead status, appointment information, messages, and activity history.",
        image: "/hire-me/bam-fitness/lead-details.png",
        alt: "BAM Fitness lead details and activity timeline",
      },
      {
        title: "Customer Inquiry Form",
        description:
          "Show the public-facing website form customers use to submit an inquiry to BAM Fitness.",
        image: "/hire-me/bam-fitness/customer-inquiry-form.png",
        alt: "BAM Fitness customer inquiry form",
      },
      {
        title: "Appointments / Lead Management",
        description:
          "Show the section where employees can create appointments, update lead status, and manage customer follow-up.",
        image: "/hire-me/bam-fitness/appointments.png",
        alt: "BAM Fitness appointments and lead management",
      },
    ],
  },
  {
    name: "B&F Plastics Retail",
    type: "Custom Mudflap Builder and E-Commerce Website",
    description:
      "Built a custom retail application that allows customers to design personalized mudflaps directly in their browser before placing an order.",
    highlights: [
      "Built an interactive mudflap designer where customers choose materials, sizes, colors, cuts, text, fonts, graphics, and placement.",
      "Used HTML Canvas and image tools so customers can upload and position graphics and preview the finished product.",
      "Built the backend ordering workflow to validate customer information and store orders.",
      "Used Prisma and PostgreSQL for product, customer, shipping, and order data.",
      "Generated the custom design information needed by the business to fulfill each order.",
    ],
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "HTML Canvas",
      "Tailwind CSS",
      "Prisma",
      "PostgreSQL",
      "REST APIs",
      "Git/GitHub",
      "Vercel",
      "Railway",
    ],
    projectUrl: null,
    screenshots: [
      {
        title: "Custom Mudflap Designer",
        description:
          "Show the main mudflap builder with the live mudflap preview and the available customization controls.",
        image: "/hire-me/bf-plastics/mudflap-designer.png",
        alt: "B&F Plastics custom mudflap designer",
      },
      {
        title: "Text & Graphic Customization",
        description:
          "Show a mudflap being customized with text, fonts, colors, and an uploaded graphic positioned on the product.",
        image: "/hire-me/bf-plastics/text-and-graphics.png",
        alt: "B&F Plastics mudflap text and graphic customization",
      },
      {
        title: "Product Options",
        description:
          "Show the controls customers use to choose mudflap material, size, color, cuts, quantity, or other product options.",
        image: "/hire-me/bf-plastics/product-options.png",
        alt: "B&F Plastics mudflap product options",
      },
    ],
  },
  {
    name: "Manpower East Central Indiana",
    type: "Job Search and Employment Website",
    description:
      "Rebuilt and rebranded the regional Manpower website and created tools to make finding and applying for local jobs easier.",
    highlights: [
      "Rebuilt the website using a modern Next.js and React frontend.",
      "Integrated the WebCenter API so visitors can search available jobs and begin the application process through the site.",
      "Integrated Google Maps for location-based functionality.",
      "Built backend functionality using PostgreSQL and Prisma.",
      "Built a custom blog system using Tiptap and image uploads so employees can publish their own articles and website content.",
    ],
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "WebCenter API",
      "Google Maps API",
      "PostgreSQL",
      "Prisma",
      "Tiptap",
      "Git/GitHub",
      "Vercel",
    ],
    projectUrl: null,
    screenshots: [
      {
        title: "Job Search Page",
        description:
          "Show the job-search interface with available jobs, search controls, filters, or job cards visible.",
        image: "/hire-me/manpower/job-search.png",
        alt: "Manpower East Central Indiana job search",
      },
      {
        title: "Job Details / Application Flow",
        description:
          "Show an individual job listing or the part of the site where a job seeker begins the application process.",
        image: "/hire-me/manpower/job-details.png",
        alt: "Manpower East Central Indiana job details",
      },
      {
        title: "Custom Blog",
        description:
          "Show the public blog page or an individual article created through the custom Tiptap blog system.",
        image: "/hire-me/manpower/hub.png",
        alt: "Manpower East Central Indiana blog",
      },
      {
        title: "Blog Editor",
        description:
          "Show the administrative blog editor with Tiptap formatting controls and image-upload functionality.",
        image: "/hire-me/manpower/in-blog.png",
        alt: "Manpower East Central Indiana blog editor with Tiptap formatting controls and image-upload functionality.",
      },
      {
        title: "Location / Google Maps Feature",
        description:
          "Show the Google Maps integration or location-based functionality used to help visitors find Manpower offices or opportunities.",
        image: "/hire-me/manpower/google-maps.png",
        alt: "Manpower East Central Indiana location with Google Maps feature",
      },
    ],
  },
];

export const experience: Experience[] = [
  {
    company: "The Contracting Company",
    title: "Full Stack Developer",
    dates: "January 2026 – Present",
    summary:
      "Build and maintain the company's production website and the systems that connect website leads with its sales and customer-management workflow.",
    bullets: [
      "Build and maintain the website using TypeScript, JavaScript, React, Next.js, HTML, and CSS.",
      "Built forms that send customer leads into LEAP CRM through REST APIs.",
      "Use PostgreSQL and Prisma to manage leads, customer information, forms, and application data.",
      "Integrated Twilio and Google APIs.",
      "Built marketing attribution tracking for Google, Facebook, TikTok, LinkedIn, referral traffic, and other sources.",
      "Deploy and maintain the application using Vercel, Railway, and Neon.",
    ],
  },
  {
    company: "Global Media Enterprise",
    title: "Full Stack Developer",
    dates: "March 2024 – January 2026",
    summary:
      "Built production websites and custom web applications for businesses with different operational needs.",
    bullets: [
      "Built frontend and backend applications using TypeScript, JavaScript, React, Next.js, HTML, and CSS.",
      "Built and integrated REST APIs.",
      "Worked with SQL, PostgreSQL, and Prisma.",
      "Built responsive interfaces using React, Next.js, and Tailwind CSS.",
      "Created custom forms, dashboards, ordering systems, quote tools, and customer portals.",
      "Used Git/GitHub and deployed production applications with Vercel, Railway, and Neon.",
    ],
  },
];

export const strengths: { title: string; text: string }[] = [
  {
    title: "Full-Stack Development",
    text: "I am comfortable working from the user interface through backend logic, APIs, and the database.",
  },
  {
    title: "Business-Focused Development",
    text: "I build software around real business workflows instead of adding features just because they are technically interesting.",
  },
  {
    title: "API & System Integration",
    text: "I connect applications with CRMs, messaging systems, payment services, maps, job systems, and other third-party platforms.",
  },
  {
    title: "Production Ownership",
    text: "I have experience deploying applications, troubleshooting production problems, maintaining databases, and continuing to improve applications after launch.",
  },
];

export const education = {
  credential: "Certificate in Web Development",
  school: "Ivy Tech",
  year: "2012",
};
