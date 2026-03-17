export default class EntityModel {

    constructor() {
        this.baseUrl = "http://localhost:3000";
    }

    async getAll(entity) {
        const res = await fetch(`${this.baseUrl}/${entity}`);
        return await res.json();
    }

    async getById(entity, id) {
        const res = await fetch(`${this.baseUrl}/${entity}/${id}`);
        if (!res.ok) return null;
        return await res.json();
    }

    async delete(entity, id) {
        return await fetch(`${this.baseUrl}/${entity}/${id}`, {
            method: "DELETE"
        });
    }

    async update(entity, data) {
        return await fetch(`${this.baseUrl}/${entity}/${data.id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });
    }

    async create(entity, data) {
        return await fetch(`${this.baseUrl}/${entity}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });
    }
}