import http from "../httpService";

const BASE_URL = `https://www.googleapis.com/userinfo/v2/me`;

export const authAsync = async (token) => {
  try {
    const res = await http.get(BASE_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.status === 200) {
      return res.data;
    }

    throw new Error("Google request not success");
  } catch (error) {
    throw error;
  }
};

export const Google = {
  authAsync,
};
