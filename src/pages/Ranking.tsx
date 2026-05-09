import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { db } from '../services/firebase';
import { UserProfile } from '../types';
import { Trophy, Medal, Star, Crown, Search, MapPin, Filter } from 'lucide-react';

export default function Ranking() {
  const [topUsers, setTopUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'National' | 'Governorate'>('National');

  useEffect(() => {
    async function fetchRankings() {
      setLoading(true);
      try {
        const q = query(collection(db, 'users'), orderBy('xp', 'desc'), limit(50));
        const snap = await getDocs(q);
        const users = snap.docs.map(d => ({ ...d.data(), uid: d.id } as UserProfile));
        setTopUsers(users);
      } catch (error) {
        console.error("Error fetching rankings:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchRankings();
  }, [activeTab]);

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-3xl font-black text-slate-800 dark:text-white mb-2">لوحة الشرف</h2>
          <p className="text-slate-500 dark:text-slate-400 font-medium">الأوائل على مستوى الجمهورية والمتصدرين دائماً.</p>
        </div>

        <div className="flex bg-white dark:bg-slate-900 p-1.5 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm">
           <button 
            onClick={() => setActiveTab('National')}
            className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${activeTab === 'National' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-500 hover:text-blue-600'}`}
           >الجمهورية</button>
           <button 
            onClick={() => setActiveTab('Governorate')}
            className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${activeTab === 'Governorate' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-500 hover:text-blue-600'}`}
           >المحافظة</button>
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20">
           <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="space-y-12">
          {/* Top 3 Podium */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-end max-w-4xl mx-auto pt-10">
            {/* Second Place */}
            <motion.div 
               initial={{ opacity: 0, y: 50 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.1 }}
               className="order-2 md:order-1 flex flex-col items-center"
            >
               <div className="relative mb-6">
                  <div className="w-24 h-24 rounded-[32px] overflow-hidden ring-4 ring-slate-300 ring-offset-4 bg-slate-200">
                    <img src={topUsers[1]?.photoURL || 'https://api.dicebear.com/7.x/avataaars/svg?seed=2'} alt="rank2" />
                  </div>
                  <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-10 h-10 bg-slate-400 text-white rounded-xl flex items-center justify-center font-black shadow-lg">2</div>
               </div>
               <h4 className="font-black text-slate-800 dark:text-white text-center mb-1">{topUsers[1]?.name || '---'}</h4>
               <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{topUsers[1]?.xp || 0} XP</span>
               <div className="mt-4 w-full h-32 md:h-40 bg-slate-50 dark:bg-slate-900 border-x border-t border-slate-100 dark:border-slate-800 rounded-t-3xl shadow-sm"></div>
            </motion.div>

            {/* First Place */}
            <motion.div 
               initial={{ opacity: 0, y: 50 }}
               animate={{ opacity: 1, y: 0 }}
               className="order-1 md:order-2 flex flex-col items-center z-10"
            >
               <div className="relative mb-8 transform scale-110">
                  <div className="absolute -top-12 left-1/2 -translate-x-1/2 text-yellow-500">
                    <Crown size={48} className="drop-shadow-lg" />
                  </div>
                  <div className="w-32 h-32 rounded-[40px] overflow-hidden ring-4 ring-yellow-400 ring-offset-4 bg-slate-200 shadow-2xl">
                    <img src={topUsers[0]?.photoURL || 'https://api.dicebear.com/7.x/avataaars/svg?seed=1'} alt="rank1" />
                  </div>
                  <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-14 h-14 bg-yellow-400 text-white rounded-2xl flex items-center justify-center font-black text-2xl shadow-xl shadow-yellow-200">1</div>
               </div>
               <h4 className="text-xl font-black text-slate-800 dark:text-white text-center mb-1">{topUsers[0]?.name || 'جاري التحميل...'}</h4>
               <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">{topUsers[0]?.xp || 0} XP</span>
               <div className="mt-4 w-full h-48 md:h-64 bg-slate-100/50 dark:bg-slate-900/50 border-x border-t border-slate-200 dark:border-slate-700 rounded-t-[40px] shadow-xl"></div>
            </motion.div>

            {/* Third Place */}
            <motion.div 
               initial={{ opacity: 0, y: 50 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.2 }}
               className="order-3 flex flex-col items-center"
            >
               <div className="relative mb-6">
                  <div className="w-24 h-24 rounded-[32px] overflow-hidden ring-4 ring-orange-400 ring-offset-4 bg-slate-200">
                    <img src={topUsers[2]?.photoURL || 'https://api.dicebear.com/7.x/avataaars/svg?seed=3'} alt="rank3" />
                  </div>
                  <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-10 h-10 bg-orange-500 text-white rounded-xl flex items-center justify-center font-black shadow-lg">3</div>
               </div>
               <h4 className="font-black text-slate-800 dark:text-white text-center mb-1">{topUsers[2]?.name || '---'}</h4>
               <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{topUsers[2]?.xp || 0} XP</span>
               <div className="mt-4 w-full h-24 md:h-32 bg-slate-50 dark:bg-slate-900 border-x border-t border-slate-100 dark:border-slate-800 rounded-t-3xl shadow-sm"></div>
            </motion.div>
          </div>

          {/* List View for others */}
          <div className="max-w-4xl mx-auto glass rounded-[48px] overflow-hidden shadow-sm border border-slate-100 dark:border-slate-800">
             <div className="p-8 border-b border-slate-100 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 flex items-center justify-between">
                <span className="text-sm font-black text-slate-400 uppercase tracking-widest">جميع الطلاب</span>
                <div className="flex items-center gap-2">
                   <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600">
                      <Filter size={14} />
                   </div>
                   <span className="text-xs font-bold">تصفية النتائج</span>
                </div>
             </div>
             <div>
                {topUsers.slice(3).map((user, i) => (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    key={user.uid}
                    className="p-6 flex items-center gap-6 border-b border-slate-50 dark:border-slate-800/50 hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-all group"
                  >
                     <div className="w-10 text-center font-black text-slate-300 group-hover:text-blue-400 transition-colors">#{i + 4}</div>
                     <div className="w-14 h-14 rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800 ring-2 ring-transparent group-hover:ring-blue-500 transition-all">
                        <img src={user.photoURL} alt={user.name} />
                     </div>
                     <div className="flex-1">
                        <h4 className="font-black text-slate-800 dark:text-white flex items-center gap-2">
                          {user.name}
                          {i < 10 && <Star size={14} className="fill-yellow-400 text-yellow-400" />}
                        </h4>
                        <div className="flex items-center gap-4 mt-1">
                           <span className="text-[10px] uppercase font-bold text-slate-400 flex items-center gap-1">
                              <MapPin size={10} />
                              {user.governorate}
                           </span>
                           <span className="text-[10px] uppercase font-bold text-slate-400 flex items-center gap-1">
                              <Medal size={10} />
                              {user.grade}
                           </span>
                        </div>
                     </div>
                     <div className="text-lg font-black text-slate-800 dark:text-white">{user.xp} <span className="text-[10px] text-slate-400 uppercase font-black">XP</span></div>
                  </motion.div>
                ))}
             </div>
          </div>
        </div>
      )}
    </div>
  );
}
