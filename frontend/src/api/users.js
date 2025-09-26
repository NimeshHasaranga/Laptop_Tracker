import http from "./http";

export async function listUsersApi() {
  const { data } = await http.get("/users");
  return data;
}

export async function createUserApi(payload) {
  const { data } = await http.post("/users", payload);
  return data;
}

export async function updateUserApi(id, payload) {
  const { data } = await http.patch(`/users/${id}`, payload);
  return data;
}
