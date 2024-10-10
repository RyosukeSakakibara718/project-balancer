import React, { useState } from "react";

type EditTableColumnProps = {
  width?: string;
  initialValue: string | number;
  onChange: (value: string) => void;
  inputType?: string;
};

/**
 * 編集モーダルに表示するメンバー情報の行を構成するセルコンポーネント。
 *
 * @param {EditTableColumnProps} props - セルコンポーネントに渡されるプロパティオブジェクト。
 * @param {string} props.width - セルの幅。
 * @param {string | number} props.initialValue - そのセルに表示される値の初期値。
 * @param {function} props.onChange - 値が変更されるごとにEditModalコンポーネントで管理するstateを変更する関数。
 * @returns {JSX.Element} 編集モーダルで表示される行を構成するセルを返します。
 */
const EditTableColumn: React.FC<EditTableColumnProps> = ({
  width,
  initialValue,
  onChange,
  inputType,
}) => {
  const [value, setValue] = useState(initialValue);

  /**
   * セルの値が変更されたときに呼び出されるハンドラ関数。
   * 新しい値をstateに設定し、`onChange` コールバックを呼び出します。
   *
   * @param {React.ChangeEvent<HTMLInputElement>} event - 入力イベント。
   */
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setValue(newValue);
    onChange(newValue);
  };

  return (
    <th
      className={`font-bold px-2 py-3 text-left border-b border-[#e1cfff] text-gray-800 whitespace-nowrap`}
      style={{ width: width }}
    >
      <input
        type={inputType ? inputType : "text"}
        value={value}
        onChange={handleChange}
        className="bg-customPurple w-full px-2 py-2 border border-black rounded-md box-border text-base text-gray-800 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 placeholder-gray-400"
      />
    </th>
  );
};

export default EditTableColumn;
