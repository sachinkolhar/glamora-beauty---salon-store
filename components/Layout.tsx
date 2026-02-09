
import React, { useState } from 'react';
import { Menu, X, ShoppingBag, User, Phone, Instagram, Facebook, Mail } from 'lucide-react';
import { SiteSettings } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  settings: SiteSettings;
  onNavigate: (page: string) => void;
  activePage: string;
}

const Layout: React.FC<LayoutProps> = ({ children, settings, onNavigate, activePage }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: 'Home', id: 'home' },
    { name: 'Products', id: 'products' },
    { name: 'About', id: 'about' },
    { name: 'Blog', id: 'blog' },
    { name: 'Bulk Orders', id: 'bulk' },
    { name: 'Contact', id: 'contact' },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Promo Bar */}
      <div className="bg-brand-dark text-white text-xs py-2 text-center uppercase tracking-widest font-medium">
        Free shipping on professional orders over $250
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-brand-secondary">
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
          <button 
            onClick={() => onNavigate('home')}
            className="text-2xl font-serif font-bold text-brand-dark hover:text-brand-primary transition-colors"
          >
            {settings.siteName.toUpperCase()}
          </button>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`text-sm font-medium tracking-wide uppercase transition-colors hover:text-brand-primary ${
                  activePage === item.id ? 'text-brand-primary border-b-2 border-brand-primary' : 'text-brand-dark'
                }`}
              >
                {item.name}
              </button>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            <button className="p-2 text-brand-dark hover:text-brand-primary transition-colors">
              <ShoppingBag size={20} />
            </button>
            <button 
              onClick={() => onNavigate('admin-login')}
              className="p-2 text-brand-dark hover:text-brand-primary transition-colors"
            >
              <User size={20} />
            </button>
            <button 
              className="lg:hidden p-2 text-brand-dark"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden bg-white border-b border-brand-secondary fade-in">
            <nav className="px-4 pt-2 pb-6 flex flex-col space-y-4">
              {navItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => {
                    onNavigate(item.id);
                    setIsMenuOpen(false);
                  }}
                  className={`text-lg font-medium tracking-wide uppercase text-left ${
                    activePage === item.id ? 'text-brand-primary' : 'text-brand-dark'
                  }`}
                >
                  {item.name}
                </button>
              ))}
            </nav>
          </div>
        )}
      </header>

      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-brand-dark text-white pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <h3 className="text-2xl font-serif font-bold mb-6 tracking-tight">{settings.siteName}</h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Empowering beauty professionals worldwide with premium tools, supplies, and skincare education.
            </p>
            <div className="flex space-x-4">
              <a href={settings.facebookUrl} className="hover:text-brand-primary transition-colors"><Facebook size={20} /></a>
              <a href={settings.instagramUrl} className="hover:text-brand-primary transition-colors"><Instagram size={20} /></a>
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-6 uppercase text-sm tracking-widest">Quick Links</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><button onClick={() => onNavigate('products')} className="hover:text-brand-primary">Shop All</button></li>
              <li><button onClick={() => onNavigate('bulk')} className="hover:text-brand-primary">Salon Partnership</button></li>
              <li><button onClick={() => onNavigate('about')} className="hover:text-brand-primary">Our Story</button></li>
              <li><button onClick={() => onNavigate('contact')} className="hover:text-brand-primary">Customer Support</button></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6 uppercase text-sm tracking-widest">Connect</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li className="flex items-center gap-3"><Phone size={16} /> {settings.contactPhone}</li>
              <li className="flex items-center gap-3"><Mail size={16} /> {settings.contactEmail}</li>
              <li className="flex items-center gap-3">
                <span className="shrink-0">📍</span>
                {settings.address}
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6 uppercase text-sm tracking-widest">Newsletter</h4>
            <p className="text-gray-400 text-sm mb-4">Subscribe for exclusive pro-only deals.</p>
            <div className="flex">
              <input 
                type="email" 
                placeholder="Email address"
                className="bg-zinc-800 border-none px-4 py-2 text-sm flex-grow focus:ring-1 focus:ring-brand-primary" 
              />
              <button className="bg-brand-primary text-brand-dark px-4 py-2 text-sm font-bold">JOIN</button>
            </div>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 mt-16 pt-8 border-t border-zinc-800 text-center text-xs text-gray-500 uppercase tracking-widest">
          &copy; {new Date().getFullYear()} {settings.siteName}. All Rights Reserved. | Privacy Policy | Terms
        </div>
      </footer>
    </div>
  );
};

export default Layout;
