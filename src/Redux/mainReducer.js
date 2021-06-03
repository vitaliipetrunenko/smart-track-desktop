const SET_PROFILES = "SET-PROFILES";
const SET_LOADING_TRUE = "SET-LOADING-TRUE";

let defaultMain = {

};

export const mainReducer = (state = defaultMain, action) => {
  switch (action.type) {
    case SET_PROFILES:
      return {
        ...state,
        currProfiles: [...action.profiles],
        isLoading: false,
      };
    case SET_LOADING_TRUE:
      return {
        ...state,
        isLoading: true,
      };
    default:
      return state;
  }
};
export default mainReducer;
