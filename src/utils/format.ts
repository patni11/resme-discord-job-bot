export function formattedDate(date: string | undefined) {
  if (!date) {
    return "";
  }

  console.log("DATE STR", typeof date, date);
  const dateObj = new Date(date);
  console.log("DATE Obj", typeof dateObj, dateObj);
  const day = dateObj.getDate().toString().padStart(2, "0");
  const month = dateObj.toLocaleString("default", { month: "short" });
  const year = dateObj.getFullYear();
  const formattedDate = `${day} ${month} ${year}`;
  return formattedDate;
}
