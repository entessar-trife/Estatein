import { onValue, ref } from "firebase/database"
import { db } from "../../firebaseConfig"

export const genericListener = <T, R>(
  path: string,
  transform?: (item: T, id: string) => R,
  onData?: (items: R[]) => void
) => {
  const dbRef = ref(db, path)

  onValue(dbRef, (snapshot) => {
    if (!snapshot.exists()) {
      onData?.([])
      return
    }

    const rawData = snapshot.val()
    const parsedData = Object.entries(rawData).map(([id, value]) =>
      transform ? transform(value as T, id) : ({ ...(value as T), id } as R)
    )

    onData?.(parsedData)
  })
}
