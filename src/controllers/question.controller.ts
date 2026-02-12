import { Request, Response } from "express";
import { questions } from "../data/questions.data";

export const getQuestions = (req: Request, res: Response) => {
    res.json(questions);
};

export const getQuestionById = (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const question = questions.find(q => q.id === id);

    if (question) {
        res.json(question);
    } else {
        res.status(404).json({ message: "Savol topilmadi" });
    }
}

export const submitAnswers = (req: Request, res: Response) => {
    const userAnswers: { [key: number]: number } = req.body.answers; // { questionId: answerIndex }
    let score = 0;
    const results = questions.map((q) => {
        const isCorrect = userAnswers[q.id] === q.answer;
        if (isCorrect) score++;
        return {
            questionId: q.id,
            isCorrect,
            correctAnswer: q.answer,
            userAnswer: userAnswers[q.id]
        };
    });

    res.json({
        totalQuestions: questions.length,
        score,
        results
    });
};
