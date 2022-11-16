const ProductList = new getProductService();
const getEl = id => document.getElementById(id);
// Mảng chứa list product
let prList = [];
// Mảng chứa product cart
let arrCart = []

const findID = id => {
    for (let i = 0; i < prList.length; i++) {
        if (prList[i].id == id) return i;
    }
    return -1;
}

const renderTable = arrProduct => {
    const cardMain = document.querySelector('.product .card__main');
    let content = '';
    arrProduct.map(product => {
        content += `
        <div class="vCard">
        <div class="card__img">
            <img src="${product.img}" alt="">
        </div>
        <div class="card__intro">
            <h5 class="card__intro__title">${product.name}</h5>
            <p class="card__intro__price">${product.price}$</p>
        </div>
        <div class="card__overlay">
            <div class="card__button">
                <div class="card__button__see">
                    <button class="btn__main" href="">
                        <i class="fa-regular fa-eye"></i>
                        <span>See</span>
                    </button>
                </div>
                <div class="card__button__add">
                    <button class="btn__main" onclick='getProductCart(${product.id})' href="">
                        <i class="fa-solid fa-cart-shopping"></i>
                        <span>Add</span>
                    </button>
                </div>
            </div>
        </div>
    </div>
        `
    })
    cardMain.innerHTML = content
}

function getProductList() {
    const cardMain = document.querySelector('.product .card__main');
    cardMain.innerHTML = `<div class="spinner-border text-info" role="status">
    <span class="sr-only">Loading...</span>
  </div>`
    ProductList.getProductList()
        .then(productList => {
            prList = productList.data
            renderTable(productList.data);
        })
        .catch(err => console.error(err))
}
getProductList()

// todo: Filter product
function filteProduct(event) {
    const Evalue = event.target.value
    let productFillter = [];
    const cardMain = document.querySelector('.product .card__main');
    cardMain.innerHTML = `<div class="spinner-border text-info" role="status">
    <span class="sr-only">Loading...</span>
  </div>`
    ProductList.getProductList()
        .then(productList => {
            setTimeout(() => {
                switch (Evalue) {
                    case '1':
                        productFillter = productList.data.filter((data, index) => {
                            console.log(data)
                            return data.type === 'Iphone'
                        })
                        break
                    case '2':
                        productFillter = productList.data.filter((data, index) => data.type === 'Samsung')
                        break
                    default:
                        productFillter = productList.data
                }
                renderTable(productFillter)
            }, 500)
        })
        .catch(err => console.error(err))
}

const getProductCart = id => {
    const cartIcon = getEl('cartIcon')
    cartIcon.classList.add('effect')
    setTimeout(() => cartIcon.classList.remove('effect'), 700)
    let cartItem = new ProductCart(prList[findID(id)], 1)
    arrCart.push(cartItem)
    console.log(arrCart)
    saveData()

}
const checkCartItem = id => {
    let temp = -1;
    arrCart.forEach((item, index) => {
        if (item.phone.id === id) temp = index;
    })
    console.log(temp)
    return temp
}

const showQuantity = () => {
    if (arrCart.length <= 0) {
        getEl("showQuantity").style.display = "none";
    } else {
        console.log(arrCart.length)
        getEl("showQuantity").style.display = "block";
        getEl("showQuantity").innerHTML = `${arrCart.length}`;
    }
};

// Save data localStorage
const saveData = () => {
    localStorage.setItem("arrCart", JSON.stringify(arrCart));
    showQuantity();
};

// Get data localStorage
const fetchData = () => {
    const localCart = localStorage.getItem('arrCart')
    if (localCart) arrCart = JSON.parse(localCart)
    console.log('PhongThanh 🚀 ~> cartItem', arrCart)
    showQuantity();
}
fetchData()
showQuantity()