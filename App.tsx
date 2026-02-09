
import React, { useState } from 'react';
import { useStore } from './store';
import Layout from './components/Layout';
import AdminLayout from './components/AdminLayout';
import Hero from './components/Hero';
import { Product, BlogPost, Category, Lead } from './types';
import { 
  Package, 
  Truck, 
  ShieldCheck, 
  Heart, 
  Plus, 
  Search, 
  ChevronRight, 
  Star,
  CheckCircle,
  Mail,
  Smartphone,
  Send,
  Trash2,
  Edit2,
  // Added missing icon imports
  MessageSquare,
  ShoppingBag
} from 'lucide-react';

const App: React.FC = () => {
  const [activePage, setActivePage] = useState('home');
  const [isAdmin, setIsAdmin] = useState(false);
  const [activeAdminTab, setActiveAdminTab] = useState('dashboard');
  const [editingItem, setEditingItem] = useState<any>(null);
  
  const { 
    products, setProducts, updateProduct, deleteProduct,
    posts, setPosts,
    testimonials, setTestimonials,
    leads, setLeads, addLead,
    settings, setSettings,
    faqs, setFaqs
  } = useStore();

  const handleNavigate = (page: string) => {
    window.scrollTo(0, 0);
    setActivePage(page);
  };

  const handleAdminLogin = () => {
    // Simple mock auth
    setIsAdmin(true);
    setActivePage('admin');
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>, type: 'contact' | 'bulk_order') => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    addLead({
      type,
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      message: formData.get('message') as string,
    });
    alert('Thank you! Your inquiry has been received.');
    e.currentTarget.reset();
  };

  if (isAdmin && activePage === 'admin') {
    return (
      <AdminLayout 
        activeTab={activeAdminTab} 
        setActiveTab={setActiveAdminTab}
        onLogout={() => { setIsAdmin(false); setActivePage('home'); }}
      >
        {activeAdminTab === 'dashboard' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { label: 'Total Products', value: products.length, color: 'bg-blue-50 text-blue-600' },
                { label: 'Blog Posts', value: posts.length, color: 'bg-green-50 text-green-600' },
                { label: 'New Leads', value: leads.filter(l => l.status === 'new').length, color: 'bg-red-50 text-red-600' },
                { label: 'Avg Rating', value: '4.9', color: 'bg-yellow-50 text-yellow-600' },
              ].map(stat => (
                <div key={stat.label} className={`${stat.color} p-6 rounded-xl border border-current opacity-80`}>
                  <p className="text-xs uppercase font-bold tracking-widest mb-1">{stat.label}</p>
                  <p className="text-3xl font-bold">{stat.value}</p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="border border-gray-100 rounded-xl p-6">
                <h3 className="font-bold mb-4 flex items-center gap-2">
                  <MessageSquare size={18} /> Recent Leads
                </h3>
                <div className="space-y-4">
                  {leads.slice(0, 5).map(lead => (
                    <div key={lead.id} className="text-sm p-4 bg-gray-50 rounded-lg flex justify-between items-start">
                      <div>
                        <p className="font-bold">{lead.name}</p>
                        <p className="text-gray-500">{lead.type.replace('_', ' ')}</p>
                      </div>
                      <span className="text-[10px] bg-white px-2 py-1 rounded border">{new Date(lead.date).toLocaleDateString()}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="border border-gray-100 rounded-xl p-6">
                <h3 className="font-bold mb-4 flex items-center gap-2">
                  <Star size={18} /> Top Testimonials
                </h3>
                <div className="space-y-4">
                  {testimonials.slice(0, 3).map(t => (
                    <div key={t.id} className="text-sm italic text-gray-600 border-l-2 border-brand-primary pl-4">
                      "{t.content}" — <span className="font-bold text-gray-800">{t.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeAdminTab === 'products' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-500">Manage your product inventory here.</p>
              <button 
                onClick={() => setEditingItem({ id: Math.random().toString(), name: '', price: 0, description: '', category: Category.SKIN, image: '', isFeatured: false, stock: 0 })}
                className="bg-brand-dark text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2"
              >
                <Plus size={16} /> Add Product
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-50 text-gray-600 font-bold">
                  <tr>
                    <th className="px-4 py-3">Product</th>
                    <th className="px-4 py-3">Category</th>
                    <th className="px-4 py-3">Price</th>
                    <th className="px-4 py-3">Stock</th>
                    <th className="px-4 py-3">Featured</th>
                    <th className="px-4 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {products.map(p => (
                    <tr key={p.id}>
                      <td className="px-4 py-4 flex items-center gap-3">
                        <img src={p.image} className="w-10 h-10 object-cover rounded" />
                        <span className="font-medium">{p.name}</span>
                      </td>
                      <td className="px-4 py-4">{p.category}</td>
                      <td className="px-4 py-4">${p.price.toFixed(2)}</td>
                      <td className="px-4 py-4">{p.stock}</td>
                      <td className="px-4 py-4">{p.isFeatured ? '✅' : '❌'}</td>
                      <td className="px-4 py-4 space-x-2">
                        <button onClick={() => setEditingItem(p)} className="p-1 text-blue-600 hover:bg-blue-50 rounded"><Edit2 size={16} /></button>
                        <button onClick={() => deleteProduct(p.id)} className="p-1 text-red-600 hover:bg-red-50 rounded"><Trash2 size={16} /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {editingItem && (
              <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4">
                <div className="bg-white w-full max-w-2xl rounded-xl p-8 max-h-[90vh] overflow-y-auto">
                  <h3 className="text-xl font-bold mb-6">Edit Product</h3>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="col-span-2">
                      <label className="block text-sm font-bold mb-2">Name</label>
                      <input 
                        type="text" 
                        value={editingItem.name} 
                        onChange={e => setEditingItem({...editingItem, name: e.target.value})}
                        className="w-full p-3 border rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold mb-2">Price ($)</label>
                      <input 
                        type="number" 
                        value={editingItem.price} 
                        onChange={e => setEditingItem({...editingItem, price: parseFloat(e.target.value)})}
                        className="w-full p-3 border rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold mb-2">Stock</label>
                      <input 
                        type="number" 
                        value={editingItem.stock} 
                        onChange={e => setEditingItem({...editingItem, stock: parseInt(e.target.value)})}
                        className="w-full p-3 border rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold mb-2">Category</label>
                      <select 
                        value={editingItem.category} 
                        onChange={e => setEditingItem({...editingItem, category: e.target.value as Category})}
                        className="w-full p-3 border rounded-lg"
                      >
                        {Object.values(Category).map(cat => <option key={cat} value={cat}>{cat}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-bold mb-2">Image URL</label>
                      <input 
                        type="text" 
                        value={editingItem.image} 
                        onChange={e => setEditingItem({...editingItem, image: e.target.value})}
                        className="w-full p-3 border rounded-lg"
                        placeholder="https://..."
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-sm font-bold mb-2">Description</label>
                      <textarea 
                        value={editingItem.description} 
                        onChange={e => setEditingItem({...editingItem, description: e.target.value})}
                        className="w-full p-3 border rounded-lg h-32"
                      />
                    </div>
                  </div>
                  <div className="mt-8 flex justify-end gap-4">
                    <button onClick={() => setEditingItem(null)} className="px-6 py-2 text-gray-500 font-bold">Cancel</button>
                    <button 
                      onClick={() => {
                        const exists = products.find(p => p.id === editingItem.id);
                        if(exists) updateProduct(editingItem);
                        else setProducts([...products, editingItem]);
                        setEditingItem(null);
                      }}
                      className="px-6 py-2 bg-brand-primary text-brand-dark rounded-lg font-bold"
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {activeAdminTab === 'settings' && (
          <div className="max-w-4xl space-y-12">
            <section>
              <h3 className="text-lg font-bold mb-6 border-b pb-2">Branding & Identity</h3>
              <div className="grid grid-cols-2 gap-6">
                <div className="col-span-2">
                  <label className="block text-sm font-bold mb-2">Site Name</label>
                  <input 
                    type="text" 
                    value={settings.siteName} 
                    onChange={e => setSettings({...settings, siteName: e.target.value})}
                    className="w-full p-3 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2">Primary Color (Rose Gold)</label>
                  <div className="flex gap-3">
                    <input 
                      type="color" 
                      value={settings.primaryColor} 
                      onChange={e => setSettings({...settings, primaryColor: e.target.value})}
                      className="w-12 h-12 rounded cursor-pointer"
                    />
                    <input 
                      type="text" 
                      value={settings.primaryColor} 
                      onChange={e => setSettings({...settings, primaryColor: e.target.value})}
                      className="flex-grow p-3 border rounded-lg text-sm"
                    />
                  </div>
                </div>
                <div>
                   <label className="block text-sm font-bold mb-2">Accent Color (Pink)</label>
                  <div className="flex gap-3">
                    <input 
                      type="color" 
                      value={settings.accentColor} 
                      onChange={e => setSettings({...settings, accentColor: e.target.value})}
                      className="w-12 h-12 rounded cursor-pointer"
                    />
                    <input 
                      type="text" 
                      value={settings.accentColor} 
                      onChange={e => setSettings({...settings, accentColor: e.target.value})}
                      className="flex-grow p-3 border rounded-lg text-sm"
                    />
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h3 className="text-lg font-bold mb-6 border-b pb-2">Hero Section Editor</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold mb-2">Main Headline</label>
                  <input 
                    type="text" 
                    value={settings.heroHeadline} 
                    onChange={e => setSettings({...settings, heroHeadline: e.target.value})}
                    className="w-full p-3 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2">Subheadline</label>
                  <textarea 
                    value={settings.heroSubheadline} 
                    onChange={e => setSettings({...settings, heroSubheadline: e.target.value})}
                    className="w-full p-3 border rounded-lg h-24"
                  />
                </div>
              </div>
            </section>
          </div>
        )}

        {/* Other Admin tabs would follow similar structure for CRUD */}
        {['leads', 'testimonials', 'faqs', 'posts'].includes(activeAdminTab) && (
          <div className="p-12 text-center text-gray-400">
            <Package size={48} className="mx-auto mb-4 opacity-20" />
            <p className="text-xl font-serif">Management interface for {activeAdminTab} is ready for content.</p>
            <p className="text-sm">Functionality follows the standard CRUD pattern implemented in Products.</p>
          </div>
        )}
      </AdminLayout>
    );
  }

  return (
    <Layout settings={settings} onNavigate={handleNavigate} activePage={activePage}>
      {activePage === 'home' && (
        <div className="space-y-24 pb-24">
          <Hero settings={settings} onCtaClick={() => handleNavigate('products')} />
          
          {/* Categories Grid */}
          <section className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-serif font-bold mb-4">Curated Excellence</h2>
              <p className="text-zinc-500 max-w-xl mx-auto">Explore our professional-grade collections designed for results.</p>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { name: 'Hair Care', img: 'https://picsum.photos/seed/hair2/400/500', id: Category.HAIR },
                { name: 'Skin Therapy', img: 'https://picsum.photos/seed/skin2/400/500', id: Category.SKIN },
                { name: 'Master Makeup', img: 'https://picsum.photos/seed/makeup2/400/500', id: Category.MAKEUP },
                { name: 'Salon Pro Tools', img: 'https://picsum.photos/seed/tool2/400/500', id: Category.TOOLS },
              ].map(cat => (
                <button 
                  key={cat.id} 
                  onClick={() => handleNavigate('products')}
                  className="group relative overflow-hidden h-[400px] rounded-sm bg-brand-secondary"
                >
                  <img src={cat.img} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-90" alt={cat.name} />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors"></div>
                  <div className="absolute bottom-8 left-0 right-0 text-center text-white">
                    <p className="text-xs uppercase tracking-[0.3em] font-bold mb-2">Shop</p>
                    <h3 className="text-2xl font-serif font-bold">{cat.name}</h3>
                  </div>
                </button>
              ))}
            </div>
          </section>

          {/* Featured Products */}
          <section className="bg-brand-secondary/30 py-24">
            <div className="max-w-7xl mx-auto px-4">
              <div className="flex justify-between items-end mb-12">
                <div>
                  <h2 className="text-4xl font-serif font-bold mb-4">Featured Essentials</h2>
                  <p className="text-zinc-500">The most sought-after products in the industry today.</p>
                </div>
                <button onClick={() => handleNavigate('products')} className="text-brand-primary font-bold uppercase tracking-widest text-sm flex items-center gap-2 border-b-2 border-brand-primary pb-1">
                  View All <ChevronRight size={16} />
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {products.filter(p => p.isFeatured).map(product => (
                  <div key={product.id} className="bg-white group cursor-pointer border border-brand-secondary/50 overflow-hidden rounded-sm shadow-sm hover:shadow-xl transition-all">
                    <div className="relative h-80 overflow-hidden">
                      <img src={product.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <div className="absolute top-4 left-4 bg-brand-primary text-brand-dark px-3 py-1 text-[10px] font-bold uppercase tracking-wider">Top Rated</div>
                      <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform bg-white/90 backdrop-blur-sm border-t border-brand-secondary">
                        <button className="w-full py-3 bg-brand-dark text-white text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2">
                          <ShoppingBag size={14} /> Add to Bag
                        </button>
                      </div>
                    </div>
                    <div className="p-6">
                      <p className="text-[10px] uppercase text-zinc-400 font-bold tracking-widest mb-1">{product.category}</p>
                      <h3 className="text-xl font-serif font-bold mb-2">{product.name}</h3>
                      <div className="flex items-center justify-between">
                         <p className="text-lg font-medium text-brand-primary">${product.price.toFixed(2)}</p>
                         <div className="flex gap-1">
                           {[1,2,3,4,5].map(s => <Star key={s} size={12} className="fill-brand-primary text-brand-primary" />)}
                         </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Benefits Section */}
          <section className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-12">
            {[
              { icon: Truck, title: 'Swift Logistics', text: 'Priority professional shipping globally within 3-5 business days.' },
              { icon: ShieldCheck, title: 'Authenticity Guaranteed', text: '100% genuine professional products sourced directly from manufacturers.' },
              { icon: Heart, title: 'Dedicated Support', text: 'One-on-one expert account managers for all our salon partners.' }
            ].map((benefit, i) => (
              <div key={i} className="text-center p-8 bg-white border border-brand-secondary/30 hover:border-brand-primary transition-colors">
                <div className="w-16 h-16 bg-brand-secondary rounded-full flex items-center justify-center mx-auto mb-6">
                  <benefit.icon className="text-brand-primary" size={32} />
                </div>
                <h3 className="text-xl font-serif font-bold mb-4">{benefit.title}</h3>
                <p className="text-zinc-500 text-sm leading-relaxed">{benefit.text}</p>
              </div>
            ))}
          </section>

          {/* Testimonials */}
          <section className="bg-brand-dark text-white py-24">
            <div className="max-w-7xl mx-auto px-4">
              <div className="text-center mb-16">
                 <h2 className="text-4xl font-serif font-bold mb-4 text-brand-secondary">The Glamora Experience</h2>
                 <p className="text-zinc-400">Join over 15,000 satisfied beauty professionals.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {testimonials.map(t => (
                  <div key={t.id} className="bg-zinc-800/50 p-10 rounded-sm relative border-l-4 border-brand-primary">
                    <p className="text-2xl font-serif italic mb-8 leading-relaxed">"{t.content}"</p>
                    <div className="flex items-center gap-4">
                      <img src={t.avatar} className="w-12 h-12 rounded-full grayscale hover:grayscale-0 transition-all" alt={t.name} />
                      <div>
                        <p className="font-bold tracking-wide">{t.name}</p>
                        <p className="text-xs text-brand-primary uppercase tracking-widest">{t.role}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Call to Action */}
          <section className="max-w-5xl mx-auto px-4 py-24 text-center">
            <div className="p-16 border-2 border-brand-secondary rounded-sm bg-brand-secondary/10 relative overflow-hidden">
              <div className="relative z-10">
                <h2 className="text-5xl font-serif font-bold mb-6">Partner With Glamora</h2>
                <p className="text-xl text-zinc-500 mb-10 max-w-2xl mx-auto">Are you a salon owner or professional artist? Apply for our pro-partnership for exclusive wholesale pricing and marketing support.</p>
                <button 
                  onClick={() => handleNavigate('bulk')}
                  className="px-12 py-5 bg-brand-dark text-white font-bold tracking-widest hover:bg-brand-primary hover:text-brand-dark transition-all uppercase text-sm rounded-sm"
                >
                  Join Pro Program
                </button>
              </div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary/20 rounded-full translate-x-16 -translate-y-16"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-brand-primary/20 rounded-full -translate-x-16 translate-y-16"></div>
            </div>
          </section>
        </div>
      )}

      {activePage === 'products' && (
        <div className="max-w-7xl mx-auto px-4 py-24">
          <div className="flex flex-col md:flex-row gap-12">
            {/* Filters Sidebar */}
            <aside className="w-full md:w-64 space-y-8">
              <div>
                <h3 className="font-bold uppercase tracking-widest text-sm mb-6 pb-2 border-b">Categories</h3>
                <div className="space-y-4">
                  {Object.values(Category).map(cat => (
                    <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                      <input type="checkbox" className="w-4 h-4 accent-brand-primary border-brand-secondary rounded-sm" />
                      <span className="text-sm text-zinc-600 group-hover:text-brand-primary transition-colors">{cat}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="font-bold uppercase tracking-widest text-sm mb-6 pb-2 border-b">Availability</h3>
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input type="checkbox" className="w-4 h-4 accent-brand-primary border-brand-secondary rounded-sm" />
                  <span className="text-sm text-zinc-600 group-hover:text-brand-primary transition-colors">In Stock Only</span>
                </label>
              </div>
            </aside>

            {/* Product Grid */}
            <div className="flex-grow">
               <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12 gap-6">
                 <div>
                   <h2 className="text-4xl font-serif font-bold mb-2">Our Collection</h2>
                   <p className="text-zinc-500">Showing {products.length} professional products</p>
                 </div>
                 <div className="flex items-center gap-4 w-full sm:w-auto">
                    <div className="relative flex-grow">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={16} />
                      <input type="text" placeholder="Search products..." className="w-full pl-10 pr-4 py-2 border border-brand-secondary rounded-sm text-sm focus:ring-1 focus:ring-brand-primary outline-none" />
                    </div>
                    <select className="px-4 py-2 border border-brand-secondary rounded-sm text-sm focus:ring-1 focus:ring-brand-primary outline-none">
                      <option>Latest</option>
                      <option>Price: Low to High</option>
                      <option>Price: High to Low</option>
                    </select>
                 </div>
               </div>

               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {products.map(product => (
                  <div key={product.id} className="group cursor-pointer">
                    <div className="relative h-80 overflow-hidden bg-brand-secondary/20 mb-6">
                      <img src={product.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={product.name} />
                      <button className="absolute bottom-4 left-4 right-4 py-3 bg-white text-brand-dark text-[10px] font-bold uppercase tracking-[0.2em] opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all shadow-xl">
                        Quick View
                      </button>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase text-brand-primary font-bold tracking-widest mb-1">{product.category}</p>
                      <h3 className="text-lg font-serif font-bold mb-2">{product.name}</h3>
                      <p className="text-brand-dark font-medium">${product.price.toFixed(2)}</p>
                    </div>
                  </div>
                ))}
               </div>
            </div>
          </div>
        </div>
      )}

      {activePage === 'contact' && (
        <div className="max-w-7xl mx-auto px-4 py-24">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
             <div>
               <span className="text-brand-primary font-bold uppercase tracking-widest text-xs">Reach Out</span>
               <h2 className="text-5xl font-serif font-bold mt-4 mb-8">We'd love to hear from you.</h2>
               <p className="text-lg text-zinc-500 mb-12 leading-relaxed">Whether you're looking for product advice, order status, or salon partnership inquiries, our team is ready to assist you.</p>
               
               <div className="space-y-8">
                 <div className="flex gap-6">
                   <div className="shrink-0 w-12 h-12 bg-brand-secondary flex items-center justify-center rounded-full"><Smartphone size={20} className="text-brand-primary" /></div>
                   <div>
                     <p className="font-bold mb-1">Phone Assistance</p>
                     <p className="text-zinc-500">{settings.contactPhone}</p>
                   </div>
                 </div>
                 <div className="flex gap-6">
                   <div className="shrink-0 w-12 h-12 bg-brand-secondary flex items-center justify-center rounded-full"><Mail size={20} className="text-brand-primary" /></div>
                   <div>
                     <p className="font-bold mb-1">Email Enquiries</p>
                     <p className="text-zinc-500">{settings.contactEmail}</p>
                   </div>
                 </div>
               </div>
             </div>

             <form onSubmit={e => handleFormSubmit(e, 'contact')} className="bg-white p-10 shadow-2xl rounded-sm border-t-4 border-brand-primary">
               <div className="space-y-6">
                 <div>
                   <label className="block text-xs uppercase font-bold tracking-widest mb-2 text-zinc-400">Full Name</label>
                   <input required name="name" type="text" className="w-full px-4 py-3 border border-brand-secondary rounded-sm outline-none focus:ring-1 focus:ring-brand-primary" />
                 </div>
                 <div>
                   <label className="block text-xs uppercase font-bold tracking-widest mb-2 text-zinc-400">Email Address</label>
                   <input required name="email" type="email" className="w-full px-4 py-3 border border-brand-secondary rounded-sm outline-none focus:ring-1 focus:ring-brand-primary" />
                 </div>
                 <div>
                   <label className="block text-xs uppercase font-bold tracking-widest mb-2 text-zinc-400">Message</label>
                   <textarea required name="message" className="w-full px-4 py-3 border border-brand-secondary rounded-sm outline-none focus:ring-1 focus:ring-brand-primary h-32" />
                 </div>
                 <button className="w-full py-5 bg-brand-dark text-white font-bold tracking-widest uppercase hover:bg-brand-primary hover:text-brand-dark transition-all flex items-center justify-center gap-3">
                   Send Message <Send size={18} />
                 </button>
               </div>
             </form>
           </div>
        </div>
      )}

      {activePage === 'bulk' && (
        <div className="max-w-7xl mx-auto px-4 py-24">
           <div className="text-center mb-24 max-w-3xl mx-auto">
             <h1 className="text-6xl font-serif font-bold mb-6">Salon Partnership</h1>
             <p className="text-xl text-zinc-500">Elevate your business with exclusive professional benefits, wholesale pricing, and priority stocking.</p>
           </div>

           <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
             <div className="space-y-12">
               {[
                 { title: 'Wholesale Pricing', text: 'Get access to tier-based discounts of up to 40% off retail prices on bulk purchases.' },
                 { title: 'Professional Training', text: 'Complimentary quarterly training sessions for your staff on new products and techniques.' },
                 { title: 'Marketing Kits', text: 'Bespoke promotional materials and display stands to enhance your salon aesthetic.' },
                 { title: 'Priority Support', text: 'A dedicated account manager to handle all your restocking and specialized needs.' }
               ].map((benefit, i) => (
                 <div key={i} className="flex gap-6">
                   <div className="shrink-0 w-10 h-10 bg-brand-primary/10 rounded-full flex items-center justify-center text-brand-primary font-bold">{i+1}</div>
                   <div>
                     <h3 className="text-xl font-serif font-bold mb-2">{benefit.title}</h3>
                     <p className="text-zinc-500 text-sm leading-relaxed">{benefit.text}</p>
                   </div>
                 </div>
               ))}
             </div>

             <div className="bg-brand-secondary/20 p-12 rounded-sm">
               <h3 className="text-3xl font-serif font-bold mb-8">Professional Inquiry</h3>
               <form onSubmit={e => handleFormSubmit(e, 'bulk_order')} className="space-y-6">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold mb-2">Salon/Business Name</label>
                      <input required name="name" type="text" className="w-full px-4 py-3 bg-white border-none outline-none focus:ring-1 focus:ring-brand-primary rounded-sm shadow-sm" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold mb-2">Email</label>
                      <input required name="email" type="email" className="w-full px-4 py-3 bg-white border-none outline-none focus:ring-1 focus:ring-brand-primary rounded-sm shadow-sm" />
                    </div>
                 </div>
                 <div>
                    <label className="block text-xs font-bold mb-2">Primary Service Provided</label>
                    <select className="w-full px-4 py-3 bg-white border-none outline-none focus:ring-1 focus:ring-brand-primary rounded-sm shadow-sm">
                      <option>Full Service Salon</option>
                      <option>Skincare/MedSpa</option>
                      <option>Independent Professional</option>
                      <option>Makeup Studio</option>
                    </select>
                 </div>
                 <div>
                    <label className="block text-xs font-bold mb-2">Your Inquiry</label>
                    <textarea required name="message" placeholder="Tell us about your needs..." className="w-full px-4 py-3 bg-white border-none outline-none focus:ring-1 focus:ring-brand-primary h-32 rounded-sm shadow-sm" />
                 </div>
                 <button className="w-full py-5 bg-brand-primary text-brand-dark font-bold tracking-widest uppercase hover:bg-brand-dark hover:text-white transition-all rounded-sm">
                   Apply Now
                 </button>
               </form>
             </div>
           </div>
        </div>
      )}

      {activePage === 'about' && (
        <div className="pb-24">
          <section className="h-[50vh] relative flex items-center justify-center">
            <img src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" className="absolute inset-0 w-full h-full object-cover grayscale opacity-40" />
            <h1 className="relative z-10 text-7xl font-serif font-bold">Our Legacy</h1>
          </section>
          
          <div className="max-w-4xl mx-auto px-4 py-24 text-center">
             <h2 className="text-3xl font-serif font-bold mb-12 italic">"True beauty begins the moment you decide to be professional."</h2>
             <div className="space-y-8 text-lg text-zinc-500 leading-relaxed text-left">
               <p>Founded in 2012 by master aesthetician Elena Thorne, Glamora began as a small boutique supplier for the local artistry community. Our vision was simple: provide salon-grade formulations that actually work, without the astronomical markup of global fashion houses.</p>
               <p>Today, Glamora is the trusted partner for over 15,000 salons and freelance professionals worldwide. We believe that the tools you use are just as important as the talent you possess. That’s why we meticulously source every ingredient and test every tool in real-world salon environments before they reach your hands.</p>
               <p>Our mission is to empower the artists, the creators, and the visionaries of the beauty world. We aren't just selling products; we're providing the foundation for your success.</p>
             </div>
          </div>
        </div>
      )}

      {activePage === 'admin-login' && (
        <div className="max-w-md mx-auto py-32 px-4">
          <div className="bg-white p-10 border border-brand-secondary rounded-sm shadow-2xl">
            <h2 className="text-3xl font-serif font-bold mb-8 text-center uppercase tracking-widest">Admin Login</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest mb-2">Username</label>
                <input type="text" value="admin" disabled className="w-full p-3 border border-brand-secondary rounded-sm bg-zinc-50 text-zinc-400" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest mb-2">Password</label>
                <input type="password" value="********" disabled className="w-full p-3 border border-brand-secondary rounded-sm bg-zinc-50 text-zinc-400" />
              </div>
              <button 
                onClick={handleAdminLogin}
                className="w-full py-4 bg-brand-dark text-white font-bold tracking-widest uppercase hover:bg-brand-primary hover:text-brand-dark transition-all rounded-sm"
              >
                Access Dashboard
              </button>
              <p className="text-[10px] text-center text-zinc-400 uppercase tracking-widest">Secured Professional CMS</p>
            </div>
          </div>
        </div>
      )}

      {/* Blog Listing */}
      {activePage === 'blog' && (
        <div className="max-w-7xl mx-auto px-4 py-24">
           <h1 className="text-6xl font-serif font-bold mb-16 text-center">Beauty Trends & Tips</h1>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
             {posts.map(post => (
               <article key={post.id} className="group cursor-pointer">
                 <div className="aspect-video overflow-hidden mb-6 rounded-sm relative">
                   <img src={post.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt={post.title} />
                   <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 text-[10px] font-bold uppercase tracking-widest">{post.category}</div>
                 </div>
                 <div>
                   <p className="text-[10px] text-zinc-400 font-bold tracking-widest mb-2 uppercase">{new Date(post.date).toLocaleDateString()}</p>
                   <h3 className="text-2xl font-serif font-bold mb-4 group-hover:text-brand-primary transition-colors">{post.title}</h3>
                   <p className="text-zinc-500 text-sm leading-relaxed mb-6">{post.excerpt}</p>
                   <button className="text-xs font-bold uppercase tracking-widest border-b border-brand-dark pb-1">Read Article</button>
                 </div>
               </article>
             ))}
           </div>
        </div>
      )}
    </Layout>
  );
};

export default App;
