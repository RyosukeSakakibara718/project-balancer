import type { MemberData } from "../types/member";
const apiUrl = import.meta.env.VITE_API_URL;

export const getMemberAll = (): Promise<MemberData[]> => {
  return fetch(`${apiUrl}/v1/members`)
    .then(response => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then(data => {
      return data.members; // members プロパティにアクセスして返す
    });
};

export const editMember = (
  id: number,
  memberData: MemberData,
): Promise<boolean> => {
  return fetch(`${apiUrl}/v1/members/${id}`, {
    method: "POST",
    headers: {
      "X-HTTP-Method-Override": "PUT",
      "Content-Type": "application/json", // リクエストのContent-TypeをJSONに設定
    },
    body: JSON.stringify(memberData), // JavaScriptオブジェクトをJSON文字列に変換してリクエストボディに設定
  })
    .then(response => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return true;
    })
    .then(data => {
      return data; // 必要に応じてデータを返す
    })
    .catch(error => {
      throw error; // エラーを再スローして呼び出し元でも処理できるようにする
    });
};

export const deleteMember = (id: number): Promise<boolean> => {
  return fetch(`${apiUrl}/v1/members/${id}`, { method: "DELETE" })
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

export const addMember = (memberData: MemberData): Promise<boolean> => {
  return fetch(`${apiUrl}/v1/members`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json", // リクエストのContent-TypeをJSONに設定
    },
    body: JSON.stringify(memberData), // JavaScriptオブジェクトをJSON文字列に変換してリクエストボディに設定
  })
    .then(response => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return true;
    })
    .then(data => {
      return data; // 必要に応じてデータを返す
    })
    .catch(error => {
      throw error; // エラーを再スローして呼び出し元でも処理できるようにする
    });
};
