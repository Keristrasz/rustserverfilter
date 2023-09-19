import { format, formatDistanceToNowStrict } from "date-fns";

export function getCustomShortDate(timestamp: number) {
  if (timestamp == null || timestamp < 1652630662) {
    return "";
  }

  return format(new Date(timestamp * 1000), "HH:mm, MMM dd");
}

export function getTimeUptime(timestamp: number) {
  const date = new Date(timestamp * 1000);
  const hours = date.getHours();

  return `${hours} hours `;
}

export function getHowMuchAgo(timestamp: number) {
  if (timestamp == null || timestamp < 1652630662) {
    return "";
  }

  const date = new Date(timestamp * 1000);

  const timeAgo = formatDistanceToNowStrict(date, { addSuffix: true });

  return `${timeAgo}`;
}

export function getInHowMuch(timestamp: number) {
  if (timestamp == null || timestamp < 1652630662) {
    return "";
  }

  const date = new Date(timestamp * 1000);

  return `${formatDistanceToNowStrict(date, { addSuffix: true })}`;
}

// export function getHowMuchAgo(timestamp: number) {
//   if (timestamp == null || timestamp < 1652630662) {
//     return "";
//   }

//   const now = new Date();
//   const timeDifference = now.getTime() - timestamp * 1000;

//   if (Math.abs(timeDifference) < 3600000) {
//     const minutes = Math.floor(Math.abs(timeDifference) / 60000);

//     if (minutes < 60) {
//       return `${minutes} minutes ago`;
//     } else {
//       const hours = Math.floor(minutes / 60);
//       return `${hours} hours ago`;
//     }
//   }

//   if (timeDifference < 86400000) {
//     const hours = Math.floor(timeDifference / 3600000);
//     return `${hours} hours ago`;
//   }

//   if (timeDifference < 2592000000) {
//     const days = Math.floor(timeDifference / 86400000);
//     return `${days} days ago`;
//   }

//   const months = Math.floor(timeDifference / 2592000000);
//   return `${months} months ago`;
// }

// export function getInHowMuch(timestamp: number) {
//   if (timestamp == null || timestamp < 1652630662) {
//     return "";
//   }

//   const now = new Date();
//   const timeDifference = now.getTime() - timestamp * 1000;

//   if (timeDifference < 3600000 && timeDifference > 0) {
//     const minutes = Math.floor(timeDifference / 60000);

//     if (minutes < 60) {
//       return `${minutes} minutes ago`;
//     } else {
//       const hours = Math.floor(minutes / 60);
//       return `In ${hours} hours`;
//     }
//   }

//   if (Math.abs(timeDifference) < 3600000) {
//     const minutes = Math.floor(Math.abs(timeDifference) / 60000);
//     return `In ${minutes} minutes`;
//   }

//   if (timeDifference < 86400000) {
//     const hours = Math.floor(timeDifference / 3600000);
//     return `In ${hours} hours`;
//   }

//   if (timeDifference < 2592000000) {
//     const days = Math.floor(timeDifference / 86400000);
//     return `In ${days} days`;
//   }

//   const months = Math.floor(timeDifference / 2592000000);
//   return `In ${months} months`;
// }
