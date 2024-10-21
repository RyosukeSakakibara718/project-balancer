import { useEffect, useState } from "react";

import { RANK } from "../../../../../constants";
import { getMemberAll } from "../../../../../hooks/useMember";
import {
  optionsArrayProps,
  Period,
  ProjectsAchievementsMember,
} from "../../../../../types/project";
import { countBusinessDaysInMonth } from "../../../../../utils/projectsAchievements";
import { MemberData } from "../../../../../types/member";

type ProjectArchiveBodyProps = {
  showPeriod: Period[];
  member: ProjectsAchievementsMember;
  onWorkTimeChange: (
    memberId: number,
    workDate: string,
    workTime: string,
  ) => void;
  between: optionsArrayProps;
};

// 08:00:00 や 08:30:00 を小数形式に変換する関数
const convertWorkTimeToDecimal = (workTime: string): number => {
  const [hours, minutes] = workTime.split(':').map(Number); // 時間と分を分解して数値に変換
  return hours + minutes / 60; // 時間と分を小数形式に変換
};

// 小数形式の workTime を 00:00:00 形式に変換する関数
const convertDecimalToWorkTime = (decimal: number): string => {
  const hours = Math.floor(decimal);
  const minutes = Math.round((decimal - hours) * 60);
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:00`;
};

const ProjectArchiveBody: React.FC<ProjectArchiveBodyProps> = ({
  showPeriod,
  member,
  onWorkTimeChange,
  between,
}) => {
  const [memberList, setMemberList] = useState<MemberData[]>();

  useEffect(() => {
    getMemberAll()
      .then(members => {
        if (members !== null) {
          setMemberList(members);
        }
      })
      .catch(error => {
        console.error("Error fetching member data:", error);
      });
  }, []);

  const memberInfo = memberList?.find(
    item => item.id === member.member_id,
  );
  const rank = RANK.find(item => item.id === member.position);

  const calculateAmount = (
    workTime: number,
    workDate: string,
    between: number,
    member: ProjectsAchievementsMember,
    item: Period,
  ) => {
    let amount = 0;

    if (between === 1) {
      const businessDays = countBusinessDaysInMonth(workDate);
      amount = Math.ceil((member.base_cost / businessDays) * workTime); // 通常の処理
    } else if (between === 2) {
      amount =
        member.work_costs.find(cost => cost.work_week === item.day)
          ?.daily_cost || 0; // work_week を使った daily_cost の取得
    } else if (between === 3) {
      amount =
        member.work_costs.find(cost => cost.work_month === item.day)
          ?.daily_cost || 0; // work_month を使った daily_cost の取得
    }

    return amount;
  };

  // workCost を取得する関数
  const getWorkCost = (
    member: ProjectsAchievementsMember,
    item: Period,
    between: number,
  ) => {
    let workCost;

    if (between === 1) {
      workCost = member.work_costs.find(cost => cost.work_date === item.day);
    } else if (between === 2) {
      workCost = member.work_costs.find(cost => cost.work_week === item.day);
    } else if (between === 3) {
      workCost = member.work_costs.find(cost => cost.work_month === item.day);
    }

    return workCost;
  };

  return (
    <>
      {memberInfo && rank && (
        <tbody>
          <tr>
            <td>{memberInfo.name}</td>
            <td>{rank.name}</td>
            <td>¥{member.base_cost.toLocaleString()}</td>{" "}
            <td className="border-l border-gray-300">時間</td>
            {showPeriod.map(item => {
              const workCost = getWorkCost(member, item, between.id);
              const workTime = workCost
                ? convertWorkTimeToDecimal(workCost.work_time) // 08:00:00 -> 8 のように変換
                : 0;
              return (
                <td className="py-[10px]" key={item.day}>
                  <input
                    name="target_month"
                    className="border border-gray-300 w-[70%] h-[32px] rounded"
                    type="number"
                    value={workTime}
                    step="0.1" // 0.5刻みで変更可能にする
                    onChange={e => {
                      const decimalWorkTime = Number(e.target.value); // 入力値を小数点に変換
                      const formattedWorkTime = convertDecimalToWorkTime(decimalWorkTime); // 8 -> 08:00:00 に変換
                      onWorkTimeChange(
                        member.member_id,
                        item.day,
                        formattedWorkTime,
                      );
                    }}
                    disabled={between.id !== 1}
                  />
                </td>
              );
            })}
          </tr>
          <tr>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td className="border-l border-gray-300">金額</td>
            {showPeriod.map(item => {
              const workCost = member.work_costs.find(
                cost => cost.work_date === item.day,
              );

              // 金額に表示する合計金額
              const amount = calculateAmount(
                workCost ? convertWorkTimeToDecimal(workCost.work_time) : 0,
                item.day,
                between.id,
                member,
                item,
              );
              return (
                <td className="py-[10px]" key={item.day}>
                  <p>{amount ? "¥" + amount.toLocaleString() : ""}</p>
                </td>
              );
            })}
          </tr>
        </tbody>
      )}
    </>
  );
};

export default ProjectArchiveBody;
