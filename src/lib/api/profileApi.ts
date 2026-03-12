import api from "@/lib/api";
import { ProfileResponse } from "@/types/profile";

export const getProfile = async (token?: string): Promise<ProfileResponse> => {
    const config: RequestInit = {};
    if (token) {
        config.headers = {
            'Authorization': `Bearer ${token}`
        };
    }
    return api.get("/user/profile", config);
};

export const updateProfile = async (data: FormData, token?: string): Promise<ProfileResponse> => {
    const config: RequestInit = {};
    if (token) {
        config.headers = {
            'Authorization': `Bearer ${token}`
        };
    }
    return api.put("/user/profile", data, config);
};
