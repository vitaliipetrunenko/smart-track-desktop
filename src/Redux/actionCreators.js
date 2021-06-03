export const setUserAC = (User) => ({ type: "SET-USER", user: User });
export const setProfilesAC = (profiles) => ({
  type: "SET-PROFILES",
  profiles: profiles,
});
export const setTokenAC = (token) => ({ type: "SET-TOKEN", token: token });
export const setLoadingTrueAC = () => ({ type: "SET-LOADING-TRUE" });
