
import React from 'react';
import { 
  LayoutDashboard, 
  Package, 
  FileText, 
  Settings as SettingsIcon, 
  MessageSquare, 
  HelpCircle, 
  LogOut,
  Star,
  Globe
} from 'lucide-react';

interface AdminLayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onLogout: () => void;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children, activeTab, setActiveTab, onLogout }) => {
  const menuItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Overview' },
    { id: 'products', icon: Package, label: 'Products' },
    { id: 'posts', icon: FileText, label: 'Blog Posts' },
    { id: 'leads', icon: MessageSquare, label: 'Leads & Forms' },
    { id: 'testimonials', icon: Star, label: 'Testimonials' },
    { id: 'faqs', icon: HelpCircle, label: 'FAQs' },
    { id: 'settings', icon: SettingsIcon, label: 'Site Settings' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-brand-dark text-white flex flex-col">
        <div className="p-6 border-b border-zinc-700">
          <h1 className="text-xl font-serif font-bold flex items-center gap-2">
            <Globe size={24} className="text-brand-primary" />
            Glamora CMS
          </h1>
        </div>
        
        <nav className="flex-grow p-4 space-y-2">
          {menuItems.map(item => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === item.id 
                    ? 'bg-brand-primary text-brand-dark' 
                    : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'
                }`}
              >
                <Icon size={18} />
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-zinc-700">
          <button 
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-zinc-400 hover:text-white transition-colors"
          >
            <LogOut size={18} />
            Log Out
          </button>
        </div>
      </aside>

      {/* Content */}
      <main className="flex-grow overflow-auto p-8">
        <header className="mb-8 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800 capitalize">{activeTab.replace('-', ' ')}</h2>
          <div className="flex items-center gap-4">
             <span className="text-sm text-gray-500">Welcome back, Admin</span>
             <img src="https://i.pravatar.cc/40?u=admin" className="w-10 h-10 rounded-full border border-gray-200" alt="Admin" />
          </div>
        </header>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 min-h-[600px] p-6">
          {children}
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
