export default class ProductModel {

    async getAll() {
        const response = await fetch("http://localhost:3000/products");
        return await response.json();
    }

    async getById(id) {
        const response = await fetch(`http://localhost:3000/products/${id}`);
        if (!response.ok) return null;
        return await response.json();
    }

    async delete(id) {
        return await fetch(`http://localhost:3000/products/${id}`, {
            method: "DELETE"
        });
    }
    async create(product) {
    return await fetch("http://localhost:3000/products", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(product)
    });
    }
    async update(product) {
        return await fetch(`http://localhost:3000/products/${product.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(product)
        });
    }
}