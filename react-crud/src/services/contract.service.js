import http from "../http-common";

class ContractDataService {
    getAll() {
        return http.get("/contract");
    }

    get(id) {
        return http.get(`/contract/${id}`);
    }

    create(data) {
        return http.post("/contract", data);
    }

    update(id, data) {
        return http.put(`/contract/${id}`, data);
    }

    delete(id) {
        return http.delete(`/contract/${id}`);
    }

    findByContract(contract) {
        return http.get(`/contract?contract=${contract}`);
    }

    findByBuyer(buyer) {
        return http.get(`/contract?contract=${buyer}`);
    }

    findByStage(stage) {
        return http.get(`/contract?contract=${stage}`);
    }

    findByProduct(product) {
        return http.get(`/contract?contract=${product}`);
    }
}

export default new ContractDataService();