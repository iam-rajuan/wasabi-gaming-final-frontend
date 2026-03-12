

export type InviteStatus = "pending" | "accepted" | "rejected";

export interface Invite {
  _id: string;
  name: string;
  email: string;
  message: string;
  url: string | null;
  createBy: string;
  status: InviteStatus;
  __v: number;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}


export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
}

export interface GetAllRecentInviteApiResponse {
  statusCode: number;
  success: boolean;
  message: string;
  meta: PaginationMeta;
  data: Invite[];
}



