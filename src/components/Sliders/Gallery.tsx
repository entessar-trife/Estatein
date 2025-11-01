import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"
import { useEffect, useState } from "react"
import { ArrowLeft, ArrowRight } from "../icons/GalleryIcons"

interface GalleryProps {
  images: string[]
  perView: number
  thumbNumber: number
  className?: string
}

const Gallery = ({ images, perView, className, thumbNumber }: GalleryProps) => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    loop: false,
    initial: 0,

    slides: {
      perView: perView,
      spacing: 30,
    },
    mode: "free-snap",
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel)
    },
  })

  const [thumbsRef, thumbsInstanceRef] = useKeenSlider<HTMLDivElement>({
    loop: false,
    slides: {
      perView: thumbNumber,
      spacing: 15,
    },
  })
  useEffect(() => {
    const container = thumbsInstanceRef.current?.container
    if (!container) return

    const slides = container.querySelectorAll(".keen-slider__slide")
    const activeSlide = slides[currentSlide] as HTMLElement

    if (!activeSlide) return

    const offsetLeft = activeSlide.offsetLeft

    const scrollTo = offsetLeft

    container.scrollTo({
      left: scrollTo,
      behavior: "smooth",
    })
  }, [currentSlide])

  const goPrev = () => instanceRef.current?.prev()
  const goNext = () => instanceRef.current?.next()

  if (!images || !Array.isArray(images)) return null

  return (
    <div
      data-aos="fade-up"
      className={`bg-white97 dark:bg-gray10 border border-white90 dark:border-gray15 rounded-xl p-5 md:p-10 2xl:p-[50px] flex flex-col items-center gap-5 2xl:gap-8 w-full mx-auto ${className}`}
    >
      <div
        ref={thumbsRef}
        className="keen-slider bg-white99 dark:bg-gray08 p-2.5 2xl:p-5 rounded-xl border border-white90 dark:border-gray15 order-2 md:order-1"
      >
        {images?.map((src, idx) => (
          <div
            onClick={() => instanceRef.current?.moveToIdx(idx)}
            key={idx}
            className="keen-slider__slide min-h-10 md:min-h-[74px] 2xl:min-h-24 rounded-lg"
          >
            <img
              src={src}
              className={`object-cover w-full h-full transition-opacity duration-300 ${
                idx === currentSlide
                  ? "opacity-100"
                  : "opacity-50 cursor-pointer"
              }`}
            />
          </div>
        ))}
      </div>

      <div ref={sliderRef} className="keen-slider order-1 md:order-2">
        {images?.map((src, idx) => (
          <div
            key={idx}
            className="keen-slider__slide w-[249px] md:[507px] 2xl:h-[583px]"
          >
            <img src={src} className=" size-full object-cover rounded-[10px]" />
          </div>
        ))}
      </div>

      <div className="max-lg-custom:justify-between max-lg-custom:w-full p-2.5 rounded-[100px] bg-white99 dark:bg-gray08 flex gap-2.5 items-center order-3">
        <button
          onClick={goPrev}
          disabled={currentSlide === 0}
          className={`p-2 lg-custom:p-2.5 2xl:p-3.5 border border-gray15 rounded-full size-11 md:size-[58px] flex items-center justify-center  ${
            currentSlide === 0
              ? "text-gray50 bg-transparent "
              : "bg-white97 dark:bg-gray10 cursor-pointer"
          }`}
        >
          <ArrowLeft />
        </button>

        <div className="flex gap-[3px]">
          {images.slice(0, images.length - 1).map((_, idx) => (
            <div
              onClick={() => instanceRef.current?.moveToIdx(idx)}
              key={idx}
              className={`h-[3px] w-[11px] 2xl:w-5  2xl:h-[5px] rounded-[60px] transition-all duration-300 ${
                currentSlide === idx
                  ? " bg-purple90 dark:bg-purple60"
                  : "bg-gray30 cursor-pointer"
              }`}
            />
          ))}
        </div>

        <button
          onClick={goNext}
          disabled={currentSlide >= images.length - 1}
          className={`p-2 lg-custom:p-2.5 2xl:p-3.5 border border-gray15 rounded-full size-11 md:size-[58px] flex items-center justify-center cursor-pointer ${
            currentSlide >= images.length - 1
              ? "text-gray50 bg-transparent "
              : "bg-white97 dark:bg-gray10 cursor-pointer"
          }`}
        >
          <ArrowRight />
        </button>
      </div>
    </div>
  )
}

export default Gallery
