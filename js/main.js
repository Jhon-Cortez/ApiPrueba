import ProductViewModel from "./viewmodel/ProductViewModel.js";

const app = new ProductViewModel();

document.addEventListener("DOMContentLoaded", () => {
    app.init();

    //Buscar ID
    document.getElementById("idFilter").addEventListener("input", () => app.findById());

    //Guardar una actualizacion
    document.getElementById("btnSave").addEventListener("click", () => app.updateProduct());

    //Creacion de un nuevo registro 
    document.getElementById("btnCreate").addEventListener("click", () => app.createProduct());
});