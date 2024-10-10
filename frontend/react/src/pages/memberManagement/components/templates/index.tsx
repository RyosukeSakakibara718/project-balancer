import React, { useEffect, useState } from "react";

import AddOpenButton from "../../../../components/atoms/button/AddOpenButton";
import Spacer from "../../../../components/atoms/Spacer";
import AddModal from "../../../../components/molecules/modal/AddModal";
import DeleteModal from "../../../../components/molecules/modal/DeleteModal";
import EditModal from "../../../../components/molecules/modal/EditModal";
import TableRow from "../../../../components/molecules/row/TableRow";
import SearchBar from "../../../../components/molecules/SearchBar";
import TableHeader from "../../../../components/molecules/TableHeader";
import { MEMBER_MANAGEMENT_TABLE_HEADER } from "../../../../constants/index";
import {
  getMemberAll,
  editMember,
  deleteMember,
  addMember,
} from "../../../../hooks/useMember";

import type { MemberData } from "../../../../types/member";
import Loading from "../../../../components/molecules/Loading";
/**
 * メンバーの一覧を表示し、追加・編集・削除を行うテーブルコンポーネント。
 *
 * @component
 * @param {MemberTableProps} props - コンポーネントに渡されるプロパティ。
 * @param {Array} props.data - メンバーのデータリスト。
 * @returns {JSX.Element} MemberTableコンポーネントを返します。
 */
