import TeamCardComponentForm from "../ui/TeamCardComponentForm";

interface TeamCardProps {
  id: string;
  name: string;
  role: string;
  image?: string;
  twitterLink?: string;
  email?: string;

}

const FALLBACK_AVATAR = "/assets/images/team/default-avatar.png";

const TeamCardComponent = ({ id, name, role, image, twitterLink, email }: TeamCardProps) => {
  const handleImgError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    if (!img.src.endsWith(FALLBACK_AVATAR)) img.src = FALLBACK_AVATAR;
  };

  const src =
    image?.startsWith("/") || image?.startsWith("http")
      ? image
      : image
        ? "/" + image.replace(/^\/+/, "")
        : FALLBACK_AVATAR;

  return (
    <div
      className="group flex flex-col w-full gap-10 lg-custom:gap-[50px] p-5 lg-custom:p-6 2xl:p-[30px] border border-gray15 rounded-xl hover:border-purple75 dark:hover:border-purple60/60 hover:bg-gradient-to-br hover:from-purple75/20 hover:to-transparent 
       dark:hover:from-purple60/10 dark:hover:to-transparent transition-all duration-300 ease-in-out"
    >
      <div className="relative">
        <img
          src={src}
          alt={name}
          onError={handleImgError}
          loading="lazy"
          decoding="async"
          className="rounded-[10px] 2xl:rounded-xl w-full h-[268px] lg-custom:h-[220px] 2xl:h-[253px] object-top object-cover"
        />
        {twitterLink && (
          <a
            href={twitterLink}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-purple70 dark:bg-purple60 absolute bottom-0 py-3.5 px-[26px] rounded-[43px] transform translate-y-1/2 left-1/2 -translate-x-1/2 flex items-center justify-center gap-3 transition-transform duration-700 group-hover:rotate-y-[360deg]"
            aria-label={`Open ${name}'s Twitter`}
          >
            <img
              src="/assets/icons/Team/twitter.svg"
              alt="X (Twitter)"
              className="w-5 h-5 2xl:w-6 2xl:h-6"
            />
          </a>
        )}
      </div>

      <div className="flex flex-col gap-4 lg-custom:gap-5 2xl:gap-6">
        <div className="text-center flex flex-col gap-0.5 lg-custom:gap-1 2xl:gap-1.5">
          <h3 className="text-lg lg-custom:text-[20px] 2xl:text-2xl font-semibold leading-7 text-black dark:text-white">
            {name}
          </h3>
          <p className="text-sm min-[1200px]:!text-[16px] 2xl:text-lg font-medium text-gray40 dark:text-gray60 whitespace-nowrap">
            {role}
          </p>
        </div>

        <div className="relative w-full">
          <TeamCardComponentForm cardId={id}  toEmail={email} />
        </div>
      </div>
    </div>
  );
};

export default TeamCardComponent;
