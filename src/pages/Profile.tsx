import { useAuthStore } from '../store/useAuthStore';
import { motion } from 'motion/react';
import { 
  Settings, 
  LogOut, 
  Shield, 
  Bell, 
  CreditCard, 
  ChevronLeft, 
  MapPin, 
  School,
  GraduationCap,
  Calendar,
  Flame,
  Zap,
  Target,
  Medal,
  Dna,
  Edit3,
  Trophy
} from 'lucide-react';
import { auth } from '../services/firebase';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export default function Profile() {
  const { profile } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate('/');
    } catch (error: any) {
      toast.error('حدث خطأ أثناء تسجيل الخروج');
    }
  };

  const statCards = [
    { label: 'سلسلة المذاكرة', value: `${profile?.streak || 0} يوم`, icon: Flame, color: 'orange' },
    { label: 'إجمالي الـ XP', value: profile?.xp || 0, icon: Zap, color: 'blue' },
    { label: 'دقة الإجابات', value: `${profile?.accuracy || 0}%`, icon: Target, color: 'green' },
    { label: 'الاختبارات المنتهية', value: profile?.totalExams || 0, icon: Medal, color: 'purple' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-10">
      {/* Profile Header */}
      <div className="relative">
        <div className="h-48 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-[48px] overflow-hidden relative">
           <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
           <button className="absolute top-6 left-6 p-3 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-2xl text-white transition-all">
             <Edit3 size={20} />
           </button>
        </div>
        
        <div className="px-8 -mt-20 relative z-10 flex flex-col md:flex-row items-end gap-6">
           <div className="w-40 h-40 rounded-[48px] overflow-hidden border-8 border-slate-50 dark:border-slate-950 bg-slate-200">
             <img 
               src={profile?.photoURL || 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix'} 
               className="w-full h-full object-cover"
               alt="profile"
             />
           </div>
           
           <div className="flex-1 mb-2">
             <div className="flex items-center gap-3">
               <h1 className="text-3xl font-black text-slate-800 dark:text-white">{profile?.name}</h1>
               <div className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border border-blue-200 dark:border-blue-800">
                 PRO Student
               </div>
             </div>
             <p className="text-slate-500 font-bold mt-1 uppercase tracking-widest text-sm">@{profile?.username}</p>
           </div>

           <div className="flex gap-3 mb-2">
              <button className="p-4 glass rounded-2xl text-slate-600 dark:text-slate-400 hover:text-blue-600 transition-all shadow-sm">
                <Settings size={24} />
              </button>
              <button 
                onClick={handleLogout}
                className="p-4 bg-red-50 dark:bg-red-900/10 text-red-600 rounded-2xl hover:bg-red-100 transition-all shadow-sm border border-red-100 dark:border-red-900/30"
              >
                <LogOut size={24} />
              </button>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Info Side */}
        <div className="space-y-8">
           <div className="glass p-8 rounded-[40px] shadow-sm">
              <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-6">المعلومات الشخصية</h3>
              <div className="space-y-5">
                 <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-400"><GraduationCap size={20} /></div>
                    <div>
                       <p className="text-[10px] uppercase font-bold text-slate-400">الصف والتشعيب</p>
                       <p className="text-sm font-bold text-slate-700 dark:text-slate-200">{profile?.grade} - {profile?.section}</p>
                    </div>
                 </div>
                 <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-400"><School size={20} /></div>
                    <div>
                       <p className="text-[10px] uppercase font-bold text-slate-400">المدرسة</p>
                       <p className="text-sm font-bold text-slate-700 dark:text-slate-200">{profile?.school || 'غير محدد'}</p>
                    </div>
                 </div>
                 <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-400"><MapPin size={20} /></div>
                    <div>
                       <p className="text-[10px] uppercase font-bold text-slate-400">المحافظة</p>
                       <p className="text-sm font-bold text-slate-700 dark:text-slate-200">{profile?.governorate}</p>
                    </div>
                 </div>
                 <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-400"><Calendar size={20} /></div>
                    <div>
                       <p className="text-[10px] uppercase font-bold text-slate-400">تاريخ الانضمام</p>
                       <p className="text-sm font-bold text-slate-700 dark:text-slate-200">يناير 2026</p>
                    </div>
                 </div>
              </div>
           </div>

           <div className="glass p-8 rounded-[40px] shadow-sm">
             <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-6">الإنجازات المكتسبة</h3>
             <div className="grid grid-cols-4 gap-4">
                {['starter', 'fast', 'social', 'verified'].map((b) => (
                  <div key={b} className="aspect-square bg-slate-50 dark:bg-slate-800 rounded-2xl flex items-center justify-center grayscale hover:grayscale-0 transition-all cursor-help border border-slate-100 dark:border-slate-800 group relative">
                    <img src={`https://api.dicebear.com/7.x/icons/svg?seed=${b}`} alt={b} className="w-8 h-8" />
                    <div className="absolute bottom-full mb-2 hidden group-hover:block bg-slate-900 text-white text-[10px] py-1 px-2 rounded-lg whitespace-nowrap">
                      إنجاز المميز
                    </div>
                  </div>
                ))}
                <div className="aspect-square bg-slate-50 dark:bg-slate-800 rounded-2xl flex items-center justify-center border-2 border-dashed border-slate-200 dark:border-slate-700 text-slate-300">
                   +12
                </div>
             </div>
           </div>
        </div>

        {/* Stats and Content Area */}
        <div className="lg:col-span-2 space-y-8">
           <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {statCards.map((stat, i) => (
                <div key={i} className="glass p-6 rounded-[32px] text-center border-slate-100 dark:border-slate-800 group hover:border-blue-200 transition-all shadow-sm">
                   <div className={`w-12 h-12 rounded-2xl bg-${stat.color}-100 dark:bg-${stat.color}-900/30 flex items-center justify-center text-${stat.color}-600 dark:text-${stat.color}-400 mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                      <stat.icon size={24} className={stat.color === 'orange' ? 'fill-current' : ''} />
                   </div>
                   <p className="text-2xl font-black text-slate-800 dark:text-white tracking-tight">{stat.value}</p>
                   <p className="text-[10px] uppercase font-bold text-slate-400 mt-1">{stat.label}</p>
                </div>
              ))}
           </div>

           {/* Settings Toggles */}
           <div className="glass rounded-[48px] overflow-hidden">
              <div className="p-8 border-b border-slate-100 dark:border-slate-800">
                <h3 className="text-xl font-bold text-slate-800 dark:text-white">إعدادات الحساب</h3>
              </div>
              <div className="divide-y divide-slate-100 dark:divide-slate-800">
                 {[
                   { label: 'الملف الشخصي عام', icon: Shield, default: true },
                   { label: 'استقبال إشعارات الاختبارات', icon: Bell, default: true },
                   { label: 'إظهار الترتيب في لوحة الصدارة', icon: Target, default: true },
                   { label: 'تفعيل الوضع الداكن', icon: Zap, default: false },
                 ].map((opt, i) => (
                   <div key={i} className="p-6 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all cursor-pointer">
                      <div className="flex items-center gap-4 text-slate-700 dark:text-slate-200">
                         <opt.icon size={20} className="text-slate-400" />
                         <span className="font-bold">{opt.label}</span>
                      </div>
                      <div className={`w-12 h-6 rounded-full p-1 transition-all ${opt.default ? 'bg-blue-600' : 'bg-slate-200 dark:bg-slate-800'}`}>
                         <div className={`w-4 h-4 bg-white rounded-full transition-all ${opt.default ? 'translate-x-0' : 'translate-x-6'}`}></div>
                      </div>
                   </div>
                 ))}
              </div>
           </div>
           
           <div className="p-8 bg-slate-900 rounded-[48px] text-white flex flex-col md:flex-row items-center gap-8 shadow-2xl relative overflow-hidden">
              <div className="absolute right-0 top-0 w-40 h-40 bg-blue-600/20 blur-3xl"></div>
              <div className="flex-1 text-center md:text-right">
                 <h3 className="text-2xl font-black mb-4">هل أنت جاهز لتحدي جديد؟</h3>
                 <p className="text-slate-400 leading-relaxed mb-6">اختباراتنا تتحدث يومياً لتناسب أحدث معايير وزارة التربية والتعليم المصرية لنظام التابلت.</p>
                 <button onClick={() => navigate('/exams')} className="bg-white text-slate-900 px-8 py-3 rounded-2xl font-bold hover:bg-blue-50 transition-all flex items-center gap-2 mx-auto md:mx-0">
                    <Dna size={20} />
                    اذهب للاختبارات
                 </button>
              </div>
              <div className="w-48 h-48 bg-slate-800 rounded-[40px] border border-slate-700 flex items-center justify-center p-6 grayscale opacity-80">
                 <Trophy size={80} className="text-slate-600" />
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
