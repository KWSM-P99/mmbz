export const getTimeStamp = (dateISO: string) => {
  return dateISO.split("T")[1].substring(0, 8);
};
