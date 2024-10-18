const apiUrl = import.meta.env.VITE_API_URL;

export const getProjectsAll = (): Promise<[]> => {
  return fetch("${apiUrl}/v1/projects")
    .then(response => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then(data => {
      return data.projects; // members プロパティにアクセスして返す
    });
};

export const deleteProjects = (id: number): Promise<boolean> => {
  return fetch(`${apiUrl}/v1/projects/${id}`, { method: "DELETE" })
    .then(response => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return true; // 成功した場合に true を返す
    })
    .catch(error => {
      throw error; // エラーを再スローして呼び出し元でも処理できるようにする
    });
};
