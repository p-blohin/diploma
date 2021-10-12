import http from "../http-common";

class PlanDataService {
    getAllByDepId(dep_id) {
        return http.get(`/plans/${dep_id}`);
    }

    get(id) {
        return http.get('/plans/{dep_id}/${id}')
    }

    create(data) {
        return http.post(`/tasks/active`, data);
    }

    update(id, data) {
        return http.put(`/plans/{dep_id}/${id}`, data);
    }

    delete(id) {
        return http.delete(`/plans/{dep_id}/${id}`);
    }
}

export default new PlanDataService();