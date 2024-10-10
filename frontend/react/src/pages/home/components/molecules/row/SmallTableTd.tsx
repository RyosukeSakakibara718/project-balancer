type SmallTableTdProps = {
  label: string;
  value: string | number;
};

const SmallTableTd: React.FC<SmallTableTdProps> = ({ label, value }) => {
  return (
    <tr>
      <td className="p-2 text-lg text-left font-bold">{label}</td>
      <td className="p-2 text-lg text-left font-bold">{value}</td>
    </tr>
  );
};

export default SmallTableTd;
