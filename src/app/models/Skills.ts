export interface Skill {
  name: string;
  iconUrl: string;
}

export interface SkillGroup {
  title: string;
  description: string;
  skills: Skill[];
}
