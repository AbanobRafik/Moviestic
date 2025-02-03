const key = "loggedIn";
const storeData = localStorage.getItem(key);
const userData = storeData ? JSON.parse(storeData) : null;

export default userData;