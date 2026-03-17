import EntityModel from "../model/EntityModel.js";
import EntityView from "../view/EntityView.js";

export default class EntityViewModel {

    constructor() {
        this.model = new EntityModel();
        this.view = new EntityView();

        this.currentEntity = "products";
        this.currentId = null;
    }

    async init() {
        this.loadData();
    }

    async loadData() {
        const data = await this.model.getAll(this.currentEntity);

        this.view.renderTable(
            data,
            this.currentEntity,
            this.deleteItem.bind(this),
            this.loadUpdateForm.bind(this)
        );
    }

    changeEntity(entity) {
        this.currentEntity = entity;
        this.loadData();
    }

    async deleteItem(id) {
        await this.model.delete(this.currentEntity, id);
        this.loadData();
    }

    async findById() {
        const id = this.view.getFilterId();

        if (!id) return this.loadData();

        const item = await this.model.getById(this.currentEntity, id);

        if (!item) return alert("No encontrado");

        this.view.renderTable(
            [item],
            this.currentEntity,
            this.deleteItem.bind(this),
            this.loadUpdateForm.bind(this)
        );
    }

    loadUpdateForm(item) {
        this.currentId = item.id;
        this.view.renderForm(item, this.currentEntity);
        this.view.toggleView(false);
    }

    async update() {
        let data = this.view.getFormData();

        // 🔥 convertir números
        Object.keys(data).forEach(key => {
            if (!isNaN(data[key]) && data[key] !== "") {
                data[key] = Number(data[key]);
            }
        });

    await this.model.update(this.currentEntity, {
        id: this.currentId,
        ...data
    });

    this.view.toggleView(true);
    this.loadData();
}

    showCreateForm() {
        this.currentId = null;

        this.view.renderForm({}, this.currentEntity);
        this.view.toggleView(false);
    }

    async create() {
        const data = this.view.getFormData();

        await this.model.create(this.currentEntity, data);

        this.view.toggleView(true);
        this.loadData();
    }
    
}