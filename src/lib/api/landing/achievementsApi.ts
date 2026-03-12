export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000/api/v1';

export interface Achievement {
    _id?: string;
    title: string;
    subtitle?: string;
    description: string;
    image: string;
    badgeColor?: string;
    [key: string]: any;
}

export interface ApiResponse {
    statusCode: number;
    success: boolean;
    message: string;
    data: Achievement[];
    meta: {
        page: number;
        limit: number;
        total: number;
    };
}

export const getAchievements = async (): Promise<ApiResponse> => {
    const res = await fetch(`${API_BASE_URL}/card`);

    if (!res.ok) {
        const errorBody = await res.text();
        throw new Error(errorBody || `API Error: ${res.status} ${res.statusText}`);
    }

    return res.json();
};
