import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import AddOpenButton from "../../../../components/atoms/button/AddOpenButton";
import Spacer from "../../../../components/atoms/Spacer";
import SearchBar from "../../../../components/molecules/SearchBar";
import TableHeader from "../../../../components/molecules/TableHeader";
import {
  PROJEÇT_MANAGEMENT_TABLE_HEADER,
  PROJEÇT_MANAGEMENT_MODAL_COLUMNS,
} from "../../../../constants/index";
import { getProjectsAll, deleteProjects } from "../../../../hooks/useProjects";
import { ProjectData } from "../../../../types/project";
import DeleteModal from "../molecules/modal/DeleteModal";
import TableRow from "../molecules/row/TableRow";
import Loading from "../../../../components/molecules/Loading";

/**
 *  案件の一覧を表示し・検索できるコンポーネント。
 *
 * @component
 * @param {ProjectManagementProps} props - コンポーネントに渡されるプロパティ。
 * @param {Array} props.data - メンバーのデータリスト。
 * @returns {JSX.Element} ProjectManagementコンポーネントを返します。
 */
const ProjectManagement= () => {
  // TODO PMの中身実装
  const [showData, setShowData] = useState<ProjectData[]>([]);
  const [projectsData, setProjectsData] = useState<ProjectData[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const [originalData, setOriginalData] = useState<ProjectData[]>([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [targetData, setTargetData] = useState<ProjectData>();

  const getProjectsData = () => {
    getProjectsAll()
      .then(projects => {
        if (projects !== null) {
          setProjectsData(projects);
          setShowData(projects);
          setOriginalData(projects)
        }
        setLoading(false); // ローディングを終了
      })
      .catch(error => {
        console.error("Error fetching member data:", error);
        setLoading(false); // エラーが発生してもローディングを終了
      });
  };

  useEffect(() => {
    getProjectsData();
  }, []);

  const handleDeleteProjects = () => {
    if (targetData) {
      deleteProjects(targetData.id)
        .then(response => {
          console.log("Edit successful:", response);
          // 削除が変更したら再度取得し直し、再レンダリングするようにする
          getProjectsData();
        })
        .catch(error => {
          console.error("Error during edit:", error);
          // エラー時の処理
        });
    }
  };

  const handleAddButtonClick = () => {
    // TODO新規案件作成パスを指定
    navigate("/projectManagement/detail");
  };

  const handleEditButtonClick = () => {
    // TODO編集先のページのパスを指定
    navigate("/projectManagement/detail/{}");
  };

  /**
   * 削除モーダルを開く
   * @param {number} id - 削除対象のメンバーID
   */
  const handleOpenDeleteModal = (id: number) => {
    setTargetData(projectsData[id]);
    setIsDeleteModalOpen(true);
  };

  /**
   * 削除モーダルを閉じる
   */
  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };
  /**
   * 検索条件に一致するメンバーをフィルタリング
   * @returns {Array} フィルタリングされたメンバーリスト
   */
  const filteredMembers = showData.filter(member =>
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
    setShowData(originalData);
    setSearchValue("");
  };

  if (loading) {
    return <Loading />;
  }

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
            onOpen={handleAddButtonClick}
            buttonText="案件を追加"
          />
        </div>
        <Spacer height="20px" />
        <div className="overflow-hidden rounded-lg shadow-md">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <TableHeader columns={PROJEÇT_MANAGEMENT_TABLE_HEADER} />
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {showData.map((item, index) => (
                <TableRow
                  id={item.id}
                  name={item.name}
                  start_date={item.start_date}
                  end_date={item.end_date}
                  project_manager={item.project_manager}
                  isEditPageOpen={handleEditButtonClick}
                  isDeleteModalOpen={() => handleOpenDeleteModal(index)}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {isDeleteModalOpen && targetData && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="relative bg-white rounded-lg p-8 shadow-lg z-10">
            <DeleteModal
              handleDelete={handleDeleteProjects}
              onClose={handleCloseDeleteModal}
              data={targetData}
              columns={PROJEÇT_MANAGEMENT_MODAL_COLUMNS}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ProjectManagement;
