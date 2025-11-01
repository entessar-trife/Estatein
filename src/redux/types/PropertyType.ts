export type PropertyType = {
  id: string
  image: string
  title: string
  desc: string
  details: { label: string; icon: string }[]
  Price: string

  descriptionLong?: string
  gallery?: string[]
  location?: string
  [key: string]: any
  tags?: string
  features?: string[]
  additionalFees?: {
    inspection: number
    insurance: number
    legalFees: number
    mortgageFees: number
    transferTax: number
  }
}
