
import type { Question } from '../types';

interface QuestionGridProps {
    questions: Question[];
    currentQuestionIndex: number;
    userAnswers: Record<number, number>; // index -> selectedOption
    skippedQuestions: number[];
    onQuestionSelect: (index: number) => void;
}

export function QuestionGrid({
    questions,
    currentQuestionIndex,
    userAnswers,
    skippedQuestions,
    onQuestionSelect
}: QuestionGridProps) {
    return (
        <div className="grid grid-cols-5 gap-1 md:gap-2 md:grid-cols-10 w-full max-w-3xl mt-6 md:mt-8">
            {questions.map((question, index) => {
                const isAnswered = userAnswers[index] !== undefined;
                const isSkipped = skippedQuestions.includes(index) && !isAnswered;
                const isCurrent = currentQuestionIndex === index;
                const isCorrect = isAnswered && userAnswers[index] === question.answer;

                let baseClasses = "h-10 rounded-lg font-bold transition-all text-sm flex items-center justify-center border-2";

                if (isCurrent) {
                    baseClasses += " border-blue-500 bg-blue-500/20 text-white shadow-[0_0_10px_rgba(59,130,246,0.5)]";
                } else if (isAnswered) {
                    if (isCorrect) {
                        baseClasses += " border-green-500/50 bg-green-500/20 text-green-400";
                    } else {
                        baseClasses += " border-red-500/50 bg-red-500/20 text-red-500";
                    }
                } else if (isSkipped) {
                    baseClasses += " border-yellow-500/50 bg-yellow-500/20 text-yellow-400";
                } else {
                    baseClasses += " border-white/10 bg-white/5 text-gray-400 hover:bg-white/10 hover:border-white/20";
                }

                return (
                    <button
                        key={index}
                        onClick={() => onQuestionSelect(index)}
                        className={baseClasses}
                    >
                        {index + 1}
                    </button>
                );
            })}
        </div>
    );
}
