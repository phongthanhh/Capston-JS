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

    isValid &= validation.checkEmpty(name, "Tên không được để trống", "nameNotice");

    isValid &= validation.checkEmpty(price, "Giá không được để trống", "priceNotice") && validation.checkPrice(price, "Giá phải là số nguyên dương", "priceNotice");

    isValid &= validation.checkEmpty(screen, "Thông tin màn hình không được để trống", "screenNotice");

    isValid &= validation.checkEmpty(backCamera, "Thông tin camera sau không được để trống", "backCameraNotice");

    isValid &= validation.checkEmpty(frontCamera, "Thông tin camera trước không được để trống", "frontCameraNotice");

    isValid &= validation.checkEmpty(img, "Đường link hình ảnh sản phẩm không được để trống", "imageNotice");

    isValid &= validation.checkEmpty(desc, "Mô tả không được để trống", "descNotice");

    isValid &= validation.checkDropdown("productTypeSelect", "Loại sản phẩm phải được chọn", "typeNotice");

    if(isValid){
        var product = new Product(name, price, screen, backCamera, frontCamera, img, desc, type);

        productService.addProduct(product)
        .then(function(result){
            getProductData();
            document.querySelector("#sanPhamVuaThem").innerHTML = name;
            alert("Add Successfully");
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
        alert("Delete Successfully");
        getProductData();
    })
    .catch(function(error){

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

    isValid &= validation.checkEmpty(name, "Tên không được để trống", "nameNotice");

    isValid &= validation.checkEmpty(price, "Giá không được để trống", "priceNotice") && validation.checkPrice(price, "Giá phải là số nguyên dương", "priceNotice");

    isValid &= validation.checkEmpty(screen, "Thông tin màn hình không được để trống", "screenNotice");

    isValid &= validation.checkEmpty(backCamera, "Thông tin camera sau không được để trống", "backCameraNotice");

    isValid &= validation.checkEmpty(frontCamera, "Thông tin camera trước không được để trống", "frontCameraNotice");

    isValid &= validation.checkEmpty(img, "Đường link hình ảnh sản phẩm không được để trống", "imageNotice");

    isValid &= validation.checkEmpty(desc, "Mô tả không được để trống", "descNotice");

    isValid &= validation.checkDropdown("productTypeSelect", "Loại sản phẩm phải được chọn", "typeNotice");

    if(isValid){
        var product = new Product(name, price, screen, backCamera, frontCamera, img, desc, type);

        productService.updateProduct(id,product)
        .then(function(result){
            getProductData();
            alert("Update Successfully");
            document.querySelector("#productModal .close").click();
            document.querySelector("#productModal form").reset();
        })
        .catch(function(error){
            console.log(error);
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