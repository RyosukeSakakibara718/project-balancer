import { useEffect, useState } from "react";
import SmallSelectBox from "../../../../components/atoms/box/SmallSelectBox";
import AddButton from "../../../../components/atoms/button/AddButton";
import Spacer from "../../../../components/atoms/Spacer";
import { OPTIONS_ARRAY } from "../../../../constants";
import { projectDetailData } from "../../../../data/projectDetail";
import {
  sampleProjectArchivementsData,
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
  ProjectData
} from "../../../../types/project";
import { countBusinessDaysInMonth } from "../../../../utils/projectsAchievements";
import ProjectArchiveBody from "../molecules/row/ProjectArchiveBody";
import ProjectArchiveHeader from "../molecules/row/ProjectArchiveHeader";
import { getProjectsAll } from "../../../../hooks/useProjects";
import { getProjectsAchievements } from "../../../../hooks/useProjectsAchievements";
import BigSelectBox from "../../../../components/atoms/box/BigSelectBox";

const ProjectsAchievements = () => {
  const [projectData, setProjectData] = useState<ProjectAchievementsData>(
    sampleProjectArchivementsData,
  );
  /**
   * 特定の案件のメンバー別の日単位の日単位の稼働時間の登録/編集ができる。
   * 特定の案件のメンバー別の日/週/月単位の稼働時間と金額を確認できる。
   *
   * @component
   * @param {ProjectsAchievements} props - コンポーネントに渡されるプロパティ。
   * @returns {JSX.Element} ProjectsAchievementsコンポーネントを返します。
   */
  const [between, setBetween] = useState<optionsArrayProps>(initialBetween);
  const [currentPage, setCurrentPage] = useState(0);
  const Period = getDatesBetween(
    projectDetailData.projects.projects_data.start_date,
    projectDetailData.projects.projects_data.end_date,
  );
  const itemsPerPage = 7;
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentDates = Period.slice(startIndex, endIndex);
  const [showPeriod, setShowPeriod] = useState(currentDates);
  const [projectList, setProjectList] = useState<OptionList[]>(ProjectName)
  const [ currentProject, setCurrentProject ] = useState<OptionList>()

  getProjectsAll()
    .then(projects => {
      if (projects !== null) {
        const ProjectName = (projects as ProjectData[]).map(project => ({
          id: project.id,
          name: project.name,
          label: project.name
        }))
        setProjectList(ProjectName)
      }
    })
    .catch(error => {
      console.error("Error fetching member data:", error);
    });

  useEffect(() => {
    // getProjectsAchievements()
  },[])

  const handleSelectChange = (selectedLabel: string) => {
    const selectedProject = projectList.find(option => option.label === selectedLabel);
    if (selectedProject) {
      setCurrentProject(selectedProject); // 選択されたプロジェクトをstateに保存
    }
  };


  useEffect(() => {
    if(currentProject?.id) {
      getProjectsAchievements(currentProject.id)
      .then(project => {
        if (project !== null) {
          console.log('project: ', project);
          
          // setProjectData(projects)
        }
      })
      .catch(error => {
        console.error("Error fetching member data:", error);
      });
    }
  },[currentProject])

  // 稼働時間の入力に応じて日付・稼働時間・金額を管理するstateを更新する関数
  const handleWorkCostChange = (
    memberId: number,
    workDate: string,
    workTime: number,
  ) => {
    setProjectData(prevData => {
      return {
        ...prevData,
        projects: {
          ...prevData.projects,
          assignment_members: prevData.projects.assignment_members.map(
            member => {
              // 対象のメンバーを探す
              if (member.assignment_member_id === memberId) {
                // 対応する営業日数を取得
                const businessDays = countBusinessDaysInMonth(workDate);

                // daily_cost を計算する
                const dailyCost = Math.ceil(
                  (member.base_cost / businessDays) * workTime,
                );

                // `work_week` を計算するための関数（その週の日曜日を取得する）
                // `work_week` を計算するための関数（その週の日曜日を取得する）
                const getSundayOfWeek = (date: string) => {
                  const dateObj = new Date(date);
                  const dayOfWeek = dateObj.getDay();
                  const diff = dayOfWeek === 0 ? 0 : dayOfWeek; // 日曜日ならその日を返す、他の曜日ならその前の日曜日まで戻る
                  const sundayDate = new Date(dateObj);
                  sundayDate.setDate(dateObj.getDate() - diff + 1); // 前の日曜日の日付を設定
                  return sundayDate.toISOString().split("T")[0]; // "YYYY-MM-DD" の形式で返す
                };

                // `work_month` を計算するための関数 (月の部分だけ "YYYY/MM" 形式で返す)
                const getMonthYear = (date: string) => {
                  const dateObj = new Date(date);
                  const year = dateObj.getFullYear();
                  const month = (dateObj.getMonth() + 1)
                    .toString()
                    .padStart(2, "0"); // 月を2桁にフォーマット
                  return `${year}/${month}`; // "YYYY/MM" 形式で返す
                };

                const workWeek = getSundayOfWeek(workDate); // 日曜日の日付を取得
                const workMonth = getMonthYear(workDate); // 月の部分だけを取得

                // 既存の work_costs を確認して、同じ日付があるかどうかをチェック
                const existingCostIndex = member.work_costs.findIndex(
                  cost => cost.work_date === workDate,
                );

                // 同じ日付のエントリが見つかった場合は更新、そうでなければ追加
                if (existingCostIndex !== -1) {
                  // 日付が見つかった場合は、その要素を更新する
                  const updatedWorkCosts = member.work_costs
                    .map((cost, index) => {
                      if (index === existingCostIndex) {
                        // work_time が 0 の場合、null に設定することで削除を示す
                        return workTime === 0
                          ? null
                          : {
                              ...cost,
                              work_time: workTime,
                              daily_cost: dailyCost,
                            };
                      }
                      return cost;
                    })
                    .filter(Boolean) as WorkCost[]; // null を取り除く

                  return {
                    ...member,
                    work_costs: updatedWorkCosts, // WorkCost[] に null が含まれない
                  };
                } else if (workTime !== 0) {
                  // work_time が 0 ではない場合にのみ新しいエントリを追加
                  return {
                    ...member,
                    work_costs: [
                      ...member.work_costs,
                      {
                        daily_cost: dailyCost, // 計算したコスト
                        work_time: workTime,
                        work_date: workDate,
                        work_week: workWeek, // 日曜日の日時
                        work_month: workMonth, // 月の部分だけ (YYYY/MM)
                      },
                    ],
                  };
                }
              }
              return member; // 該当しないメンバーはそのまま返す
            },
          ),
        },
      };
    });
  };

  // 期間セレクトボックスの値を管理するstateを更新する関数
  const handleChangeBetween = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = Number(e.target.value);
    const selectedOption = OPTIONS_ARRAY.find(
      option => option.id === selectedId,
    );
    if (selectedOption) {
      setBetween(selectedOption); // 状態を更新する
    }
  };

  // 登録処理
  const handleRegister = () => {
    const updatedProjectData = JSON.parse(JSON.stringify(projectData));

    // リクエスト用の形に整形
    updatedProjectData.projects.assignment_members.forEach(
      (member: AssignmentMember) => {
        member.work_costs.forEach((workCost: WorkCost) => {
          delete workCost.work_week; // work_week を削除
          delete workCost.work_month; // work_month を削除
        });
      },
    );
    console.log(updatedProjectData);
  };

  // 選択された期間によって表示する日付を変更する関数
  useEffect(() => {
    if (between.id === 1) {
      // between.id が 1 の場合は日付をそのまま表示
      setShowPeriod(currentDates);
    } else if (between.id === 2) {
      // between.id が 2 の場合は7日ごとの要素を表示
      setShowPeriod(
        getEvery7thElementFromFirst(Period).slice(startIndex, endIndex),
      );
    } else if (between.id === 3) {
      setShowPeriod(extractMonths(Period).slice(startIndex, endIndex));
    }
  }, [between, currentPage]);

  // 次の1ヶ月分を表示するための関数
  const handleNext = () => {
    if (endIndex < Period.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  // 前の1ヶ月分を表示するための関数
  const handlePrev = () => {
    if (startIndex > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  // 期間:週毎の際に表示するために7日ごとの要素を取得し、dayOfWeekを8に変更する関数
  // dayOfWeekを8に変更する → ヘッダーに表示する時の色を管理するため
  function getEvery7thElementFromFirst(arr: Period[]) {
    console.log(arr);
    return arr
      .filter((_, index) => index % 7 === 0)
      .map(item => ({
        ...item,
        dayOfWeek: 8, // dayOfWeekを8に強制変更
      }));
  }

  // 月ごとの要素を取得し、dayOfWeekを全て8に変更する関数
  // dayOfWeekを8に変更する → ヘッダーに表示する時の色を管理するため
  function extractMonths(
    data: Array<{ dayOfWeek: number; day: string }>,
  ): Array<{ dayOfWeek: number; day: string }> {
    const monthsSet = new Set<string>();
    const result: Array<{ dayOfWeek: number; day: string }> = [];

    data.forEach(item => {
      // dayを "yyyy/mm" 形式に変換 (月を二桁にする)
      const [year, month] = item.day.split("/");
      const formattedMonth = `${year}/${month.padStart(2, "0")}`; // 月が一桁なら0埋め

      // Setで重複チェック
      if (!monthsSet.has(formattedMonth)) {
        monthsSet.add(formattedMonth);
        result.push({
          dayOfWeek: 8, // dayOfWeekを8に強制変更
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

  const formatWorkWeek = (dateStr: string | undefined) => {
    if (dateStr) {
      const [year, month, day] = dateStr.split("-");
      // 日付をゼロ埋めなしにしてフォーマット
      const formattedMonth = parseInt(month, 10);
      const formattedDay = parseInt(day, 10);
      return `${year}/${formattedMonth}/${formattedDay}`;
    }
  };

  const groupByWorkWeek = (projectData: ProjectAchievementsData) => {
    return {
      ...projectData,
      projects: {
        ...projectData.projects,
        assignment_members: projectData.projects.assignment_members.map(
          (member: AssignmentMember) => {
            const groupedWorkCosts = member.work_costs.reduce(
              (acc: WorkCost[], current: WorkCost) => {
                console.log("acc: ", acc);
                console.log("current: ", current);

                // work_week を "YYYY/MM/DD" 形式に変換し、ゼロ埋めなし
                const formattedWorkWeek = formatWorkWeek(current.work_week);

                const existingGroup = acc.find(
                  (item: WorkCost) => item.work_week === formattedWorkWeek,
                );

                if (existingGroup) {
                  // 同じ work_week のグループが既にある場合、work_time と daily_cost を加算
                  existingGroup.work_time += current.work_time;
                  existingGroup.daily_cost += current.daily_cost;
                } else {
                  // 新しい work_week の場合は新しいエントリを追加
                  acc.push({ ...current, work_week: formattedWorkWeek }); // work_week をフォーマット済みのものに置き換える
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
      projects: {
        ...projectData.projects,
        assignment_members: projectData.projects.assignment_members.map(
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
                  existingGroup.work_time += current.work_time;
                  existingGroup.daily_cost += current.daily_cost;
                } else {
                  // 新しい work_month の場合は新しいエントリを追加
                  acc.push({ ...current, work_month: formattedWorkMonth }); // work_month をフォーマット済みのものに置き換える
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
        <BigSelectBox optionArray={projectList} handleSelectChange={handleSelectChange}/>
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
            ? projectData.projects.assignment_members
            : between.id === 2
              ? dataGroupedByWeek.projects.assignment_members
              : dataGroupedByMonth.projects.assignment_members
          ).map(member => (
            <ProjectArchiveBody
              key={member.assignment_member_id}
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
