import styles from "../styles/historyPage.module.css";
import { useState } from "react";
import { Nullable } from "primereact/ts-helpers";

const History = () => {
  const [startDate, setStartDate] = useState<Nullable<Date>>();
  const [endDate, setEndDate] = useState<Nullable<Date>>();
  const [filterWord, setFilterWord] = useState<string | null>(null);

  const handleClickIcon = () =>{
    console.log("clicked");
  }

  return (
    <div className={styles.historyContainer}>
      <h2 className={styles.historyTitle}>Trackers History</h2>
      <div className={styles.historyFilters}>
      </div>
    </div>
  );
};

export default History;
