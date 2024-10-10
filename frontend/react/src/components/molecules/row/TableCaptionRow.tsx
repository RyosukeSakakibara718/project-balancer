import React from "react";
import { MdOutlineModeEdit, MdDeleteOutline } from "react-icons/md";

type TableCaptionRowProps = {
  value: string;
  isHome?: boolean;
  isEdit?: boolean;
  setIsEdit?: React.Dispatch<React.SetStateAction<boolean>> | undefined;
};

/**
 * テーブルヘッダーを構成するセルコンポーネント
 *
 * @param {TableCaptionRowProps} props - セルコンポーネントに渡されるプロパティオブジェクト。
 * @param {function} props.value - セルに表示される値。
 * @returns {JSX.Element} ヘッダーを構成するセルを返します。
 */

const TableCaptionRow: React.FC<TableCaptionRowProps> = ({
  value,
  isHome,
  isEdit,
  setIsEdit,
}: TableCaptionRowProps): JSX.Element => {
  const handleEditClick = () => {
    if (setIsEdit) setIsEdit(!isEdit);
  };
  const handleCancelClick = () => {
    if (setIsEdit) setIsEdit(!isEdit);
  };

  const handleDecideClick = () => {
    // TODOここで保存API
    if (setIsEdit) setIsEdit(!isEdit);
  };

  const handleDeleteClick = () => {
    // TODOここでコメント削除API
    alert("削除しました。");
  };
  return (
    <tr>
      <th
        colSpan={100}
        className="bg-[#EEE3FF] py-3 px-4 text-left border-b border-[#e1cfff] whitespace-nowrap w-full"
      >
        <div className="flex justify-between items-center">
          <span className="font-bold">{value}</span>
          {isHome && (
            <div className="flex space-x-2">
              {isEdit ? (
                <>
                  <button
                    className="border border-gray-400 rounded-md px-6 py-1"
                    onClick={handleCancelClick}
                  >
                    キャンセル
                  </button>
                  <button
                    className="border border-gray-400 rounded-md px-6 py-1"
                    onClick={handleDecideClick}
                  >
                    保存
                  </button>
                </>
              ) : (
                <>
                  <button
                    className="flex items-center space-x-1 hover:text-gray-600 py-1"
                    onClick={handleEditClick}
                  >
                    <MdOutlineModeEdit />
                    <span>編集</span>
                  </button>
                  <button
                    className="flex items-center space-x-1 hover:text-gray-600 py-1"
                    onClick={handleDeleteClick}
                  >
                    <MdDeleteOutline />
                    削除
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </th>
    </tr>
  );
};

export default TableCaptionRow;
