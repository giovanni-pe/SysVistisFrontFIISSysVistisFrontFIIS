export interface IReception {
  id?: number;
  requestId: number;
  startTime: string;         // ISO string (datetime-local)
  endTime: string;           // ISO string
  status: string;
  notes: string;
  checkinResponsible: string;
}

export interface IReceptionState {
  items: IReception[];
  totalItems: number;
  loading: boolean;
  error: string | null;
  selected: IReception | null;
  page: number;
  pageSize: number;
  showCreate: boolean;
  showEdit: boolean;
}
