import { Project, ProjectContributor } from '@/src/types/project';

// Helper function to create contributor objects mapped to actual developers
const createContributor = (developerId: number, name: string, role: ProjectContributor["role"] = "Contributor"): ProjectContributor => ({
  developerId,
  name,
  role
});

export const projects: Project[] = [
  {
    id: 1,
    title: "VishwaDev Platform",
    tagline: "Empowering Student Innovation",
    description: "A comprehensive platform for students to showcase their projects, connect with peers, and find opportunities. Features include developer profiles, project galleries, and a resource hub.",
    category: "Web Development",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Firebase", "Vercel"],
    difficulty: "intermediate",
    status: "active",
    contributors: [
      createContributor(1, "Vishwanath K.", "Lead Developer"),
      createContributor(2, "Disha Raikar", "Contributor"),
      createContributor(3, "Raheel H.", "Contributor")
    ],
    teamSize: 3,
    links: [
      { label: "GitHub", url: "https://github.com/VK-10-9/VishwaDev.tech--landingpage", type: "github" },
      { label: "Live Site", url: "https://vishwadev.tech", type: "live" }
    ],
    githubUrl: "https://github.com/VK-10-9/VishwaDev.tech--landingpage",
    liveUrl: "https://vishwadev.tech",
    image: "/placeholder.svg",
    createdDate: "2024-06-01",
    lastUpdated: "2024-08-20",
    duration: "3 months",
    features: ["Developer profiles", "Project galleries", "Resource hub", "Community features"],
    tags: ["platform", "students", "showcase", "community"],
    featured: true,
    trending: true,
    metrics: {
      stars: 156,
      forks: 23,
      views: 2340
    }
  },
  {
    id: 2,
    title: "AI-Powered Code Assistant",
    tagline: "Intelligent coding companion",
    description: "An intelligent code assistant that provides real-time suggestions, bug detection, and automated refactoring to streamline the development process.",
    category: "AI/ML",
    stack: ["Python", "TensorFlow", "PyTorch", "FastAPI", "Docker"],
    difficulty: "advanced",
    status: "in-progress",
    contributors: [
      createContributor(2, "Priya S.", "Lead Developer"),
      createContributor(8, "Amit J.", "Contributor")
    ],
    teamSize: 2,
    links: [
      { label: "GitHub", url: "https://github.com/example/ai-code-assistant", type: "github" },
      { label: "Demo", url: "https://ai-assistant.demo.com", type: "demo" }
    ],
    githubUrl: "https://github.com/example/ai-code-assistant",
    liveUrl: "https://ai-assistant.demo.com",
    image: "/placeholder.svg",
    createdDate: "2024-04-15",
    lastUpdated: "2024-08-10",
    duration: "4 months",
    features: ["Real-time suggestions", "Bug detection", "Automated refactoring", "Code quality analysis"],
    tags: ["ai", "coding", "assistant", "productivity"],
    featured: true,
    metrics: {
      stars: 89,
      forks: 15,
      views: 567
    }
  },
  {
    id: 3,
    title: "Smart Home IoT System",
    tagline: "Connected home automation",
    description: "An integrated IoT solution for smart homes, allowing users to control lighting, temperature, and security systems remotely via a mobile app.",
    category: "IoT",
    stack: ["Raspberry Pi", "Arduino", "MQTT", "React Native", "Node.js"],
    difficulty: "intermediate",
    status: "completed",
    contributors: [
      createContributor(5, "Rahul K.", "Lead Developer"),
      createContributor(6, "Sneha P.", "Contributor")
    ],
    teamSize: 2,
    links: [
      { label: "GitHub", url: "https://github.com/example/smart-home-iot", type: "github" },
      { label: "Demo Video", url: "https://smarthome.demo.com", type: "demo" }
    ],
    githubUrl: "https://github.com/example/smart-home-iot",
    liveUrl: "https://smarthome.demo.com",
    image: "/placeholder.svg",
    createdDate: "2024-01-20",
    lastUpdated: "2024-06-30",
    duration: "5 months",
    features: ["Remote lighting control", "Temperature management", "Security monitoring", "Mobile app"],
    tags: ["iot", "home-automation", "mobile", "raspberry-pi"],
    featured: true,
    metrics: {
      stars: 134,
      forks: 28,
      views: 892
    }
  },
  {
    id: 4,
    title: "Mobile Health Tracker",
    tagline: "Your wellness companion",
    description: "A cross-platform mobile app that monitors fitness activities, tracks health metrics, and provides personalized wellness insights.",
    category: "Mobile",
    stack: ["Flutter", "Dart", "Firebase", "Google Fit API"],
    difficulty: "intermediate",
    status: "completed",
    contributors: [
      createContributor(5, "Rahul Shastri", "Lead Developer")
    ],
    teamSize: 1,
    links: [
      { label: "GitHub", url: "https://github.com/example/health-tracker-app", type: "github" },
      { label: "App Store", url: "https://health-tracker.demo.com", type: "live" }
    ],
    githubUrl: "https://github.com/example/health-tracker-app",
    liveUrl: "https://health-tracker.demo.com",
    image: "/placeholder.svg",
    createdDate: "2024-03-10",
    lastUpdated: "2024-07-15",
    duration: "4 months",
    features: ["Fitness tracking", "Health metrics", "Personalized insights", "Goal setting"],
    tags: ["mobile", "health", "fitness", "flutter"],
    featured: false,
    metrics: {
      downloads: 1250,
      views: 445
    }
  },
  {
    id: 5,
    title: "ReviewSense",
    tagline: "Smart review analysis",
    description: "A product review summarizer that automatically scrapes, analyzes, and summarizes product reviews to empower smarter decision-making. Uses sentiment analysis and AI-powered summarization to condense hundreds of reviews into concise insights.",
    category: "AI/ML",
    stack: ["Flask", "Python", "BeautifulSoup", "scikit-learn", "Transformers", "HTML", "CSS", "JavaScript"],
    difficulty: "intermediate",
    status: "active",
    contributors: [
      createContributor(7, "Yashas Patil", "Lead Developer")
    ],
    teamSize: 1,
    links: [
      { label: "GitHub", url: "https://github.com/yashas-patil/ReviewSense", type: "github" },
      { label: "Live App", url: "https://reviewsense.vercel.app", type: "live" }
    ],
    githubUrl: "https://github.com/yashas-patil/ReviewSense",
    liveUrl: "https://reviewsense.vercel.app",
    image: "/placeholder.svg",
    createdDate: "2024-05-20",
    lastUpdated: "2024-08-18",
    duration: "3 months",
    features: ["Review scraping", "Sentiment analysis", "AI summarization", "Decision insights"],
    tags: ["ai", "nlp", "reviews", "analysis"],
    featured: true,
    trending: true,
    metrics: {
      stars: 67,
      forks: 12,
      views: 789
    }
  }
];