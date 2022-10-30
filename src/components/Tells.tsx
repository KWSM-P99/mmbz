import { FC } from "react";
import { bid } from "../types/types";

type TellsProps = {
  nonBids: bid[];
  getTimeStamp: (dateString: string) => string;
};

export const Tells: FC<TellsProps> = ({ nonBids, getTimeStamp }) => (
  <>
    <div className="cardHeader flex center padding16vertical">{"Tells"}</div>
    <div className="blackPurple padding16">
      {nonBids.map((nonBid, i) => (
        <div
          key={nonBid.date + nonBid.name + nonBid.tell}
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <div key={i} className="">
            {nonBid.tell + "'"}
          </div>
          <div className="padding16Left" key={nonBid.date}>
            {" "}
            {getTimeStamp(nonBid.date)}{" "}
          </div>
        </div>
      ))}
    </div>
  </>
);
