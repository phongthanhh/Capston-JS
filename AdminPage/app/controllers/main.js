const productService = new ProductService();
const validation = new Validation();

var productArray = [];
function getProductData(){
    productService.getProduct()
    .then(function(result){
        console.log(result.data);
        showProductData(result.data);

        productArray = [];
        for(var i = 0; i < result.data.length; i++){
            productArray.push(result.data[i]);
        }

        chartDraw(result.data);
    })
    .catch(function(error){
        console.log(error);
    });
}

getProductData();

function showProductData(productArray){
    var content = "";
    var count = 1;

    productArray.map(function(product, index){
        content += `
        <tr>
        <td>${count++}</td>
        <td> <img src="${product.img}" alt="" width="25px" height="30px"> <span>${product.name}</span></td>
        <td>${product.price}$</td>
        <td>${product.screen}</td>
        <td>${product.backCamera}</td>
        <td>${product.frontCamera}</td>
        <td>${product.type}</td>
        <td>
        <button class="btn deleteBtn" onclick="deleteProductItem('${product.id}')">Delete</button>
        <button class="btn viewBtn" onclick="getProductByIDMain('${product.id}')" data-toggle="modal" data-target="#productModal">View</button>
        </td>
        </tr>
        `
    });
    document.querySelector("#product-tbody").innerHTML = content;
    document.querySelector("#soLuongSanPham").innerHTML = --count;
}

document.querySelector("#addProductBtn").onclick = function() {
    document.querySelector("#productModal .modal-footer").innerHTML = `
    <button type="button" class="btn redBtn" data-dismiss="modal">Close</button>
    <button type="button" class="btn blueBtn" id="addProductBtn" onclick="addNewProduct()">Add Product</button>
    `;

    document.querySelector("#productModal form").reset();
}


function addNewProduct(){
    var name = document.querySelector("#productName").value;
    var price = document.querySelector("#productPrice").value;
    var screen = document.querySelector("#productScreen").value;
    var backCamera = document.querySelector("#productBackCamera").value;
    var frontCamera = document.querySelector("#productFrontCamera").value;
    var img = document.querySelector("#productImage").value;
    var desc = document.querySelector("#productDescription").value;
    var type = document.querySelector("#productTypeSelect").value;

    var isValid = true;

    isValid &= validation.checkEmpty(name, "T??n kh??ng ???????c ????? tr???ng", "nameNotice");

    isValid &= validation.checkEmpty(price, "Gi?? kh??ng ???????c ????? tr???ng", "priceNotice") && validation.checkPrice(price, "Gi?? ph???i l?? s??? nguy??n d????ng", "priceNotice");

    isValid &= validation.checkEmpty(screen, "Th??ng tin m??n h??nh kh??ng ???????c ????? tr???ng", "screenNotice");

    isValid &= validation.checkEmpty(backCamera, "Th??ng tin camera sau kh??ng ???????c ????? tr???ng", "backCameraNotice");

    isValid &= validation.checkEmpty(frontCamera, "Th??ng tin camera tr?????c kh??ng ???????c ????? tr???ng", "frontCameraNotice");

    isValid &= validation.checkEmpty(img, "???????ng link h??nh ???nh s???n ph???m kh??ng ???????c ????? tr???ng", "imageNotice");

    isValid &= validation.checkEmpty(desc, "M?? t??? kh??ng ???????c ????? tr???ng", "descNotice");

    isValid &= validation.checkDropdown("productTypeSelect", "Lo???i s???n ph???m ph???i ???????c ch???n", "typeNotice");

    if(isValid){
        var product = new Product(name, price, screen, backCamera, frontCamera, img, desc, type);

        productService.addProduct(product)
        .then(function(result){
            getProductData();
            document.querySelector("#sanPhamVuaThem").innerHTML = name;
            swal("Success!", "Adding product successfully!", "success");
            document.querySelector("#productModal .close").click();
            document.querySelector("#productModal form").reset();
        })
        .catch(function(error){
            console.log(error);
        });
    }

}

function deleteProductItem(id){
    productService.deleteProduct(id)
    .then(function(result){
        swal("Success!", "Delete product successfully!", "success");
        getProductData();
    })
    .catch(function(error){
        swal("API BAD RESPONSE!", error.message, "error");
    });
}

