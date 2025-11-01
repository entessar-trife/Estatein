import type { PropertyType } from '../../types/Property'
import type { RootState } from '../store'

export const selectPropertiesCardsData = (state: RootState) =>
    state.properties.all

export const selectPropertyById = (id: string) => (state: RootState): PropertyType | undefined =>
    state.properties.all.find((property: PropertyType) => property.id.toString() === id)
