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
