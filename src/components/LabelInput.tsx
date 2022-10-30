import {
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";

type LabelInputProps = {
  children: ReactNode;
  className: string;
  id: string;
  width?: string;
  maxWidth?: string;
  minWidth?: string;
  type: "text" | "number";
  min?: number;
  max?: number;
  value: number | string;
  setValue:
    | Dispatch<SetStateAction<string>>
    | Dispatch<SetStateAction<number | "">>;
};

export const LabeledInput: FC<LabelInputProps> = ({
  children,
  className,
  id,
  width,
  type = "text",
  min,
  max,
  maxWidth,
  minWidth,
  value,
  setValue,
}) => {
  const [isActive, setIsActive] = useState(false);

  function handleTextChange(text: any) {
    setValue(text);

    if (text !== "") {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }

  useEffect(() => {
    if (value === "" && isActive) {
      setIsActive(false);
    }
  }, [value, isActive]);
  return (
    <div id="float-label">
      <label className={isActive ? "Active" : ""} htmlFor={id}>
        {children}
      </label>
      <input
        style={{ width: width, maxWidth: maxWidth, minWidth: minWidth }}
        id={id}
        className={className}
        type={type}
        value={value}
        min={0}
        onChange={(e) => handleTextChange(e.target.value)}
      />
    </div>
  );
};
