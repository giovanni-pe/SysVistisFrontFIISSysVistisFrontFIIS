export interface IAttendance {
  id?: number;
  receptionId: number;
  personId: number;
  attended: boolean;
  viaQR: boolean;
  checkinTime: string; // ISO string
}

export interface IAttendanceState {
  items: IAttendance[];
  totalItems: number;
  loading: boolean;
  error: string | null;
  selected: IAttendance | null;
  page: number;
  pageSize: number;
  showCreate: boolean;
  showEdit: boolean;
}
