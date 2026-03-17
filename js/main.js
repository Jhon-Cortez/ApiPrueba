import EntityViewModel from "./viewmodel/EntityViewModel.js";

const app = new EntityViewModel();

document.addEventListener("DOMContentLoaded", () => {
    app.init();

    const entitySelect = document.getElementById("entitySelect");
    if (entitySelect) {
        entitySelect.addEventListener("change", e => app.changeEntity(e.target.value));
    }

    const idFilter = document.getElementById("idFilter");
    if (idFilter) {
        idFilter.addEventListener("input", () => app.findById());
    }

    const btnSave = document.getElementById("btnSave");
    if (btnSave) {
        btnSave.addEventListener("click", () => app.update());
    }

    const btnAdd = document.getElementById("btnAddProduct");
    if (btnAdd) {
        btnAdd.addEventListener("click", () => app.showCreateForm());
    }

    const btnCreate = document.getElementById("btnCreate");
    if (btnCreate) {
        btnCreate.addEventListener("click", () => app.create());
    }
});