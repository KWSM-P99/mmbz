import { FC, useState } from "react";
import { LabeledInput } from "./LabelInput";
import { Spacer } from "./Spacer";
import { bid } from "../types/types";

type OfficerBidInputProps = {
  handleOfficerBid: (bid: bid) => void;
  character: string;
  start: string | null;
  stop: string | null;
};

export const OfficerBidInput: FC<OfficerBidInputProps> = ({
  handleOfficerBid,
  character,
  start,
  stop,
}) => {
  const [dkp, setDkp] = useState<number | "">("");
  const [item, setItem] = useState<string>("");

  const createBid = () => {
    if (!start) {
      alert("Start a bidding session before you bid!");
    }

    if (stop) {
      alert("The bidding session has ended");
    }

    if (start && !stop) {
      handleOfficerBid({
        date: new Date().toISOString(),
        tell: `OFFICER BID - '${character} bid ${dkp} [${item}]`,
        name: character,
        bid: dkp as number,
        officer: true,
      });
    }
    setDkp("");
    setItem("");
  };

  return (
    <div className="flex">
      <LabeledInput
        className="padding16 noBorder noOutline radiusLeft font15 fontBold inputHeight"
        id="dkp"
        maxWidth="50px"
        minWidth="50px"
        type="number"
        value={dkp}
        setValue={setDkp}
      >
        DKP
      </LabeledInput>
      <Spacer width="4px" />
      <LabeledInput
        className="padding16 noBorder noOutline font15 fontBold inputHeight"
        id="item"
        width="100%"
        type="text"
        value={item}
        setValue={setItem}
      >
        ITEM
      </LabeledInput>
      <button
        onClick={createBid}
        className={
          "radiusRight noBorder noOutline pointerHover padding16 white flex center clickable fontBold noWrap width100 font15" +
          `${dkp && item ? " lightGreen" : " lightBlue"}`
        }
        disabled={!dkp || !item}
      >
        {dkp && item ? "SUBMIT BID" : "ENTER BID"}
      </button>
    </div>
  );
};
