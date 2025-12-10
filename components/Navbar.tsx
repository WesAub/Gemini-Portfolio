import React from 'react';
import { ViewState, PortfolioTab } from '../types';
import { Grid, Plus, LogIn } from 'lucide-react';

interface NavbarProps {
  currentView: ViewState;
  setView: (view: ViewState) => void;
  activeTab: PortfolioTab;
  setActiveTab: (tab: PortfolioTab) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentView, setView, activeTab, setActiveTab }) => {
  return (
    <nav className="sticky top-0 z-50 w-full bg-off-white/90 backdrop-blur-sm border-b border-gray-200 px-6 md:px-12 lg:px-24 py-5 flex justify-between items-center">
      {/* Brand */}
      <div className="cursor-pointer group" onClick={() => setView('home')}>
        <h1 className="text-xl md:text-2xl font-black tracking-tighter leading-none group-hover:text-swiss-red transition-colors duration-300">
          WESLEY<br/>AUBYNN
        </h1>
      </div>

      {/* Center Tabs - Only visible on Home view */}
      {currentView === 'home' && (
        <div className="hidden md:flex gap-8">
          {(['creative', 'engineer', 'service inds.'] as PortfolioTab[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`text-xs font-bold uppercase tracking-widest transition-all duration-300 relative
                ${activeTab === tab ? 'text-black' : 'text-gray-400 hover:text-black'}
              `}
            >
              {tab}
              {activeTab === tab && (
                <span className="absolute -bottom-2 left-0 w-full h-[2px] bg-swiss-red" />
              )}
            </button>
          ))}
        </div>
      )}

      {/* Mobile / Admin Controls */}
      <div className="flex items-center gap-4">
        {/* Mobile Tab Toggle (Simplified) - visible only on small screens */}
        {currentView === 'home' && (
          <div className="md:hidden flex gap-3 text-[10px] font-bold uppercase">
             <button onClick={() => setActiveTab('creative')} className={activeTab === 'creative' ? 'text-swiss-red' : 'text-gray-400'}>CR</button>
             <button onClick={() => setActiveTab('engineer')} className={activeTab === 'engineer' ? 'text-swiss-red' : 'text-gray-400'}>EN</button>
             <button onClick={() => setActiveTab('service inds.')} className={activeTab === 'service inds.' ? 'text-swiss-red' : 'text-gray-400'}>SV</button>
          </div>
        )}

        <div className="h-6 w-px bg-gray-300 mx-2"></div>

        <button 
          onClick={() => setView(currentView === 'home' ? 'admin' : 'home')}
          className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest hover:text-swiss-red transition-colors"
        >
          {currentView === 'home' ? (
            <>
              <LogIn size={16} />
              <span className="hidden sm:inline">Admin</span>
            </>
          ) : (
             <>
              <Grid size={16} />
              <span className="hidden sm:inline">Portfolio</span>
            </>
          )}
        </button>
      </div>
    </nav>
  );
};