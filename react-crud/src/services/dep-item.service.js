import http from "../http-common";

class DepItemService {
    findByDepId(depid) {
        return http.get(`/department/${depid}/relations`);
    }

    get(id) {
        return http.get(`/department/{dep_id}/relations/${id}`);
    }

    create(data) {
        return http.post("/department/relations", data);
    }

    update(id, data) {
        return http.put(`/department/${id}/relations`, data);
    }

    delete(id) {
        return http.delete(`/department/{dep_id}/relations/${id}`);
    }
}

export default new DepItemService();