import http from "../http-common";

class AuItemService {
    findByAuId(auid) {
        return http.get(`/au/${auid}/relations`);
    }

    get(id) {
        return http.get(`/au/${id}/relations`);
    }

    create(data) {
        return http.post("/au/relations", data);
    }

    update(id, data) {
        return http.put(`/au/${id}/relations`, data);
    }

    delete(id) {
        return http.delete(`/au/${id}/relations/`);
    }
}

export default new AuItemService();