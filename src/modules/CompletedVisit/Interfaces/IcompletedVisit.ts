export interface ICompletedVisit {
  id?: number;
  receptionId: number;
  summary: string;
  registrationDate: string; // ISO string
  observations: string;
  reception?: any | null;   // Puede ser objeto o null, según tu backend
}

export interface ICompletedVisitState {
  items: ICompletedVisit[];
  totalItems: number;
  loading: boolean;
  error: string | null;
  selected: ICompletedVisit | null;
  page: number;
  pageSize: number;
  showCreate: boolean;
  showEdit: boolean;
}
