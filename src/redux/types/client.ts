export type Client = {
  name: string
  subject: string
  review: string
  clientImage: string
  location: string
  show: boolean
  rate: number
}

export type TestimonialCardProps = {
  client: Client
}
