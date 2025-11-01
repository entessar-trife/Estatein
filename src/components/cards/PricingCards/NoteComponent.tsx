const NoteComponent = () => {
  return (
    <div
      className="flex items-center max-lg-custom:items-start max-lg-custom:flex-col
     py-6 px-5 lg-custom:py-5 lg-custom:px-10 2xl:py-[30px] 2xl:px-[50px] mb-[30px] lg-custom:mb-10 2xl:mb-[50px]
      rounded-lg 2xl:rounded-xl border border-white90 dark:border-gray15 bg-white97 dark:bg-gray10"
    >
      <span
        data-aos="fade-right"
        className="md:pr-4 2xl:pr-5 text-lg md:text-xl 2xl:text-2xl font-semibold leading-[150%] text-black dark:text-white min-md:border-r border-white90 dark:border-gray15 max-md:pb-2.5"
      >
        Note
      </span>
      <p
        data-aos="fade-right"
        className="text-sm 2xl:text-lg font-medium leading-[150%] text-gray40 dark:text-gray60 md:pl-4 2xl:pl-5 max-md:border-t border-white90 dark:border-gray15 max-md:pt-2.5"
      >
        The figures provided above are estimates and may vary depending on the
        property, location, and individual circumstances.
      </p>
    </div>
  );
};

export default NoteComponent;
