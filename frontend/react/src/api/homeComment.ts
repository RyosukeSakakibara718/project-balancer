import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;

export const getHomeComment = async (ProjectId: number): Promise<any> => {
  try {
    const response = await axios.get(
      `${apiUrl}/v1/projects/${ProjectId}/comments`,
    );

    return response.data;
  } catch (error) {
    console.error("Error in fetching home data:", error);
    return null;
  }
};

export const createHomeComment = async (
  projectId: number,
  newComment: string,
): Promise<boolean> => {
  try {
    const response = await axios.post(
      `${apiUrl}/v1/projects/${projectId}/comments`,
      { comment: newComment },
    );
    return response.status === 201;
  } catch (error) {
    console.error("Error updating comment:", error);
    return false;
  }
};

export const deleteHomeComment = async (
  projectId: number,
  commentId: number,
): Promise<boolean> => {
  try {
    await axios.delete(
      `${apiUrl}/v1/projects/${projectId}/comments/${commentId}`,
    );
    return true;
  } catch (error) {
    console.error("Error in deleting comment:", error);
    return false;
  }
};

export const updateHomeComment = async (
  projectId: number,
  commentId: number,
  newComment: string,
): Promise<boolean> => {
  try {
    const response = await axios.put(
      `${apiUrl}/v1/projects/${projectId}/comments/${commentId}`,
      { comment: newComment },
    );
    return response.status === 201;
  } catch (error) {
    console.error("Error updating comment:", error);
    return false;
  }
};
