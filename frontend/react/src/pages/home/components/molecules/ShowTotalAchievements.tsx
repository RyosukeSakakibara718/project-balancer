import SmallTableTd from "./row/SmallTableTd";
import ShowTotalCost from "./ShowTotalCost";
import { SummaryProps } from "../../../../types/home";

const ShowTotalAchievements: React.FC<SummaryProps> = ({ summary }) => {
  return (
    <table className="min-w-full border-separate border-spacing-0 border rounded-lg shadow-md">
      <thead>
        <tr>
          <th className="text-left text-2xl p-2 border-b-2">
            {new Date().toLocaleDateString("ja-JP", {
              month: "long",
              day: "numeric",
            })}
          </th>
          <th className="border-b-2"></th>
        </tr>
      </thead>
      <tbody>
        {/* 合計原価 */}
        <ShowTotalCost
          value={summary.total_achievement_cost.toLocaleString()}
        />
        {/* 詳細 */}
        <SmallTableTd
          label={"見積原価"}
          value={`¥${summary.total_estimate_cost.toLocaleString()}`}
        />
        <SmallTableTd
          label={"実績原価"}
          value={`¥${summary.total_achievement_cost.toLocaleString()}`}
        />
        <SmallTableTd
          label={"実績工数"}
          value={`${summary.achievement_person_month}人日`}
        />
        <SmallTableTd
          label={"残工数"}
          value={`${summary.Remaining_person_month}人日`}
        />
      </tbody>
    </table>
  );
};

export default ShowTotalAchievements;
