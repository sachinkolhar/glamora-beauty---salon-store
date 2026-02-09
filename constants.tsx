
import { Product, Category, BlogPost, Testimonial, SiteSettings, FAQ } from './types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Silk Radiance Facial Serum',
    price: 85.00,
    description: 'A premium professional-grade serum for unmatched hydration and glow.',
    category: Category.SKIN,
    image: 'https://picsum.photos/seed/skin1/600/600',
    isFeatured: true,
    stock: 25
  },
  {
    id: '2',
    name: 'Titanium Ionic Hair Dryer',
    price: 189.99,
    description: 'The choice of top salon professionals for fast, frizz-free drying.',
    category: Category.TOOLS,
    image: 'https://picsum.photos/seed/tool1/600/600',
    isFeatured: true,
    stock: 12
  },
  {
    id: '3',
    name: 'Ceramide Fusion Shampoo',
    price: 34.50,
    description: 'Repair and strengthen damaged hair with our salon-exclusive formula.',
    category: Category.HAIR,
    image: 'https://picsum.photos/seed/hair1/600/600',
    isFeatured: true,
    stock: 50
  },
  {
    id: '4',
    name: 'Luxe Matte Lipstick Set',
    price: 65.00,
    description: 'Highly pigmented, long-lasting shades for the ultimate makeup kit.',
    category: Category.MAKEUP,
    image: 'https://picsum.photos/seed/makeup1/600/600',
    isFeatured: false,
    stock: 100
  },
];

export const INITIAL_POSTS: BlogPost[] = [
  {
    id: '1',
    title: 'Top 5 Salon Trends for 2024',
    slug: 'salon-trends-2024',
    content: 'Discover the latest in color techniques and customer service...',
    excerpt: 'The beauty industry is evolving faster than ever. Stay ahead with these key trends.',
    image: 'https://picsum.photos/seed/blog1/800/400',
    date: '2024-03-20',
    author: 'Admin',
    category: 'Industry',
    isPublished: true
  }
];

export const INITIAL_TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah Jenkins',
    role: 'Owner, Luminous Salon',
    content: 'Glamora has been our primary supplier for 3 years. The quality is unmatched and delivery is always on time.',
    rating: 5,
    avatar: 'https://i.pravatar.cc/150?u=sarah'
  },
  {
    id: '2',
    name: 'Michael Chen',
    role: 'Lead Stylist',
    content: 'The professional tools here are game changers. My clients notice the difference in their hair health.',
    rating: 5,
    avatar: 'https://i.pravatar.cc/150?u=michael'
  }
];

export const INITIAL_FAQS: FAQ[] = [
  {
    id: '1',
    question: 'Do you offer bulk discounts for salons?',
    answer: 'Yes! We have a specialized Bulk Orders program for verified salon owners and professionals.'
  },
  {
    id: '2',
    question: 'What is your shipping policy?',
    answer: 'We offer free standard shipping on all orders over $150.'
  }
];

export const INITIAL_SETTINGS: SiteSettings = {
  siteName: 'Glamora Beauty',
  primaryColor: '#D4AF37',
  secondaryColor: '#FDF5E6',
  accentColor: '#E19A9A',
  darkColor: '#333333',
  heroHeadline: 'Professional Beauty for the Modern Artist',
  heroSubheadline: 'Premium salon supplies and curated beauty products trusted by experts worldwide.',
  contactEmail: 'hello@glamora.com',
  contactPhone: '+1 (555) 012-3456',
  address: '123 Beauty Lane, Glamour City, GC 90210',
  facebookUrl: 'https://facebook.com',
  instagramUrl: 'https://instagram.com'
};
