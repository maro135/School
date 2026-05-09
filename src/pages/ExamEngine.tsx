import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronRight, 
  ChevronLeft, 
  Clock, 
  Flag, 
  Settings, 
  AlertCircle,
  CheckCircle2,
  HelpCircle,
  BookOpen
} from 'lucide-react';
import Countdown from 'react-countdown';
import { toast } from 'sonner';
import { addDoc, collection, serverTimestamp, doc, updateDoc, increment } from 'firebase/firestore';
import { db } from '../services/firebase';
import { useAuthStore } from '../store/useAuthStore';
import { Question, Exam } from '../types';

const mockQuestions: Question[] = [
  {
    id: 'q1',
    text: 'ما هي وحدة قياس المقاومة الكهربائية؟',
    type: 'MCQ',
    options: ['فولت', 'أمبير', 'أوم', 'وات'],
    correctAnswer: 'أوم',
    explanation: 'الأوم هو وحدة قياس المقاومة الكهربائية ويرمز له بالرمز Ω.'
  },
  {
    id: 'q2',
    text: 'تتناسب شدة التيار طردياً مع فرق الجهد عند ثبوت درجة الحرارة.',
    type: 'TF',
    options: ['صح', 'خطأ'],
    correctAnswer: 'صح',
    explanation: 'هذا هو نص قانون أوم الأساسي.'
  },
  {
    id: 'q3',
    text: 'أي من العناصر التالية يعتبر فلزاً قلوياً؟',
    type: 'MCQ',
    options: ['الحديد', 'الصوديوم', 'الكلور', 'النيون'],
    correctAnswer: 'الصوديوم',
    explanation: 'الصوديوم (Na) يقع في المجموعة الأولى من الجدول الدوري وهو فلز قلوي نشط.'
  }
];

