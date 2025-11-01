import StarRating from "./StarRating"

type Props = {
  client: {
    name: string
    subject: string
    review: string
    clientImage: string
    location: string
    show?: boolean
    rate?: number
  }
}

const Card = ({ client }: Props) => {
  const cardContainerClass =
    " flex flex-col justify-between gap-6 xl:gap-[30px] 2xl:gap-[40px] h-full 2xl:!min-h-[442px] 2xl:!max-h-[442px] xl:!min-h-[363px] xl:!max-h-[363px]  p-[30px] xl:!p-[40px] 2xl:!p-[50px] rounded-[10px] 2xl:rounded-xl dark:bg-gray08 bg-white99 border dark:border-gray15 border-white90 hover:border-purple75 dark:hover:border-purple60/60 hover:bg-gradient-to-br hover:from-purple75/20 hover:to-transparent dark:hover:from-purple60/10 dark:hover:to-transparent transition-all duration-300 ease-in-out"
  const clientNameClass =
    "dark:text-white text-black font-medium text-lg lg-custom:text-xl 2xl:text-xl whitespace-nowrap"
  const clientLocationClass =
    "text-gray40 dark:text-gray60 font-medium text-sm lg-custom:text-base 2xl:text-lg"
  const subjectClass =
    "dark:text-white text-black whitespace-nowrap font-semibold text-lg lg-custom:text-xl 2xl:text-2xl"
  const reviewClass =
    " dark:text-white text-black font-medium text-sm lg-custom:text-base 2xl:text-lg"

  return (
    <div className={cardContainerClass}>
      {/* Star Rating */}
      {client.rate && <StarRating rate={client.rate} />}

      {/* Subject & Review */}
      <div className=" flex flex-col gap-1.5 xl:gap-2.5 2xl:gap-3.5  ">
        <h3 className={subjectClass}>{client.subject}</h3>
        <p className={reviewClass}>{client.review}</p>
      </div>

      {/* Client Info */}
      <div className="flex gap-2.5 2xl:gap-3 items-center ">
        <img
          src={client.clientImage}
          alt={`${client.name} image`}
          loading="lazy"
          className="w-[50px] h-[50px] 2xl:w-[60px] 2xl:h-[60px] rounded-full object-cover"
        />
        <div>
          <h4 className={clientNameClass}>{client.name}</h4>
          {client.location && (
            <span className={clientLocationClass}>{client.location}</span>
          )}
        </div>
      </div>
    </div>
  )
}

export default Card
