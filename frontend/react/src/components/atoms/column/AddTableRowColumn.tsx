import React, { useState } from 'react';

type AddTableRowColumnProps = {
  width?: string;
  onChange: (value: string) => void;
};

/**
 * 追加モーダルに表示するメンバー情報の行を構成するセルコンポーネント。
 *
 * @param {AddTableRowColumnProps} props - セルコンポーネントに渡されるプロパティオブジェクト。
 * @param {string} props.width - セルの幅。
 * @param {function} props.onChange - 値が変更されるごとにaddModalコンポーネントで管理するstateを変更する関数。
 * @returns {JSX.Element} 追加モーダルで表示される行を構成するセルを返します。
 */
const AddTableRowColumn: React.FC<AddTableRowColumnProps> = ({ width, onChange }) => {

  const [value, setValue] = useState("");

  /**
  * 値が変更されたときに呼び出されるハンドラ関数。
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
    className={`font-bold px-4 py-3 text-left border-b border-[#e1cfff] text-gray-800 whitespace-nowrap `}
      style={{ width: width }}
    >
      <input 
        type="text" 
        value={value}
        onChange={handleChange}
        className="bg-customPurple w-full px-3 py-2 border border-black rounded-md box-border text-base text-gray-800 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 placeholder-gray-400"
      />
    </th>
  );
};

export default AddTableRowColumn;