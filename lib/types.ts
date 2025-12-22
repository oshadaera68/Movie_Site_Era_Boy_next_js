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
  subtitledBy: string;
  director?: string;
  producer?: string;
  cast?: string;
}