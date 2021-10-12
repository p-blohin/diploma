import http from "../http-common";

class BuyerDataService {
    getAll() {
        return http.get("/buyer");
    }

    get(id) {
        return http.get(`/buyer/${id}`);
    }

    create(data) {
        return http.post("/buyer", data);
    }

    update(id, data) {
        return http.put(`/buyer/${id}`, data);
    }

    delete(id) {
        return http.delete(`/buyer/${id}`);
    }

    findByName(name) {
        return http.get(`/buyer?name=${name}`)
    }
}

export default new BuyerDataService();