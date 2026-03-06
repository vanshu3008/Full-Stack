const api="/api/products"

let products=[]


async function fetchProducts(){

const res=await fetch(api)

products=await res.json()

displayProducts(products)

}


function displayProducts(list){

const container=document.getElementById("productList")

container.innerHTML=""

list.forEach(p=>{

container.innerHTML+=`

<div class="card">

<img src="${p.image || 'https://via.placeholder.com/300'}">

<h3>${p.name}</h3>

<p class="price">₹${p.price}</p>

<p>${p.category}</p>

<button class="delete" onclick="deleteProduct('${p._id}')">
Delete
</button>

</div>

`

})

}


async function addProduct(){

const product={

name:document.getElementById("name").value,

price:document.getElementById("price").value,

category:document.getElementById("category").value,

image:document.getElementById("image").value

}

await fetch(api,{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify(product)
})

toggleForm()

fetchProducts()

}


async function deleteProduct(id){

await fetch(api+"/"+id,{
method:"DELETE"
})

fetchProducts()

}


function toggleForm(){

const form=document.getElementById("productForm")

form.classList.toggle("hidden")

}


document.getElementById("search").addEventListener("input",filterProducts)

document.getElementById("categoryFilter").addEventListener("change",filterProducts)


function filterProducts(){

const search=document.getElementById("search").value.toLowerCase()

const category=document.getElementById("categoryFilter").value

let filtered=products.filter(p=>p.name.toLowerCase().includes(search))

if(category){

filtered=filtered.filter(p=>p.category===category)

}

displayProducts(filtered)

}


function resetFilters(){

document.getElementById("search").value=""

document.getElementById("categoryFilter").value=""

displayProducts(products)

}


fetchProducts()