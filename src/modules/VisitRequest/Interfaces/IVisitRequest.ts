// Todas las interfaces aquí

export interface IVisitRequest {
  id?: number;
  requestDate: string;                  // ISO string: "2025-07-23T02:21:52.106Z"
  status?: string;                      // Pending, Approved, etc.
  approvalDate?: string | null;
  requestingInstitution: string;
  estimatedPeople: number;
  visitType: string;
  comments: string;
}

export interface IReception {
  id?: number;
  requestId: number;
  startTime: string;                    // ISO string
  endTime: string;                      // ISO string
  status: string;
  notes: string;
  checkinResponsible: string;
}

// State de Pinia para VisitRequest
export interface IVisitRequestState {
  items: IVisitRequest[];
  totalItems: number;
  loading: boolean;
  error: string | null;
  selected: IVisitRequest | null;
  page: number;
  pageSize: number;
  showCreate: boolean;
showEdit: boolean;
showReception: boolean;
receptionRequest: IVisitRequest | null;
}
