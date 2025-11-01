import { onValue, ref, query} from "firebase/database";
import type { AppDispatch } from "../../redux/store"
import { db } from "../../firebaseConfig"
import type { OfficeLocation } from "../../redux/types/OfficeLocation"
import {
  setError,
  setLoading,
  setOffices,
} from "../../redux/slices/ourOfficesSlice"

export const listenToOffices = () => (dispatch: AppDispatch) => {
  dispatch(setLoading(true));
  const officesRef = query(ref(db, "locations"), ); 

  onValue(
    officesRef,
    (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();

        const formatted = Object.entries(data).map(([id, value]) => ({
          id,
          ...(value as Omit<OfficeLocation, "id">),
        })) as OfficeLocation[];

        dispatch(setOffices(formatted));
      } else {
        dispatch(setOffices([]));
      }
    },
    (error) => {
      dispatch(setError(error.message));
      dispatch(setLoading(false));
    }
  );
}
