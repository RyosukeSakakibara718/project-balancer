import { ProjectAchievementsData } from "../../../types/project";

export const getProjectsAchievements = (id: number): Promise<ProjectAchievementsData> => {
  return fetch(`http://localhost/v1/projectsAchievements/${id}`)
    .then(response => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then(data => {
      return data;
    });
};

export const editProjectsAchievements = (
  projectsAchievements: ProjectAchievementsData,
  id: number,
): Promise<boolean> => {
  return fetch(`http://localhost/v1/projectsAchievements/${id}`, {
    method: "POST",
    headers: {
      "X-HTTP-Method-Override": "PUT",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(projectsAchievements),
  })
  .then(response => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return true;
  })
  .then(data => {
    return data;
  })
  .catch(error => {
    throw error;
  });
};