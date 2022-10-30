import { FC } from "react";
import { bid } from "../types/types";
import { getColor } from "../utils/getColor";
import { Theme } from "./Theme";

type BidsProps = {
  bids: bid[];
  getTimeStamp: (dateString: string) => string;
  start: string | null;
  stop: string | null;
};

export const Bids: FC<BidsProps> = ({ bids, getTimeStamp, start, stop }) => (
  <>
    <div className="cardHeader flex center padding16vertical">{"Bids"}</div>
    <div className="blackPurple padding16">
      {start && (
        <div className="widthMax flex center white padding16vertical">
          {start}
        </div>
      )}
      <table className="collapse" style={{ width: "100%" }}>
        <tbody>
          {bids.map((bid, i) => (
            <tr
              key={bid.date + bid.name + bid.bid}
              style={{
                color: getColor(bid.bid, bid.officer),
                backgroundColor: bid.officer ? "#222222" : "",
              }}
            >
              <td
                className={
                  bid.bid >= 2000
                    ? "padding16Right alignTop glow"
                    : "padding16Right alignTop"
                }
                style={{ color: getColor(bid.bid, bid.officer) }}
              >
                {bid.bid}
              </td>
              {bid.bid >= 2000 ? (
                <td
                  className={bid.bid >= 2000 ? "glow" : ""}
                  style={{
                    color: Theme.BRIGHTYELLOW,
                  }}
                >
                  {bid.tell + "'"}
                </td>
              ) : (
                <td className={bid.bid >= 2000 ? "glow maxWidth" : "maxWidth"}>
                  {bid.tell + "'"}
                </td>
              )}
              <td className="alignTop">{getTimeStamp(bid.date)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {stop && (
        <div className="widthMax flex center white padding16vertical">
          {stop}
        </div>
      )}
    </div>
  </>
);
