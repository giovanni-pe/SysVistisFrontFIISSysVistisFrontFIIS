export interface IGuide {
  id?: number;
  fullName: string;
  email: string;
  phone: string;
}

export interface IGuideState {
  items: IGuide[];
  totalItems: number;
  loading: boolean;
  error: string | null;
  selected: IGuide | null;
  page: number;
  pageSize: number;
  showCreate: boolean;
  showEdit: boolean;
}
j