import Title from "../../components/shared/Title";
import { SectionWrapper } from "../../layouts/SectionWrapper";
import { tgContainerAos, tgImgAos, tgRightImgAos } from "../../utlis/Anamation";

const galleryImages = [
  { src: "/assets/images/Explore/1.webp", delay: 0 },
  { src: "/assets/images/Explore/2.webp", delay: 100 },
  { src: "/assets/images/Explore/3.webp", delay: 200 },
  { src: "/assets/images/Explore/4.webp", delay: 300 },
  { src: "/assets/images/Explore/5.webp", delay: 400 },
];

function TeamGallery() {
  return (
    <SectionWrapper className="pb-20 lg-custom:pb-[120px] 2xl:pb-[150px]">
      <div
        className="relative bg-white97 dark:bg-gray10 border border-white90 dark:border-gray15 rounded-xl 2xl:p-20 lg-custom:p-[60px] p-6 overflow-hidden"
        {...tgContainerAos()}
      >
        <img
          src="/assets/images/AbstractDesign4.webp"
          alt="Team Gallery Background"
          className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
          loading="lazy"
        />

        <div className="relative z-10 grid grid-cols-1 lg-custom:gap-5 gap-[55px] sm:auto-rows-auto">
          <div className="grid grid-cols-2 lg-custom:gap-5 gap-2.5 auto-rows-[71px] sm:auto-rows-auto">
            {galleryImages.slice(0, 3).map((img, idx) => (
              <img
                key={idx}
                src={img.src}
                alt={`Team Gallery ${idx + 1}`}
                className="w-full h-full object-cover rounded-[10px]"
                {...tgImgAos(img.delay)}
                loading="lazy"
              />
            ))}
            <div className="grid grid-cols-2 gap-2.5 auto-rows-[71px] sm:auto-rows-auto lg-custom:gap-5">
              {galleryImages.slice(3).map((img, idx) => (
                <img
                  key={idx}
                  src={img.src}
                  alt={`Team Gallery ${idx + 4}`}
                  className="w-full h-full object-cover rounded-[10px]"
                  {...tgImgAos(img.delay)}
                  loading="lazy"
                />
              ))}
            </div>
          </div>

          <div className="grid lg-custom:grid-cols-2 grid-cols-1 gap-5 sm:auto-rows-auto">
            <Title
              starImg
              heading="Explore Estatein's World"
              paragraph="Step inside the world of Estatein, where professionalism meets warmth, and expertise meets passion. Our gallery offers a glimpse into our team and workspaces, inviting you to get to know us better."
              anamation="fade-up"
            />
            <img
              src="/assets/images/Explore/6.webp"
              alt="Team Gallery"
              className="w-full h-full object-cover object-center min-h-[135px] rounded-[10px]"
              {...tgRightImgAos(120)}
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}

export default TeamGallery;
