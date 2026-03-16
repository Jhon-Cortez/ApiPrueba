document.addEventListener("DOMContentLoaded", () => {
    getAllProducts();
});
async function getAllProducts() {
    let headersList = {
        "Accept": "*/*",
        "User-Agent": "Thunder Client (https://www.thunderclient.com)"
    }
    let response = await fetch("http://localhost:3000/products",{
        method:"GET",
        headers: headersList
    });
    let products = await response.json();
    console.log(products);

    var container = document.getElementById("container");
    container.innerHTML = "";
    products.forEach(product => {
        tableLoad(product);
    });
};
function tableLoad(product){

    const container = document.getElementById("container");

    const row = document.createElement("tr");

    row.innerHTML = `
        <td>${product.id}</td>
        <td>${product.title}</td>
        <td>${product.price}</td>
        <td>
            <button class="btn btn-danger" onclick="deleteByIdProduct(${product.id})">
                Delete
            </button>
        </td>
        <td>
            <button class="btn btn-primary"
            onclick="loadProductUpdate(${product.id},'${product.title}',${product.price})">
                Update
            </button>
        </td>
    `;

    container.appendChild(row);
}
async function deleteByIdProduct(id) {
    let response = await fetch(`http://localhost:3000/products/${id}`,{
        method: "DELETE"
});
    if (response.ok) {
        alert("Producto eliminado");
        getAllProducts()
    }else{
        alert("No se pudo eliminar")
    }

}

async function getFindByIdProduct() {

    const idFilter = document.getElementById("idFilter").value;

    if (idFilter === "") {
        return getAllProducts();
    }
    const response = await fetch(`http://localhost:3000/products/${idFilter}`);
    if (!response.ok) {
        alert("Producto no encontrado");
        return;
    }
    const product = await response.json();
    const container = document.getElementById("container");
    container.innerHTML = "";
    tableLoad(product);
}
async function updateProduct(){

    const id = document.getElementById("idUpdate").value;
    const title = document.getElementById("title").value;
    const price = document.getElementById("price").value;

    const response = await fetch(`http://localhost:3000/products/${id}`,{
        method: "PUT",
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify({
            id: Number(id),
            title: title,
            price: Number(price)
        })
    });

    if(!response.ok){
        alert("Error al actualizar");
        return;
    }
    alert("Producto actualizado");
    // mostrar tabla otra vez
    document.getElementById("open-table").style.display = "block";
    // ocultar formulario
    document.getElementById("update").style.display = "none";
    getAllProducts();
}
function loadProductUpdate(id,title,price){

    document.getElementById("idUpdate").value = id;
    document.getElementById("title").value = title;
    document.getElementById("price").value = price;

    document.getElementById("update").style.display = "block";
     document.getElementById("open-table").style.display = "none";

}