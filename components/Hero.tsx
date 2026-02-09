
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { SiteSettings } from '../types';

interface HeroProps {
  settings: SiteSettings;
  onCtaClick: () => void;
}

const Hero: React.FC<HeroProps> = ({ settings, onCtaClick }) => {
  return (
    <section className="relative h-[85vh] flex items-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" 
          className="w-full h-full object-cover" 
          alt="Luxury Salon"
        />
        <div className="absolute inset-0 bg-black/30 bg-gradient-to-r from-black/60 to-transparent"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 w-full">
        <div className="max-w-2xl text-white">
          <span className="inline-block px-4 py-1 rounded-full bg-brand-primary text-brand-dark text-[10px] font-bold tracking-[0.2em] uppercase mb-6 fade-in">
            New Collections Arrived
          </span>
          <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 leading-[1.1] fade-in" style={{ animationDelay: '0.1s' }}>
            {settings.heroHeadline}
          </h1>
          <p className="text-lg md:text-xl text-zinc-200 mb-10 leading-relaxed fade-in" style={{ animationDelay: '0.2s' }}>
            {settings.heroSubheadline}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 fade-in" style={{ animationDelay: '0.3s' }}>
            <button 
              onClick={onCtaClick}
              className="px-8 py-4 bg-brand-primary text-brand-dark font-bold rounded-sm tracking-widest hover:bg-white transition-all flex items-center justify-center gap-2 group uppercase text-sm"
            >
              Shop Collection
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button 
              className="px-8 py-4 bg-white/10 backdrop-blur-md border border-white/30 text-white font-bold rounded-sm tracking-widest hover:bg-white/20 transition-all uppercase text-sm"
            >
              Learn More
            </button>
          </div>
        </div>
      </div>
      
      {/* Floating Badge */}
      <div className="absolute bottom-12 right-12 hidden lg:block bg-white p-6 shadow-2xl rounded-sm border-l-4 border-brand-primary">
        <p className="text-brand-dark font-serif text-lg font-bold mb-1">Trust the Experts</p>
        <p className="text-zinc-500 text-sm">Over 15,000 salons supplied</p>
      </div>
    </section>
  );
};

export default Hero;
