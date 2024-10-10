type ShowTotalCostProps = {
  value: string;
};

const ShowTotalCost: React.FC<ShowTotalCostProps> = ({ value }) => {
  return (
    <tr>
      <td colSpan={2} className="p-4">
        <div className="flex flex-col items-start border rounded-lg shadow-md p-4">
          <div className="text-md font-bold text-gray-400 pb-2">合計原価</div>
          <div className="font-bold text-blue-900 text-4xl">{`¥${value}`}</div>
        </div>
      </td>
    </tr>
  );
};

export default ShowTotalCost;
