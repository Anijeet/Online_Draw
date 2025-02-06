import { type JSX } from "react";

export function Card({
  className,
  title,
  children,
  textClassName,
  titleClassName,
  onClick,
  deleteIcons,
  deleteClick,
}: {
  className?: string;
  title: string;
  children?: React.ReactNode;
  textClassName?: string;
  titleClassName?: string;
  onClick?: () => void;
  deleteIcons?: any;
  deleteClick?: () => void;
}): JSX.Element {
  return (
    <div className="flex flex-col h-250px] items-center">
      <div onClick={onClick} className={className}>
        <h2 className={textClassName}>{title}</h2>
        <p className={titleClassName}>{children}</p>
      </div>
      <div
        onClick={deleteClick}
        className="delete text-black m-2 font-bold cursor-pointer text-lg"
      >
        <div className="px-3 py-2 flex h-[20px] items-center gap-1 ">{deleteIcons}Delete</div>
      </div>
    </div>
  );
}
