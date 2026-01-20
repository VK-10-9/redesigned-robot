import { Project, GalleryProject, ProjectContributor } from "@/src/types/project"

// Helper function to create contributor objects
const createContributor = (developerId: number, name: string, role: ProjectContributor["role"] = "Contributor"): ProjectContributor => ({
  developerId,
  name,
  role
})

export const featuredProjects: Project[] = [
  {
    id: 1,
    title: "DevFlow",
    tagline: "Real-time collaboration platform for developers",
    description:
      "A comprehensive platform that enables seamless collaboration between developers with live code sharing, integrated chat, and project management tools.",
    category: "Web Development",
    stack: ["Next.js", "TypeScript", "Socket.io", "PostgreSQL"],
    difficulty: "advanced",
    status: "active",
    contributors: [
      createContributor(4, "Arjun M", "Lead Developer"),
      createContributor(2, "Priya S", "Contributor")
    ],
    teamSize: 2,
    links: [
      { label: "GitHub", url: "https://github.com/example/devflow", type: "github" },
      { label: "Live Demo", url: "https://devflow.demo.com", type: "live" }
    ],
    githubUrl: "https://github.com/example/devflow",
    liveUrl: "https://devflow.demo.com",
    image: "/placeholder.svg?height=200&width=400",
    createdDate: "2024-01-15",
    lastUpdated: "2024-08-15",
    duration: "6 months",
    features: ["Real-time collaboration", "Live code sharing", "Integrated chat", "Project management"],
    tags: ["collaboration", "real-time", "developers", "productivity"],
    featured: true,
    trending: true,
    metrics: {
      stars: 247,
      forks: 48,
      views: 1250
    }
  },
  {
    id: 2,
    title: "EcoTrack",
    tagline: "AI-powered carbon footprint tracker",
    description:
      "Smart application that helps individuals and organizations track, analyze, and reduce their carbon footprint using machine learning algorithms.",
    category: "AI/ML",
    stack: ["React", "Python", "TensorFlow", "MongoDB"],
    difficulty: "intermediate",
    status: "completed",
    contributors: [
      createContributor(5, "Rahul K", "Lead Developer"),
      createContributor(6, "Sneha P", "Contributor"),
      createContributor(8, "Amit J", "Contributor")
    ],
    teamSize: 3,
    links: [
      { label: "GitHub", url: "https://github.com/example/ecotrack", type: "github" },
      { label: "Live Demo", url: "https://ecotrack.demo.com", type: "live" }
    ],
    githubUrl: "https://github.com/example/ecotrack",
    liveUrl: "https://ecotrack.demo.com",
    image: "/placeholder.svg?height=200&width=400",
    createdDate: "2024-02-10",
    lastUpdated: "2024-07-20",
    duration: "4 months",
    features: ["Carbon footprint tracking", "AI-powered insights", "Reduction recommendations", "Progress monitoring"],
    tags: ["ai", "environment", "sustainability", "analytics"],
    featured: true,
    metrics: {
      stars: 189,
      forks: 32,
      views: 892
    }
  },
  {
    id: 3,
    title: "CodeMentor AI",
    tagline: "Intelligent code review and mentoring assistant",
    description:
      "An AI-powered tool that provides instant code reviews, suggests improvements, and offers personalized learning paths for developers.",
    category: "AI/ML",
    stack: ["Vue.js", "Node.js", "OpenAI API", "Redis"],
    difficulty: "advanced",
    status: "in-progress",
    contributors: [
      createContributor(7, "Maya L", "Lead Developer"),
      createContributor(1, "Kiran R", "Contributor")
    ],
    teamSize: 2,
    links: [
      { label: "GitHub", url: "https://github.com/example/codementor-ai", type: "github" },
      { label: "Live Demo", url: "https://codementor-ai.demo.com", type: "demo" }
    ],
    githubUrl: "https://github.com/example/codementor-ai",
    liveUrl: "https://codementor-ai.demo.com",
    image: "/placeholder.svg?height=200&width=400",
    createdDate: "2024-03-05",
    lastUpdated: "2024-08-18",
    duration: "5 months",
    features: ["AI code reviews", "Improvement suggestions", "Learning paths", "Code quality metrics"],
    tags: ["ai", "code-review", "mentoring", "learning"],
    featured: true,
    trending: true,
    metrics: {
      stars: 312,
      forks: 67,
      views: 1580
    }
  },
];

export const galleryProjects: GalleryProject[] = [
  {
    id: "project-1",
    title: "SmartCampus IoT",
    summary:
      "Revolutionary IoT platform connecting campus infrastructure with real-time monitoring, energy optimization, and predictive maintenance for educational institutions.",
    url: "/projects/smartcampus-iot",
    image: "/placeholder.svg?height=300&width=450&text=IoT+Campus+Dashboard",
  },
  {
    id: "project-2",
    title: "NeuroLearn AI",
    summary:
      "Adaptive learning platform using neural networks to personalize educational content, track learning patterns, and optimize study schedules for maximum retention.",
    url: "/projects/neurolearn-ai",
    image: "/placeholder.svg?height=300&width=450&text=AI+Learning+Platform",
  },
  {
    id: "project-3",
    title: "BlockChain Voting",
    summary:
      "Secure, transparent voting system built on blockchain technology ensuring tamper-proof elections with real-time results and complete audit trails.",
    url: "/projects/blockchain-voting",
    image: "/placeholder.svg?height=300&width=450&text=Blockchain+Voting+System",
  },
  {
    id: "project-4",
    title: "GreenTech Monitor",
    summary:
      "Environmental monitoring solution using satellite data and machine learning to track deforestation, pollution levels, and climate change indicators.",
    url: "/projects/greentech-monitor",
    image: "/placeholder.svg?height=300&width=450&text=Environmental+Monitoring",
  },
  {
    id: "project-5",
    title: "HealthSync Wearables",
    summary:
      "Comprehensive health monitoring ecosystem integrating wearable devices, AI diagnostics, and telemedicine for preventive healthcare management.",
    url: "/projects/healthsync-wearables",
    image: "/placeholder.svg?height=300&width=450&text=Health+Monitoring+App",
  },
  {
    id: "project-6",
    title: "QuantumCrypt Security",
    summary:
      "Next-generation cybersecurity framework leveraging quantum encryption algorithms to protect sensitive data against future quantum computing threats.",
    url: "/projects/quantumcrypt-security",
    image: "/placeholder.svg?height=300&width=450&text=Quantum+Security+System",
  },
];
