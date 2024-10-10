import { Key } from "react";

// types/home/MemberInfoDataProps.ts
export type Member = {
  id: Key | null | undefined;
  achievement_total_cost: number;
  achievement_total_person_month: number;
  base_cost: number;
  estimate_total_person_month: number;
  member_id: number;
  name: string;
  position: number;
};

export type MemberInfoDataProps = {
  MembersData: Member[];
};

export type ForeCast = {
  achievement_person_month: number; // 予測工数（人月）
  forecast_cost: number; // 着地原価
  forecast_profit: number;
};

export type OrderInfoDataProps = {
  foreCast: ForeCast;
};

export type EstimateDataProps = {
  estimation: Estimation;
};

export type Estimation = {
  estimate_cost: number;
  estimate_person_month: string;
  order_price: number;
};

export type GraphDataProps = {
  graph: Graph[];
};

export type Graph = {
  target_month: string;
  achievement_cost: number;
  estimate_cost: number;
};

export type HomeComment = {
  id: number;
  comment: string;
  created_at: string;
  updated_at: string;
};

export type HomeCommentProps = {
  projectId: number;
};

export type Project = {
  id: number;
  name: string;
  freee_project_code: string;
  start_date: string;
  end_date: string;
  project_manager: string;
};

export type SummaryProps = {
  total_estimate_cost: number;
  total_achievement_cost: number;
  achievement_person_month: number;
  Remaining_person_month: number;
  graph: Graph[];
};
