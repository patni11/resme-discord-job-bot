export function formattedDate(date: string | undefined) {
  if (!date) {
    return "";
  }

  
  const dateObj = new Date(date);
  const day = dateObj.getDate().toString().padStart(2, "0");
  const month = dateObj.toLocaleString("default", { month: "short" });
  const year = dateObj.getFullYear();
  const formattedDate = `${day} ${month} ${year}`;
  return formattedDate;
}
