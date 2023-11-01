// Function to get the user data and token from local storage
export const getUser = () => {
    const storedUserData = localStorage.getItem('user');
    if (storedUserData) {
      return JSON.parse(storedUserData).data;
    }
    return null;
  };
  
// Function to clear user data from local storage
export const clearUser = () => {
    localStorage.removeItem('user');
};