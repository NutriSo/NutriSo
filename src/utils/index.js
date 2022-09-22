import dayjs from "dayjs";

export const waitFor = (ms) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export function capitilizeWord(word) {
  if (word) {
    const lower = word.toLowerCase();
    return word.charAt(0).toUpperCase() + lower.slice(1);
  }
  return "";
}

export const returnArrayToString = (array) => {
  try {
    if (Array.isArray(array)) {
      return array.join(", ");
    }
  } catch (error) {
    console.groupCollapsed("[returnArrayToString]");
    console.error(error);
    console.groupEnd();
    return "";
  }
};

export const stringArrayToNumberArray = (array) => {
  try {
    if (Array.isArray(array)) {
      return array.map((item) => Number(item));
    }
  } catch (error) {
    console.groupCollapsed("[stringArrayToNumberArray]");
    console.error(error);
    console.groupEnd();
    return [];
  }
};

export const returnLabelsByChart = (initialLabels, count) => {
  try {
    const auxLabels = [];
    if (Array.isArray(initialLabels)) {
      for (let i = 0; i < count; i++) {
        auxLabels.push(...initialLabels);
      }
    }
    return auxLabels;
  } catch (error) {
    console.groupCollapsed("[returnLabelsByChart]");
    console.error(error);
    console.groupEnd();
    return [""];
  }
};

export const returnDateLabelByChat = (initialLabels, count, data) => {
  try {
    const auxLabels = [];

    if (Array.isArray(initialLabels)) {
      for (let i = 0; i < count; i++) {
        auxLabels.push(dayjs(data[i]).format("DD/MM/YYYY"));
      }
    }

    return auxLabels;
  } catch (error) {
    console.groupCollapsed("[returnDateLabelByChat]");
    console.error(error);
    console.groupEnd();
    return [""];
  }
};

export const isEmptyString = (elem) => {
  return elem === "";
};

export const isInvalidElem = (elem) => {
  return elem === null || elem === undefined;
};

export const isEmptyArray = (arr) => {
  if (isInvalidElem(arr) || !Array.isArray(arr)) return true;

  return arr.length === 0;
};

export const isEmptyObject = (obj) => {
  if (isInvalidElem(obj)) return true;

  return Object.values(obj).length === 0;
};

export const returnJoinedArray = (arr) => {
  if (isEmptyArray(arr)) return "";

  return arr.join(", ");
};

export const isNumberType = (param) => {
  return typeof param === "number";
};

export const getIsANumber = (param) => {
  const normalized = Number(param);
  if (isNaN(normalized)) {
    return false;
  }
  return isNumberType(normalized);
};

export const returnJoinedArrayByKey = (key, arr) => {
  try {
    if (!Array.isArray(arr)) return "";

    const aux = arr.map((item) => {
      if (item[key] !== "N/A") return item[key];
      return "No";
    });

    const hasNo = aux.includes("No");

    if (hasNo) return "No";

    return aux.join(",");
  } catch (error) {
    console.groupCollapsed("[returnJoinedArrayByKey] error");
    console.error(error);
    console.groupEnd();
  }
};

export const normalize24HoursTo12Hours = (hour) => {
  if (isInvalidElem(hour)) return "";

  const hourNumber = Number(hour.split(":")[0]);
  const hourString = hour.split(":")[1];
  const suffix = hourNumber >= 12 ? " p.m." : " a.m.";
  const hour12 = hourNumber > 12 ? hourNumber - 12 : hourNumber;
  return `${hour12}:${hourString}${suffix}`;
};

export const getUrlsID = (URL) => {
  const ID = URL.match(
    /(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/
  );
  if (ID !== null) {
    //console.log(ID[1]);
    //setVideosData([...videosData, { id: 2, link: ID[1] }]);
    return ID[1];
  } else {
    console.log("The youtube url is not valid");
  }
};

export const getCurrentAge = (fecha) => {
  try {
    const hoy = new Date();
    const cumpleanos = new Date(fecha);
    let edad = hoy.getFullYear() - cumpleanos.getFullYear();
    const m = hoy.getMonth() - cumpleanos.getMonth();

    if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
      edad--;
    }

    return `${edad} años`;
  } catch (error) {
    console.log("Error al calcular la edad", error);
  }
};

export const getUserHash = () => {
  const id = window.location.hash.split("usuarios/")[1].trim();

  return id;
};

export const removeDuplicatedByKey = (arr, key) => {
  if (isEmptyArray(arr)) return [];

  const aux = [];
  const result = [];

  arr.forEach((elem) => {
    if (aux.includes(elem[key])) {
      return;
    }
    aux.push(elem[key]);
    result.push(elem);
  });

  return result;
};
