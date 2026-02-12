interface LocalizedContent {
    question: string;
    options: string[];
}

export interface Question {
    id: number;
    content: {
        uz: LocalizedContent;
        ru: LocalizedContent;
        en: LocalizedContent;
    };
    answer: number;
    image?: string;
}
