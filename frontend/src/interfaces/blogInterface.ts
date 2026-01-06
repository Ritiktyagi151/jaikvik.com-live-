// src/interfaces/blogInterface.ts
export default interface blogInterface {
  id: string;           // Yeh URL mein use hoga → /blogs/Top-SEO-Trends...
  slug?: string;        // Future ke liye (optional)
  category: string;
  author: string;
  date: string;
  title: string;
  description: string;  // Full ya short description
  summary?: string;     // Blog list ke liye short text
  image: string;
  content?: string;     // Future mein full blog content yaha aayega
}