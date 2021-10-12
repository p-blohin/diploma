import http from "../http-common";

class AuAuDataService {
    getAll() {
        return http.get("/au_au");
    }

    get(parentId) {
        return http.get(`/au_au/${parentId}`)
    }

    create(data) {
        return http.post("/au_au", data);
    }

    update(id, data) {
        return http.put(`/au_au/${id}`, data);
    }

    delete(id) {
        return http.delete(`/au_au/${id}`);
    }
}

export default AuAuDataService;