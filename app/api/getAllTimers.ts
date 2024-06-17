import { useCollection } from "react-firebase-hooks/firestore";
import { collection, getFirestore } from "firebase/firestore";
import { app } from "../configurations";

const getAllTimers = () => {
  const [value, loading, error] = useCollection(
    collection(getFirestore(app), "Timer"),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );
  return { value, error, loading };
};

export { getAllTimers };
