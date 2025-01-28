// types.ts
export interface Post {
    _id: string;
    title: string;
    slug: string;
    content: string;
    imageUrl?: string;
    tags?: string[];
  }
  
  // You can add other shared types here as well
  export interface Category {
    name: string;
    slug: string;
    count: number;
  }
  
  export interface Tag {
    name: string;
    count: number;
  }