export interface ICertificate {
  id?: number;
  personId: number;
  visitId: number;
  certificateCode: string;
  issueDate: string;    // ISO string
  delivered: boolean;
  description: string;
}

export interface ICertificateState {
  items: ICertificate[];
  totalItems: number;
  loading: boolean;
  error: string | null;
  selected: ICertificate | null;
  page: number;
  pageSize: number;
  showCreate: boolean;
  showEdit: boolean;
}
