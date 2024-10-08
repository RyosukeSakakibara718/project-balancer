import React from "react";

type SearchBoxProps = {
  searchValue: string;
  placeholder: string;
  setSearchValue: (value: string) => void;
  setShowData: () => void;
};

/**
 * 検索ボックスコンポーネント。
 * ユーザーが入力した値を受け取り、Enterキーを押下または検索ボタン押下で検索データを表示します。
 *
 * @param {SearchBoxProps} props - 検索ボックスのプロパティ
 * @param {string} props.searchValue - 現在の検索ボックスの値。
 * @param {function} props.setSearchValue - 入力フィールドのプレースホルダー。デフォルトは "検索ワードを入力してください..."。
 * @param {function} props.setShowData - 検索ボックスの値を更新するための関数。
 * @param {string} props.placeholder - データを表示するための関数。
 * @returns {JSX.Element} 検索ボックスのJSX要素を返します。
 */
const SearchBox: React.FC<SearchBoxProps> = ({
  searchValue,
  setSearchValue,
  setShowData,
  placeholder = "検索ワードを入力してください...",
}) => {
  /**
   * 入力値の変更時に呼び出されるハンドラ関数。
   * 検索値をstateに保存します。
   * @param {React.ChangeEvent<HTMLInputElement>} e - 入力イベント。
   */
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  /**
   * enter押下時に呼び出されるハンドラ関数。
   * searchValueの値をもとに検索を行い、表示用のデータを用意します。
   * @param {React.KeyboardEvent<HTMLInputElement>} e - 入力イベント。
   */
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setShowData();
    }
  };

  return (
    <div>
      <input
        type="text"
        value={searchValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="w-[400px] p-2.5 pr-12 bg-gray-100 rounded-lg outline-none"
      />
    </div>
  );
};

export default SearchBox;
