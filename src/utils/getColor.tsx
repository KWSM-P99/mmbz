import { Theme } from "../components/Theme";

export const getColor = (value: number, officer: boolean | undefined) => {
  if (officer) {
    return Theme.PINK;
  }

  if (value < 10) {
    return Theme.POOR;
  } else if (value < 50) {
    return Theme.COMMON;
  } else if (value < 250) {
    return Theme.UNCOMMON;
  } else if (value < 500) {
    return Theme.RARE;
  } else if (value < 1000) {
    return Theme.EPIC;
  } else if (value < 1500) {
    return Theme.LEGENDARY;
  } else if (value < 2000) {
    return Theme.YELLOW;
  } else return Theme.BRIGHTYELLOW;
};
