// events.types.ts

export interface Event {
  _id: string;
  title: string;
  description: string;
  date: string;            // ISO date string
  time?: string;           // optional
  thumbnail?: string;      // correct field
  thamble?: string;        // backend typo support
  eventType?: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface EventsMeta {
  total: number;
  page: number;
  limit: number;
}

export interface EventsResponse {
  statusCode: number;
  success: boolean;
  message: string;
  meta: EventsMeta;
  data: Event[];
}
