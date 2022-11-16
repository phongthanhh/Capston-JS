const ProductList = new getProductService();
const getEl = id => document.getElementById(id);

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
            <h5 class="card__intro__title">Iphone 14 pro</h5>
            <p class="card__intro__price">2000$</p>
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
}
renderTable()

function getProductList() {
    ProductList.getProductList()
        .then(productList => {

        })
        .catch(err => console.error(err))
}
getProductList()