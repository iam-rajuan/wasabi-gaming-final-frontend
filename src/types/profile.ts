export interface IEducation {
    institution: string;
    degree: string;
    year: number;
}

export interface IExperience {
    company: string;
    role: string;
    duration: string;
}

export interface ISocialLink {
    name: string;
    link: string;
}

export interface IUser {
    _id: string;
    firstName?: string;
    lastName?: string;
    schoolName?: string;
    schoolType?: string;
    schoolStatus?: 'approved' | 'pending' | 'rejected';
    aboutSchool?: string;
    email: string;
    role: 'student' | 'school' | 'admin';
    schoolCategory?: string;
    profileImage?: string;
    phone?: string;
    address?: string;
    education?: IEducation[];
    experience?: IExperience[];
    skills?: string[];
    grade?: string;
    jobTitle?: string;
    company?: string;
    bio?: string;
    socileLinks?: ISocialLink[];
    verified: boolean;
    registered: boolean;
    status: 'active' | 'inactive';
    isSubscription: boolean;
    subscription?: string | any;
    subscribedSchool?: any;
    shareLink?: string;
    applicationJob?: {
        job: string;
        status: string;
        interviewDate?: string;
        notes?: string;
    }[];
    createdAt?: string;
    updatedAt?: string;
}

export interface ProfileResponse {
    statusCode: number;
    success: boolean;
    message: string;
    data: {
        data: IUser;
        subscription?: any;
    };
}
