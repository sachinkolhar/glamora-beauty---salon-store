
import { useState, useEffect } from 'react';
import { Product, BlogPost, Testimonial, Lead, SiteSettings, FAQ } from './types';
import { INITIAL_PRODUCTS, INITIAL_POSTS, INITIAL_TESTIMONIALS, INITIAL_SETTINGS, INITIAL_FAQS } from './constants';

const STORAGE_KEYS = {
  PRODUCTS: 'glamora_products',
  POSTS: 'glamora_posts',
  TESTIMONIALS: 'glamora_testimonials',
  LEADS: 'glamora_leads',
  SETTINGS: 'glamora_settings',
  FAQS: 'glamora_faqs'
};

export function useStore() {
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });

  const [posts, setPosts] = useState<BlogPost[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.POSTS);
    return saved ? JSON.parse(saved) : INITIAL_POSTS;
  });

  const [testimonials, setTestimonials] = useState<Testimonial[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.TESTIMONIALS);
    return saved ? JSON.parse(saved) : INITIAL_TESTIMONIALS;
  });

  const [leads, setLeads] = useState<Lead[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.LEADS);
    return saved ? JSON.parse(saved) : [];
  });

  const [settings, setSettings] = useState<SiteSettings>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    return saved ? JSON.parse(saved) : INITIAL_SETTINGS;
  });

  const [faqs, setFaqs] = useState<FAQ[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.FAQS);
    return saved ? JSON.parse(saved) : INITIAL_FAQS;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
    localStorage.setItem(STORAGE_KEYS.POSTS, JSON.stringify(posts));
    localStorage.setItem(STORAGE_KEYS.TESTIMONIALS, JSON.stringify(testimonials));
    localStorage.setItem(STORAGE_KEYS.LEADS, JSON.stringify(leads));
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
    localStorage.setItem(STORAGE_KEYS.FAQS, JSON.stringify(faqs));

    // Update CSS variables for branding
    document.documentElement.style.setProperty('--color-primary', settings.primaryColor);
    document.documentElement.style.setProperty('--color-secondary', settings.secondaryColor);
    document.documentElement.style.setProperty('--color-accent', settings.accentColor);
    document.documentElement.style.setProperty('--color-dark', settings.darkColor);
  }, [products, posts, testimonials, leads, settings, faqs]);

  const addLead = (lead: Omit<Lead, 'id' | 'date' | 'status'>) => {
    const newLead: Lead = {
      ...lead,
      id: Math.random().toString(36).substr(2, 9),
      date: new Date().toISOString(),
      status: 'new'
    };
    setLeads(prev => [newLead, ...prev]);
  };

  const updateProduct = (updated: Product) => {
    setProducts(prev => prev.map(p => p.id === updated.id ? updated : p));
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  return {
    products, setProducts, updateProduct, deleteProduct,
    posts, setPosts,
    testimonials, setTestimonials,
    leads, setLeads, addLead,
    settings, setSettings,
    faqs, setFaqs
  };
}
