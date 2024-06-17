import { addDoc, collection, getFirestore } from "firebase/firestore";
import { app } from "../configurations";

const createTimer = async (timerData: {
  localId: string;
  date: string;
  duration: number;
  isRunning: boolean;
  description: string;
}) => {
  const firestore = getFirestore(app);
  try {
    const docRef = await addDoc(collection(firestore, "Timer"), timerData);
  } catch (e) {
    throw new Error("Error adding document");
  }
};

export { createTimer };
