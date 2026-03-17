import ProductModel from "../model/ProductModel.js";
import ProductView from "../view/ProductView.js";

export default class ProductViewModel {

    constructor() {
        this.model = new ProductModel();
        this.view = new ProductView();
    }

    async init() {
        this.loadProducts();
    }

    async loadProducts() {
        const products = await this.model.getAll();
        this.view.renderProducts(
            products,
            this.deleteProduct.bind(this),
            this.loadUpdateForm.bind(this)
        );
    }

    async deleteProduct(id) {
        const response = await this.model.delete(id);

        if (response.ok) {
            alert("Producto eliminado");
            this.loadProducts();
        } else {
            alert("Error al eliminar");
        }
    }

    async findById() {
        const id = this.view.getFilterId();

        if (!id) return this.loadProducts();

        const product = await this.model.getById(id);

        if (!product) {
            alert("Producto no encontrado");
            return;
        }

        this.view.renderProducts(
            [product],
            this.deleteProduct.bind(this),
            this.loadUpdateForm.bind(this)
        );
    }

    loadUpdateForm(product) {
        this.view.setUpdateForm(product);
        this.view.toggleView(false);
    }

    async updateProduct() {
        const data = this.view.getUpdateData();

        const response = await this.model.update({
            id: Number(data.id),
            title: data.title,
            price: Number(data.price)
        });

        if (!response.ok) {
            alert("Error al actualizar");
            return;
        }

        alert("Producto actualizado");
        this.view.toggleView(true);
        this.loadProducts();
    }
    async createProduct() {
    const data = this.view.getNewProductData();

    const response = await this.model.create({
        title: data.title,
        price: Number(data.price)
    });

    if (!response.ok) {
        alert("Error al crear");
        return;
    }

    alert("Producto creado");

    this.loadProducts();
    }
    
}