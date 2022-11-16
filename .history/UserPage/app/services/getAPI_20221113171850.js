function getProductService() {
    this.getProductList = () => {
        return axios({
            method: 'get',
            url: 'https://636a30e9c07d8f936d95cd4f.mockapi.io/CapProducts',
        });
    }

    this.addProduct = () => {
        return axios({
            method: 'get',
            url: 'https://636a30e9c07d8f936d95cd4f.mockapi.io/CapProducts',
        });
    }
}