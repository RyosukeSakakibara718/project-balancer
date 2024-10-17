export const getProjectsAchievements = (id: number): Promise<[]> => {
  return fetch(`http://localhost/v1/projectsAchievements/${id}`)
    .then(response => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then(data => {
      console.log('data.projects: ', data.project);
      return data.project;
    });
};