function getProductByIDMain(id){
    productService.getProductByID(id)
    .then(function(result){
        document.querySelector("#productName").value = result.data.name;
        document.querySelector("#productPrice").value = result.data.price;
        document.querySelector("#productScreen").value = result.data.screen;
        document.querySelector("#productBackCamera").value = result.data.backCamera;
        document.querySelector("#productFrontCamera").value = result.data.frontCamera;
        document.querySelector("#productImage").value = result.data.img;
        document.querySelector("#productDescription").value = result.data.desc;
        document.querySelector("#productTypeSelect").value = result.data.type;
    
        document.querySelector("#productModal .modal-footer").innerHTML = `
        <button class = "btn yellowBtn" onclick = "updateProductMain('${id}')">Update</button>
        `;
    })
    .catch(function(error){
        console.log(error);
        swal("API BAD RESPONSE!", error.message, "error");
    });
}

function updateProductMain(id){
    var name = document.querySelector("#productName").value;
    var price = document.querySelector("#productPrice").value;
    var screen = document.querySelector("#productScreen").value;
    var backCamera = document.querySelector("#productBackCamera").value;
    var frontCamera = document.querySelector("#productFrontCamera").value;
    var img = document.querySelector("#productImage").value;
    var desc = document.querySelector("#productDescription").value;
    var type = document.querySelector("#productTypeSelect").value;

    var isValid = true;

    isValid &= validation.checkEmpty(name, "T??n kh??ng ???????c ????? tr???ng", "nameNotice");

    isValid &= validation.checkEmpty(price, "Gi?? kh??ng ???????c ????? tr???ng", "priceNotice") && validation.checkPrice(price, "Gi?? ph???i l?? s??? nguy??n d????ng", "priceNotice");

    isValid &= validation.checkEmpty(screen, "Th??ng tin m??n h??nh kh??ng ???????c ????? tr???ng", "screenNotice");

    isValid &= validation.checkEmpty(backCamera, "Th??ng tin camera sau kh??ng ???????c ????? tr???ng", "backCameraNotice");

    isValid &= validation.checkEmpty(frontCamera, "Th??ng tin camera tr?????c kh??ng ???????c ????? tr???ng", "frontCameraNotice");

    isValid &= validation.checkEmpty(img, "???????ng link h??nh ???nh s???n ph???m kh??ng ???????c ????? tr???ng", "imageNotice");

    isValid &= validation.checkEmpty(desc, "M?? t??? kh??ng ???????c ????? tr???ng", "descNotice");

    isValid &= validation.checkDropdown("productTypeSelect", "Lo???i s???n ph???m ph???i ???????c ch???n", "typeNotice");

    if(isValid){
        var product = new Product(name, price, screen, backCamera, frontCamera, img, desc, type);

        productService.updateProduct(id,product)
        .then(function(result){
            getProductData();
            swal("Success!", "Update product successfully!", "success");
            document.querySelector("#productModal .close").click();
            document.querySelector("#productModal form").reset();
        })
        .catch(function(error){
            console.log(error);
            swal("API BAD RESPONSE!", error.message, "error");
        });
    }
}

function searchProductMain(){
    var keyword = document.querySelector("#searchBox").value;
    var resultArray = productService.searchProduct(productArray, keyword);
    showProductData(resultArray);
}
document.querySelector("#searchBox").onkeyup = searchProductMain;

function chartDraw(proArray){
    var typeArray = [];
    for(var i = 0; i < productArray.length; i++){
        var isExist = false;
        for(var j = 0; j < typeArray.length; j++){
            if(typeArray[j] == proArray[i].type){
                isExist = true;
            }
        }
        if(!isExist){
            typeArray.push(proArray[i].type);
        }
    }
    

    var valueArray = [];
    for(var i = 0; i < typeArray.length; i++){
        valueArray[i] = 0;
        for(var j = 0; j < proArray.length; j++){
            if(typeArray[i] == proArray[j].type){
                valueArray[i]++;
            }
        }
    }

    console.log(valueArray);

    var options = {
        series: valueArray,
        chart: {
        width: 360,
        type: 'pie',
      },
      labels: typeArray,
      responsive: [{
        breakpoint: 1200,
        options: {
          chart: {
            width: 320
          },
          legend: {
            position: 'bottom'
          },
        }
      },{
        breakpoint: 992,
        options: {
          chart: {
            width: 360
          },
          legend: {
            position: 'bottom'
          },
        }
      }],
      legend: {
        position: 'bottom'
      },
      };
      
      document.querySelector("#chart").innerHTML = "";

      var chart = new ApexCharts(document.querySelector("#chart"), options);
      
      chart.render();

}