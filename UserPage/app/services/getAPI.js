function getProductService() {
    this.getProductList = () => {
        return axios({
            method: 'get',
            url: 'https://636a1269c07d8f936d924c14.mockapi.io/CapstoneProducts',
        });
    }
    this.getProduct = id => {
        return axios({
            method: 'get',
            url: `https://636a1269c07d8f936d924c14.mockapi.io/CapstoneProducts/${id}`,
        });
    }
}