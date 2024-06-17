import { deleteDoc, doc, getFirestore } from "firebase/firestore";
import { app } from "../configurations";

const deleteTimer = async (timerId: string) => {
  const firestore = getFirestore(app);
  try {
    const timerDoc = doc(firestore, "Timer", timerId);
    const msg = await deleteDoc(timerDoc);
  } catch (e) {
    throw new Error("Error deleting document");
  }
};

export { deleteTimer };
