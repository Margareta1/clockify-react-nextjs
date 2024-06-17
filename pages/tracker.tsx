import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";
import {
  EMPTY_TABLE_MESSAGE,
  getTodaysDate,
  mapTracker,
  mapTrackerTableData,
} from "@/app/helpers";
import { auth, trackerTableColumns } from "@/app/configurations";
import { createTimer, getAllTimers, stopAllTimers, deleteTimer, editTimer } from "@/app/api";
import styles from "../app/styles/trackerPage.module.css";
import { Timer } from "@/app/types/timerTypes";


const Tracker = () => {
  const [timers, setTimers] = useState<Timer[]>([]);
  const { value } = getAllTimers();
  const [user] = useAuthState(auth);

  useEffect(() => {
    if (value) {
      setTimers(mapTracker({value:value?.docs, userId:user?.uid}));
    }
  }, [value]);

  const handleStart = (id: string) => {
    setTimers((prevTimers) =>
      prevTimers.map((timer) =>
        timer.id === id
          ? { ...timer, isRunning: true }
          : { ...timer, isRunning: false }
      )
    );
  };

  const handleStop = (id: string) => {
    setTimers((prevTimers) =>
      prevTimers.map((timer) =>
        timer.id === id ? { ...timer, isRunning: false } : timer
      )
    );
  };

  const handleStopAll = async () => {
    setTimers((prevTimers) =>
      prevTimers.map((timer) => ({ ...timer, isRunning: false }))
    );
    try {
      const msg = await stopAllTimers();
    } catch (err) {
      throw new Error("Error while stopping all timers");
    }
  };

  const handleDelete = async (id: string) => {
    setTimers((prevTimers) => prevTimers.filter((timer) => timer.id !== id));
    try {
      const msg = await deleteTimer(id);
    } catch (err) {
      throw new Error("Error while deleting timer");
    }
  };

  const handleEdit = async (
    id: string,
    description: string,
    duration: number
  ) => {
    setTimers((prevTimers) =>
      prevTimers.map((timer) =>
        timer.id === id ? { ...timer, description, duration } : timer
      )
    );
    try {
      const msg = await editTimer(id, { description, duration });
    } catch (err) {
      throw new Error("Error while editing timer")
    }
  };

  const handleAddTimer = async () => {
    handleStopAll();
    const newTimer: Timer = {
      localId: String(timers.length + 1),
      description: "New Timer",
      duration: 0,
      isRunning: true,
      date: getTodaysDate(),
      userId: user?.uid ? user.uid : "",
    };
    setTimers((prevTimers) => [...prevTimers, newTimer]);
    try {
      const msg = await createTimer(newTimer);
    } catch (err: any) {
      throw new Error("Error while adding timer");
    }
  };

  const timersData = mapTrackerTableData({timers,handleStart, handleStop, handleStopAll, handleEdit, handleDelete});

  return (
    <div className={styles.trackerContainer}>
      <div className={styles.calendarTitle}>
        <i className={`pi pi-calendar ${styles.calendarIcon}`} />
        <p className={styles.calendarToday}>Today ({getTodaysDate()})</p>
      </div>
      <div className={styles.trackerButtonsContainer}>
        <Button
          className={`${styles.trackerButton} ${styles.startTimerButton}`}
          onClick={handleAddTimer}
        >
          <i className={`pi pi-stopwatch ${styles.stopwatchIcon}`} />
          <span>Start new timer</span>
        </Button>
        <Button
          className={`${styles.trackerButton} ${styles.stopAllButton}`}
          onClick={handleStopAll}
        >
          <i className={`pi pi-stop-circle ${styles.stopAllIcon}`} />
          <span>Stop all</span>
        </Button>
      </div>

      <div className={styles.timersTableContainer}>
        <DataTable
          value={timersData}
          paginator
          rows={5}
          emptyMessage={EMPTY_TABLE_MESSAGE}
        >
          {trackerTableColumns.map((col) => (
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

export default Tracker;
