import { Stat } from "@/src/types/developer";

export const developerStats: Omit<Stat, 'icon'>[] = [
  {
    iconName: "Users",
    value: "6",
    label: "Active Developers"
  },
  {
    iconName: "Code",
    value: "12+",
    label: "Projects Completed"
  },
  {
    iconName: "Star",
    value: "200+",
    label: "Code Contributions"
  },
  {
    iconName: "Award",
    value: "100%",
    label: "Success Rate"
  }
];
