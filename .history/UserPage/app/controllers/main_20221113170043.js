const ProductList = new getProductService();
const getEl = id => document.getElementById(id);

const renderTable = () => {
    const cardMain = document.querySelector('.product .card__main');
    
}
renderTable()

function getProductList() {
    ProductList.getProductList()
        .then(productList => {

        })
        .catch(err => console.error(err))
}
getProductList()