export default function ExamEngine() {
  const { examId } = useParams();
  const navigate = useNavigate();
  const { user, profile } = useAuthStore();
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [flagged, setFlagged] = useState<Set<string>>(new Set());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [examState, setExamState] = useState<'intro' | 'active' | 'finished'>('intro');
  const [timeLeft, setTimeLeft] = useState(30 * 60 * 1000); // 30 mins

  const currentQuestion = mockQuestions[currentIdx];

  const handleSelect = (option: string) => {
    setAnswers({ ...answers, [currentQuestion.id]: option });
  };

  const toggleFlag = () => {
    const newFlagged = new Set(flagged);
    if (newFlagged.has(currentQuestion.id)) {
      newFlagged.delete(currentQuestion.id);
    } else {
      newFlagged.add(currentQuestion.id);
    }
    setFlagged(newFlagged);
  };

  const handleSubmit = async () => {
    if (Object.keys(answers).length < mockQuestions.length) {
      if (!confirm('لم تقم بالإجابة على جميع الأسئلة. هل أنت متأكد من التسليم؟')) return;
    }

    setIsSubmitting(true);
    try {
      let correctCount = 0;
      mockQuestions.forEach(q => {
        if (answers[q.id] === q.correctAnswer) correctCount++;
      });

      const percentage = (correctCount / mockQuestions.length) * 100;
      
      const submission = {
        userId: user?.uid,
        examId,
        score: correctCount,
        percentage,
        timeTaken: (30 * 60) - 0, // Placeholder calculation
        correctCount,
        wrongCount: mockQuestions.length - correctCount - (mockQuestions.length - Object.keys(answers).length),
        unansweredCount: mockQuestions.length - Object.keys(answers).length,
        answers,
        createdAt: serverTimestamp(),
      };

      const docRef = await addDoc(collection(db, 'submissions'), submission);
      
      // Update user stats (simplified)
      if (user) {
         await updateDoc(doc(db, 'users', user.uid), {
           xp: increment(percentage >= 50 ? 200 : 50),
           coins: increment(percentage >= 90 ? 50 : 10),
           totalExams: increment(1),
           updatedAt: serverTimestamp()
         });
      }

      toast.success('تم تسليم الاختبار بنجاح!');
      navigate(`/result/${docRef.id}`);
    } catch (error: any) {
      toast.error('حدث خطأ أثناء التسليم: ' + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (examState === 'intro') {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-xl w-full bg-white rounded-[40px] shadow-2xl p-10 text-center"
        >
          <div className="w-20 h-20 bg-blue-100 rounded-[28px] flex items-center justify-center text-blue-600 mx-auto mb-8">
            <BookOpen size={40} />
          </div>
          <h2 className="text-3xl font-black text-slate-800 mb-4">هل أنت مستعد للاختبار؟</h2>
          <p className="text-slate-500 mb-10 leading-relaxed">بمجرد بدئك للاختبار، سيبدأ المؤقت في التنازل. تأكد من استقرار الإنترنت لديك.</p>
          
          <div className="grid grid-cols-2 gap-4 mb-10 text-right">
             <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
               <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">المدة الزمني</span>
               <span className="text-lg font-black text-slate-800">30 دقيقة</span>
             </div>
             <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">عدد الأسئلة</span>
                <span className="text-lg font-black text-slate-800">3 أسئلة</span>
             </div>
          </div>

          <button 
            onClick={() => setExamState('active')}
            className="w-full bg-blue-600 text-white h-16 rounded-2xl font-bold text-xl hover:bg-blue-700 shadow-xl shadow-blue-100 transition-all active:scale-95"
          >
            ابدأ الآن
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Test Header */}
      <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-200 px-6 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-4">
           <button onClick={() => navigate('/exams')} className="p-2 hover:bg-slate-100 rounded-xl transition-all">
             <ChevronRight size={24} />
           </button>
           <div>
             <h1 className="font-black text-slate-800 hidden md:block">اختبار فيزياء شامل</h1>
             <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">الثانوية العامة - النظام الجديد</p>
           </div>
        </div>

        <div className="flex items-center gap-3 bg-red-50 text-red-600 px-4 py-2 rounded-2xl border border-red-100 shadow-sm">
           <Clock size={18} />
           <Countdown 
            date={Date.now() + timeLeft} 
            onComplete={handleSubmit}
            renderer={({ minutes, seconds }) => (
              <span className="font-bold tabular-nums">{minutes}:{seconds < 10 ? `0${seconds}` : seconds}</span>
            )}
           />
        </div>

        <button 
          onClick={handleSubmit} 
          disabled={isSubmitting}
          className="bg-slate-900 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-slate-800 transition-all active:scale-95 disabled:opacity-50"
        >
          {isSubmitting ? 'جاري التسليم...' : 'إنهاء وتصحيح'}
        </button>
      </header>

      {/* Test Body */}
      <main className="flex-1 max-w-5xl w-full mx-auto p-4 md:p-10 flex flex-col">
        {/* Progress Bar */}
        <div className="w-full bg-slate-200 h-2 rounded-full mb-10 overflow-hidden">
           <motion.div 
            className="h-full bg-blue-600"
            animate={{ width: `${((currentIdx + 1) / mockQuestions.length) * 100}%` }}
           />
        </div>

        {/* Question Area */}
        <div className="flex-1 flex flex-col">
          <AnimatePresence mode="wait">
            <motion.div 
              key={currentQuestion.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex-1 space-y-8"
            >
              <div className="flex items-center justify-between">
                <span className="bg-blue-600 text-white px-4 py-1.5 rounded-full text-xs font-black">سؤال رقم {currentIdx + 1}</span>
                <button 
                  onClick={toggleFlag}
                  className={`p-2 rounded-xl transition-all ${flagged.has(currentQuestion.id) ? 'bg-orange-100 text-orange-600' : 'text-slate-400 hover:bg-slate-100'}`}
                >
                  <Flag size={20} className={flagged.has(currentQuestion.id) ? 'fill-current' : ''} />
                </button>
              </div>

              <h2 className="text-2xl md:text-4xl font-black text-slate-800 leading-tight">
                {currentQuestion.text}
              </h2>

              <div className="grid grid-cols-1 gap-4">
                {currentQuestion.options.map((option, i) => (
                  <button
                    key={i}
                    onClick={() => handleSelect(option)}
                    className={`p-6 rounded-[28px] border-2 text-right transition-all flex items-center justify-between group ${
                      answers[currentQuestion.id] === option 
                        ? 'border-blue-500 bg-blue-50 text-blue-700 font-black shadow-lg shadow-blue-100' 
                        : 'border-white bg-white hover:border-slate-200 text-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm ${
                        answers[currentQuestion.id] === option ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-400 group-hover:bg-blue-100'
                      }`}>
                         {String.fromCharCode(65 + i)}
                      </div>
                      <span className="text-lg">{option}</span>
                    </div>
                    {answers[currentQuestion.id] === option && (
                      <CheckCircle2 size={24} className="text-blue-600" />
                    )}
                  </button>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Controls */}
        <div className="mt-12 flex items-center justify-between">
           <button 
            disabled={currentIdx === 0}
            onClick={() => setCurrentIdx(currentIdx - 1)}
            className="flex items-center gap-2 px-8 py-4 text-slate-600 font-bold hover:text-blue-600 disabled:opacity-30 disabled:pointer-events-none transition-all"
           >
              <ChevronRight size={24} />
              السابق
           </button>

           <div className="flex items-center gap-2">
             {mockQuestions.map((_, i) => (
               <button 
                key={i}
                onClick={() => setCurrentIdx(i)}
                className={`w-3 h-3 rounded-full transition-all ${
                  currentIdx === i ? 'w-10 bg-blue-600' : answers[mockQuestions[i].id] ? 'bg-blue-200' : 'bg-slate-200'
                }`}
               />
             ))}
           </div>

           <button 
            disabled={currentIdx === mockQuestions.length - 1}
            onClick={() => setCurrentIdx(currentIdx + 1)}
            className="flex items-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 shadow-xl shadow-blue-100 disabled:opacity-30 disabled:pointer-events-none transition-all"
           >
              التالي
              <ChevronLeft size={24} />
           </button>
        </div>
      </main>

      {/* Question Overlay for flagging/nav */}
      <div className="hidden lg:flex flex-col gap-3 fixed left-8 top-32 w-20 overflow-y-auto max-h-[70vh] no-scrollbar">
         {mockQuestions.map((q, i) => (
           <button
            key={q.id}
            onClick={() => setCurrentIdx(i)}
            className={`w-14 h-14 rounded-2xl flex items-center justify-center font-bold text-lg transition-all relative ${
              currentIdx === i ? 'bg-blue-600 text-white shadow-lg' : answers[q.id] ? 'bg-blue-100 text-blue-600 border-2 border-blue-200' : 'bg-white border-2 border-slate-100 text-slate-400'
            }`}
           >
             {i + 1}
             {flagged.has(q.id) && <div className="absolute -top-1 -right-1 w-4 h-4 bg-orange-500 rounded-full border-2 border-white shadow-sm"></div>}
           </button>
         ))}
      </div>
    </div>
  );
}
