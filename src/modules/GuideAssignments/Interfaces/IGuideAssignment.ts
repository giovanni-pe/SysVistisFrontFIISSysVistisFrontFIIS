export interface IGuideAssignment {
  id?: number;
  requestId: number;
  guideId: number;
}

export interface IGuideAssignmentState {
  items: IGuideAssignment[];
  totalItems: number;
  loading: boolean;
  error: string | null;
  selected: IGuideAssignment | null;
  page: number;
  pageSize: number;
  showCreate: boolean;
  showEdit: boolean;
}
