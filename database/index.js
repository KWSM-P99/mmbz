//DATABASE
const fs = require("fs").promises;
const path = require("path");

const getDir = async () => {
  return await fs.readFile("./path.txt", "utf8", (err, data) => {
    if (err) {
      console.log(err);
      return;
    }

    return data;
  });
};

const getFile = async (dir) => {
  let fileNames = await fs.readdir(dir);

  let nodbg = fileNames.filter((name) => name !== "dbg.txt");

  let filePaths = nodbg.map((name) => getFilePath(dir, name));
  let formatFilePaths = filePaths.map((file) => file.split("\\").join("\\\\"));

  let fileStats = await Promise.all(
    formatFilePaths.map(async (path) => {
      return { path: path, stats: await fs.stat(path) };
    })
  );

  let sortbyModified = fileStats.sort((a, b) => {
    if (a.stats.mtime > b.stats.mtime) {
      return -1;
    } else if (a.stats.mtime < b.stats.mtime) {
      return 1;
    } else return 0;
  });

  return await sortbyModified[0];
};

const getFilePath = (dir, file) => {
  return path.join(dir + "\\" + file);
};

const getLog = async (filePath) => {
  return await fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.log(err);
    }
  });
};

const getString = (log) => {
  return JSON.stringify(log);
};

const removeQuotes = (log) => {
  if (log[0] === '"' && log[log.length - 1] === '"') {
    return log.substring(1, log.length - 2);
  }
  return log;
};

const getLines = (log) => {
  return log.split("\\r\\n");
};

const getTells = (log) => {
  return log.filter((line) => line.includes(" tells you, "));
};

const getDates = (tells) => {
  return tells.map((tell) => {
    for (let i = 0; i < tell.length; i++) {
      if (tell[i] === "]") {
        let date = new Date(tell.substring(1, i));
        let msg = tell.substring(i + 1, tell.length - 1).trim();
        return { date: date, tell: msg };
      }
    }
    return { date: "", tell: tell };
  });
};

const extractNumber = (bid) => {
  return parseInt(bid.tell.match(/(\d+)/)[0]);
};

const getBids = (dateTells) => {
  let bids = dateTells.filter((dateTell) => /\d/.test(dateTell.tell));

  let withNumbers = bids.map((bid) => {
    return { ...bid, bid: extractNumber(bid) };
  });
  return withNumbers;
};

const getNonBids = (dateTells) => {
  return dateTells
    .filter((dateTell) => !/\d/.test(dateTell.tell))
    .sort((a, b) => {
      if (a.date < b.date) {
        return 1;
      } else if (a.date > b.date) {
        return -1;
      }
      return 0;
    });
};

const extractName = (bid) => {
  return bid.tell.split(" ")[0];
};

const getNames = (bids) => {
  return bids.map((bid) => {
    return { ...bid, name: extractName(bid) };
  });
};

const getFileSize = (stats) => {
  return stats.size;
};

const getPlayerName = (path) => {
  let firstSplit = "";
  let secondSplit = "";
  if (path) {
    firstSplit = path.split("eqlog_")[1];
  }
  if (firstSplit) {
    secondSplit = firstSplit.split("_")[0];
  }

  if (secondSplit) {
    return secondSplit;
  }
  return "";
};

const sortByBid = (bids) => {
  return bids.sort((a, b) => {
    if (a.bid < b.bid) {
      return 1;
    } else if (a.bid > b.bid) {
      return -1;
    } else return 0;
  });
};

const splitStart = (log) => {
  let linesFromStart = log;

  for (let i = 0; i < log.length; i++) {
    let line = log[i];
    if (line.includes("] You say, 'mmbz START'")) {
      linesFromStart = log.slice(i, log.length - 1);
    }
  }

  return linesFromStart;
};

const splitEnd = (log) => {
  let linesUpToStop = log;

  for (let i = 0; i < log.length; i++) {
    let line = log[i];
    if (line.includes("] You say, 'mmbz STOP'")) {
      linesUpToStop = log.slice(0, i + 1);
    }
  }
  return linesUpToStop;
};

const getStart = (log) => {
  let firstLine = log[0];

  if (firstLine.includes("] You say, 'mmbz START'")) {
    return firstLine;
  } else return null;
};

const getStop = (log) => {
  let lastLine = log[log.length - 1];
  if (lastLine.includes("] You say, 'mmbz STOP'")) {
    return lastLine;
  } else return null;
};

const readLog = async () => {
  let dir = await getDir();
  let file = await getFile(dir);
  let playerName = getPlayerName(file.path);
  let fileSize = getFileSize(file.stats);
  let log = await getLog(file.path);
  let logString = getString(log);
  let logNoQuotes = removeQuotes(logString);
  let lines = getLines(logNoQuotes);
  let linesAfterStart = splitStart(lines);
  let sessionLines = splitEnd(linesAfterStart);
  let start = getStart(sessionLines);
  let stop = getStop(sessionLines);
  let tells = getTells(sessionLines);
  let dateTells = getDates(tells);
  let nonBids = getNonBids(dateTells);
  let bids = getBids(dateTells);
  let dateNameBid = getNames(bids);
  let bidsSorted = sortByBid(dateNameBid);
  let dateNameTell = getNames(nonBids);

  return {
    bids: bidsSorted,
    nonBids: dateNameTell,
    fileSize: fileSize,
    player: playerName,
    start: start ? start : null,
    stop: stop ? stop : null,
  };
};

module.exports = { readLog };
