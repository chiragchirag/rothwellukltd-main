export const formattedDate = (epochTime) => {
  const date = new Date(epochTime);
  const formattedDate = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
  return formattedDate;
};

export const convertDateIntoYYYYMMDD = (oldDate) => {
  if (oldDate) {
    const date = new Date(oldDate);
    const year = date.getFullYear();
    const month = `0${date.getMonth() + 1}`.slice(-2);
    const day = `"0${+date.getDate()}`.slice(-2);
    const formattedDate = `${day}/${month}/${year}`;
    return formattedDate;
  }
};

export function formatDateYYYYMMDD(e) {
  const date = new Date(e);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export const convertDateToYYYYMMDD = (oldDate) => {
  if (oldDate) {
    const date = new Date(oldDate);
    const year = date.getFullYear();
    const month = `0${date.getMonth() + 1}`.slice(-2);
    const day = `"0${+date.getDate()}`.slice(-2);
    const formattedDate = `${year}/${month}/${day}`;
    return formattedDate;
  }
};

export const convertDateYYYYMMDD = (oldDate) => {
  if (oldDate) {
    const date = new Date(oldDate);
    const year = date.getFullYear();
    const month = `0${date.getMonth() + 1}`.slice(-2);
    const day = `"0${+date.getDate()}`.slice(-2);
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
  }
};

export const convertDate = (oldDate) => {
  if (oldDate) {
    const date = new Date(oldDate);
    const year = date.getFullYear();
    const month = `0${date.getMonth() + 1}`.slice(-2);
    const day = `0${date.getDate()}`.slice(-2);
    const hours = `0${date.getHours()}`.slice(-2);
    const minutes = `0${date.getMinutes()}`.slice(-2);
    const formattedDateTime = `${day}-${month}-${year} ${hours}:${minutes}`;
    return formattedDateTime;
  }
};

export const convertDateToDDMMYYYY = (oldDate) => {
  if (oldDate) {
    const date = new Date(oldDate);
    const year = date.getFullYear();
    const month = `0${date.getMonth() + 1}`.slice(-2);
    const day = `0${date.getDate()}`.slice(-2);
    const formattedDateTime = `${day}-${month}-${year}`;
    return formattedDateTime;
  }
};

export default function throttle(callback, limit) {
  let waiting = false;
  return function () {
    if (!waiting) {
      callback.apply(this, arguments);
      waiting = true;
      setTimeout(() => {
        waiting = false;
      }, limit);
    }
  };
}

export const normalDateTime = (epochTime) => {
  const normalTime = new Date(epochTime * 1000);
  const MONTH = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const year = normalTime.getFullYear();
  const month = MONTH[normalTime.getMonth()];
  const day = normalTime.getDate();
  const hours = normalTime.getHours();
  const minutes = normalTime.getMinutes();
  // const AM_PM = hours >= 12 ? "PM" : "AM";
  const hours12 = hours % 12 || 12;
  return `${day < 10 ? `0${day}` : day}-${month}-${year}  ${hours12 < 10 ? `0${hours12}` : hours12}:${minutes < 10 ? `0${minutes}` : minutes}`;
};

export const convertDateFormatYYYYMMDD = (dateString) => {
  const parts = dateString.split("/");
  if (parts.length === 3) {
    return `${parts[2]}/${parts[1]}/${parts[0]}`;
  }
  return dateString;
};
