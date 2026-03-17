export default class EntityView {

    constructor() {
        this.container = document.getElementById("container");
        this.thead = document.getElementById("table-head");
        this.formContainer = document.getElementById("dynamicForm");
    }

    // 🔥 TABLA DINÁMICA
    renderTable(data, onDelete, onEdit) {

        this.container.innerHTML = "";
        this.thead.innerHTML = "";

        if (!data || data.length === 0) return;

        const columns = Object.keys(data[0]);

        // 🧠 HEADERS
        const headerRow = document.createElement("tr");

        columns.forEach(col => {
            const th = document.createElement("th");
            th.textContent = col;
            headerRow.appendChild(th);
        });

        // columnas extra
        const thDelete = document.createElement("th");
        thDelete.textContent = "Delete";

        const thUpdate = document.createElement("th");
        thUpdate.textContent = "Update";

        headerRow.appendChild(thDelete);
        headerRow.appendChild(thUpdate);

        this.thead.appendChild(headerRow);

        // 🔥 FILAS
        data.forEach(item => {

            const row = document.createElement("tr");

            columns.forEach(col => {
                const td = document.createElement("td");

                const value = item[col];

                // 🧠 MANEJO DE OBJETOS
                if (Array.isArray(value)) {
                    td.textContent = value
                        .map(v => {
                            if (v.id && v.quantity) {
                                return `ID:${v.id} x${v.quantity}`;
                            }
                            return JSON.stringify(v);
                        })
                        .join(", ");
                } 
                else if (typeof value === "object" && value !== null) {
                    td.textContent = JSON.stringify(value);
                } 
                else {
                    td.textContent = value;
                }

                row.appendChild(td);
            });

            // 🔴 DELETE
            const tdDelete = document.createElement("td");
            const btnDelete = document.createElement("button");
            btnDelete.className = "btn btn-danger btn-sm";
            btnDelete.textContent = "Delete";
            btnDelete.onclick = () => onDelete(item.id);
            tdDelete.appendChild(btnDelete);

            // 🔵 UPDATE
            const tdUpdate = document.createElement("td");
            const btnUpdate = document.createElement("button");
            btnUpdate.className = "btn btn-primary btn-sm";
            btnUpdate.textContent = "Update";
            btnUpdate.onclick = () => onEdit(item);
            tdUpdate.appendChild(btnUpdate);

            row.appendChild(tdDelete);
            row.appendChild(tdUpdate);

            this.container.appendChild(row);
        });
    }

    // 🔥 FORM DINÁMICO
    renderForm(item = {}, entity) {

        this.formContainer.innerHTML = "";

        const entityFields = {
            products: ["title", "price", "description"],
            users: ["name", "email"],
            posts: ["title", "body"],
            carts: ["userId"]
        };

        const fields = entityFields[entity] || [];

        fields.forEach(key => {

            const input = document.createElement("input");
            input.className = "form-control mt-2";
            input.placeholder = key;
            input.value = item[key] || "";
            input.id = `field-${key}`;

            this.formContainer.appendChild(input);
        });
    }

    // 🔥 OBTENER DATOS DEL FORM
    getFormData() {
        const inputs = document.querySelectorAll("#dynamicForm input");

        let data = {};

        inputs.forEach(input => {
            const key = input.id.replace("field-", "");
            data[key] = input.value;
        });

        return data;
    }

    // 🔥 CAMBIAR VISTA
    toggleView(showTable) {
        const table = document.getElementById("open-table");
        const form = document.getElementById("update");

        if (table) table.style.display = showTable ? "block" : "none";
        if (form) form.style.display = showTable ? "none" : "block";
    }

    // 🔍 FILTRO
    getFilterId() {
        const input = document.getElementById("idFilter");
        return input ? input.value : "";
    }
}