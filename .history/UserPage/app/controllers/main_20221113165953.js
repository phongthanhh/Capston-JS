const ProductList = new getProductService();
const getEl = id => document.getElementById(id);

const renderTable = () => {
    console.log(document.querySelector('.product .card__main'))
}

function getProductList() {
    ProductList.getProductList()
        .then(productList => {

        })
        .catch(err => console.error(err))
}
getProductList()