import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../services/firebase';
import { Subject, Exam } from '../types';
import { BookOpen, Search, Filter, ChevronRight, Clock, Star, Zap } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const subjects: Subject[] = [
  { id: 'math', name: 'الرياضيات', icon: '📐', color: 'blue' },
  { id: 'physics', name: 'الفيزياء', icon: '⚡', color: 'purple' },
  { id: 'chemistry', name: 'الكيمياء', icon: '🧪', color: 'green' },
  { id: 'biology', name: 'الأحياء', icon: '🧬', color: 'red' },
  { id: 'arabic', name: 'اللغة العربية', icon: '📚', color: 'orange' },
  { id: 'english', name: 'اللغة الإنجليزية', icon: '🇬🇧', color: 'indigo' },
];

const mockExams: Exam[] = [
  { id: '1', title: 'اختبار شامل الفيزياء - الفصل الأول', description: 'تغطية شاملة لقوانين الكهرباء والمقاومات', subjectId: 'physics', duration: 30, type: 'Mock', difficulty: 'Medium', questionsCount: 20, xpReward: 200, coinReward: 50, subjectName: 'الفيزياء' },
  { id: '2', title: 'النهايات والاشتقاق', description: 'اختبار سريع على أساسيات التفاضل', subjectId: 'math', duration: 15, type: 'Subjective', difficulty: 'Easy', questionsCount: 10, xpReward: 100, coinReward: 20, subjectName: 'الرياضيات' },
  { id: '3', title: 'مسابقة الكيمياء الكبرى', description: 'أسئلة متقدمة في الكيمياء العضوية', subjectId: 'chemistry', duration: 45, type: 'Competitive', difficulty: 'Hard', questionsCount: 30, xpReward: 500, coinReward: 150, subjectName: 'الكيمياء' },
];

export default function Exams() {
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredExams = mockExams.filter(exam => {
    const matchesSubject = selectedSubject ? exam.subjectId === selectedSubject : true;
    const matchesSearch = exam.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSubject && matchesSearch;
  });

  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      {/* Header & Search */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-3xl font-black text-slate-800 dark:text-white mb-2">ركن الاختبارات</h2>
          <p className="text-slate-500 dark:text-slate-400 font-medium">اختر مادة وابدأ في تحدي نفسك للوصول للقمة.</p>
        </div>

        <div className="relative w-full max-w-sm">
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <input 
            type="text" 
            placeholder="ابحث عن اختبار..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-14 bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 rounded-2xl pr-12 pl-4 focus:ring-4 focus:ring-blue-100 transition-all outline-none"
          />
        </div>
      </div>

      {/* Subjects Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {subjects.map((subject) => (
          <button
            key={subject.id}
            onClick={() => setSelectedSubject(selectedSubject === subject.id ? null : subject.id)}
            className={`p-6 rounded-[32px] border-2 transition-all flex flex-col items-center gap-3 group ${
              selectedSubject === subject.id 
                ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20 shadow-xl shadow-blue-100' 
                : 'border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-blue-200'
            }`}
          >
            <span className="text-4xl group-hover:scale-110 transition-transform">{subject.icon}</span>
            <span className={`text-sm font-bold ${selectedSubject === subject.id ? 'text-blue-700 dark:text-blue-400' : 'text-slate-700 dark:text-slate-200'}`}>
              {subject.name}
            </span>
          </button>
        ))}
      </div>

      {/* Exam List */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
            <h3 className="text-2xl font-black text-slate-800 dark:text-white">الاختبارات المتاحة</h3>
            <div className="flex items-center gap-2 text-slate-400 text-sm font-bold bg-slate-50 px-4 py-2 rounded-xl border border-slate-100">
               <Filter size={16} />
               <span>تصفية</span>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredExams.map((exam) => (
            <motion.div
              layout
              key={exam.id}
              whileHover={{ y: -8 }}
              className="glass p-6 rounded-[40px] shadow-sm border-slate-100 dark:border-slate-800 flex flex-col h-full group"
            >
              <div className="flex items-center justify-between mb-6">
                 <div className="bg-slate-100 dark:bg-slate-800 px-4 py-1.5 rounded-full text-[10px] font-black uppercase text-slate-500 tracking-wider">
                    {exam.subjectName}
                 </div>
                 <div className="flex items-center gap-1.5 text-yellow-500">
                    <Star size={14} className="fill-current" />
                    <span className="text-xs font-black">{exam.difficulty}</span>
                 </div>
              </div>

              <h4 className="text-xl font-black text-slate-800 dark:text-white mb-3 group-hover:text-blue-600 transition-colors">
                {exam.title}
              </h4>
              <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-8 flex-1">
                {exam.description}
              </p>

              <div className="flex items-center justify-between py-6 border-y border-slate-100 dark:border-slate-800 mb-6">
                 <div className="flex flex-col items-center gap-1">
                    <Clock size={16} className="text-slate-400" />
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-200">{exam.duration} دقيقة</span>
                 </div>
                 <div className="flex flex-col items-center gap-1">
                    <BookOpen size={16} className="text-slate-400" />
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-200">{exam.questionsCount} سؤال</span>
                 </div>
                 <div className="flex flex-col items-center gap-1">
                    <Zap size={16} className="text-slate-400" />
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-200">{exam.xpReward} XP</span>
                 </div>
              </div>

              <NavLink 
                to={`/exam/${exam.id}`} 
                className="w-full bg-blue-600 text-white py-4 rounded-3xl font-bold flex items-center justify-center gap-2 hover:bg-blue-700 shadow-xl shadow-blue-100 transition-all active:scale-95"
              >
                ابدأ الاختبار الآن
                <ChevronRight size={18} className="rotate-180" />
              </NavLink>
            </motion.div>
          ))}
        </div>

        {filteredExams.length === 0 && (
           <div className="py-20 text-center bg-white dark:bg-slate-900 rounded-[40px] border-2 border-dashed border-slate-100 dark:border-slate-800">
             <div className="w-20 h-20 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search size={32} className="text-slate-300" />
             </div>
             <h4 className="text-xl font-bold text-slate-800 dark:text-white">لم نجد أي اختبارات مطابقة</h4>
             <p className="text-slate-500 mt-2">جرب البحث بكلمة أخرى أو اختيار مادة مختلفة.</p>
           </div>
        )}
      </div>
    </div>
  );
}
