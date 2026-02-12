import { useState, useEffect } from 'react';
import axios from 'axios';
import type { Question } from './types';
import { QuestionCard } from './components/QuestionCard';
import { Timer } from './components/Timer';
import { Login } from './components/Login';
import { QuestionGrid } from './components/QuestionGrid';
import { Logo } from './components/Logo';
import { ArrowRight, RefreshCw, CheckCircle2, LogOut } from 'lucide-react';
import { API_BASE_URL } from './config';

type Language = 'uz' | 'ru' | 'en';

const translations = {
  // ... existing translations ...
  uz: {
    title: "Prava2026",
    subtitle: "Avtomaktab imtihoni simulyatori",
    results: "Imtihon Natijasi",
    scoreText: (score: number, total: number) => `Siz ${total} ta savoldan ${score} tasiga to'g'ri javob berdingiz.`,
    restart: "Qayta topshirish",
    question: "Savol",
    score: "Ball",
    check: "Tekshirish",
    next: "Keyingi savol",
    loading: "Savollar yuklanmoqda...",
    congrats: "Tabriklaymiz! Siz imtihondan o'tdingiz!",
    failed: "Afsuski, imtihondan yiqildingiz."
  },
  ru: {
    title: "Prava2026",
    subtitle: "Симулятор экзамена в автошколе",
    results: "Результат экзамена",
    scoreText: (score: number, total: number) => `Вы ответили правильно на ${score} из ${total} вопросов.`,
    restart: "Пересдать",
    question: "Вопрос",
    score: "Балл",
    check: "Проверить",
    next: "Следующий вопрос",
    loading: "Загрузка вопросов...",
    congrats: "Поздравляем! Вы сдали экзамен!",
    failed: "К сожалению, вы не сдали экзамен."
  },
  en: {
    title: "Prava2026",
    subtitle: "Driving School Exam Simulator",
    results: "Exam Result",
    scoreText: (score: number, total: number) => `You answered ${score} out of ${total} questions correctly.`,
    restart: "Retake",
    question: "Question",
    score: "Score",
    check: "Check",
    next: "Next Question",
    loading: "Loading questions...",
    congrats: "Congratulations! You passed!",
    failed: "Unfortunately, you failed."
  }
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(true);
  const [skippedQuestions, setSkippedQuestions] = useState<number[]>([]);
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [error, setError] = useState<string | null>(null);
  const [language, setLanguage] = useState<Language>('uz');

  const t = translations[language];

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    document.title = "Prava 2026";
    if (isAuthenticated) {
      fetchQuestions();
    }
  }, [isAuthenticated]);

  const fetchQuestions = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_BASE_URL}/questions`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setQuestions(response.data);
      resetQuiz();
    } catch (error: any) {
      console.error("Savollarni yuklashda xatolik:", error);
      if (error.response?.status === 401 || error.response?.status === 403) {
        handleLogout(); // Token expired or invalid
        setError("Sessiya vaqti tugadi. Iltimos, qayta kirish.");
      } else {
        setError(`Savollarni yuklashda xatolik: ${error.message}. Iltimos, server ishlayotganini tekshiring.`);
      }
    } finally {
      setLoading(false);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setShowResult(false);
    setIsSubmitted(false);
    setSelectedOption(null);
    setSkippedQuestions([]);
    setUserAnswers({});
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    resetQuiz();
  };

  const handleSubmitQuestion = () => {
    if (selectedOption !== null) {
      setIsSubmitted(true);

      // Save answer
      setUserAnswers(prev => ({
        ...prev,
        [currentQuestionIndex]: selectedOption
      }));

      // If correct
      if (selectedOption === questions[currentQuestionIndex].answer) {
        // Only increment score if not already answered correctly before (though we prevent re-answering usually)
        // But here we rely on linear flow or re-checking. 
        // Let's assume re-submit is NOT allowed for answered questions in this logic if we disable button.
        setScore(prev => prev + 1);
      }

      // If it was skipped, remove from skipped list
      if (skippedQuestions.includes(currentQuestionIndex)) {
        setSkippedQuestions(prev => prev.filter(q => q !== currentQuestionIndex));
      }
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex + 1 < questions.length) {
      changeQuestion(currentQuestionIndex + 1);
    } else {
      checkCompletion();
    }
  }

  const handleSkipQuestion = () => {
    if (!skippedQuestions.includes(currentQuestionIndex)) {
      setSkippedQuestions(prev => [...prev, currentQuestionIndex]);
    }

    if (currentQuestionIndex + 1 < questions.length) {
      changeQuestion(currentQuestionIndex + 1);
    } else {
      checkCompletion();
    }
  };

  const changeQuestion = (index: number) => {
    setCurrentQuestionIndex(index);

    // Check if already answered
    if (userAnswers[index] !== undefined) {
      setSelectedOption(userAnswers[index]);
      setIsSubmitted(true);
    } else {
      setSelectedOption(null);
      setIsSubmitted(false);
    }
  };

  const handleJumpToQuestion = (index: number) => {
    changeQuestion(index);
  };

  const checkCompletion = () => {
    // If all questions answered? Or just reached end?
    // Current logic: reached end.
    // Enhanced logic: if skipped questions exist, maybe warn? 
    // But for now, just show result.
    setShowResult(true);
  }

  if (!isAuthenticated) {
    return <Login onLogin={() => setIsAuthenticated(true)} />;
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen p-4 text-center">
        <div className="text-red-500 font-bold text-xl mb-4">⚠️ Xatolik yuz berdi</div>
        <p className="text-gray-700 mb-6">{error}</p>
        <button
          onClick={() => { setError(null); fetchQuestions(); }}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Qayta urinish
        </button>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-slate-900 text-white font-bold text-xl">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mr-3"></div>
        {t.loading}
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center py-8 relative overflow-hidden">
      {/* Background decorations */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-600/20 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/20 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Navbar / Header */}
      <div className="w-full max-w-5xl px-6 mb-8 z-10 animate-slide-up">
        <div className="glass-panel rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-4 border-white/10">
          <div className="flex items-center gap-4">
            <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-1 rounded-xl shadow-lg shadow-blue-500/30">
              <Logo className="w-10 h-10" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white leading-tight tracking-tight">{t.title}</h1>
              <p className="text-sm text-blue-200 font-medium">{t.subtitle}</p>
            </div>
          </div>

          <div className='flex items-center gap-4'>
            {!showResult && (
              <Timer
                isActive={!showResult}
                onTimeUp={() => setShowResult(true)}
                initialMinutes={20}
              />
            )}

            <div className="flex bg-white/5 p-1 rounded-xl border border-white/10 backdrop-blur-sm">
              {(['uz', 'ru', 'en'] as const).map((lang) => (
                <button
                  key={lang}
                  onClick={() => setLanguage(lang)}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-bold uppercase transition-all duration-300 ${language === lang ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/40' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                >
                  <span>{lang === 'uz' ? '🇺🇿' : lang === 'ru' ? '🇷🇺' : '🇺🇸'}</span> {lang.toUpperCase()}
                </button>
              ))}
            </div>

            <button
              onClick={handleLogout}
              className="bg-red-500/10 hover:bg-red-500/20 text-red-500 p-3 rounded-xl border border-red-500/20 transition-all"
              title="Chiqish"
            >
              <LogOut size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="w-full max-w-5xl px-6 flex-1 flex flex-col items-center z-10 text-white">
        {showResult ? (
          <div className="glass-panel p-10 rounded-3xl text-center max-w-md w-full animate-fade-in border-white/20">
            <div className="mb-8 flex justify-center">
              {score >= 18 ? (
                <div className="relative">
                  <div className="absolute inset-0 bg-green-500 blur-2xl opacity-20 rounded-full"></div>
                  <CheckCircle2 className="w-24 h-24 text-green-400 relative z-10" />
                </div>
              ) : (
                <div className="w-24 h-24 rounded-full bg-red-500/10 flex items-center justify-center text-red-500 text-4xl font-bold border border-red-500/20">!</div>
              )}
            </div>
            <h2 className="text-3xl font-bold mb-3 text-white">{score >= 18 ? t.congrats : t.failed}</h2>
            <p className="text-blue-200 mb-8 text-lg">{t.results}</p>

            <div className="bg-white/5 rounded-2xl p-8 mb-8 border border-white/10">
              <div className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-2">
                {Math.round((score / questions.length) * 100)}%
              </div>
              <p className="text-base text-gray-300 font-medium">
                {t.scoreText(score, questions.length)}
              </p>
            </div>

            <button
              onClick={resetQuiz}
              className="group flex items-center justify-center gap-2 w-full bg-white text-slate-900 py-4 rounded-xl font-bold transition-all hover:bg-blue-50 hover:shadow-xl hover:shadow-white/10"
            >
              <RefreshCw size={20} className="group-hover:rotate-180 transition-transform duration-500" /> {t.restart}
            </button>
          </div>
        ) : (
          <div className="w-full flex flex-col items-center animate-slide-up">

            <QuestionCard
              question={questions[currentQuestionIndex]}
              selectedOption={selectedOption}
              onOptionSelect={!isSubmitted ? setSelectedOption : () => { }}
              isSubmitted={isSubmitted}
              language={language}
            />

            <div className="w-full max-w-2xl mt-8 flex justify-between gap-4">
              {!isSubmitted ? (
                <>
                  <button
                    onClick={handleSkipQuestion}
                    className="flex-1 glass-button text-gray-300 hover:text-white font-bold py-4 rounded-xl transition-all"
                  >
                    O'tkazib yuborish
                  </button>
                  <button
                    onClick={handleSubmitQuestion}
                    disabled={selectedOption === null}
                    className={`flex-1 flex items-center justify-center gap-2 font-bold py-4 rounded-xl text-lg shadow-lg transition-all transform hover:-translate-y-1 ${selectedOption === null
                      ? 'bg-white/5 cursor-not-allowed text-gray-500 border border-white/5'
                      : 'bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white shadow-blue-500/20 border border-t-white/20'
                      }`}
                  >
                    {t.check}
                  </button>
                </>
              ) : (
                <button
                  onClick={handleNextQuestion}
                  className="w-full flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-lg bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-white shadow-lg shadow-green-500/20 transition-all transform hover:-translate-y-1 border border-t-white/20"
                >
                  {t.next} <ArrowRight size={22} />
                </button>
              )}
            </div>

            {/* Question Navigation Grid */}
            <QuestionGrid
              questions={questions}
              currentQuestionIndex={currentQuestionIndex}
              userAnswers={userAnswers}
              skippedQuestions={skippedQuestions}
              onQuestionSelect={handleJumpToQuestion}
            />

          </div>
        )}
      </div>
    </div>
  );
}

export default App;
