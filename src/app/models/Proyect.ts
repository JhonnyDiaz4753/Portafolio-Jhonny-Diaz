export interface ProjectImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  images: ProjectImage[];
  media?: 'browser' | 'phone';
  featured?: boolean;
  private?: boolean;
  technologies: string[];
  demoUrl?: string;
  repoUrl?: string;
}
