import moment from "moment";

export function humanizeTime(timestamp) {
  const time = moment(timestamp, "YYYY-MM-DD HH:mm:ss").utc(3).local();
  const createdTime = moment.duration(time.diff(moment()), "milliseconds");
  const sec = createdTime.minutes();

  if (sec > -1) { return "less than a minute ago"; }
  if (sec <= -1 && sec > -2) { return "a minute ago"; }

  return `${createdTime.humanize()} ago`;
}

export function humanizeTimeToRead(time) {
  if (time < 1) return "less than a minute read";
  if (time >= 1 && time < 2) return "a minute read";

  return `${time} min read`;
}

export default humanizeTime;
