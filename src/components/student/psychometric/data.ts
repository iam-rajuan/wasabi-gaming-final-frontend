export interface PsychometricQuestion {
    id: number;
    text: string;
    options: string[];
    correctAnswer: number;
}

export interface PsychometricTest {
    id: number;
    name: string;
    description: string;
    icon: string;
    duration: string;
    status: string;
    score: number | null;
    questions: PsychometricQuestion[];
}

export interface Strength {
    name: string;
    score: string;
}

export interface AreaToImprove {
    name: string;
    description: string;
}

export interface PsychometricData {
    tests: PsychometricTest[];
    strengths: Strength[];
    areasToImprove: AreaToImprove[];
}

export const psychometricData: PsychometricData = {
    tests: [
        {
            id: 1,
            name: "Verbal Reasoning",
            description: "Test your comprehension, logic, and analytical thinking.",
            icon: "🧠",
            duration: "15-20 minutes",
            status: "available",
            score: null,
            questions: [
                {
                    id: 1,
                    text: "Complete the sequence: Book is to Reading as Fork is to ___",
                    options: ["Eating", "Kitchen", "Spoon", "Food"],
                    correctAnswer: 0,
                },
                {
                    id: 2,
                    text: "If all Bloops are Razzies and all Razzies are Lazzies, then all Bloops are definitely Lazzies.",
                    options: ["True", "False", "Cannot be determined"],
                    correctAnswer: 0,
                },
                {
                    id: 3,
                    text: "Choose the word that best completes: Ocean is to Water as Desert is to ___",
                    options: ["Hot", "Sand", "Dry", "Cactus"],
                    correctAnswer: 1,
                },
                {
                    id: 4,
                    text: "Select the option that is most similar to: Magnificent",
                    options: ["Splendid", "Terrible", "Small", "Quick"],
                    correctAnswer: 0,
                },
            ],
        },
        {
            id: 2,
            name: "Numerical Reasoning",
            description: "Test your ability to work accurately with numbers and data.",
            icon: "📊",
            duration: "15-20 minutes",
            status: "completed",
            score: 85,
            questions: [
                {
                    id: 1,
                    text: "If a product costs $80 and is discounted by 25%, what is the final price?",
                    options: ["$60", "$55", "$65", "$70"],
                    correctAnswer: 0,
                },
                {
                    id: 2,
                    text: "What is 15% of 200?",
                    options: ["25", "30", "35", "40"],
                    correctAnswer: 1,
                },
                {
                    id: 3,
                    text: "A train travels 120 km in 2 hours. What is its average speed?",
                    options: ["50 km/h", "60 km/h", "70 km/h", "80 km/h"],
                    correctAnswer: 1,
                },
            ],
        },
        {
            id: 3,
            name: "Abstract Reasoning",
            description: "Test your ability to identify patterns, think logically, and solve visual problems.",
            icon: "💡",
            duration: "15-20 minutes",
            status: "completed",
            score: 92,
            questions: [
                {
                    id: 1,
                    text: "Which shape completes the pattern: Circle, Square, Triangle, Circle, Square, ___",
                    options: ["Circle", "Square", "Triangle", "Rectangle"],
                    correctAnswer: 2,
                },
                {
                    id: 2,
                    text: "If the pattern increases by 3 each time (2, 5, 8, 11), what comes next?",
                    options: ["13", "14", "15", "16"],
                    correctAnswer: 1,
                },
            ],
        },
        {
            id: 4,
            name: "Situational Judgement Test (SJT)",
            description:
                "Sharpen your judgement, teamwork, and problem-solving through realistic workplace scenarios.",
            icon: "👥",
            duration: "15-20 minutes",
            status: "available",
            score: null,
            questions: [
                {
                    id: 1,
                    text: "A colleague is struggling to meet a deadline. What would you do?",
                    options: [
                        "Offer to help them with specific tasks",
                        "Report the issue to your manager",
                        "Wait for them to ask for help",
                        "Take over their work completely",
                    ],
                    correctAnswer: 0,
                },
                {
                    id: 2,
                    text: "You notice a mistake in a report that has already been sent to clients. What is your first action?",
                    options: [
                        "Ignore it and hope no one notices",
                        "Immediately inform your supervisor and suggest a correction",
                        "Wait to see if the client mentions it",
                        "Blame the person who created the report",
                    ],
                    correctAnswer: 1,
                },
                {
                    id: 3,
                    text: "Your team disagrees on the best approach to a project. How do you handle it?",
                    options: [
                        "Impose your idea as you think it's best",
                        "Let the team argue it out without mediating",
                        "Facilitate a discussion to weigh pros and cons of each approach",
                        "Avoid the conflict and let someone else decide",
                    ],
                    correctAnswer: 2,
                },
                {
                    id: 4,
                    text: "You are given feedback that your communication style can be improved. How do you respond?",
                    options: [
                        "Dismiss the feedback as subjective",
                        "Thank them and ask for specific examples to understand better",
                        "Feel defensive and argue your point",
                        "Ignore it completely",
                    ],
                    correctAnswer: 1,
                },
            ],
        },
    ],
    strengths: [
        { name: "Numerical Reasoning", score: "92%" },
        { name: "Abstract Reasoning", score: "88%" },
    ],
    areasToImprove: [
        {
            name: "Situational Judgement & WorkValues",
            description:
                "You are still building your expertise in managing workplace dynamics.",
        },
        {
            name: "Verbal Reasoning & Critical Thinking",
            description: "You can build on your analytical skills.",
        },
        {
            name: "Numerical Literacy",
            description: "Work on your ability to analyze complex data.",
        },
    ],
};
