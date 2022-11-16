const ProductList = new getProductService();
const getEl = id => document.getElementById(id);
const arrCart = []



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
                    <a class="btn__main" href="">
                        <i class="fa-regular fa-eye"></i>
                        <span>See</span>
                    </a>
                </div>
                <div class="card__button__add">
                    <a class="btn__main" href="">
                        <i class="fa-solid fa-cart-shopping"></i>
                        <span>Add</span>
                    </a>
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
            if (productList && productList.data && productList.data.length > 0) {
                renderTable(productList.data)
            }
        })
        .catch(err => console.error(err))
}
getProductList()

// function popupCart() {
//     const btnCart = document.querySelector('.btnCart')

// }
// popupCart()

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
                if (productList && productList.data && productList.data.length > 0) {
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
                    console.log(productFillter);
                    renderTable(productFillter)
                }
            }, 500)
        })
        .catch(err => console.error(err))
}

const getProduct = ()