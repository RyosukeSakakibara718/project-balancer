import React from "react";

import EditTableColumn from "../../atoms/column/EditTableColumn";

type TableRowProps = {
  id: number;
  name: string;
  rank: number;
  base_cost: number;
  base_cost_start_date: string;
  onValueChange: (key: string, value: string) => void; // 値変更時のコールバック
};

const EditTableRow: React.FC<TableRowProps> = ({
  name,
  rank,
  base_cost,
  base_cost_start_date,
  onValueChange,
}) => {
  return (
    <tr className="bg-customPurple">
      <EditTableColumn
        width="25%"
        initialValue={name}
        onChange={value => onValueChange("name", value)}
      />
      <EditTableColumn
        width="10%"
        initialValue={rank} // rank も数値なので文字列に変換
        onChange={value => onValueChange("rank", value)}
        inputType="number"
      />
      <EditTableColumn
        width="25%"
        initialValue={base_cost} // base_cost をローカライズされた文字列として渡す
        onChange={value => onValueChange("base_cost", value.replace(/,/g, ""))} // カンマを取り除いて数値に変換できるようにする
        inputType="number"
      />
      <EditTableColumn
        width="25%"
        initialValue={base_cost_start_date}
        onChange={value => onValueChange("base_cost_start_date", value)}
        inputType="date"
      />
    </tr>
  );
};

export default EditTableRow;
