import React, { useEffect, useState } from "react";

import TableCaptionRow from "../../../../../src/components/molecules/row/TableCaptionRow";
import { getHomeComment } from "../../../../api/homeComment";
import TextArea from "../../../../components/atoms/box/TextArea";
import Spacer from "../../../../components/atoms/Spacer";
import { HomeComment, HomeCommentProps } from "../../../../types/home";

const CommentBox = ({ projectId }: HomeCommentProps) => {
  /**
   * コメントを表示、追加・編集・削除を行うコンポーネント。
   * @component
   * @param {CommentBoxProps} props - コンポーネントに渡されるプロパティ。
   * @returns {JSX.Element} CommentBox コンポーネントを返します。
   */

  const [homeComment, setHomeComment] = useState<HomeComment[]>([]);
  const [loading, setLoading] = useState(true);
  const [editStates, setEditStates] = useState<Record<number, boolean>>({});

  useEffect(() => {
    if (projectId) {
      const fetchData = async () => {
        const homeCommentData = await getHomeComment(projectId);
        setHomeComment(homeCommentData);
        setLoading(false);

        const initialEditStates: Record<number, boolean> = {};
        homeCommentData.forEach((comment: HomeComment) => {
          initialEditStates[comment.id] = false;
        });
        setEditStates(initialEditStates);
      };
      fetchData();
    }
  }, [projectId]);

  const handleCommentChange = (id: number, newComment: string) => {
    setHomeComment(prevComments =>
      prevComments.map(comment =>
        comment.id === id ? { ...comment, comment: newComment } : comment,
      ),
    );
  };

  const toggleEditState = (id: number) => {
    setEditStates(prevStates => ({
      ...prevStates,
      [id]: !prevStates[id],
    }));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {homeComment.map(comment => (
        <React.Fragment key={comment.id}>
          <div className="overflow-hidden rounded-lg border-2 my-2">
            <table className="min-w-full divide-y rounded-lg">
              <thead>
                <TableCaptionRow
                  value={`コメント (user名2024/01/01)`}
                  isHome={true}
                  isEdit={editStates[comment.id]}
                  setIsEdit={() => toggleEditState(comment.id)}
                />
              </thead>
              <tbody>
                <tr>
                  <td className="p-4">
                    <TextArea
                      value={comment.comment}
                      onChange={e =>
                        handleCommentChange(comment.id, e.target.value)
                      }
                      isEdit={editStates[comment.id]}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <Spacer height="20px" />
        </React.Fragment>
      ))}
    </>
  );
};
export default CommentBox;
