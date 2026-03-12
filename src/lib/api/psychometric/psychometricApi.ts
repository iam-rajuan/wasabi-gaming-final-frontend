export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000/api/v1';

// Types based on the User's API response
export interface PsychometricOption {
    option: string;
}

export interface PsychometricQuestion {
    _id: string;
    question: string;
    options: string[];
    answer?: string;
    difficulty: string;
    timeTakenSec: number;
}

export interface PsychometricTest {
    _id: string;
    category: string;
    score: number;
    allQuestions: PsychometricQuestion[];
    attamUser: any[];
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export interface PsychometricTestResponse {
    statusCode: number;
    success: boolean;
    message: string;
    data: PsychometricTest[];
    meta: {
        total: number;
        page: number;
        limit: number;
    };
}

export interface SinglePsychometricTestResponse {
    statusCode: number;
    success: boolean;
    message: string;
    data: PsychometricTest;
}

export interface SubmitAnswer {
    questionId: string;
    userAnswer: string;
    timeTakenSec: number;
}

export interface SubmitAttemptBody {
    answers: SubmitAnswer[];
}

export interface AttemptAnswer {
    questionId: string;
    userAnswer: string;
    isCorrect: boolean;
    timeTakenSec: number;
    _id: string;
}

export interface UserAttempt {
    _id: string;
    user: string;
    test: {
        _id: string;
        category: string;
    };
    answers: AttemptAnswer[];
    score: number;
    totalTime: number;
    keyStrength?: string;
    areaImprovements?: string;
    overallFeedback?: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export interface MyAnswersResponse {
    statusCode: number;
    success: boolean;
    message: string;
    data: UserAttempt[];
    meta: {
        total: number;
        page: number;
        limit: number;
    };
}

// API Functions

// Get all psychometric tests
export const getAllPsychometricTests = async (): Promise<PsychometricTestResponse> => {
    const res = await fetch(`${API_BASE_URL}/psychometric-test/`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!res.ok) {
        throw new Error(`Error fetching tests: ${res.statusText}`);
    }

    return res.json();
};

// Get single psychometric test by ID
export const getPsychometricTestById = async (id: string, token?: string): Promise<SinglePsychometricTestResponse> => {
    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
    };

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const res = await fetch(`${API_BASE_URL}/psychometric-test/${id}`, {
        method: 'GET',
        headers,
    });

    if (!res.ok) {
        throw new Error(`Error fetching test ${id}: ${res.statusText}`);
    }

    return res.json();
};

// Submit psychometric test result
export const submitPsychometricAttempt = async (testId: string, answers: SubmitAnswer[], token: string) => {
    const res = await fetch(`${API_BASE_URL}/psychometric-attempt/${testId}/submit`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ answers }),
    });

    if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Error submitting test: ${errorText}`);
    }

    return res.json();
};

// Try again
export const tryAgainPsychometricAttempt = async (testId: string, answers: SubmitAnswer[], token: string) => {
    const res = await fetch(`${API_BASE_URL}/psychometric-attempt/${testId}/try-again`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ answers }),
    });

    if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Error retrying test: ${errorText}`);
    }

    return res.json();
};

// Get my answers (history)
export const getMyPsychometricAnswers = async (token: string): Promise<MyAnswersResponse> => {
    const res = await fetch(`${API_BASE_URL}/psychometric-attempt/my-answers`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    });

    if (!res.ok) {
        throw new Error(`Error fetching my answers: ${res.statusText}`);
    }

    return res.json();
};
