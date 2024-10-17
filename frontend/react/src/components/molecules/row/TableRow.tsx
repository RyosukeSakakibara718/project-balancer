import React from "react";

import { MemberData } from "../../../types/member";
import DeleteButton from "../../atoms/button/DeleteButton";
import EditButton from "../../atoms/button/EditButton";
import TableRowColumn from "../../atoms/column/TableRowColumn";

type TableRowProps = MemberData & {
  isEditModalOpen: () => void;
  isDeleteModalOpen: () => void;
};

const TableRow: React.FC<TableRowProps> = ({
  id,
  name,
  rank,
  base_cost,
  base_cost_start_date,
  isEditModalOpen,
  isDeleteModalOpen,
}) => {
  return (
    <tr className="hover:bg-customPurple transition-colors duration-200">
      <TableRowColumn width="25%">{name}</TableRowColumn>
      <TableRowColumn width="10%">{rank}</TableRowColumn>
      <TableRowColumn width="25%">
        {base_cost.toLocaleString()}円
      </TableRowColumn>
      <TableRowColumn width="25%">{base_cost_start_date}</TableRowColumn>
      <TableRowColumn width="10%">
        <div className="flex space-x-2.5">
          <EditButton onOpen={isEditModalOpen}/>
          <DeleteButton onOpen={isDeleteModalOpen} id={id} />
        </div>
      </TableRowColumn>
    </tr>
  );
};

export default TableRow;
