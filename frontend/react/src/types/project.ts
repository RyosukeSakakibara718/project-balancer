export type ProjectData = {
  id: number;
  name: string;
  freee_project_code? :string;
  start_date: string;
  end_date: string;
  project_manager: string;
};

export type ProjectDataProps = {
  data: ProjectData[];
};

export type OptionList = {
  id: number;
  name: string;
  base_cost?: number;
  label: string;
};

export type InitialProjectInfo = {
  name: string;
  phase: string;
  freeeProjectId: string;
  orderPrice: number | undefined;
  startDate: string;
  endDate: string;
  estimateCost: number | undefined;
  estimatePersonMonth: number | undefined;
  contractType: string;
};

// 全体の型定義
export type ProjectInfomation = {
  projects_data: ProjectsData;
  estimations: Estimations;
};

export type AssignmentMembers = {
  member_id: number;
  position: number;
  estimate_total_person_month: number;
  assignment_member_monthly_estimations: AssignmentMemberMonthlyEstimations[];
};

export type ProjectsData = {
  name: string;
  phase: number | undefined;
  freee_project_code: string;
  contract: number | undefined;
  start_date: string;
  end_date: string;
};

export type Estimations = {
  order_price: number | undefined;
  estimate_cost: number | undefined;
  estimate_person_month: number | undefined;
};

export type InitialAssignmentMembers = {
  member_id: number;
  position: number;
  base_cost: number;
  estimate_total_person_month: number;
  assignment_member_monthly_estimations:
    | AssignmentMemberMonthlyEstimations[]
    | [];
};

export type AssignmentMemberMonthlyEstimations = {
  target_month: string | number;
  estimate_person_month: number;
};

export type Outsource = {
  id?: number;
  name: string;
  estimate_cost: number | undefined;
  cost: number | undefined;
};

export type RequestBody = {
  projects: {
    projects_data: ProjectsData;
    estimations: Estimations;
    assignment_members: InitialAssignmentMembers[];
    outsources: Outsource[];
  };
};

export type optionsArrayProps = {
  id: number;
  label: string;
};

export type Period = {
  dayOfWeek: number;
  day: string;
};

export type ProjectsAchievementsMember = {
  member_id: number;
  position: number;
  base_cost: number;
  work_costs: WorkCost[];
};

export type WorkCost = {
  id?: number; // optionalにしておく
  daily_cost: number;
  work_time: string; // 元データでwork_timeはstringなので修正
  work_date: string;
  work_week?: string;
  work_month?: string;
};

export type AssignmentMember = {
  member_id: number; // assignment_member_idをmember_idに変更
  position: number;
  base_cost: number;
  work_costs: WorkCost[];
};

export type ProjectAchievementsData = {
  project: { // projectsをprojectに変更
    id: number; // projects_idをidに変更
    assignment_members: AssignmentMember[];
  };
};