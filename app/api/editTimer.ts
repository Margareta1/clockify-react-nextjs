import { getFirestore, doc, updateDoc } from "firebase/firestore";
import { app } from "../configurations";

const editTimer = async (
  timerId: string,
  updatedData: {
    localId?: string;
    date?: string;
    duration?: number;
    isRunning?: boolean;
    description?: string;
  }
) => {
  const firestore = getFirestore(app);
  try {
    const timerRef = doc(firestore, "Timer", timerId);
    await updateDoc(timerRef, updatedData);
  } catch (e) {
    throw new Error("Error updating document");
  }
};

export { editTimer };
