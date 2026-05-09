import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { Home, BookOpen, Trophy, MessageSquare, User, Bell, Search, Zap } from 'lucide-react';
import { motion } from 'motion/react';
import { useAuthStore } from '../../store/useAuthStore';

const navItems = [
  { path: '/dashboard', label: 'الرئيسية', icon: Home },
  { path: '/exams', label: 'الاختبارات', icon: BookOpen },
  { path: '/ranking', label: 'المتصدرين', icon: Trophy },
  { path: '/ai', label: 'المساعد الذكي', icon: MessageSquare },
  { path: '/profile', label: 'حسابي', icon: User },
];

export default function MainLayout() {
  const { profile } = useAuthStore();
  const location = useLocation();

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-72 bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 h-screen sticky top-0">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-blue-200">
              T
            </div>
            <h1 className="text-xl font-bold text-slate-800 dark:text-white">Thanaweya Elite</h1>
          </div>

          <nav className="space-y-1">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                    isActive
                      ? 'bg-blue-50 text-blue-600 font-bold dark:bg-blue-900/20 dark:text-blue-400'
                      : 'text-slate-500 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800'
                  }`
                }
              >
                <item.icon size={22} />
                <span>{item.label}</span>
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="mt-auto p-6">
          <div className="p-4 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl text-white shadow-xl relative overflow-hidden group">
            <div className="absolute -right-4 -top-4 w-20 h-20 bg-white/10 rounded-full blur-2xl group-hover:bg-white/20 transition-all"></div>
            <div className="flex items-center gap-2 mb-2">
              <Zap size={18} className="fill-current text-yellow-300" />
              <span className="text-xs uppercase font-bold tracking-wider">مستوى XP</span>
            </div>
            <div className="flex items-end gap-1 mb-2">
              <span className="text-2xl font-bold">{profile?.xp || 0}</span>
              <span className="text-xs opacity-80 mb-1">XP</span>
            </div>
            <div className="w-full bg-black/20 h-1.5 rounded-full overflow-hidden">
              <div 
                className="bg-white h-full transition-all duration-500" 
                style={{ width: `${(profile?.xp || 0) % 100}%` }}
              ></div>
            </div>
            <p className="text-[10px] mt-2 opacity-80">أكمل الاختبارات لرفع مستواك!</p>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-h-screen pb-20 md:pb-0">
        {/* Top Header */}
        <header className="h-20 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-6 flex items-center justify-between sticky top-0 z-40">
          <div className="flex items-center gap-4 flex-1 max-w-xl">
            <div className="relative w-full max-w-md hidden sm:block">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="ابحث عن اختبار أو موضوع..." 
                className="w-full bg-slate-100 dark:bg-slate-800 border-none rounded-xl pr-10 pl-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 transition-all outline-none"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 md:gap-5">
             <div className="flex items-center gap-1.5 bg-yellow-50 dark:bg-yellow-950/30 px-3 py-1.5 rounded-full border border-yellow-100 dark:border-yellow-900/50">
              <span className="text-xs font-bold text-yellow-700 dark:text-yellow-500 tracking-tight">{profile?.coins || 0}</span>
              <img src="https://em-content.zobj.net/source/apple/354/coin_1fa99.png" className="w-4 h-4" alt="coins" />
            </div>
            
            <button className="relative p-2 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-all">
              <Bell size={22} />
              <span className="absolute top-2 left-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>

            <NavLink to="/profile" className="flex items-center gap-3">
              <div className="hidden sm:block text-left">
                <p className="text-sm font-bold text-slate-800 dark:text-white leading-none mb-1 text-right">{profile?.name || 'طالب متميز'}</p>
                <p className="text-[10px] text-slate-500 text-right opacity-80 uppercase tracking-wider">{profile?.username || '@username'}</p>
              </div>
              <div className="w-10 h-10 rounded-xl overflow-hidden ring-2 ring-slate-100 ring-offset-2 bg-slate-200">
                <img 
                  src={profile?.photoURL || 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix'} 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
              </div>
            </NavLink>
          </div>
        </header>

        {/* Page Content */}
        <section className="p-4 md:p-8 flex-1 overflow-y-auto no-scrollbar">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="max-w-7xl mx-auto"
          >
            <Outlet />
          </motion.div>
        </section>
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 h-20 bg-white/95 dark:bg-slate-900/95 backdrop-blur-lg border-t border-slate-200 dark:border-slate-800 px-6 flex items-center justify-between z-50">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 transition-all duration-300 relative ${
                isActive ? 'text-blue-600' : 'text-slate-400'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <div className={`p-2 rounded-xl transition-all duration-300 ${isActive ? 'bg-blue-50 dark:bg-blue-900/20 shadow-sm' : ''}`}>
                  <item.icon size={isActive ? 24 : 22} className={isActive ? 'fill-blue-600/10' : ''} />
                </div>
                <span className={`text-[10px] font-bold ${isActive ? 'opacity-100' : 'opacity-60'}`}>{item.label}</span>
                {isActive && (
                   <motion.div 
                    layoutId="active-pill"
                    className="absolute -top-6 w-8 h-1 bg-blue-600 rounded-full"
                   />
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
