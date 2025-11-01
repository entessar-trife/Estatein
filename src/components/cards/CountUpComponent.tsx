import CountUp from "react-countup"
import { countUpData } from "../../data/countUpData"

const CountUpComponent = () => {
  return (
    <div data-aos="flip-up" data-aos-delay="300"
      className="grid grid-cols-2   gap-3  lg-custom:grid-cols-3 lg-custom:gap-4 2xl:gap-5 w-full">

      {countUpData.map((item, index) => {
        const parsedNumber = parseFloat(item.counter.replace(/[^\d.]/g, ""))

        return (
          <div
            key={index}
            className={`
              bg-white97 dark:bg-gray10 border border-white90 dark:border-gray15 
              flex flex-col p-4 lg-custom:py-3.5 lg-custom:px-5 2xl:py-4 2xl:px-6 
              rounded-lg lg-custom:rounded-xl text-center lg-custom:text-start 
              w-full min-w-0
              ${index === 2 ? "col-span-2 lg-custom:col-span-1" : ""} 
            `}
          >
            <h2 className="lg-custom:text-[30px] 2xl:text-[40px] leading-[150%] text-2xl font-bold text-black dark:text-white">
              <CountUp
                end={parsedNumber}
                duration={2}
                enableScrollSpy
                scrollSpyDelay={300}
                separator=","
              />
              {item.counter.replace(/[0-9.,]/g, "")}
            </h2>

            <p className="text-sm lg-custom:text-base 2xl:text-[18px] text-gray40 dark:text-gray60 leading-[150%] lg-custom:w-full mx-auto">
              {item.descrption}
            </p>
          </div>
        )
      })}
    </div>
  )
}

export default CountUpComponent