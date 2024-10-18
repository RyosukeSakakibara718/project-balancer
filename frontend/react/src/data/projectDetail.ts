export const projectDetailData = {
  project: {
    projects_data: {
      name: "プロジェクトバランサー",
      phase: 1,
      freee_project_code: "1111-1111-1111",
      contract: 4,
      start_date: new Date(), // 現在の日付
      end_date: new Date(new Date().setMonth(new Date().getMonth() + 20)),
    },
    estimations: {
      order_price: 300000000,
      estimate_cost: 20000000,
      estimate_person_month: 23.0,
    },
    assignment_members: [
      {
        member_id: 1,
        position: 1,
        estimate_total_person_month: 4,
        assignment_member_monthly_estimations: [
          {
            target_month: 5,
            estimate_person_month: 1.0,
          },
          {
            target_month: 6,
            estimate_person_month: 1.0,
          },
          {
            target_month: 7,
            estimate_person_month: 1.0,
          },
          {
            target_month: 8,
            estimate_person_month: 1.0,
          },
        ],
      },
      {
        member_id: 2,
        position: 1,
        estimate_total_person_month: 6,
        assignment_member_monthly_estimations: [
          {
            target_month: 5,
            estimate_person_month: 1.0,
          },
          {
            target_month: 6,
            estimate_person_month: 1.0,
          },
          {
            target_month: 7,
            estimate_person_month: 1.0,
          },
          {
            target_month: 8,
            estimate_person_month: 1.0,
          },
        ],
      },
    ],
    outsources: [
      {
        name: "デザイン外注",
        estimate_cost: 400000,
        cost: 300000,
      },
      {
        name: "デザイン外注",
        estimate_cost: 400000,
        cost: 300000,
      },
      {
        name: "デザイン外注",
        estimate_cost: 400000,
        cost: 300000,
      },
    ],
  },
};

export const initialProjectInfo = {
  projects_data: {
    name: "",
    phase: 1,
    freee_project_code: "",
    contract: 1,
    start_date: new Date().toISOString().split("T")[0], // 現在の日付
    end_date: new Date(new Date().setMonth(new Date().getMonth() + 20))
      .toISOString()
      .split("T")[0],
  },
  estimations: {
    order_price: undefined,
    estimate_cost: undefined,
    estimate_person_month: undefined,
  },
};

export const initialAssignmentMembersArray = [
  {
    member_id: 1,
    position: 1,
    base_cost: 0,
    estimate_total_person_month: 0,
    assignment_member_monthly_estimations: [],
  },
];

export const initialAssignmentMembersInfo = {
  member_id: 1,
  position: 1,
  base_cost: 0,
  estimate_total_person_month: 0,
  assignment_member_monthly_estimations: [],
};

export const initialOutsourcingInfo = {
  name: "",
  estimate_cost: undefined,
  cost: undefined,
};

export const OutsourceColumns = [
  { label: "内容", width: 400 },
  { label: "見積金額", width: 200 },
  { label: "原価", width: 200 },
  { label: "", width: 50 },
];

export const memberList = [
  { id: 1, value: "山田 涼介", label: "山田 涼介" },
  { id: 2, value: "山下 智久", label: "山下 智久" },
];

export const requestBody = {
  projects: {
    projects_data: {
      name: "",
      phase: undefined,
      freee_project_code: "",
      contract: undefined,
      start_date: new Date(), // 現在の日付
      end_date: new Date(new Date().setMonth(new Date().getMonth() + 20)),
    },
    estimations: {
      order_price: 0,
      estimate_cost: 0,
      estimate_person_month: 0,
    },
    assignment_members: [
      {
        member_id: 0,
        position: 0,
        estimate_total_person_month: 0,
        assignment_member_monthly_estimations: [
          {
            target_month: 0,
            estimate_person_month: 0,
          },
        ],
      },
    ],
    outsources: [
      {
        name: "",
        estimate_cost: 0,
        cost: 0,
      },
    ],
  },
};
