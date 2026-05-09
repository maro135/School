import { motion } from 'motion/react';
import { 
  Zap, 
  Trophy, 
  BookOpen, 
  ChevronRight, 
  Play, 
  Clock, 
  Flame, 
  Target,
  Plus,
  MessageSquare
} from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';
import { NavLink } from 'react-router-dom';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area 
} from 'recharts';

const mockData = [
  { name: 'السبت', score: 40 },
  { name: 'الأحد', score: 30 },
  { name: 'الاثنين', score: 20 },
  { name: 'الثلاثاء', score: 50 },
  { name: 'الأربعاء', score: 70 },
  { name: 'الخميس', score: 85 },
  { name: 'الجمعة', score: 90 },
];

export default function Dashboard() {
  const { profile } = useAuthStore();

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-slate-800 dark:text-white mb-2">
            يا هلا يا {profile?.name.split(' ')[0] || 'بطل'}! 👋
          </h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium">
             لقد أنجزت <span className="text-blue-600 font-bold">75%</span> من هدفك الأسبوعي. استمر في التألق!
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="glass p-3 rounded-2xl flex items-center gap-3 border-orange-100 dark:border-orange-900/30">
            <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/50 rounded-xl flex items-center justify-center text-orange-600 dark:text-orange-400">
              <Flame size={24} className="fill-current" />
            </div>
            <div>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase">سلسلة المذاكرة</p>
              <p className="text-lg font-black text-slate-800 dark:text-white">{profile?.streak || 0} يوم</p>
            </div>
          </div>
          
          <div className="glass p-3 rounded-2xl flex items-center gap-3 border-blue-100 dark:border-blue-900/30">
            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/50 rounded-xl flex items-center justify-center text-blue-600 dark:text-blue-400">
              <Trophy size={24} />
            </div>
            <div>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase">المركز الحالي</p>
              <p className="text-lg font-black text-slate-800 dark:text-white">#{profile?.rank || '---'}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Progress & Daily Task */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Quick Continue */}
          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[32px] p-8 text-white relative overflow-hidden group shadow-2xl shadow-blue-200 dark:shadow-none">
            <div className="absolute -right-20 -top-20 w-80 h-80 bg-white/10 rounded-full blur-3xl group-hover:bg-white/20 transition-all"></div>
            <div className="relative z-10">
               <div className="flex items-center gap-2 mb-6">
                 <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                    <Play size={16} fill="white" />
                 </div>
                 <span className="text-sm font-bold uppercase tracking-widest opacity-80">تابع من حيث توقفت</span>
               </div>
               <h2 className="text-3xl font-black mb-4">اختبار شامل: الفيزياء - الفصل الأول</h2>
               <div className="flex items-center gap-6 mb-8 opacity-90">
                 <div className="flex items-center gap-2">
                   <Clock size={18} />
                   <span className="font-medium text-sm">باقي 15 دقيقة</span>
                 </div>
                 <div className="flex items-center gap-2">
                   <Target size={18} />
                   <span className="font-medium text-sm">20 سؤال متبقي</span>
                 </div>
               </div>
               <NavLink to="/exams" className="inline-flex items-center gap-3 bg-white text-blue-600 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-blue-50 transition-all active:scale-95 shadow-lg">
                 استكمل الاختبار
                 <ChevronRight size={20} className="rotate-180" />
               </NavLink>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Stats Chart */}
            <div className="glass p-8 rounded-[32px] shadow-sm">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-bold text-slate-800 dark:text-white">أداءك الأسبوعي</h3>
                <Zap size={20} className="text-blue-500" />
              </div>
              <div className="h-48 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={mockData}>
                    <defs>
                      <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <Tooltip 
                      contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                    />
                    <Area type="monotone" dataKey="score" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorScore)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Daily Missions */}
            <div className="glass p-8 rounded-[32px] shadow-sm">
               <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-6">مهامك اليومية</h3>
               <div className="space-y-4">
                 {[
                   { label: 'حل 20 سؤال كيمياء', done: true, xp: 50 },
                   { label: 'جلسة مراجعة مع الذكاء الاصطناعي', done: false, xp: 30 },
                   { label: 'تحقيق 90% في اختبار نصفي', done: false, xp: 100 },
                 ].map((task, i) => (
                   <div key={i} className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800 group cursor-pointer hover:border-blue-200 transition-all">
                     <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${task.done ? 'bg-green-500 border-green-500 text-white' : 'border-slate-200 dark:border-slate-700'}`}>
                        {task.done && <Plus size={14} className="rotate-45" />}
                     </div>
                     <div className="flex-1">
                       <p className={`text-sm font-bold ${task.done ? 'text-slate-400 line-through' : 'text-slate-700 dark:text-slate-200'}`}>{task.label}</p>
                       <span className="text-[10px] uppercase font-bold text-blue-500 tracking-wider">+{task.xp} XP</span>
                     </div>
                   </div>
                 ))}
               </div>
            </div>
          </div>
        </div>

        {/* Right Column: AI & Leaderboard Preview */}
        <div className="space-y-8">
           {/* AI Prompt Card */}
           <div className="bg-gradient-to-br from-purple-600 to-indigo-700 rounded-[32px] p-8 text-white shadow-2xl shadow-purple-200 dark:shadow-none relative overflow-hidden group">
              <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full blur-2xl group-hover:scale-125 transition-transform duration-700"></div>
              <MessageSquare size={32} className="mb-6 opacity-80" />
              <h3 className="text-2xl font-black mb-4 leading-tight">اسأل المساعد الذكي <br/>عن أي شيء!</h3>
              <p className="text-sm opacity-80 mb-8 leading-relaxed">لديك سؤال في الفيزياء؟ أو تحتاج شرح مبسط للخمياء؟ المساعد الذكي هنا من أجلك.</p>
              <NavLink to="/ai" className="block w-full bg-white text-purple-600 py-4 rounded-2xl font-bold text-center hover:bg-purple-50 transition-all shadow-xl">
                ابدأ المحادثة
              </NavLink>
           </div>

           {/* Quick Ranking Preview */}
           <div className="glass p-8 rounded-[32px] shadow-sm">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-bold text-slate-800 dark:text-white">أوائل الجمهورية</h3>
                <Trophy size={18} className="text-yellow-500" />
              </div>
              <div className="space-y-6">
                {[
                  { name: 'زياد محمد', xp: 12500, avatar: '1' },
                  { name: 'ليلى أحمد', xp: 11800, avatar: '2' },
                  { name: 'ياسين علي', xp: 11200, avatar: '3' },
                ].map((user, i) => (
                  <div key={i} className="flex items-center gap-4 group">
                    <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 overflow-hidden ring-2 ring-transparent group-hover:ring-blue-500 transition-all duration-300">
                      <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.avatar}`} alt="avatar" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-bold text-slate-800 dark:text-white">{user.name}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{user.xp} XP</p>
                    </div>
                    <div className={`text-xs font-black ${i === 0 ? 'text-yellow-500' : i === 1 ? 'text-slate-400' : 'text-orange-500'}`}>
                      #{i + 1}
                    </div>
                  </div>
                ))}
              </div>
              <NavLink to="/ranking" className="block w-full text-center mt-8 text-blue-600 font-bold text-sm hover:underline transition-all">
                مشاهدة الترتيب الكامل
              </NavLink>
           </div>
        </div>
      </div>
    </div>
  );
}
