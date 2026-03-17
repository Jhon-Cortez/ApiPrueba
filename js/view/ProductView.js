export default class ProductView {

    constructor() {
        this.container = document.getElementById("container");
    }

    renderProducts(products, onDelete, onEdit) {
        this.container.innerHTML = "";

        products.forEach(product => {
            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${product.id}</td>
                <td>${product.title}</td>
                <td>${product.price}</td>
                <td>
                    <button class="btn btn-danger">Delete</button>
                </td>
                <td>
                    <button class="btn btn-primary">Update</button>
                </td>
            `;

            // 🔥 eventos SIN onclick
            row.querySelector(".btn-danger")
                .addEventListener("click", () => onDelete(product.id));

            row.querySelector(".btn-primary")
                .addEventListener("click", () => onEdit(product));

            this.container.appendChild(row);
        });
    }

    getUpdateData() {
        return {
            id: document.getElementById("idUpdate").value,
            title: document.getElementById("title").value,
            price: document.getElementById("price").value
        };
    }

    setUpdateForm(product) {
        document.getElementById("idUpdate").value = product.id;
        document.getElementById("title").value = product.title;
        document.getElementById("price").value = product.price;
    }

    toggleView(showTable) {
        document.getElementById("open-table").style.display = showTable ? "block" : "none";
        document.getElementById("update").style.display = showTable ? "none" : "block";
    }

    getFilterId() {
        return document.getElementById("idFilter").value;
    }
    getNewProductData() {
    return {
        title: document.getElementById("newTitle").value,
        price: document.getElementById("newPrice").value
    };
}
}