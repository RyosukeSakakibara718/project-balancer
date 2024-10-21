import { OptionList } from "../../../types/project";

type BigSelectBoxProps = {
  optionArray: OptionList[];
  labelText?: string;
  handleSelectChange: (value: string) => void;
};

const BigSelectBox = ({
  optionArray,
  labelText,
  handleSelectChange,
}: BigSelectBoxProps) => {
  /**
   * セレクトボックス
   *
   * @param {SmallSelectBoxProps} props - セレクトボックスのコンポーネントのプロパティ。
   * @param {} props.optionArray - オプションの内容の配列です。セレクトボックスを展開した際に表示されます。
   * @returns {JSX.Element} 大きめのセレクトボックスを返します。
   */

  return (
    <>
      {labelText && <label className="mr-4">{labelText}</label>}
      <select
        className="border-2 rounded-lg pl-5 pr-20 py-3 text-left"
        name="dateSelect"
        id="dateSelect"
        defaultValue={optionArray[0]?.label}
        onChange={e => handleSelectChange(e.target.value)}
      >
        {optionArray.map(value => (
          <option key={value.id} value={value.label}>
            {value.label}
          </option>
        ))}
      </select>
    </>
  );
};
export default BigSelectBox;
