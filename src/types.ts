// 🔹 Social Links (matches schema)
export interface SocialLinks {
  github?: string | null;
  linkedin?: string | null;
  facebook?: string | null;
  gitlab?: string | null;
  [key: string]: string | null |undefined;
}

// 🔹 User type (aligned with your userSchema)
export interface HeroData {
  _id: string;
  fullName: string;
  email: string;
  jobTitle: string;
  bio: string;
  shortBio: string;
  profilePictureUrl: string;
  profilePictureUrlPublicId?: string | null;
  socialLinks: SocialLinks;
}

export interface Employment {
  _id?: string;
  title: string;
  company: string;
  location?: string;
  startDate?: string;
  endDate?: string;
  description: string[];
  createdOn?: string;
}

export interface Message {
  _id: string;
  senderName: string;
  senderEmail: string;
  subject: string;
  messageBody: string;
  receivedAt: string;
  status: 'unread' | 'read' | 'archived' | 'deleted';
  createdAt: string;
  updatedAt: string;
}

export interface Project {
  _id: string;
  title: string;
  description: string;
  tags: string[];
  imageUrl: string;
  liveUrl?: string;
  repoUrl?: string;
}


export interface Skill {
  name: string;
  icon?: React.ReactNode | string; // Can be a string emoji or JSX element
}
