import { useQuery } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { getProfile } from '@/lib/api/profileApi'
import { ProfileResponse, IUser } from '@/types/profile'

export const useUserProfile = () => {
    const { data: session, status } = useSession()
    const isAuthenticated = status === 'authenticated'

    const {
        data: profileData,
        isLoading,
        isError,
        error,
        refetch,
    } = useQuery<ProfileResponse>({
        queryKey: ['userProfile', session?.user?.id],
        queryFn: async () => {
            if (!session?.accessToken) {
                throw new Error('No access token available')
            }
            return getProfile(session.accessToken)
        },
        enabled: isAuthenticated && !!session?.accessToken,
        staleTime: 5 * 60 * 1000, // 5 minutes
        retry: 1,
    })

    const userData: IUser | undefined = profileData?.data?.data
    const subscriptionName = profileData?.data?.subscription?.name || ''
    const hasActiveSubscription = userData?.isSubscription ?? false

    return {
        userData,
        subscriptionName,
        hasActiveSubscription,
        isLoading: isLoading || status === 'loading',
        isError,
        error,
        refetch,
        isAuthenticated,
    }
}
