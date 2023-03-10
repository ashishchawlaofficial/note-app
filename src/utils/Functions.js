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
export const useApiEndpoint = (userId, endpointKey, accessToken) =>
  `${process.env.REACT_APP_DB_URL}/users/${userId}/notes/${endpointKey}.json?auth=${accessToken}`;

// Flatten Firebase response
export const flattenResponse = (data) => {
  const result = Object.entries(data).map(([key, item]) => {
    return { ...item, id: key };
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

// contentShortner
export const contentShortner = (content, limit) =>
  content.slice(0, limit).concat("[...]");
