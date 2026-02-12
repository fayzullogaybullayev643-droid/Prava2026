import React from 'react';
import type { Question } from '../types';

interface QuestionCardProps {
    question: Question;
    selectedOption: number | null;
    onOptionSelect: (index: number) => void;
    isSubmitted: boolean;
    language: 'uz' | 'ru' | 'en';
}

export const QuestionCard: React.FC<QuestionCardProps> = ({ question, selectedOption, onOptionSelect, isSubmitted, language }) => {
    const content = question.content[language];

    return (
        <div className="glass-panel p-4 md:p-8 rounded-2xl max-w-3xl w-full border-t border-white/20 animate-slide-up">
            <h2 className="text-lg md:text-2xl font-bold mb-4 md:mb-6 text-white leading-relaxed">{question.id}. {content.question}</h2>

            {question.image && (
                <div className="mb-4 md:mb-8 bg-black/20 rounded-xl overflow-hidden flex items-center justify-center min-h-[150px] md:min-h-[240px] border border-white/5 relative group">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <img
                        src={question.image}
                        alt="Question"
                        className="w-full h-auto max-h-[200px] md:max-h-[400px] object-contain relative z-10 transition-transform duration-500 group-hover:scale-[1.02]"
                        onError={(e) => {
                            e.currentTarget.style.display = 'none';
                            e.currentTarget.parentElement?.classList.add('hidden'); // Hide container if image fails
                        }}
                    />
                </div>
            )}

            <div className="space-y-3 md:space-y-4">
                {content.options.map((option, index) => {
                    let optionClass = "w-full text-left p-3 md:p-4 rounded-xl border transition-all duration-300 relative overflow-hidden group ";


                    if (isSubmitted) {
                        if (index === question.answer) {
                            optionClass += "bg-green-500/20 border-green-500 text-green-300 shadow-[0_0_15px_rgba(34,197,94,0.3)]";
                        } else if (selectedOption === index) {
                            optionClass += "bg-red-500/20 border-red-500 text-red-300";
                        } else {
                            optionClass += "bg-white/5 border-white/10 text-gray-400 opacity-50";
                        }
                    } else {
                        if (selectedOption === index) {
                            optionClass += "bg-blue-600 text-white border-blue-500 shadow-[0_0_20px_rgba(37,99,235,0.4)] scale-[1.01]";
                        } else {
                            optionClass += "bg-white/5 border-white/10 text-gray-300 hover:bg-white/10 hover:border-white/30 hover:pl-5 hover:text-white";
                        }
                    }

                    return (
                        <button
                            key={index}
                            onClick={() => !isSubmitted && onOptionSelect(index)}
                            className={optionClass}
                            disabled={isSubmitted}
                        >
                            <div className="flex items-center gap-3 relative z-10">
                                <div className={`w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center text-xs md:text-sm font-bold border transition-colors ${isSubmitted && index === question.answer ? 'bg-green-500 text-black border-green-500' :
                                    isSubmitted && selectedOption === index ? 'bg-red-500 text-white border-red-500' :
                                        selectedOption === index ? 'bg-white text-blue-600 border-white' :
                                            'bg-transparent border-gray-500 text-gray-500 group-hover:border-white group-hover:text-white'
                                    }`}>
                                    {String.fromCharCode(65 + index)}
                                </div>
                                <span className="font-medium text-base md:text-lg">{option}</span>
                            </div>
                        </button>
                    );
                })}
            </div>
        </div>
    );
};
