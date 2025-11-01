import { useState } from "react"
import StarIcon from "../icons/StarIcon"

const StarRating = ({
  value,
  onChange,
}: {
  value: number
  onChange: (val: number) => void
}) => {
  const stars = [1, 2, 3, 4, 5]
  const [activeStars, setActiveStars] = useState<number>(0)
  return (
    <div className="flex gap-2">
      {stars.map((star) => {
        const isActive = star <= value
        const isHovered = activeStars > 0 && star <= activeStars

        return (
          <div
            key={star}
            onMouseEnter={() => setActiveStars(star)}
            onMouseLeave={() => setActiveStars(0)}
            onClick={() => onChange(star)}
            className={`flex justify-center items-center p-1.5 lg-custom:p-2 2xl:p-2.5 
          dark:bg-gray10 bg-white97 border dark:border-gray15 border-white90 
          rounded-full w-[30px] h-[30px] lg-custom:w-[38px] lg-custom:h-[36px] 
          2xl:w-11 2xl:h-11 cursor-pointer 
          ${
            isHovered
              ? "text-[#FEC84B]"
              : isActive
              ? "text-[#FEC84B]"
              : "text-[#98A2B3]"
          }
          transition-colors duration-150`}
          >
            <StarIcon className="w-[22px] h-[22px]" />
          </div>
        )
      })}
    </div>
  )
}

export default StarRating
