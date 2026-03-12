import { useMutation } from '@tanstack/react-query';
import api from '@/lib/api';

export const useRegister = () => {
    return useMutation({
        mutationFn: async (data: any) => {
            const response = await api.post('/auth/signup/', data);
            return response.data;
        },
    });
};

export const useSendOTP = () => {
    return useMutation({
        mutationFn: async (data: any) => {
            const response = await api.post('/auth/otp/send/', data);
            return response.data;
        },
    });
};

export const useVerifyOTP = () => {
    return useMutation({
        mutationFn: async (data: any) => {
            const response = await api.post('/auth/otp/verify/', data);
            return response.data;
        },
    });
};
