import { useState, useEffect } from 'react';
import { useParams, NavLink, useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../services/firebase';
import { Submission } from '../types';
import { motion } from 'motion/react';
import { 
  Trophy, 
  Target, 
  Clock, 
  ArrowRight, 
  RotateCcw, 
  Share2, 
  CheckCircle2, 
  XCircle,
  BarChart3,
  Zap,
  ArrowRightCircle
} from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

export default function ResultPage() {
  const { submissionId } = useParams();
  const [submission, setSubmission] = useState<Submission | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchResult() {
      if (!submissionId) return;
      const snap = await getDoc(doc(db, 'submissions', submissionId));
      if (snap.exists()) {
        setSubmission(snap.data() as Submission);
      }
      setLoading(false);
    }
    fetchResult();
  }, [submissionId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!submission) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 p-6 text-center">
        <h2 className="text-2xl font-bold text-slate-800 mb-4">لم يتم العثور على النتيجة</h2>
        <NavLink to="/dashboard" className="text-blue-600 font-bold underline">العودة للرئيسية</NavLink>
      </div>
    );
  }

  const chartData = [
    { name: 'Correct', value: submission.correctCount, color: '#10b981' },
    { name: 'Wrong', value: submission.wrongCount, color: '#ef4444' },
    { name: 'Unanswered', value: submission.unansweredCount, color: '#94a3b8' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 md:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Success Header Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[48px] shadow-2xl shadow-blue-100 p-10 overflow-hidden relative"
        >
           <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-transparent pointer-events-none"></div>
           
           <div className="flex flex-col items-center text-center relative z-10">
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', damping: 12 }}
                className="w-24 h-24 bg-blue-600 rounded-[32px] flex items-center justify-center text-white mb-8 shadow-xl shadow-blue-200"
              >
                <Trophy size={48} />
              </motion.div>
              
              <h1 className="text-4xl font-black text-slate-800 mb-2">أحسنت يا بطل!</h1>
              <p className="text-slate-500 font-medium mb-12">لقد أتممت الاختبار بنجاح. إليك تحليل تفصيلي لأدائك.</p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
                 <div className="p-6 bg-slate-50 rounded-[32px] border border-slate-100">
                    <span className="text-4xl font-black text-blue-600 tracking-tight">{Math.round(submission.percentage)}%</span>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block mt-2">النسبة المئوية</span>
                 </div>
                 <div className="p-6 bg-slate-50 rounded-[32px] border border-slate-100">
                    <span className="text-4xl font-black text-green-600 tracking-tight">{submission.correctCount}</span>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block mt-2">إجابات صحيحة</span>
                 </div>
                 <div className="p-6 bg-slate-50 rounded-[32px] border border-slate-100">
                    <span className="text-4xl font-black text-red-500 tracking-tight">{submission.wrongCount}</span>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block mt-2">إجابات خاطئة</span>
                 </div>
                 <div className="p-6 bg-slate-50 rounded-[32px] border border-slate-100">
                    <span className="text-4xl font-black text-slate-800 tracking-tight">{Math.floor(submission.timeTaken / 60)}</span>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block mt-2">دقائق العمل</span>
                 </div>
              </div>
           </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           {/* Detailed Analytics Chart */}
           <div className="bg-white p-10 rounded-[48px] shadow-sm flex flex-col items-center">
              <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                 <BarChart3 className="text-blue-500" size={20} />
                 توزيع الإجابات
              </h3>
              <div className="w-full h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={chartData}
                      innerRadius={80}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex gap-4 mt-4">
                 <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-green-500"></div><span className="text-xs font-bold">صحيح</span></div>
                 <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-red-500"></div><span className="text-xs font-bold">خطأ</span></div>
                 <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-slate-400"></div><span className="text-xs font-bold">بدون إجابة</span></div>
              </div>
           </div>

           {/* Rewards Card */}
           <div className="bg-slate-900 rounded-[48px] p-10 text-white relative overflow-hidden group">
              <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-blue-600/30 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-1000"></div>
              <Zap size={32} className="text-yellow-400 mb-6" />
              <h3 className="text-2xl font-black mb-2 leading-tight">الجوائز المكتسبة</h3>
              <p className="text-slate-400 text-sm mb-8">لقد ارتفع مستواك بفضل هذا المجهود الرائع!</p>
              
              <div className="space-y-4">
                 <div className="flex items-center justify-between p-4 bg-white/10 rounded-3xl border border-white/10">
                    <span className="font-bold">نقاط XP</span>
                    <span className="text-xl font-black text-blue-400">+200</span>
                 </div>
                 <div className="flex items-center justify-between p-4 bg-white/10 rounded-3xl border border-white/10">
                    <span className="font-bold">عملات ذهبية</span>
                    <span className="text-xl font-black text-yellow-400">+50</span>
                 </div>
              </div>

              <div className="mt-8 flex items-center gap-3">
                 <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center">
                    <ArrowRightCircle className="text-white" />
                 </div>
                 <div>
                    <p className="text-xs font-bold text-slate-400 uppercase">المستوى القادم</p>
                    <p className="text-lg font-black uppercase">Level 12</p>
                 </div>
              </div>
           </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
           <button 
             onClick={() => navigate('/dashboard')}
             className="flex-1 h-16 bg-blue-600 text-white rounded-[24px] font-bold text-xl hover:bg-blue-700 shadow-xl shadow-blue-100 transition-all active:scale-95 flex items-center justify-center gap-3"
           >
              العودة للرئيسية
              <ArrowRight size={24} className="rotate-180" />
           </button>
           <button 
             onClick={() => navigate(`/exam/${submission.examId}`)}
             className="flex-1 h-16 bg-white border-2 border-slate-200 text-slate-700 rounded-[24px] font-bold text-xl hover:bg-slate-50 transition-all active:scale-95 flex items-center justify-center gap-3"
           >
              إعادة المحاولة
              <RotateCcw size={20} />
           </button>
           <button className="h-16 w-16 bg-slate-900 text-white rounded-[24px] flex items-center justify-center hover:bg-slate-800 transition-all active:scale-95">
              <Share2 size={24} />
           </button>
        </div>
      </div>
    </div>
  );
}
