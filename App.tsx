
import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProjectGrid } from './components/ProjectGrid';
import { AdminPanel } from './components/AdminPanel';
import { Login } from './components/Login';
import { ProjectModal } from './components/ProjectModal';
import { ResumeView } from './components/ResumeView';
import { Project, PortfolioTab } from './types';
import { ENGINEER_RESUME, SERVICE_RESUME } from './constants';
import { fetchProjects } from './services/projectService';
import { getSession, User } from './services/authService';
import { Download, ArrowUpRight } from 'lucide-react';

const App: React.FC = () => {
  const [view, setView] = useState<'home' | 'admin'>('home');
  const [activeTab, setActiveTab] = useState<PortfolioTab>('creative');
  
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  // Initial Data Fetch
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const data = await fetchProjects();
      setProjects(data);
      setLoading(false);
    };
    loadData();
  }, [view]);

  // Auth Check
  useEffect(() => {
    getSession().then(setUser);
  }, []);

  const handleSignOut = () => {
    setUser(null);
    setView('home');
  };

  return (
    <div className="min-h-screen font-sans selection:bg-swiss-red selection:text-white bg-off-white text-ink">
      <Navbar 
        currentView={view} 
        setView={setView} 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      
      <main className="px-6 md:px-12 lg:px-24 pb-24">
        {view === 'home' ? (
          <>
            {activeTab === 'creative' && <Hero />}
            
            <div id="content" className={`${activeTab === 'creative' ? 'mt-24 md:mt-48' : 'mt-12 md:mt-24'}`}>
              
              {activeTab === 'creative' && (
                <>
                  <div className="flex items-baseline justify-between mb-12 border-b border-gray-300 pb-4">
                    <h2 className="text-sm font-bold uppercase tracking-widest text-gray-500">Selected Works</h2>
                    <span className="text-xs font-mono text-gray-400">01 — {projects.length.toString().padStart(2, '0')}</span>
                  </div>
                  
                  {loading ? (
                    <div className="animate-pulse grid grid-cols-1 md:grid-cols-2 gap-12">
                      <div className="h-96 bg-gray-200"></div>
                      <div className="h-96 bg-gray-200 mt-24"></div>
                    </div>
                  ) : (
                    <ProjectGrid 
                      projects={projects} 
                      onProjectClick={setSelectedProject} 
                    />
                  )}
                </>
              )}

              {activeTab === 'engineer' && (
                <ResumeView data={ENGINEER_RESUME} />
              )}

              {activeTab === 'service inds.' && (
                <ResumeView data={SERVICE_RESUME} />
              )}
            </div>
          </>
        ) : (
          user ? (
            <AdminPanel user={user} onSignOut={handleSignOut} />
          ) : (
            <Login onLoginSuccess={setUser} />
          )
        )}
      </main>

      <footer className="px-6 md:px-12 lg:px-24 py-12 border-t border-gray-200 mt-24">
        <div className="flex justify-between items-end">
          <div>
            <h3 className="text-lg font-bold">CONTACT</h3>
            <p className="text-xs text-gray-500 mb-4">
                 St. John's, NL<br/>
                 +1-709-689-7790
            </p>
            <a href="mailto:wnaubynn@mun.ca" className="group inline-flex items-center gap-1 text-sm font-bold underline hover:text-swiss-red transition-colors">
                wnaubynn@mun.ca <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>
          <p className="hidden md:block text-xs text-gray-400 font-mono">
            © {new Date().getFullYear()} WESLEY AUBYNN<br/>
            ST. JOHN'S / NEWFOUNDLAND
          </p>
        </div>
      </footer>

      {selectedProject && (
        <ProjectModal 
          project={selectedProject} 
          onClose={() => setSelectedProject(null)} 
        />
      )}
    </div>
  );
};

export default App;
