import { onValue, ref } from "firebase/database"
import type { AppDispatch } from "../../redux/store"
import { db } from "../../firebaseConfig"
import { setError, setLoading, setProperties } from "../../redux/slices/propertiesSlice"

const transformProperty = (property: any, id: string) => ({
  id, 
  image: property.images?.[0] || "",
  title: property.title || "Property",
  desc: property.description?.slice(0, 100) + "...",
  Price: `$${property.price?.toLocaleString() || "N/A"}`,
  details: [
    { label: `${property.bedrooms || 0}-Bedroom`, icon: "bed" },
    { label: `${property.bathrooms || 0}-Bathroom`, icon: "bath" },
    { label: `Villa`, icon: "villa" },
  ],
  descriptionLong: property.description,
  gallery: property.images,
  location: property.location,
  tags: property.tags,
  features: property.features || [],
  additionalFees: {
    inspection: property.inspection || 0,
    insurance: property.insurance || 0,
    legalFees: property.legalFees || 0,
    mortgageFees: property.mortgageFees || 0,
    transferTax: property.transferTax || 0,
  },
})

export const listenToProperties = () => (dispatch: AppDispatch) => {
  dispatch(setLoading(true))

  const propertiesRef = ref(db, "properties")

  onValue(
    propertiesRef,
    (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val()
        const formatted = Object.entries(data).map(([id, value]) =>
          transformProperty(value, id.toString()) 
        )

        dispatch(setProperties(formatted))
      } else {
        dispatch(setProperties([]))
      }

      dispatch(setLoading(false))
    },
    (error) => {
      dispatch(setError(error.message))
      dispatch(setLoading(false))
    }
  )
}
