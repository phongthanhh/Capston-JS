function ProductService(){
    this.getProduct = function(){
        return axios({
            method: 'get',
            url: 'https://636a1269c07d8f936d924c14.mockapi.io/CapstoneProducts',
        });
    }
    this.addProduct = function(product){
        return axios({
            method: 'post',
            url: 'https://636a1269c07d8f936d924c14.mockapi.io/CapstoneProducts',
            data: product,
        });
    }
    this.deleteProduct = function(id){
        return axios({
            method: 'delete',
            url: `https://636a1269c07d8f936d924c14.mockapi.io/CapstoneProducts/${id}`
        });
    }
    this.getProductByID = function(id){
        return axios({
            method: 'get',
            url: `https://636a1269c07d8f936d924c14.mockapi.io/CapstoneProducts/${id}`,
        });
    }
    this.updateProduct = function(id, newData){
        return axios({
            method: 'put',
            url: `https://636a1269c07d8f936d924c14.mockapi.io/CapstoneProducts/${id}`,
            data: newData,
        });
    }
    this.searchProduct = function(productArray, keyword){
        var resultArray = [];
        var renderKeyword = keyword.toLowerCase().replace(/\s/g,"");

        productArray.map(function(product){
            var productName = product.name.toLowerCase().replace(/\s/g,"");

            if(productName.indexOf(renderKeyword) > -1){
                resultArray.push(product);
            }
        });
        return resultArray;
    }
}