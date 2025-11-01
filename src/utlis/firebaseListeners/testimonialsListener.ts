import { onValue, ref } from "firebase/database"
import type { AppDispatch } from "../../redux/store"
import { setError, setLoading, setTestimonials,} from "../../redux/slices/testimonialsSlice"
import { db } from "../../firebaseConfig"
import type { Client } from "../../redux/types/client"

export const listenToTestimonials = () => (dispatch: AppDispatch) => {
  dispatch(setLoading(true))

  const testimonialsRef = ref(db, "testimonials")

  onValue(
    testimonialsRef,
    (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val()
        const formatted = (Object.values(data) as Client[]).filter(
          (item) => item.show === true
        )

        dispatch(setTestimonials(formatted))
      } else {
        dispatch(setTestimonials([]))
      }
    },
    (error) => {
      dispatch(setError(error.message))
    }
  )
}
