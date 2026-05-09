import { motion } from 'motion/react';
import { NavLink } from 'react-router-dom';
import { BookOpen, Trophy, Zap, ChevronLeft, ArrowRight, Star, ShieldCheck, Gamepad2 } from 'lucide-react';

export default function Landing() {
  return (
    <div className="min-h-screen bg-slate-50 overflow-hidden rtl" dir="rtl">
      {/* Navigation */}
      <nav className="h-20 px-8 flex items-center justify-between bg-white/50 backdrop-blur-md sticky top-0 z-50 border-b border-slate-200/50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-blue-200">
            T
          </div>
          <h1 className="text-xl font-bold text-slate-800">Thanaweya Elite</h1>
        </div>
        
        <div className="hidden md:flex items-center gap-8 text-slate-600 font-medium">
          <a href="#features" className="hover:text-blue-600 transition-colors">المميزات</a>
          <a href="#about" className="hover:text-blue-600 transition-colors">عن المنصة</a>
          <a href="#pricing" className="hover:text-blue-600 transition-colors">الأسعار</a>
        </div>

        <div className="flex items-center gap-4">
          <NavLink to="/login" className="text-slate-600 font-bold hover:text-blue-600 transition-all">تسجيل الدخول</NavLink>
          <NavLink to="/login" className="bg-blue-600 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-blue-700 shadow-xl shadow-blue-200 transition-all active:scale-95">ابدأ الآن مجاناً</NavLink>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 px-8 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16 relative z-10">
          <div className="flex-1 text-center md:text-right">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-full font-bold text-xs uppercase tracking-widest mb-6"
            >
               <Star size={14} className="fill-current" />
               منصة الثانوية العامة رقم #1 في مصر
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-7xl font-black text-slate-900 leading-[1.1] mb-6"
            >
              طريقك نحو <span className="text-transparent bg-clip-text bg-gradient-to-l from-blue-600 to-indigo-600">التفوق</span> يبدأ باختبار واحد.
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-slate-600 mb-10 leading-relaxed max-w-2xl mx-auto md:mx-0"
            >
              أول منصة تعليمية ذكية في مصر مصممة خصيصاً لطلاب الثانوية العامة. اختبارات تفاعلية، مساعد ذكي بالذكاء الاصطناعي، ومنافسات مباشرة مع زملائك.
            </motion.p>
            <motion.div 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.2 }}
               className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start"
            >
              <NavLink to="/login" className="w-full sm:w-auto bg-slate-900 text-white px-10 py-5 rounded-2xl font-bold text-xl hover:bg-slate-800 shadow-2xl transition-all active:scale-95 flex items-center justify-center gap-3">
                ابدأ رحلتك الآن
                <ArrowRight size={24} />
              </NavLink>
              <a href="#features" className="w-full sm:w-auto bg-white border-2 border-slate-100 text-slate-600 px-10 py-5 rounded-2xl font-bold text-xl hover:bg-slate-50 transition-all flex items-center justify-center gap-3">
                اكتشف المميزات
              </a>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-12 flex items-center gap-8 justify-center md:justify-start"
            >
              <div className="flex -space-x-3 rtl:space-x-reverse">
                {[1,2,3,4].map(i => (
                  <div key={i} className="w-12 h-12 rounded-full border-4 border-white overflow-hidden bg-slate-200">
                    <img src={`https://i.pravatar.cc/100?u=${i}`} alt="user" />
                  </div>
                ))}
                <div className="w-12 h-12 rounded-full border-4 border-white bg-blue-600 flex items-center justify-center text-white font-bold text-xs">
                  +10K
                </div>
              </div>
              <p className="text-sm text-slate-500 font-medium">
                انضم لأكثر من <span className="text-slate-900 font-bold">10,000</span> طالب متفوق اليوم
              </p>
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex-1 relative"
          >
            <div className="relative w-full aspect-square bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[60px] shadow-[0_40px_80px_-20px_rgba(37,99,235,0.4)] overflow-hidden">
               <img 
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800" 
                className="w-full h-full object-cover mix-blend-overlay opacity-60" 
                alt="Students studying"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
               
               {/* Floating Badges */}
               <motion.div 
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-10 -right-8 glass p-4 rounded-2xl shadow-xl flex items-center gap-4 border-white/40"
               >
                 <div className="w-12 h-12 bg-yellow-400 rounded-xl flex items-center justify-center text-white">
                   <Trophy size={24} />
                 </div>
                 <div>
                   <p className="text-xs text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">المركز الأول</p>
                   <p className="text-lg font-black text-slate-900 dark:text-white">أحمد محمد</p>
                 </div>
               </motion.div>

               <motion.div 
                animate={{ y: [0, 20, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-20 -left-10 glass p-5 rounded-3xl shadow-xl flex flex-col gap-3 min-w-[200px]"
               >
                 <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-slate-800">نشاطك اليومي</span>
                    <Zap className="text-yellow-500 fill-current" size={16} />
                 </div>
                 <div className="flex gap-2">
                   {[1,2,3,4,5].map(i => (
                     <div key={i} className={`h-12 w-3 rounded-full ${i < 4 ? 'bg-blue-500' : 'bg-slate-200'}`}></div>
                   ))}
                 </div>
                 <p className="text-[10px] text-slate-500 font-bold">باقي 200 XP للوصول للمستوى التالي</p>
               </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Cards */}
      <section id="features" className="py-24 px-8 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-black text-slate-900 mb-4">لماذا يختارنا المتفوقون؟</h2>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto">نقدم لك أدوات متكاملة تجعل المذاكرة أكثر متعة وفعالية، وتضمن لك الوصول إلى القمة.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: BookOpen, title: 'بنك أسئلة ضخم', text: 'أكثر من 50,000 سؤال منسقة حسب النظام الجديد للثانوية العامة.', color: 'blue' },
              { icon: Zap, title: 'تصحيح فوري', text: 'اعرف نتيجتك وأخطاءك وشرحها فور انتهائك من الاختبار.', color: 'green' },
              { icon: Gamepad2, title: 'مذاكرة Gamified', text: 'اجمع النقاط، نافس أصدقاءك، وارفع مستواك في لوحة الصدارة.', color: 'purple' },
              { icon: ShieldCheck, title: 'شامل لكل المواد', text: 'نغطي جميع المواد الأدبية والعلمية بجميع تشعباتها.', color: 'orange' },
              { icon: Trophy, title: 'اختبارات دورية', text: 'اختبارات محاكاة للامتحانات الحقيقية تضعك في أجواء اللجان.', color: 'red' },
              { icon: Star, title: 'مساعد ذكي AI', text: 'مساعد شخصي يشرح لك الدروس الصعبة ويجاوب على أسئلتك.', color: 'indigo' },
            ].map((f, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -10 }}
                className="p-8 bg-slate-50 rounded-[40px] border border-slate-100 hover:shadow-2xl hover:shadow-slate-200 transition-all group"
              >
                <div className={`w-16 h-16 rounded-3xl bg-${f.color}-100 flex items-center justify-center text-${f.color}-600 mb-6 group-hover:scale-110 transition-transform`}>
                  <f.icon size={32} />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">{f.title}</h3>
                <p className="text-slate-600 leading-relaxed">{f.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <footer className="bg-slate-950 text-white py-20 px-8">
        <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight">ابدأ رحلة كليات <br/>القمة من هنا</h2>
            <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto">انضم لآلاف الطلاب الآن واستمتع بتجربة تعلم فريدة من نوعها.</p>
            <NavLink to="/login" className="inline-flex items-center gap-3 bg-white text-slate-950 px-12 py-5 rounded-full font-bold text-2xl hover:bg-slate-100 transition-all active:scale-95 shadow-[0_0_50px_rgba(255,255,255,0.2)]">
               سجل حسابك مجاناً
               <ArrowRight size={28} />
            </NavLink>
            <div className="mt-20 pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="flex items-center gap-3 opacity-50">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">T</div>
                <span className="font-bold">Thanaweya Elite © 2026</span>
              </div>
              <div className="flex items-center gap-8 text-slate-400 text-sm">
                <a href="#" className="hover:text-white transition-colors">سياسة الخصوصية</a>
                <a href="#" className="hover:text-white transition-colors">شروط الاستخدام</a>
                <a href="#" className="hover:text-white transition-colors">اتصل بنا</a>
              </div>
            </div>
        </div>
      </footer>
    </div>
  );
}