const MemberTable: React.FC = () => {
  const initialFormData = {
    id: 0,
    name: "",
    rank: 0,
    base_cost: 0,
    base_cost_start_date: "",
  };

  const [memberData, setMemberData] = useState<MemberData[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isAddModalOpen, seAddeteModalOpen] = useState(false);
  const [showData, setShowData] = useState(memberData);
  const [searchValue, setSearchValue] = useState("");
  const [targetData, setTargetData] = useState<MemberData>(initialFormData);
  const [addData, setAddData] = useState<MemberData>(initialFormData);

  // モーダルオープン時の表示用

  useEffect(() => {
    getMemberAll()
      .then(members => {
        if (members !== null) {
          setMemberData(members); // データがnullでない場合にセット
          setShowData(members);
        }
        setLoading(false); // ローディングを終了
      })
      .catch(error => {
        console.error("Error fetching member data:", error);
        setLoading(false); // エラーが発生してもローディングを終了
      });
  }, []);

  /**
   * 編集モーダルを開く
   * @param {number} id - 編集対象のメンバーID
   */
  const handleOpenEditModal = (id: number) => {
    setIsEditModalOpen(true);
    setTargetData(memberData[id]);
  };

  /**
   * 編集モーダルを閉じる
   */
  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
  };

  /**
   * 削除モーダルを開く
   * @param {number} id - 削除対象のメンバーID
   */
  const handleOpenDeleteModal = (id: number) => {
    setIsDeleteModalOpen(true);
    setTargetData(memberData[id]);
  };

  /**
   * 削除モーダルを閉じる
   */
  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  /**
   * 追加モーダルを開く
   */
  const handleOpenAddModal = () => {
    seAddeteModalOpen(true);
  };

  /**
   * 追加モーダルを閉じる
   */
  const handleCloseAddModal = () => {
    seAddeteModalOpen(false);
  };

  /**
   * 検索条件に一致するメンバーをフィルタリング
   * @returns {Array} フィルタリングされたメンバーリスト
   */
  const filteredMembers = memberData.filter(member =>
    Object.values(member).some(value =>
      value.toString().toLowerCase().includes(searchValue.toLowerCase()),
    ),
  );

  /**
   * 検索結果を表示するためにデータを更新
   */
  const changeShowData = () => {
    setShowData(filteredMembers);
  };

  /**
   * 検索結果をクリアし、すべてのメンバーを表示
   */
  const clearShowData = () => {
    setShowData(memberData);
    setSearchValue("");
  };

  /**
   * fetchが完了するまで表示するDOM
   */
  if (loading) {
    return (
      <Loading />
    );
  }
  /**
   * 編集モーダル内で値が変更された際にstateを変更する関数
   * @param {string} fieldName - 変更する値のフィールド
   * @param {string | number} value - 変更する値
   */
  const handleValueChange = (fieldName: string, value: string | number | Date) => {
    setTargetData(prevData => ({
      ...prevData,
      [fieldName]: value, // フィールド名をキーとして、新しい値をセット
    }));
  };

  const handleAddValueChange = (fieldName: string, value: string | number | Date) => {
    setAddData(prevData => ({
      ...prevData,
      [fieldName]: value, // フィールド名をキーとして、新しい値をセット
    }));
  };

  const handleSubmitEditData = () => {
    editMember(targetData.id, targetData)
      .then(response => {
        console.log("Edit successful:", response);
        // 編集が成功したら、メンバーリストを再取得
        getMemberAll()
          .then(members => {
            if (members !== null) {
              setMemberData(members); // データがnullでない場合にセット
              setShowData(members);
            }
            setLoading(false); // ローディングを終了
          })
          .catch(error => {
            console.error("Error fetching member data:", error);
            setLoading(false); // エラーが発生してもローディングを終了
          });
      })
      .catch(error => {
        console.error("Error during edit:", error);
        // エラー時の処理
      });
  };

  const handleDeleteMember = () => {
    deleteMember(targetData.id)
      .then(response => {
        console.log("Edit successful:", response);
        // 編集が成功したら、メンバーリストを再取得
        getMemberAll()
          .then(members => {
            if (members !== null) {
              setMemberData(members); // データがnullでない場合にセット
              setShowData(members);
            }
            setLoading(false); // ローディングを終了
          })
          .catch(error => {
            console.error("Error fetching member data:", error);
            setLoading(false); // エラーが発生してもローディングを終了
          });
      })
      .catch(error => {
        console.error("Error during edit:", error);
        // エラー時の処理
      });
  };

  const handleAddMember = () => {
    addMember(addData)
      .then(response => {
        console.log("Edit successful:", response);
        // 編集が成功したら、メンバーリストを再取得
        getMemberAll()
          .then(members => {
            if (members !== null) {
              setMemberData(members); // データがnullでない場合にセット
              setShowData(members);
            }
            setLoading(false); // ローディングを終了
          })
          .catch(error => {
            console.error("Error fetching member data:", error);
            setLoading(false); // エラーが発生してもローディングを終了
          });
      })
      .catch(error => {
        console.error("Error during edit:", error);
        // エラー時の処理
      });
  };

  return (
    <>
      <div className="shadow-lg rounded-lg overflow-hidden p-8">
        <SearchBar
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          clearSearchValue={clearShowData}
          setShowData={changeShowData}
        />
        <Spacer height="20px" />
        <div className="flex justify-end mr-2.5">
          <AddOpenButton
            onOpen={handleOpenAddModal}
            buttonText="メンバーを追加"
          />
        </div>
        <Spacer height="20px" />
        <div className="overflow-hidden rounded-lg shadow-md">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <TableHeader columns={MEMBER_MANAGEMENT_TABLE_HEADER} />
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {showData.map((item, index) => {
                return (
                  <TableRow
                    id={item.id}
                    name={item.name}
                    rank={item.rank}
                    base_cost={item.base_cost}
                    base_cost_start_date={item.base_cost_start_date}
                    isEditModalOpen={() => handleOpenEditModal(index)}
                    isDeleteModalOpen={() => handleOpenDeleteModal(index)}
                  />
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      {isAddModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="relative bg-white rounded-lg p-8 shadow-lg z-10">
            <AddModal
              onClose={handleCloseAddModal}
              data={addData}
              index={memberData.length}
              handleAddValueChange={handleAddValueChange}
              handleAddMember={handleAddMember}
            />
          </div>
        </div>
      )}
      {isEditModalOpen && targetData && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="relative bg-white rounded-lg p-8 shadow-lg z-10">
            <EditModal
              onClose={handleCloseEditModal}
              editData={targetData}
              handleValueChange={handleValueChange}
              handleSubmitEditData={handleSubmitEditData}
            />
          </div>
        </div>
      )}
      {isDeleteModalOpen && targetData && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="relative bg-white rounded-lg p-8 shadow-lg z-10">
            <DeleteModal
              onClose={handleCloseDeleteModal}
              data={targetData}
              handleDelete={handleDeleteMember}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default MemberTable;
