
export enum Category {
  HAIR = 'Hair',
  SKIN = 'Skin',
  MAKEUP = 'Makeup',
  EQUIPMENT = 'Salon Equipment',
  TOOLS = 'Professional Tools'
}

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category: Category;
  image: string;
  isFeatured: boolean;
  stock: number;
  metaTitle?: string;
  metaDescription?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  image: string;
  date: string;
  author: string;
  category: string;
  isPublished: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  rating: number;
  avatar: string;
}

export interface Lead {
  id: string;
  type: 'contact' | 'bulk_order';
  name: string;
  email: string;
  phone?: string;
  message: string;
  date: string;
  status: 'new' | 'viewed' | 'resolved';
}

export interface SiteSettings {
  siteName: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  darkColor: string;
  heroHeadline: string;
  heroSubheadline: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
  facebookUrl: string;
  instagramUrl: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
}
