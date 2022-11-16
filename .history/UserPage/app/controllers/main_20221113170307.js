const ProductList = new getProductService();
const getEl = id => document.getElementById(id);

const renderTable = arrProduct => {
    const cardMain = document.querySelector('.product .card__main');
    let content = '';
    arrProduct.map(product => {
        content += ``
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