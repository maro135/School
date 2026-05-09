import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../services/firebase';
import { handleFirestoreError, OperationType } from '../lib/errorHandling';
import { useAuthStore } from '../store/useAuthStore';
import { toast } from 'sonner';
import { User, GraduationCap, MapPin, School, Book, ChevronRight, Check, Zap } from 'lucide-react';
import { Grade, Section } from '../types';
import { motion, AnimatePresence } from 'motion/react';

export default function Onboarding() {
  const [step, setStep] = useState(1);
  const { user } = useAuthStore();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: user?.displayName || '',
    username: '',
    grade: '3rd Secondary' as Grade,
    section: 'Scientific Science' as Section,
    school: '',
    governorate: 'القاهرة',
  });

  const governorates = ['القاهرة', 'الجيزة', 'الإسكندرية', 'الدقهلية', 'المنوفية', 'الغربية', 'الشرقية', 'القليوبية', 'البحيرة', 'كفر الشيخ', 'دمياط', 'الإسماعيلية', 'السويس', 'بورسعيد', 'الفيوم', 'بني سويف', 'المنيا', 'أسيوط', 'سوهاج', 'قنا', 'الأقصر', 'أسوان', 'مرسى مطروح', 'الوادي الجديد', 'البحر الأحمر', 'شمال سيناء', 'جنوب سيناء'];

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleComplete = async () => {
    if (!user) return;
    
    // Check username uniqueness (simplified for now)
    try {
      const profile = {
        uid: user.uid,
        ...formData,
        xp: 100, // Starting XP
        coins: 50, // Starting Coins
        streak: 1,
        accuracy: 0,
        totalExams: 0,
        badges: ['starter'],
        followersCount: 0,
        followingCount: 0,
        isPublic: true,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        photoURL: user.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.uid}`
      };

      await setDoc(doc(db, 'users', user.uid), profile).catch(e => {
        handleFirestoreError(e, OperationType.CREATE, `users/${user.uid}`);
      });
      toast.success('تم إعداد حسابك بنجاح! مرحباً بك.');
      navigate('/dashboard');
    } catch (error: any) {
      toast.error('حدث خطأ أثناء إعداد الحساب');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-[40px] shadow-2xl p-8 md:p-12 relative overflow-hidden">
        {/* Progress Bar */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-slate-100">
           <motion.div 
            className="h-full bg-blue-600"
            initial={{ width: '0%' }}
            animate={{ width: `${(step / 3) * 100}%` }}
           />
        </div>

        <div className="flex justify-between mb-12">
            {[1,2,3].map(i => (
                <div key={i} className={`flex items-center gap-2 ${step >= i ? 'text-blue-600' : 'text-slate-300'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all ${step >= i ? 'border-blue-600 bg-blue-50' : 'border-slate-200'}`}>
                        {step > i ? <Check size={16} /> : i}
                    </div>
                </div>
            ))}
        </div>

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div 
              key="step1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-6"
            >
              <div>
                <h2 className="text-3xl font-black text-slate-900 mb-2">من أنت؟</h2>
                <p className="text-slate-500">أخبرنا بالقليل عن نفسك لنخصص تجربتك.</p>
              </div>

              <div className="space-y-4">
                <div className="relative">
                  <User className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                  <input 
                    type="text" 
                    placeholder="الاسم الكامل" 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full h-14 bg-slate-50 border-2 border-slate-100 rounded-2xl pr-12 pl-4 focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all outline-none"
                  />
                </div>
                <div className="relative">
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">@</span>
                  <input 
                    type="text" 
                    placeholder="اسم المستخدم" 
                    value={formData.username}
                    onChange={(e) => setFormData({...formData, username: e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, '')})}
                    className="w-full h-14 bg-slate-50 border-2 border-slate-100 rounded-2xl pr-12 pl-4 focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all outline-none"
                  />
                </div>
                <div className="relative">
                    <MapPin className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                    <select 
                      value={formData.governorate}
                      onChange={(e) => setFormData({...formData, governorate: e.target.value})}
                      className="w-full h-14 bg-slate-50 border-2 border-slate-100 rounded-2xl pr-12 pl-4 focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all outline-none appearance-none"
                    >
                      {governorates.map(g => <option key={g} value={g}>{g}</option>)}
                    </select>
                </div>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div 
              key="step2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-6"
            >
              <div>
                <h2 className="text-3xl font-black text-slate-900 mb-2">دراستك</h2>
                <p className="text-slate-500">اختر الصف الدراسي والتشعيب المناسب لك.</p>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  {(['1st Secondary', '2nd Secondary', '3rd Secondary'] as Grade[]).map(grade => (
                    <button 
                      key={grade}
                      onClick={() => setFormData({...formData, grade})}
                      className={`p-4 rounded-2xl border-2 text-right transition-all flex items-center justify-between ${formData.grade === grade ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-slate-100 bg-white'}`}
                    >
                      <span className="font-bold">{grade === '1st Secondary' ? 'الصف الأول الثانوي' : grade === '2nd Secondary' ? 'الصف الثاني الثانوي' : 'الصف الثالث الثانوي'}</span>
                      {formData.grade === grade && <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white"><Check size={14} /></div>}
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {(['Scientific Science', 'Scientific Math', 'Literary'] as Section[]).map(sec => (
                    <button 
                      key={sec}
                      onClick={() => setFormData({...formData, section: sec})}
                      className={`p-3 rounded-xl border-2 text-sm transition-all ${formData.section === sec ? 'border-purple-500 bg-purple-50 text-purple-700 font-bold' : 'border-slate-100'}`}
                    >
                      {sec === 'Scientific Science' ? 'علمي علوم' : sec === 'Scientific Math' ? 'علمي رياضة' : 'أدبي'}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div 
              key="step3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-6"
            >
              <div>
                <h2 className="text-3xl font-black text-slate-900 mb-2">المدرسة</h2>
                <p className="text-slate-500">أين تذاكر في الوقت الحالي؟</p>
              </div>

              <div className="space-y-4">
                <div className="relative">
                  <School className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                  <input 
                    type="text" 
                    placeholder="اسم المدرسة" 
                    value={formData.school}
                    onChange={(e) => setFormData({...formData, school: e.target.value})}
                    className="w-full h-14 bg-slate-50 border-2 border-slate-100 rounded-2xl pr-12 pl-4 focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all outline-none"
                  />
                </div>

                <div className="p-6 bg-slate-900 rounded-3xl text-white">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white">
                      <Zap size={24} className="fill-current" />
                    </div>
                    <div>
                      <h4 className="font-bold">هدية البداية!</h4>
                      <p className="text-xs text-slate-400 tracking-tight">لقد حصلت على 100 XP و 50 عملة مجانًا.</p>
                    </div>
                  </div>
                  <p className="text-sm opacity-80 leading-relaxed italic">
                    "التفوق ليس ضربة حظ، بل هو نتيجة لعمل جاد وتخطيط ذكي. أهلاً بك في نخبة طلاب مصر."
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-12 flex items-center gap-4">
          {step > 1 && (
            <button 
              onClick={handleBack}
              className="px-8 py-4 text-slate-500 font-bold hover:text-slate-800 transition-all"
            >
              الرجوع
            </button>
          )}
          
          <button 
            onClick={step === 3 ? handleComplete : handleNext}
            className="flex-1 h-14 bg-blue-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-blue-700 shadow-xl shadow-blue-200 transition-all active:scale-95"
          >
            {step === 3 ? 'ابدأ الاستخدام الآن' : 'الخطوة التالية'}
            <ChevronRight size={20} className="rotate-180" />
          </button>
        </div>
      </div>
    </div>
  );
}
