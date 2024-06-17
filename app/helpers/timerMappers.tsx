import { QueryDocumentSnapshot, DocumentData } from "firebase/firestore";
import { formatStopwatchTime, parseDateDDMMYYYY, parseDateYYYYMMDD } from ".";
import { TimerActions } from "../components";
import { Timer, TimerActionsType } from "../types/timerTypes";

interface MapTimerHistoryProps {
  value: QueryDocumentSnapshot<DocumentData, DocumentData>[];
  startDate?: string;
  endDate?: string;
  filterWord?: string;
  userId?: string;
}

const mapTimerHistory = ({
  value,
  startDate,
  endDate,
  filterWord,
  userId,
}: MapTimerHistoryProps) => {
  return value
    .map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        localId: data.localId,
        description: data.description,
        duration: data.duration,
        date: data.date,
        isRunning: data.isRunning,
        userId: data.userId,
      };
    })
    .filter((timer) => {
      const matchesStartDate =
        !startDate ||
        parseDateDDMMYYYY(timer.date) >= parseDateYYYYMMDD(startDate);
      const matchesEndDate =
        !endDate || parseDateDDMMYYYY(timer.date) <= parseDateYYYYMMDD(endDate);
      const matchesFilterWord =
        !filterWord ||
        timer.description.toLowerCase().includes(filterWord.toLowerCase());
      const matchesUserId = timer.userId === userId;

      return (
        matchesStartDate && matchesEndDate && matchesFilterWord && matchesUserId
      );
    })
    .sort((a, b) => Number(b.id) - Number(a.id));
};

interface MapTimerHistoryDataProps {
  timers?: Timer[];
  handleDelete: (id: string) => void;
  handleEdit: (id: string, description: string, duration: number) => void;
}

const mapTimerHistoryTableData = ({
  timers,
  handleDelete,
  handleEdit,
}: MapTimerHistoryDataProps) => {
  return timers
    ?.sort((a: Timer, b: Timer) => Number(b.id) - Number(a.id))
    .map((timer) => ({
      id: timer.id,
      timeTracked: formatStopwatchTime(timer.duration),
      date: timer.date,
      description: timer.description,
      actions: (
        <TimerActions
          timer={timer}
          onDelete={handleDelete}
          onEdit={handleEdit}
          type={TimerActionsType.HISTORY}
        />
      ),
    }));
};

interface MapTrackerProps {
  value: QueryDocumentSnapshot<DocumentData, DocumentData>[];
  userId?: string;
}

const mapTracker = ({ value, userId }: MapTrackerProps) => {
  return value
    .map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        description: data.description,
        duration: data.duration,
        date: data.date,
        isRunning: data.isRunning,
        userId: data.userId,
        localId: data.localId,
      };
    })
    .filter((timer) => {
      const matchesUserId = timer.userId === userId;
      return matchesUserId;
    })
    .sort((a, b) => Number(b.localId) - Number(a.localId));
};

interface MapTrackerTableDataProps{
  timers: Timer[];
  handleStart?: (id: string) => void;
  handleStop?: (id: string) => void;
  handleStopAll?: () => void;
  handleDelete: (id: string) => void;
  handleEdit: (id: string, description: string, duration: number) => void;
}

const mapTrackerTableData = ({timers, handleStart, handleStop, handleStopAll, handleDelete, handleEdit}:MapTrackerTableDataProps) =>{
  return timers.sort((a: Timer, b: Timer) => Number(b.id) - Number(a.id))
    .map((timer) => ({
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
          type={TimerActionsType.TRACKER}
        />
      ),
    }));
}

export { mapTimerHistory, mapTimerHistoryTableData, mapTracker,mapTrackerTableData };
