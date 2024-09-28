export type ProjectData = {
  id: number;
  name: string;
  start_date: string;
  end_date: string;
  project_manager: string;
};

export type ProjectDataProps = {
  data: ProjectData[];
};

export type ProjectsData = {
  name: string,
  phase: number,
  freee_project_code: string,
  contract: number,
  start_date: Date,
  end_date: Date,
}

export type MemberList = {
  id: number,
  name: string,
  label: string
}

export type Estimations = {
  order_price: number,
  estimate_cost: number,
  estimate_person_month: number,
}

export type AssignmentMembers = {
  member_id: number,
  position: number,
  estimate_total_person_month: number,
  assignment_member_monthly_estimations: AssignmentMemberMonthlyEstimations[]
}

export type AssignmentMemberMonthlyEstimations = {
  target_month: string,
  estimate_person_month: number,
}

export type Outsource = {
  name: string,
  estimate_cost: number,
  cost: number,
}
export type InitialAssignmentMembers = {
  member_id : number,
  position : number,
  estaimate_total_person_month : number,
  assignment_member_monthly_estimations : AssignmentMemberMonthlyEstimations[] | []
}

export type InitialProjectInfo = {
  name: string,
  phase: string,
  freeeProjectId: string,
  orderPrice: number | undefined,
  startDate: string,
  endDate: string,
  estimateCost: number | undefined,
  estimatePersonMonth: number | undefined,
  contractType: string,
}