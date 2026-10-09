export interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
  imageWidth: number;
  imageHeight: number;
  technologies: string[];
  demoUrl: string;
  repoUrl: string;
}