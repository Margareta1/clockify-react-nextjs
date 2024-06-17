import {
    collection,
    getDocs,
    getFirestore,
    writeBatch,
} from "firebase/firestore";
import { app } from "../configurations";

const stopAllTimers = async () => {
  const db = getFirestore(app);
  const timersCollection = collection(db, "Timer");
  const timersSnapshot = await getDocs(timersCollection);
  const batch = writeBatch(db);

  timersSnapshot.docs.forEach((doc) => {
    const timerRef = doc.ref;
    batch.update(timerRef, { isRunning: false });
  });

  try {
    await batch.commit();
  } catch (error) {
    throw new Error("Error stopping all timers");
  }
};

export { stopAllTimers };
