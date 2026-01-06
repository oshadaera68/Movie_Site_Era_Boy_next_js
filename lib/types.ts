export interface Post {
  id: number;
  slug: string;
  title: string;
  tags: string;
  excerpt: string;
  content: string;
  image: string;
  video: string;
  category: string;
  language: string;
  downloadUrl: string;
  releaseDate: string;
  date?: string; // Made date optional
  subtitledBy: string;
  subtitleSite?: string;
  director?: string;
  producer?: string;
  cast?: string;
}