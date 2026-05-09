import React, { useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { 
  signInWithPopup, 
  GoogleAuthProvider, 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword 
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '../services/firebase';
import { toast } from 'sonner';
import { motion } from 'motion/react';
import { Mail, Lock, LogIn, ChevronLeft } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      
      // Check if profile exists
      const profileDoc = await getDoc(doc(db, 'users', user.uid));
      if (profileDoc.exists()) {
        navigate('/dashboard');
      } else {
        navigate('/onboarding');
      }
    } catch (error: any) {
      toast.error('حدث خطأ في تسجيل الدخول: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isRegister) {
        const result = await createUserWithEmailAndPassword(auth, email, password);
        const user = result.user;
        navigate('/onboarding');
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        navigate('/dashboard');
      }
    } catch (error: any) {
      toast.error('خطأ: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-3xl -mr-64 -mt-64"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-600/5 rounded-full blur-3xl -ml-64 -mb-64"></div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md bg-white rounded-3xl shadow-2xl shadow-blue-100 p-8 md:p-10 relative z-10"
      >
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-white mb-4 shadow-lg shadow-blue-200">
            <LogIn size={32} />
          </div>
          <h2 className="text-3xl font-bold text-slate-800 text-center">
            {isRegister ? 'إنشاء حساب جديد' : 'مرحباً بعودتك!'}
          </h2>
          <p className="text-slate-500 mt-2 text-center text-sm">
            {isRegister ? 'ابدأ رحلة التفوق مع نخبة طلاب الثانوية العامة' : 'سجل دخولك لمتابعة تقدمك الدراسي'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <Mail className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input 
              type="email" 
              placeholder="البريد الإلكتروني" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-14 bg-slate-50 border-2 border-slate-100 rounded-2xl pr-12 pl-4 focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all outline-none text-slate-800"
            />
          </div>

          <div className="relative">
            <Lock className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input 
              type="password" 
              placeholder="كلمة المرور" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-14 bg-slate-50 border-2 border-slate-100 rounded-2xl pr-12 pl-4 focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all outline-none text-slate-800"
            />
          </div>

          {!isRegister && (
            <div className="flex justify-start">
              <button type="button" className="text-sm text-blue-600 font-bold hover:underline">نسيت كلمة المرور؟</button>
            </div>
          )}

          <button 
            type="submit" 
            disabled={loading}
            className="w-full h-14 bg-blue-600 text-white rounded-2xl font-bold text-lg hover:bg-blue-700 active:scale-95 transition-all shadow-xl shadow-blue-100 disabled:opacity-50"
          >
            {loading ? 'جاري التحميل...' : (isRegister ? 'إنشاء حساب' : 'تسجل الدخول')}
          </button>
        </form>

        <div className="my-8 flex items-center gap-4">
          <div className="flex-1 h-[1px] bg-slate-100"></div>
          <span className="text-xs text-slate-400 uppercase font-bold tracking-widest">أو عبر</span>
          <div className="flex-1 h-[1px] bg-slate-100"></div>
        </div>

        <button 
          onClick={handleGoogleSignIn}
          className="w-full h-14 bg-white border-2 border-slate-100 text-slate-700 rounded-2xl font-bold hover:bg-slate-50 active:scale-95 transition-all flex items-center justify-center gap-3"
        >
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-5 h-5" alt="google" />
          متابعة باستخدام جوجل
        </button>

        <p className="mt-8 text-center text-slate-500 text-sm">
          {isRegister ? 'لديك حساب بالفعل؟' : 'ليس لديك حساب؟'}
          <button 
            onClick={() => setIsRegister(!isRegister)}
            className="text-blue-600 font-bold mr-2 hover:underline"
          >
            {isRegister ? 'سجل دخولك' : 'أنشئ حساباً الآن'}
          </button>
        </p>
      </motion.div>

      <NavLink 
        to="/" 
        className="absolute top-8 right-8 flex items-center gap-2 text-slate-500 font-bold hover:text-blue-600 transition-all bg-white py-2 px-4 rounded-xl shadow-sm border border-slate-100"
      >
        <ChevronLeft size={20} className="rotate-180" />
        العودة للرئيسية
      </NavLink>
    </div>
  );
}
