import { FC } from "react";
import { Theme } from "./Theme";

type LogFetcherProps = {
  logging: boolean;
  time: string;
  count: number;
  intervalSecs: number;
  setLogging: (logging: boolean) => void;
};

export const LogFetcher: FC<LogFetcherProps> = ({
  logging,
  time,
  count,
  intervalSecs,
  setLogging,
}) => (
  <div className="flex center clickable" onClick={() => setLogging(!logging)}>
    <div className="fontBold module lightBlue radiusLeft padding16 pointerHover">
      <div className="arrowHover flex center padding16Right inputHeight">
        {logging ? intervalSecs - count : ""}
      </div>
      {logging ? "Fetched @ " + time : "Start Fetch"}
    </div>
    {logging && (
      <div className="greenBg flex center white padding16 fontBold pointerHover radiusRight lightGreen inputHeight">
        {"ON"}
      </div>
    )}
    {!logging && (
      <div className="redBg flex center white padding16 fontBold pointerHover radiusRight inputHeight">
        {"OFF"}
      </div>
    )}
  </div>
);
