import { ChangeEvent, useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  EMPTY_TABLE_MESSAGE,
  mapTimerHistory,
  mapTimerHistoryTableData,
} from "@/app/helpers";
import { auth, timerHistoryTableColumns } from "@/app/configurations";
import { getAllTimers } from "@/app/api";
import styles from "../app/styles/historyPage.module.css";
import { Timer } from "@/app/types/timerTypes";

const History = () => {
  const [startDate, setStartDate] = useState<string | undefined>();
  const [endDate, setEndDate] = useState<string | undefined>();
  const [filterWord, setFilterWord] = useState<string | undefined>();
  const [timers, setTimers] = useState<Timer[]>();
  const { value } = getAllTimers();
  const [user] = useAuthState(auth);
  
  useEffect(() => {
    if (value) {
      const filteredTimers = mapTimerHistory({
        value: value.docs,
        startDate,
        endDate,
        filterWord,
        userId: user?.uid,
      });
      setTimers(filteredTimers);
    }
  }, [value, startDate, endDate, filterWord]);
  
  const handleStartDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    setStartDate(e.target.value);
  };
  
  const handleEndDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEndDate(e.target.value);
  };
  
  const handleFilterWordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFilterWord(e.target.value);
  };
  
  const handleDelete = (id: string) => {
    setTimers((prevTimers) => prevTimers?.filter((timer) => timer.id !== id));
  };
  
  const handleEdit = (id: string, description: string, duration: number) => {
    setTimers((prevTimers) =>
    prevTimers?.map((timer) =>
    timer.id === id ? { ...timer, description, duration } : timer
    )
    );
  };
  const timersData = mapTimerHistoryTableData({timers, handleDelete, handleEdit}); 
  
  
  return (
    <div className={styles.historyContainer}>
      <h2 className={styles.historyTitle}>Trackers History</h2>
      <div className={styles.historyFilters}>
        <div className={styles.filtersFlexContainer}>
          <p>Start date</p>
          <p>End date</p>
          <p>Description container</p>
        </div>
        <div className={styles.filtersFlexContainer}>
          <div>
            <input
              type="date"
              value={startDate}
              onChange={handleStartDateChange}
              className={styles.historyFilterInputs}
            />
          </div>
          <div>
            <input
              type="date"
              value={endDate}
              onChange={handleEndDateChange}
              className={styles.historyFilterInputs}
            />
          </div>
          <div>
            <input
              type="text"
              value={filterWord}
              onChange={handleFilterWordChange}
              className={styles.historyFilterInputs}
            />
          </div>
        </div>
      </div>

      <div className={styles.timersTableContainer}>
        <DataTable
          value={timersData}
          paginator
          rows={5}
          emptyMessage={EMPTY_TABLE_MESSAGE}
        >
          {timerHistoryTableColumns.map((col) => (
            <Column
              key={col.field}
              field={col.field}
              header={col.header}
              style={{ width: col.width }}
            />
          ))}
        </DataTable>
      </div>
    </div>
  );
};

export default History;
