export const useGetUserInfo = () => {

    const authData = localStorage.getItem("auth");
  
    if (authData) {
      try {
        const { name, profilePhoto, userId, isAuth } = JSON.parse(authData);
        return { name, profilePhoto, userId, isAuth };
      } catch (error) {
        console.error("Error parsing auth data from localStorage:", error);
        return { name: null, profilePhoto: null, userId: null, isAuth: false };
      }
    } else {
      // If no auth data, return default values
      return { name: null, profilePhoto: null, userId: null, isAuth: false };
    }
  };
  