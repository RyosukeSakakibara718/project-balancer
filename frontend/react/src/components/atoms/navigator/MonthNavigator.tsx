import { useEffect, useState } from "react";

import { projectDetailData } from "../../../data/projectDetail";
type MonthNavigaterProps = {
  between: {
    id: number;
    label: string;
  };
  showPeriod: {
    dayOfWeek: number;
    day: string;
  }[];
  handleNext: () => void;
  handlePrev: () => void;
};

const MonthNavigater: React.FC<MonthNavigaterProps> = ({
  between,
  showPeriod,
  handleNext,
  handlePrev,
}) => {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 7;
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const Period = getDatesBetween(
    projectDetailData.projects.projects_data.start_date,
    projectDetailData.projects.projects_data.end_date,
  );

  const currentDates = Period.slice(startIndex, endIndex);
  const [showPeriod, setShowPeriod] = useState(currentDates);

  useEffect(() => {
    if (between.id === 1) {
      // between.id が 1 の場合は日付をそのまま表示
      setShowPeriod(currentDates);
    } else if (between.id === 2) {
      // between.id が 2 の場合は7日ごとの要素を表示
      setShowPeriod(
        getEvery7thElementFromFirst(Period).slice(startIndex, endIndex),
      );
    } else if (between.id == 3) {
      setShowPeriod(extractMonths(Period).slice(startIndex, endIndex));
    }
  }, [between]);

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

  // 7日ごとの要素を取得し、dayOfWeekを全て8に変更する関数
  function getEvery7thElementFromFirst(arr: any[]): any[] {
    return arr
      .filter((_, index) => index % 7 === 0)
      .map(item => ({
        ...item,
        dayOfWeek: 8, // dayOfWeekを8に強制変更
      }));
  }

  // 月ごとの要素を取得し、dayOfWeekを全て8に変更する関数
  function extractMonths(
    data: Array<{ dayOfWeek: number; day: string }>,
  ): Array<{ dayOfWeek: number; day: string }> {
    const monthsSet = new Set<string>();
    const result: Array<{ dayOfWeek: number; day: string }> = [];

    data.forEach(item => {
      // dayを "yyyy/mm" 形式に変換 (月を二桁にする)
      const [year, month, _] = item.day.split("/");
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

  return (
    <>
      <th>
        <button className="p-2 w-[0px]" onClick={handlePrev}>
          &lt;
        </button>
      </th>
      {showPeriod.map((date, index) => {
        let style = {};
        if (between.id === 1) {
          // 日曜日はdayOfWeekが1、土曜日はdayOfWeekが7
          if (date.dayOfWeek === 1) {
            style = { color: "#EA7777" }; // 日曜日のスタイル
          } else if (date.dayOfWeek === 7) {
            style = { color: "#78C6DE" }; // 土曜日のスタイル
          }
        }
        return (
          <th key={index} style={style} className="w-[10%]">
            {date.day}
            {between.id !== 1 && ' ~'}
          </th>
        );
      })}
      <th>
        <button className="p-2 w-[0px]" onClick={handleNext}>
          &gt;
        </button>
      </th>
    </>
  );
};

export default MonthNavigater;
