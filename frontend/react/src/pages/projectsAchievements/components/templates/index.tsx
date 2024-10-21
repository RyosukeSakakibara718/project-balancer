import { useEffect, useState } from "react";

import BigSelectBox from "../../../../components/atoms/box/BigSelectBox";
import SmallSelectBox from "../../../../components/atoms/box/SmallSelectBox";
import AddButton from "../../../../components/atoms/button/AddButton";
import Spacer from "../../../../components/atoms/Spacer";
import { OPTIONS_ARRAY } from "../../../../constants";
import { projectDetailData } from "../../../../data/projectDetail";
import {
  sampleProjectAchievementsData,
  ProjectName,
  initialBetween,
} from "../../../../data/projectsArchivements";
import {
  AssignmentMember,
  optionsArrayProps,
  ProjectAchievementsData,
  WorkCost,
  Period,
  OptionList,
  ProjectData,
} from "../../../../types/project";
import { countBusinessDaysInMonth } from "../../../../utils/projectsAchievements";
import ProjectArchiveBody from "../molecules/row/ProjectArchiveBody";
import ProjectArchiveHeader from "../molecules/row/ProjectArchiveHeader";
import { getProjectManagementDetail } from "../../../projectManagementDetail/api/useProjectManagementDetail";
import { getProjectsAll } from "../../../../hooks/useProjects";
import { editProjectsAchievements, getProjectsAchievements } from "../../api/useProjectsAchievements";

