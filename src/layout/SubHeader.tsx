type SubHeaderProps = {
  subHeading: string;
};

const SubHeader = ({ subHeading }: SubHeaderProps) => {
  return (
    <div className="flex gap-4 justify-between mt-8">
      <h1 className="shrink-0 text-2xl">{subHeading}</h1>
      <div className="mt-5 w-full border-t border-black"></div>
    </div>
  );
};

export { SubHeader };
