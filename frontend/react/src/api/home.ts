import axios from "axios";

// TODO URLの変更anyの変更
export const getHomeData = async (ProjectId: number): Promise<any> => {
  try {
    const response = await axios.get(
      `http://localhost/v1/homeInformation/${ProjectId}`,
    );
    return response;
  } catch (error) {
    console.error("Error in fetching home data:", error);
    return null;
  }
};
