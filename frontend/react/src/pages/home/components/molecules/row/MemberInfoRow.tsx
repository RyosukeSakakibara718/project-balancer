import TableTd from "../../../../../components/atoms/field/TableTd";
import { RANK } from "../../../../../constants/index";
import { MemberInfoDataProps } from "../../../../../types/home";

const MemberInfoRow = ({ MembersData }: MemberInfoDataProps) => {
  /**
   * メンバー情報rowを表示し、追加・テーブコンポーネント。
   * @component
   * @param {MemberTableProps} props - コンポーネントに渡されるプロパティ。
   * @param {Array} props.data - メンバーのデータリスト。
   * @returns {JSX.Element} MemberTableコンポーネントを返します。
   */

  return (
    <>
      {MembersData.map(MemberData => {
        const positionName =
          RANK.find(rank => rank.id === MemberData.position)?.name || "Unknown";
        return (
          <tr key={MemberData.name}>
            <TableTd text={MemberData.name} />
            <TableTd text={positionName} />
            <TableTd text={MemberData.base_cost} />
            <TableTd text={MemberData.estimate_total_person_month} />
            <TableTd text={MemberData.achievement_total_person_month} />
            <TableTd text={MemberData.achievement_total_cost} />
          </tr>
        );
      })}
    </>
  );
};
export default MemberInfoRow;
