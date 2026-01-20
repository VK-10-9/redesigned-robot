import { NavigationItem } from "@/src/types/navigation";

export const navigationItems: NavigationItem[] = [
  {
    title: "Home",
    href: "/",
    description: "",
  },
  {
    title: "Projects",
    description: "Discover innovative student-led tech projects and solutions.",
    items: [
      {
        title: "Featured Projects",
        href: "/projects/featured",
      },
      {
        title: "AI & Machine Learning",
        href: "/projects/ai-ml",
      },
      {
        title: "Web Development",
        href: "/projects/web-dev",
      },
      {
        title: "Mobile Apps",
        href: "/projects/mobile",
      },
      {
        title: "IoT & Hardware",
        href: "/projects/iot",
      },
    ],
  },
  {
    title: "Community",
    description: "Connect with fellow developers and grow your network.",
    items: [
      {
        title: "Meet the Devs",
        href: "/devs",
      },
      {
        title: "Developer Blog",
        href: "/blog",
      },
      {
        title: "Events & Workshops",
        href: "/events",
      },
      {
        title: "Discord Community",
        href: "/discord",
      },
      {
        title: "Mentorship Program",
        href: "/mentorship",
      },
    ],
  },
  {
    title: "Nex10 Labs",
    description: "A SaaS platform building custom tech solutions for clients.",
    items: [
      {
        title: "Our Solutions",
        href: "/nex10",
      },
      {
        title: "Request a Quote",
        href: "/contact",
      },
      {
        title: "See Our Work",
        href: "/projects",
      },
    ],
  },
  {
    title: "Get Subdomain",
    href: "/subdomain",
    description: "Get your personalized domain (name.vishwadev.tech)",
  },
];
