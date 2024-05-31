import { AssetStatus } from "@/model/asset";
import { FC, useEffect, useState } from "react";
import LoadingState from "./loading-state";
import { useTheme } from "next-themes";

interface LabelProps {
  label: string;
  className?: string;
}

const Label: FC<LabelProps> = ({ label, className }) => {
  const { theme } = useTheme();
  const [bgColor, setBgColor] = useState("");
  const [textColor, setTextColor] = useState("");

  useEffect(() => {
    if (theme == "dark") {
      setBgColor("bg-[#000]");
      setTextColor("text-[#FFF]");
    } else {
      setBgColor("bg-[#FFF]");
      setTextColor("text-[#000]");
    }
  }, [theme]);

  return (
    <div
      className={`justify-space flex max-w-[200px] !flex-row items-center rounded-lg bg-[#000] px-2 py-1 text-xs ${bgColor} ${textColor} ${className}`}
    >
      {label != AssetStatus.COMPLETED && (
        <span className="w-fit">
          <LoadingState title="" className="h-2 w-2" />
        </span>
      )}
      <span className="!line-clamp-1">{label}</span>
    </div>
  );
};

Label.displayName = "Label";
export default Label;
