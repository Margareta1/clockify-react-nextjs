import React, { useEffect, useState } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import styles from "../../styles/timerActions.module.css";
import { Timer, TimerActionsType } from "@/app/types/timerTypes";

interface Props {
  timer: Timer;
  onStart?: (id: string) => void;
  onStop?: (id: string) => void;
  onStopAll?: () => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, description: string, duration: number) => void;
  type: TimerActionsType;
}

const TimerActions: React.FC<Props> = ({
  timer,
  onStart,
  onStop,
  onStopAll,
  onDelete,
  onEdit,
  type,
}) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [editedDescription, setEditedDescription] = useState(timer.description);

  const handleEditClick = () => {
    setEditedDescription(timer.description);
    setShowEditModal(true);
  };

  const handleSaveEdit = () => {
    onEdit(timer.id ? timer.id : "", editedDescription, timer.duration);
    setShowEditModal(false);
  };

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (timer.isRunning) {
      interval = setInterval(() => {
        onEdit(
          timer.id ? timer.id : "",
          timer.description,
          timer.duration + 1000
        );
      }, 1000);
    }
    return () => {
      if (interval) {
        clearInterval(interval as NodeJS.Timeout);
      }
    };
  }, [timer.isRunning, timer.id, timer.description, timer.duration, onEdit]);

  const handleStartStop = () => {
    if (timer.isRunning) {
      onStop && timer.id && onStop(timer.id);
    } else {
      onStart && timer.id && onStart(timer.id);
    }
  };

  return (
    <>
      <div>
        {type === TimerActionsType.TRACKER && (
          <>
            <Button
              onClick={handleStartStop}
              className={`${styles.timerActionButton} ${styles.timerStartStopButton}`}
            >
              {timer.isRunning ? (
                <i className="pi pi-pause-circle" />
              ) : (
                <i className="pi pi-play-circle" />
              )}
            </Button>
            <Button
              onClick={() => onStopAll && onStopAll()}
              className={styles.timerActionButton}
            >
              <i className="pi pi-stop-circle" />
            </Button>
          </>
        )}
        <Button onClick={handleEditClick} className={styles.timerActionButton}>
          <i className="pi pi-pencil" />
        </Button>
        <Button
          onClick={() => onDelete(timer.id ? timer.id : "")}
          className={styles.timerActionButton}
        >
          <i className="pi pi-trash" />
        </Button>
      </div>

      <Dialog
        visible={showEditModal}
        className={styles.timerModal}
        onHide={() => {
          if (!showEditModal) return;
          setShowEditModal(false);
        }}
      >
        <div className={styles.timerModalContainer}>
          <InputText
            type="text"
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
            className={styles.timerEditInput}
          />
          <button
            onClick={handleSaveEdit}
            className={styles.timerModalSaveButton}
          >
            Save
          </button>
        </div>
      </Dialog>
    </>
  );
};

export { TimerActions };
