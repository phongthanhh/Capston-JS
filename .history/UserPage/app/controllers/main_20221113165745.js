const ProductList = new getProductService();
const getEl = id => document.getElementById(id);

const renderTable = () => {

}

function getProductList() {
    ProductList.getProductList()
        .then(productList => {

        })
        .catch(err => console.error(err))
}
getProductList()