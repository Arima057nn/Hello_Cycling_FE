export function convertDate(isoString: string | undefined) {
  if (!isoString) return;
  const date = new Date(isoString);

  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  const formattedDay = day < 10 ? `0${day}` : day;
  const formattedMonth = month < 10 ? `0${month}` : month;
  const formattedHours = hours < 10 ? `0${hours}` : hours;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

  const formattedDate = `${formattedDay}/${formattedMonth}/${year} - ${formattedHours}:${formattedMinutes}:${formattedSeconds}`;

  return formattedDate;
}
