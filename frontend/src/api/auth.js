import http from "./http";

export async function loginApi({ username, taNumber }) {
  const { data } = await http.post("/auth/login", { username, taNumber });
  return data; // { token, role, username }
}
