const ProductList = new getProductService();
const getEl = id => document.getElementById(id);
// Mảng chứa list product
let prList = [];
// Mảng chứa product cart
let arrCart = []

const findID = id => {
    for (let i = 0; i < prList.length; i++) {
        if (prList[i].id == id) return i;
    }
    return -1;
}

const renderTable = arrProduct => {
    const cardMain = document.querySelector('.product .card__main');
    let content = '';
    arrProduct.map(product => {
        content += `
        <div class="vCard">
        <div class="card__img">
            <img src="${product.img}" alt="">
        </div>
        <div class="card__intro">
            <h5 class="card__intro__title">${product.name}</h5>
            <p class="card__intro__price">${product.price}$</p>
        </div>
        <div class="card__overlay">
            <div class="card__button">
                <div class="card__button__see">
                    <button class="btn__main" href="" onclick='seeProductCart(${product.id})' data-toggle="modal" data-target="#myModalSee" >
                        <i class="fa-regular fa-eye"></i>
                        <span>See</span>
                    </button>
                </div>
                <div class="card__button__add">
                    <button class="btn__main" onclick='getProductCart(${product.id})' href="">
                        <i class="fa-solid fa-cart-shopping"></i>
                        <span>Add</span>
                    </button>
                </div>
            </div>
        </div>
    </div>
        `
    })
    cardMain.innerHTML = content
}





// Get product from api
const getProductList = () => {
    const cardMain = document.querySelector('.product .card__main');
    cardMain.innerHTML = `<div class="spinner-border text-info" role="status">
    <span class="sr-only">Loading...</span>
  </div>`
    ProductList.getProductList()
        .then(productList => {
            prList = productList.data
            renderTable(productList.data);
        })
        .catch(err => console.error(err))
}
getProductList()

// todo: Filter product
function filteProduct(event) {
    const Evalue = event.target.value
    let productFillter = [];
    const cardMain = document.querySelector('.product .card__main');
    cardMain.innerHTML = `<div class="spinner-border text-info" role="status">
    <span class="sr-only">Loading...</span>
  </div>`
    ProductList.getProductList()
        .then(productList => {
            setTimeout(() => {
                switch (Evalue) {
                    case '1':
                        productFillter = productList.data.filter((data, index) => {
                            console.log(data)
                            return data.type === 'Iphone'
                        })
                        break
                    case '2':
                        productFillter = productList.data.filter((data, index) => data.type === 'Samsung')
                        break
                    default:
                        productFillter = productList.data
                }
                renderTable(productFillter)
            }, 500)
        })
        .catch(err => console.error(err))
}



// See Product cart
const seeProductCart = id => {
    const prSee = prList[findID(id)]

    console.log(getEl('infoPhone__content'))
}

// Add product to cart
const getProductCart = id => {
    const cartIcon = getEl('cartIcon')
    cartIcon.classList.add('effect')
    setTimeout(() => cartIcon.classList.remove('effect'), 700)

    if (checkCartItem(id) === -1) {
        let cartItem = new ProductCart(prList[findID(id)], 1)
        arrCart.push(cartItem)
        renderCartTable()
    } else {
        arrCart[checkCartItem(id)].quantity += 1
        renderCartTable()
    }
    saveData()
};

// Check cartitem đã tồn tại
const checkCartItem = id => {
    let temp = -1;
    arrCart.forEach((item, index) => {
        if (item.phone.id === id) temp = index;
    })
    return temp
}

// Show só lượng giỏ hàng
const showQuantity = () => {
    if (arrCart.length <= 0) {
        getEl("showQuantity").style.display = "none";
    } else {
        getEl("showQuantity").style.display = "block";
        getEl("showQuantity").innerHTML = `${arrCart.length}`;
    }
};

// Save data localStorage
const saveData = () => {
    localStorage.setItem("arrCart", JSON.stringify(arrCart));
    showQuantity();
};

// Get data localStorage
const fetchData = () => {
    const localCart = localStorage.getItem('arrCart')
    if (localCart) arrCart = JSON.parse(localCart)
    renderCartTable()
    showQuantity();
};

