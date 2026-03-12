export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000/api/v1';

export interface TeamMemberProtocol {
    _id: string;
    name: string;
    profession: string;
    image: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export interface TeamResponse {
    statusCode: number;
    success: boolean;
    message: string;
    data: {
        data: TeamMemberProtocol[];
        meta: {
            total: number;
            page: number;
            limit: number;
        };
    };
}

export const getTeamMembers = async (): Promise<TeamResponse> => {
    const res = await fetch(`${API_BASE_URL}/team`);

    if (!res.ok) {
        const errorBody = await res.text();
        throw new Error(errorBody || `API Error: ${res.status} ${res.statusText}`);
    }

    return res.json();
};
