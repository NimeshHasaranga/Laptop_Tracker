import http from "./http";

export async function listLaptopsApi(params = {}) {
  const { data } = await http.get("/laptops", { params });
  return data;
}
export async function getLaptopApi(id) {
  const { data } = await http.get(`/laptops/${id}`);
  return data;
}
export async function createLaptopApi(payload) {
  const { data } = await http.post("/laptops", payload);
  return data;
}
export async function updateLaptopApi(id, payload) {
  const { data } = await http.patch(`/laptops/${id}`, payload);
  return data;
}
export async function deleteLaptopApi(id) {
  const { data } = await http.delete(`/laptops/${id}`);
  return data;
}

export async function getDashboardApi() {
  const { data } = await http.get("/dashboard");
  return data;
}