const ProjectsAchievements = () => {
  const [projectData, setProjectData] = useState<ProjectAchievementsData>(
    sampleProjectAchievementsData,
  );

  const [between, setBetween] = useState<optionsArrayProps>(initialBetween);
  const [currentPage, setCurrentPage] = useState(0);

  const itemsPerPage = 7;
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const [projectList, setProjectList] = useState<OptionList[]>(ProjectName);
  const [currentProject, setCurrentProject] = useState<OptionList>();
  const [currentProjectDetail, setCurrentProjectDetail] = useState(projectDetailData);

  useEffect(() => {
    getProjectsAll()
      .then(projects => {
        if (projects !== null) {
          const ProjectName = (projects as ProjectData[]).map(project => ({
            id: project.id,
            name: project.name,
            label: project.name,
          }));
          setProjectList(ProjectName);
          setCurrentProject(ProjectName[0]);
        }
      })
      .catch(error => {
        console.error("Error fetching member data:", error);
      });
  }, []);

  useEffect(() => {
    if (currentProject) {
      getProjectsAchievements(currentProject.id)
    }
  }, [currentProject]);

  const handleSelectChange = (selectedLabel: string) => {
    const selectedProject = projectList.find(
      option => option.label === selectedLabel,
    );
    if (selectedProject) {
      setCurrentProject(selectedProject); // 選択されたプロジェクトをstateに保存
    }
  };

  const getSundayOfWeek = (date: string) => {
    const dateObj = new Date(date);
    const dayOfWeek = dateObj.getDay();
    const diff = dayOfWeek === 0 ? 0 : dayOfWeek;
    const sundayDate = new Date(dateObj);
    sundayDate.setDate(dateObj.getDate() - diff + 1);
    return sundayDate.toISOString().split("T")[0];
  };

  const getMonthYear = (date: string) => {
    const dateObj = new Date(date);
    const year = dateObj.getFullYear();
    const month = (dateObj.getMonth() + 1)
      .toString()
      .padStart(2, "0");
    return `${year}/${month}`;
  };

  useEffect(() => {
    if (currentProject?.id) {
      getProjectsAchievements(currentProject.id)
        .then(project => {
          if (project !== null) {
            // projectデータを加工してからsetProjectDataを呼び出す
            const updatedProject = {
              ...project,
              project: {
                ...project.project,
                assignment_members: project.project.assignment_members.map(
                  member => {
                    return {
                      ...member,
                      work_costs: member.work_costs.map(workCost => {
                        const workWeek = getSundayOfWeek(workCost.work_date);
                        const workMonth = getMonthYear(workCost.work_date);
                        return {
                          ...workCost,
                          work_week: workWeek,
                          work_month: workMonth,
                        };
                      }),
                    };
                  },
                ),
              },
            };

            setProjectData(updatedProject);
          }
        })
        .catch(error => {
          console.error("Error fetching member data:", error);
        });
      getProjectManagementDetail(String(currentProject?.id))
        .then(projectDetail => {
          if (projectDetail !== null) {
            setCurrentProjectDetail(projectDetail);
          }
        })
        .catch(error => {
          console.error("Error fetching member data:", error);
        });
    }
  }, [currentProject]);

  const Period = getDatesBetween(
    currentProjectDetail.project.projects_data.start_date,
    currentProjectDetail.project.projects_data.end_date,
  );

  const currentDates = Period.slice(startIndex, endIndex);
  const [showPeriod, setShowPeriod] = useState(currentDates);

  const convertWorkTimeToDecimal = (workTime: string): number => {
    const [hours, minutes] = workTime.split(":").map(Number); // 時間と分を分解して数値に変換
    return hours + minutes / 60; // 時間と分を小数形式に変換
  };

  const handleWorkCostChange = (
    memberId: number,
    workDate: string,
    workTime: string,
  ) => {
    setProjectData(prevData => {
      return {
        ...prevData,
        project: {
          ...prevData.project,
          assignment_members: prevData.project.assignment_members.map(
            member => {
              if (member.member_id === memberId) {
                const businessDays = countBusinessDaysInMonth(workDate);
                const workTimeDecimal: number =
                  convertWorkTimeToDecimal(workTime);
                const dailyCost = Math.ceil(
                  (member.base_cost / businessDays) * workTimeDecimal,
                );

                const workWeek = getSundayOfWeek(workDate);
                const workMonth = getMonthYear(workDate);

                const existingCostIndex = member.work_costs.findIndex(
                  cost => cost.work_date === workDate,
                );

                if (existingCostIndex !== -1) {
                  const updatedWorkCosts = member.work_costs
                    .map((cost, index) => {
                      if (index === existingCostIndex) {
                        const workTimeDecimal = convertWorkTimeToDecimal(workTime)
                        return workTimeDecimal === 0
                          ? null
                          : {
                              ...cost,
                              work_time: workTime,
                              daily_cost: dailyCost,
                            };
                      }
                      return cost;
                    })
                    .filter(Boolean) as WorkCost[];

                  return {
                    ...member,
                    work_costs: updatedWorkCosts,
                  };
                } else if (workTimeDecimal !== 0) {
                  return {
                    ...member,
                    work_costs: [
                      ...member.work_costs,
                      {
                        daily_cost: dailyCost,
                        work_time: workTime,
                        work_date: workDate,
                        work_week: workWeek,
                        work_month: workMonth,
                      },
                    ],
                  };
                }
              }
              return member;
            },
          ),
        },
      };
    });
  };

  const handleChangeBetween = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = Number(e.target.value);
    const selectedOption = OPTIONS_ARRAY.find(
      option => option.id === selectedId,
    );
    if (selectedOption) {
      setBetween(selectedOption);
    }
  };


  const handleRegister = async () => {
    const updatedProjectData = JSON.parse(JSON.stringify(projectData));

    updatedProjectData.project.assignment_members.forEach(
      (member: AssignmentMember) => {
        member.work_costs.forEach((workCost: WorkCost) => {
          delete workCost.work_week;
          delete workCost.work_month;
        });
      },
    );
    try {
      if (currentProject){
        await editProjectsAchievements(updatedProjectData, currentProject.id)
      }
      alert('登録が完了しました')
      window.location.reload();
    } catch (error) {
      console.error('エラーが発生しました', error);
    }
  };

  useEffect(() => {
    if (between.id === 1) {
      setShowPeriod(currentDates);
    } else if (between.id === 2) {
      setShowPeriod(
        getEvery7thElementFromFirst(Period).slice(startIndex, endIndex),
      );
    } else if (between.id === 3) {
      setShowPeriod(extractMonths(Period).slice(startIndex, endIndex));
    }
  }, [between, currentPage]);

  const handleNext = () => {
    if (endIndex < Period.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrev = () => {
    if (startIndex > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  function getEvery7thElementFromFirst(arr: Period[]) {
    return arr
      .filter((_, index) => index % 7 === 0)
      .map(item => ({
        ...item,
        dayOfWeek: 8,
      }));
  }

  function extractMonths(data: Array<{ dayOfWeek: number; day: string }>) {
    const monthsSet = new Set<string>();
    const result: Array<{ dayOfWeek: number; day: string }> = [];

    data.forEach(item => {
      const [year, month] = item.day.split("/");
      const formattedMonth = `${year}/${month.padStart(2, "0")}`;

      if (!monthsSet.has(formattedMonth)) {
        monthsSet.add(formattedMonth);
        result.push({
          dayOfWeek: 8,
          day: formattedMonth,
        });
      }
    });

    return result;
  }

  /**
   * 指定された開始日から終了日までの全ての日付と曜日を取得する関数。
   * 日曜日から土曜日を 1 〜 7 として、それに対応する曜日とフォーマットされた日付を配列で返す。
   * 開始日の前の日曜日も含めて配列に追加される。
   */
  function getDatesBetween(startDate: Date, endDate: Date) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    // 1を日曜日としてそこから7を土曜日と見立てる
    const daysOfWeek = [1, 2, 3, 4, 5, 6, 7];
    const result = [];
    const firstDayOfWeek = daysOfWeek[start.getDay()];

    if (firstDayOfWeek !== 1) {
      const previousSunday = new Date(start);
      previousSunday.setDate(start.getDate() - (firstDayOfWeek - 1));

      for (
        let date = new Date(previousSunday);
        date < start;
        date.setDate(date.getDate() + 1)
      ) {
        const dayOfWeek = daysOfWeek[date.getDay()];
        const formattedDate = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
        result.push({
          dayOfWeek: dayOfWeek,
          day: formattedDate,
        });
      }
    }

    for (
      let date = new Date(start);
      date <= end;
      date.setDate(date.getDate() + 1)
    ) {
      const dayOfWeek = daysOfWeek[date.getDay()];
      const formattedDate = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
      result.push({
        dayOfWeek: dayOfWeek,
        day: formattedDate,
      });
    }

    return result;
  }

  // Date型の時間を秒に変換する関数
  const dateToSeconds = (timeString: string): number => {
    const [hours, minutes, seconds] = timeString.split(":").map(Number);
    return hours * 3600 + minutes * 60 + seconds;
  };

  // 秒を "HH:MM:SS" 形式に変換する関数
  const secondsToTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return [hours, minutes, remainingSeconds]
      .map(unit => String(unit).padStart(2, "0"))
      .join(":");
  };

  // "YYYY/MM/DD" 形式にゼロ埋めなしでフォーマットする関数
  const formatWorkWeek = (dateStr: string | undefined): string | undefined => {
    if (dateStr) {
      const [year, month, day] = dateStr.split("-");
      const formattedMonth = parseInt(month, 10);
      const formattedDay = parseInt(day, 10);
      return `${year}/${formattedMonth}/${formattedDay}`;
    }
  };

  const groupByWorkWeek = (projectData: ProjectAchievementsData) => {
    return {
      ...projectData,
      project: {
        ...projectData.project,
        assignment_members: projectData.project.assignment_members.map(
          (member: AssignmentMember) => {
            const groupedWorkCosts = member.work_costs.reduce(
              (acc: WorkCost[], current: WorkCost) => {
                // work_week を "YYYY/MM/DD" 形式に変換し、ゼロ埋めなし
                const formattedWorkWeek = formatWorkWeek(current.work_week);
                const existingGroup = acc.find(
                  (item: WorkCost) => item.work_week === formattedWorkWeek,
                );

                if (existingGroup) {
                  // 同じ work_week のグループが既にある場合、work_time と daily_cost を加算
                  const existingSeconds = dateToSeconds(
                    existingGroup.work_time,
                  );
                  const currentSeconds = dateToSeconds(current.work_time);

                  const totalSeconds = existingSeconds + currentSeconds;
                  existingGroup.work_time = secondsToTime(totalSeconds);
                  existingGroup.daily_cost += current.daily_cost;
                } else {
                  // 新しい work_week の場合は新しいエントリを追加
                  acc.push({
                    ...current,
                    work_week: formattedWorkWeek,
                  });
                }

                return acc;
              },
              [],
            );

            // メンバーの `work_costs` をグルーピングしたものに置き換える
            return {
              ...member,
              work_costs: groupedWorkCosts,
            };
          },
        ),
      },
    };
  };

  const formatWorkMonth = (dateStr: string) => {
    // 日付が "YYYY/MM/DD" 形式であることを前提に分割して、年と月を取得
    const [year, month] = dateStr.split("/");
    return `${year}/${month}`; // "YYYY/MM" の形式で返す
  };

  const groupByWorkMonth = (projectData: ProjectAchievementsData) => {
    return {
      ...projectData,
      project: {
        ...projectData.project,
        assignment_members: projectData.project.assignment_members.map(
          (member: AssignmentMember) => {
            const groupedWorkCosts = member.work_costs.reduce(
              (acc: WorkCost[], current: WorkCost) => {
                // work_date から work_month を "YYYY/MM" 形式に変換
                const formattedWorkMonth = formatWorkMonth(current.work_date);

                const existingGroup = acc.find(
                  (item: WorkCost) => item.work_month === formattedWorkMonth,
                );

                if (existingGroup) {
                  // 同じ work_month のグループが既にある場合、work_time と daily_cost を加算
                  const existingSeconds = dateToSeconds(
                    existingGroup.work_time,
                  );
                  const currentSeconds = dateToSeconds(current.work_time);

                  const totalSeconds = existingSeconds + currentSeconds;
                  existingGroup.work_time = secondsToTime(totalSeconds);
                  existingGroup.daily_cost += current.daily_cost;
                } else {
                  // 新しい work_month の場合は新しいエントリを追加
                  acc.push({
                    ...current,
                    work_month: formattedWorkMonth,
                  });
                }

                return acc;
              },
              [],
            );

            // メンバーの `work_costs` をグルーピングしたものに置き換える
            return {
              ...member,
              work_costs: groupedWorkCosts,
            };
          },
        ),
      },
    };
  };

  useEffect(() => {
    setCurrentPage(0); // 期間が変更されたら最初のページに戻す

    const updatedStartIndex = 0; // 最初の期間を表示するためのインデックスを0に設定
    const updatedEndIndex = itemsPerPage; // 最初のページの終了インデックス

    if (between.id === 1) {
      // between.id が 1 の場合は日付をそのまま表示
      setShowPeriod(Period.slice(updatedStartIndex, updatedEndIndex));
    } else if (between.id === 2) {
      // between.id が 2 の場合は7日ごとの要素を表示
      setShowPeriod(
        getEvery7thElementFromFirst(Period).slice(
          updatedStartIndex,
          updatedEndIndex,
        ),
      );
    } else if (between.id === 3) {
      setShowPeriod(
        extractMonths(Period).slice(updatedStartIndex, updatedEndIndex),
      );
    }
  }, [between]);

  // 週毎の際に表示する用のデータ
  const dataGroupedByWeek = groupByWorkWeek(projectData);
  // 月毎の際に表示する用のデータ
  const dataGroupedByMonth = groupByWorkMonth(projectData);

  return (
    <>
      <Spacer height="40px" />
      <div className="text-left">
        <BigSelectBox
          optionArray={projectList}
          handleSelectChange={handleSelectChange}
        />
      </div>
      <Spacer height="20px" />
      <div className="text-right">
        <SmallSelectBox
          optionArray={OPTIONS_ARRAY}
          labelText={"期間"}
          between={between}
          onChange={handleChangeBetween} // 状態変更ハンドラを渡す
        />
      </div>
      <Spacer height="40px" />
      <div className="overflow-hidden rounded-lg border-2">
        <table className="min-w-full divide-y rounded-lg">
          <ProjectArchiveHeader
            between={between}
            showPeriod={showPeriod}
            handleNext={handleNext}
            handlePrev={handlePrev}
          />
          {(between.id === 1
            ? projectData.project.assignment_members
            : between.id === 2
              ? dataGroupedByWeek.project.assignment_members
              : dataGroupedByMonth.project.assignment_members
          ).map(member => (
            <ProjectArchiveBody
              key={member.member_id}
              showPeriod={showPeriod}
              member={member}
              onWorkTimeChange={handleWorkCostChange}
              between={between}
            />
          ))}
        </table>
      </div>
      <Spacer height="40px" />
      <AddButton buttonText="登録" handleClick={handleRegister} />
    </>
  );
};

export default ProjectsAchievements;
