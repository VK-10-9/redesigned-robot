import { ReactElement } from "react";

export interface Service {
  title: string;
  description: string;
  icon: ReactElement;
}

export interface Differentiator {
  icon: ReactElement;
  label: string;
}

export interface ProcessStep {
  step: number;
  title: string;
  description: string;
}