import { FC } from "react";

type WarningProps = {
  fileSize: number;
  warningSize: number;
};

export const Warning: FC<WarningProps> = ({ fileSize, warningSize }) => {
  if (fileSize > warningSize) {
    return (
      <div className="warning padding16">
        {
          "Warning: your log file is large! This will greatly affect performance of this app."
        }
      </div>
    );
  } else return <></>;
};
