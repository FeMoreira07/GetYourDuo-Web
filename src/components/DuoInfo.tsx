interface DuoProps {
  title: string;
  info: string;
  fontSize?: boolean;
}

export function DuoInfo({ title, info, fontSize }: DuoProps) {
  return (
    <div className="mb-2">
      <h4 className="text-[#C4C4C6]">{title}</h4>
      {fontSize ? (
        <p className={`font-semibold truncate text-[13px]`}>{info}</p>
      ) : (
        <p className={`font-semibold truncate`}>{info}</p>
      )}
    </div>
  );
}
