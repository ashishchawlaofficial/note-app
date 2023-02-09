// Function to create avatar(short name) from name
export const avatarName = (name) => {
  const avatar = name
    .slice()
    .split(" ")
    .map((item) => item[0])
    .join("");
  return avatar;
};

// Function to generate dynamic endpoint url
export const useApiEndpoint = (data) => {
  const { builderId, userId, endpointKey, isFormData = false } = data;
  const endpoint = isFormData
    ? `${process.env.REACT_APP_DB_URL}/users/${userId}/resume/${builderId}/${endpointKey}.json`
    : `${process.env.REACT_APP_DB_URL}/users/${userId}/${endpointKey}.json`;

  return endpoint;
};

// Flatten Firebase response
export const flattenResponse = (data) => {
  const result = Object.entries(data).map((item) => {
    return { ...item[item.length - 1], id: item[0] };
  });

  return result;
};

// Converting Object to Array
export const objToArr = (data) => {
  return Object.values(data).map((item) => item);
};

// Converting Object to Array of Objects
export const objToArrObj = (data) => {
  const arr = Object.entries(data).map((item) => {
    console.log("ObjArr: ", item);
    return { ...item };
  });
  return arr;
};

// Checks if an object is empty
export const isEmptyObj = (obj) => Object.keys(obj).length === 0;
// Checks if an array is empty
export const isEmptyArray = (arr) => arr.length === 0;
