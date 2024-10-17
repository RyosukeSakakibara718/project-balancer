import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;

export const getHomeData = async (ProjectId: number): Promise<any> => {
  try {
    const response = await axios.get(
      `${apiUrl}/v1/homeInformation/${ProjectId}`,
    );
    return response.data;
  } catch (error) {
    console.error("Error in fetching home data:", error);
    return null;
  }
};
