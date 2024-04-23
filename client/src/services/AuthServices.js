import api from "../utils/api";

export const register = async (name, email, password) => {
  try {
    const response = await api.post("signup", {
      name,
      email,
      password,
    });

    console.log(response.data);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const isAuthenticated = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};
