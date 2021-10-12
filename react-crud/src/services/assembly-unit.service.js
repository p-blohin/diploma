import http from "../http-common";

class AssemblyUnitDataService {
    getAll() {
        return http.get("/au");
    }

    get(id) {
        return http.get(`/au/${id}`);
    }

    create(data) {
        return http.post("/au", data);
    }

    update(id, data) {
        return http.put(`/au/${id}`, data);
    }

    delete(id) {
        return http.delete(`/au/${id}`);
    }

    findByName(name) {
        return http.get(`/au?name=${name}`);
    }

    findByDecimalNumber(decimalNumber) {
        return http.get(`/au?decimalNumber=${decimalNumber}`);
    }

    getAllRelations(id) {
        return http.get(`/relations/${id}`);
    }
}

export default new AssemblyUnitDataService();