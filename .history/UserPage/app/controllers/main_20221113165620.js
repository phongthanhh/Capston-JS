const ProductList = new getProductService();
const getEl = id => document.getElementById(id);


function getProductList() {
    ProductList.getProductList()
        .then(productList => console.log(productList))
        .catch(err => console.error(err))
}
getProductList()