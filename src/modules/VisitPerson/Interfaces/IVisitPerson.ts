export interface IVisitPerson {
  id?: number;
  requestId: number;           // o visitRequestId según backend (debes homologar en BE/FE)
  fullName: string;
  dni: string;
  email: string;
  phone: string;
  isRepresentative: boolean;
}

export interface IVisitPersonState {
  items: IVisitPerson[];
  totalItems: number;
  loading: boolean;
  error: string | null;
  selected: IVisitPerson | null;
  page: number;
  pageSize: number;
  showCreate: boolean;
  showEdit: boolean;
}