// Render cartTable
const renderCartTable = () => {
    let content = '';
    if (arrCart) {
        // arrCart = arrCart.reverse()
        arrCart.map((cartItem, index) => {
            content += `
            <div class="row align-items-center">
                <div class="col-md-1">
                    <div class="text-center"> 
                        <button class="btn btn-danger">
                            <i class="fa-solid fa-trash"></i>
                        </button>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="text-center">
                        <img src="${cartItem.phone.img}" style="width: 60px;height:60px" alt="" />
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="text-center">${cartItem.phone.name}</div>
                 </div>
                <div class="col-md-3">
                    <div class="text-center">
                    <span class='subQuantity'>
                        <button class='btnQuantity mr-2' onclick='subQuantity(${index})' ><i class="fa-solid fa-minus"></i></button>
                    </span>
                    ${cartItem.quantity}
                    <span class='plusQuantity'>
                    <button class='btnQuantity ml-2' onclick='plusQuantity(${index})' >
                    <i class="fa-solid fa-plus"></i>
                    </button></span>
                    </div>
                 </div>
                <div class="col-md-2">
                    <div class="text-center">$${cartItem.phone.price * cartItem.quantity}
                    </div>
                </div>
            </div>
            `
        })
    }

    if (content == '') {
        getEl('headerCart').style.display = 'none'
        getEl('prCart').style.textAlign = 'center'
        content = `
        <img src=" https://bizweb.dktcdn.net/100/031/831/themes/740933/assets/empty-cart.png?1623312998512" style="text-align:center" alt=""/>
        `
        document.querySelector('.modalCartFooter').innerHTML = '';
    } else {
        getEl('headerCart').style.display = 'block';
        document.querySelector('.modalCartFooter').innerHTML = ` 
      <div id='totalCart'><span class='totalShow' ">
      Total: <b>$${totalMoney()}</b></span></div>

      <div class="btnfooterCart">
        <button class="btnSecondary mr-3" onclick='clearAllCart()' > <span><i class="fa-solid fa-trash"></i></span> Clear Cart
        </button>
        <button class="btnSecondary" onclick='purchaseCart()' > <span><i class="fa-solid fa-credit-card"></i></ span> Purchase
        </button>
      </div>
      `;
    }
    getEl('prCart').innerHTML = content
}


// Total money
const totalMoney = () => {
    let sum = 0;
    arrCart.forEach(item => {
        sum += Number(item.phone.price) * Number(item.quantity);
    })
    return sum
}

// plus quantity
const plusQuantity = id => {
    arrCart[id].quantity += 1
    renderCartTable()
    saveData()
}

// sub Quantity

const subQuantity = id => {
    if (arrCart[id].quantity > 1) {
        arrCart[id].quantity -= 1;
    } else {
        Swal.fire({
            title: 'Do you want to remove the product from the cart?',
            icon: 'info',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    'Deleted!',
                    'Your product has been deleted.',
                    'success'
                )
                arrCart.splice(id, 1)
                renderCartTable()
                saveData()
            }
        })

    }
    renderCartTable()
    saveData()
}

// Clear All cart
const clearAllCart = () => {
    Swal.fire({
            title: 'Do you want to clear the cart?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, clear it!',
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    'Deleted!',
                    'Your cart has been deleted.',
                    'success'
                )
                arrCart = []
                renderCartTable()
                saveData()
            }
        })
        // renderCartTable()
        // saveData()
}

// Purchase
const purchaseCart = () => {

    Swal.fire({
        title: 'Payment',
        text: `
        Total amount to be paid: $${totalMoney()}`,
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Order Now',
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: 'Pikachu is comminggggg',
                width: 600,
                padding: '3em',
                color: '#a95467',
                background: 'rgba(255, 255, 255, 0.8)',
                backdrop: `
                     rgba(0,0,123,0.4)
                    url("../../assets/img/nyan-cat-GIF-unscreen.gif")
                    left top
                    no-repeat
                 `,
                text: 'Your order will be delivered to you in 3-5 working days',
                imageUrl: 'https://i.pinimg.com/736x/a1/1b/de/a11bde534d1fd005c3d95fd2e62602e1--nice-words-beautiful-days.jpg',
                imageWidth: 400,
                imageHeight: 275,
                imageAlt: 'Custom image',
            })
            arrCart = []
            renderCartTable()
            saveData()
        }
    })
}

fetchData()
showQuantity()

// Swal.fire({
// title: 'Your order has been placed!',
// text: 'Your order will be delivered to you in 3-5 working days',
// imageUrl: 'https://i.pinimg.com/736x/a1/1b/de/a11bde534d1fd005c3d95fd2e62602e1--nice-words-beautiful-days.jpg',
// imageWidth: 400,
// imageHeight: 275,
// imageAlt: 'Custom image',
// })