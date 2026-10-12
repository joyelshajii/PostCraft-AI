export type Tone = 'Professional' | 'Personal' | 'Technical' | 'Storytelling';

export type PostLength = 'Concise' | 'Balanced' | 'Detailed';

export interface UploadedImage {
  id: string;
  file: File;
  previewUrl: string;
  name: string;
  size: number;
  formattedSize: string;
}

export interface AuthorProfile {
  name: string;
  headline: string;
  avatarUrl: string;
  companyOrSchool?: string;
}

export interface GeneratedPost {
  text: string;
  hashtags: string[];
  tone: Tone;
  length: PostLength;
  variantIndex: number;
}
