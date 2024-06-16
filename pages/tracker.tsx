import {
  formatStopwatchTime,
  getTodaysDate,
} from "@/app/helpers/trackerHelpers";
import styles from "../styles/trackerPage.module.css";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Timer, TimerForm } from "@/app/types/stopwatchTypes";
import { useState } from "react";
import {TimerActions} from "@/app/components/Stopwatch/TimerActions";

const EMPTY_MESSAGE = "No data"

const Tracker = () => {
  const [timers, setTimers] = useState<Timer[]>([]);
  const [form, setForm] = useState<TimerForm>({
    description: "",
  });

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

  const handleStopAll = () => {
    setTimers((prevTimers) =>
      prevTimers.map((timer) => ({ ...timer, isRunning: false }))
    );
  };

  const handleDelete = (id: string) => {
    setTimers((prevTimers) => prevTimers.filter((timer) => timer.id !== id));
  };

  const handleEdit = (id: string, description: string, duration: number) => {
    setTimers((prevTimers) =>
      prevTimers.map((timer) =>
        timer.id === id ? { ...timer, description, duration } : timer
      )
    );
  };

  const handleAddTimer = () => {
    handleStopAll();
    const newTimer: Timer = {
      id: String(timers.length + 1),
      description: form.description || "New Timer",
      duration: 0,
      isRunning: true,
    };
    setTimers((prevTimers) => [...prevTimers, newTimer]);
    setForm({ description: "" });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const timersData = timers.sort((a:Timer, b:Timer) => Number(b.id)-Number(a.id)).map((timer) => ({
    id: timer.id,
    formattedTime: formatStopwatchTime(timer.duration),
    description: timer.description,
    actions: (
      <TimerActions
        timer={timer}
        onStart={handleStart}
        onStop={handleStop}
        onStopAll={handleStopAll}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />
    ),
  }));

  const columns = [
    { field: "formattedTime", header: "Time logged", width: '20%' },
    { field: "description", header: "Description", width: '50%' },
    { field: "actions", header: "Actions", width: '30%' },
  ];

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

      <div className={styles.timersTableContainer} >
        <DataTable value={timersData} paginator rows={5} emptyMessage={EMPTY_MESSAGE}>
          {columns.map((col) => (
            <Column key={col.field} field={col.field} header={col.header} style={{width: col.width}}  />
          ))}
        </DataTable>
      </div>
    </div>
  );
}

export default Tracker;