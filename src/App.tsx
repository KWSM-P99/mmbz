import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import { Spacer } from "./components/Spacer";
import { Warning } from "./components/Warning";
import { Header } from "./components/Header";
import { Title } from "./components/Title";
import { CharacterPlate } from "./components/CharacterPlate";
import { LogFetcher } from "./components/LogFetcher";
import { bid } from "./types/types";
import { getTimeStamp } from "./utils/getTimeStamp";
import { Bids } from "./components/Bids";
import { Tells } from "./components/Tells";
import { OfficerBidInput } from "./components/OfficerBidInput";

let warningSize = 200000000;

function App() {
  const [logging, setLogging] = useState<boolean>(false);
  const [bids, setBids] = useState<bid[]>([]);
  const [nonBids, setNonBids] = useState<bid[]>([]);
  const [character, setCharacter] = useState<string>("");
  const [time, setTime] = useState<string>("");
  const [fileSize, setFileSize] = useState<number>(0);
  const [count, setCount] = useState<number>(0);
  const [intervalSecs, setIntervalSecs] = useState<number>(5);
  const [start, setStart] = useState<string | null>(null);
  const [stop, setStop] = useState<string | null>(null);
  const [officerBid, setOfficerBid] = useState<bid | null>(null);
  const [allBids, setAllBids] = useState<bid[]>([]);

  const fetchLog = () => {
    axios
      .post("http://localhost:8080/readlog")
      .then((res) => {
        let timeStamp = getTimeStamp(new Date().toISOString());
        setTime(timeStamp);
        let haveBids = res.data.bids;
        let doNotHaveBids = res.data.nonBids;
        let size = res.data.fileSize;
        let playerName = res.data.player;
        let start = res.data.start;
        let stop = res.data.stop;

        setBids(haveBids);
        setNonBids(doNotHaveBids);
        setFileSize(size);
        setCharacter(playerName);
        setStart(start);
        setStop(stop);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (logging) {
      const intervalId = setInterval(() => {
        setCount((prevCount) => prevCount + 1);
      }, 1000);
      return () => clearInterval(intervalId);
    }
  }, [logging]);

  useEffect(() => {
    if (logging && count >= intervalSecs) {
      console.log("fetching");
      setCount(0);
      fetchLog();
    }
  }, [count, logging]);

  useEffect(() => {
    let bidsPlusOfficer = [];
    if (officerBid) {
      bidsPlusOfficer = [officerBid, ...bids]
        .map((bid) => bid)
        .sort((a, b) => {
          if (a.bid > b.bid) {
            return -1;
          } else if (a.bid < b.bid) {
            return 1;
          } else return 0;
        });
      setAllBids(bidsPlusOfficer);
    } else {
      setAllBids(bids);
    }
  }, [bids]);

  const handleOfficerBid = (officerBid: bid) => {
    setOfficerBid(officerBid);
  };

  return (
    <>
      <div className="App">
        <Warning fileSize={fileSize} warningSize={warningSize} />
        <div className="main">
          <div style={{ display: "flex", flexDirection: "column" }}>
            <Header />
            <div className="cardHeader flex spaceBetween">
              <Title />
              <div className="flex center arrowHover">
                {(fileSize / 1000000).toFixed(2) +
                  "/" +
                  (warningSize / 1000000).toFixed(0) +
                  "MB"}
                <Spacer width="16px" />
                <CharacterPlate character={character} />
              </div>
            </div>
          </div>
          <div className="greyWhite flex rowToColumnMobile spaceBetween padding16">
            {/* <div className="flex center">
              <button className="module fontBold lightBlue radiusAll pointerHover padding16 white noBorder noOutline noWrap">
                Save Session
              </button>
            </div> */}
            {start && !stop && (
              <div className="flex center">
                <OfficerBidInput
                  handleOfficerBid={handleOfficerBid}
                  character={character}
                  start={start}
                  stop={stop}
                />
              </div>
            )}
            <Spacer height="12px" />
            <div className="flex center">
              <LogFetcher
                logging={logging}
                time={time}
                count={count}
                intervalSecs={intervalSecs}
                setLogging={setLogging}
              />
            </div>
          </div>
          <Spacer className="spacer" />
          <Bids
            bids={allBids}
            getTimeStamp={getTimeStamp}
            start={start}
            stop={stop}
          />
          <Tells nonBids={nonBids} getTimeStamp={getTimeStamp} />
        </div>
      </div>
    </>
  );
}

export default App;
