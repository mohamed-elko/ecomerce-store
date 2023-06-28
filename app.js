const shoppingCart = document.querySelector('.shopping-cart')
const closeCart = document.querySelector('.close-cart')
const closeProduct = document.querySelector('.close-product')
const cart = document.querySelector('.cart')

const productDetails = document.querySelector('.products-details')
const firstImage = document.querySelector('.first-image')
const secandImage = document.querySelector('.secand-image')
const thirdImage = document.querySelector('.third-image')
const itemPhotos = document.querySelector('.product-item-photos')
const product_item_details = document.querySelector('.product-item-details')
const cartItems = document.querySelector('.cart-items')

const subtotalEl = document.querySelector(".subtotal");
const totalitemsincart = document.querySelector(".total-items-in-cart");
const numer_of_items_in_cart = document.querySelector("#numer-of-items-in-cart");
const closeEl = document.querySelector("#close");

shoppingCart.onclick =()=>{
    cart.style.display = 'block'
}
closeCart.onclick =()=>{
    cart.style.display = 'none'
}
function closeProductFunction(){
    itemPhotos.style.display = 'none'
}


const renderProducts = ()=>{
    products.forEach((item)=>{
        productDetails.innerHTML +=`
        <div class="product" >
            <div class="image">
                <img onclick='renderProductInProductPage(${item.id})' src="${item.imgSrc}" alt="${item.name}">
            </div>
            <div class="review">
                <div class="stars">
                    <i class="bi bi-star-fill"></i>
                    <i class="bi bi-star-fill"></i>
                    <i class="bi bi-star-fill"></i>
                    <i class="bi bi-star-fill"></i>
                </div>
                <h1>(100 reviews)</h1>
            </div>
            <h1 id="title">${item.name}</h1>
            <h1 id="price">${item.price}</h1>
        </div>
        `
    })
}
renderProducts()

const renderProductInProductPage =(id)=>{
    itemPhotos.style.display = 'block'
    scroll({
        top:0,
        behavior:"smooth"
    })
    let item = products.find((product)=>product.id === id)
    itemPhotos.innerHTML=`
    <div class="product-item-details" >
        <div>
            <a onclick='closeProductFunction()' class="close-product">close page</a>
        </div>
        <div id="product-item" class="product-item">
            <div class="item-photos">
                <img  class="first-image" src="${item.imgSrc}" alt="">
                <div class="other-images">
                    <img class="first-image" src="${item.imgSrc}" alt="">
                    <img class="secand-image" src="${item.imgSrc}" alt="">
                    <img class="third-image" src="${item.imgSrc}" alt="">
                    <img class="fourth-image" src="${item.imgSrc}" alt="">
                </div> 
            </div>
        <div class="item-details">
            <div class="review">
                <div class="stars">
                    <i class="bi bi-star-fill"></i>
                    <i class="bi bi-star-fill"></i>
                    <i class="bi bi-star-fill"></i>
                    <i class="bi bi-star-fill"></i>
                </div>
                <h1>(100 reviews)</h1>
            </div>
            <div class="item-title">
                <h1>Gleam Body Scrub</h1>
            </div>
            <p>Scrub your way to temptingly smooth and glowing skin with our Gleam Body Scrub!</p>
            <h3>
                💜 Helps to ease hair removal <br> 
                💧 Cleans and removes dead skin cells <br>
                ✨ Brightens and tightens the skin <br>
                🍑 Hydrates and plumps the skin
            </h3>
            <div  class="add-to-cart">
            
                <a  onclick='addToCart(${item.id})' id="cart-btn">add to cart</a>
            </div>
        </div>
        </div>
        <div class="item-description">
            <div class="detailed-description">
                <img  src="https://cdn.shopify.com/s/files/1/0609/1531/8959/products/BodyScrubScrub.jpg?v=1679616357&width=713" alt="">
                <h3>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Neque possimus porro blanditiis minima, quaerat molestias deserunt ex, necessitatibus quam, recusandae alias numquam ipsam molestiae accusamus eos laudantium doloribus illo voluptates sapiente amet asperiores reprehenderit velit explicabo? Culpa magnam recusandae expedita.</h3>
            </div>
            <div class="detailed-description">
                <h3>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Neque possimus porro blanditiis minima, quaerat molestias deserunt ex, necessitatibus quam, recusandae alias numquam ipsam molestiae accusamus eos laudantium doloribus illo voluptates sapiente amet asperiores reprehenderit velit explicabo? Culpa magnam recusandae expedita.</h3>
                <img src="https://cdn.shopify.com/s/files/1/0609/1531/8959/products/BodyScrubScrub.jpg?v=1679616357&width=713" alt="">
            </div>
            <div class="detailed-description">
                <img src="https://cdn.shopify.com/s/files/1/0609/1531/8959/products/BodyScrubScrub.jpg?v=1679616357&width=713" alt="">
                <h3>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Neque possimus porro blanditiis minima, quaerat molestias deserunt ex, necessitatibus quam, recusandae alias numquam ipsam molestiae accusamus eos laudantium doloribus illo voluptates sapiente amet asperiores reprehenderit velit explicabo? Culpa magnam recusandae expedita.</h3>
            </div>
        </div>         
    </div>
    `
    
}

let cartArray = JSON.parse(localStorage.getItem('product')) || []


const addToCart=(id)=>{
    if (cartArray.some((item)=>item.id === id)){
        alert('product already in cart')
    } else {
        let item = products.find((product)=>product.id === id)
        cartArray.push({
            ...item,
            unitesNumber : 1,
        })
    
    }
    console.log(cartArray)
    updateCart()
}

const updateCart=()=>{
    renderCartItems()
    renderSubTotal()
    localStorage.setItem('product' , JSON.stringify(cartArray))
}
const renderCartItems=()=>{
    cartItems.innerHTML = ' '
    cartArray.forEach((item)=>{
        cartItems.innerHTML +=`
        <div class="cart-item">
            <div class="item-info" >
                <img src="${item.imgSrc}"  alt="${item.name}">
                <h4>${item.name}</h4>
            </div>
            <div class="units">
                <div class="btn minus" onclick="changeUnitsNumber('minus' , ${item.id})" >-</div>
                <div class="number">${item.unitesNumber}</div>
                <div class="btn plus" onclick="changeUnitsNumber('plus' , ${item.id})">+</div> 
                            
            </div>
            <div class="unit-price">
                <small>$</small>${item.price}
                <div class="column3" onclick='removeItemFromCart(${item.id})'><i class="bi bi-trash removeItem" ></i></div>
            </div>
        </div>
        `
    })
}
const changeUnitsNumber=(action , id)=>{
    cartArray = cartArray.map((item)=>{
        let unitesNumber = item.unitesNumber
        if(item.id === id){
            if(action === 'minus' && unitesNumber>1){
                unitesNumber--
            }else if(action === 'plus'){
                unitesNumber++
            }
        }
        
        return{
            ...item, 
            unitesNumber,
        }
    })
    updateCart()
}
const removeItemFromCart =(id)=>{
    cartArray = cartArray.filter((item)=>item.id !== id)
    updateCart()
}
const renderSubTotal =()=>{
    let totalItems= 0 , totalPrice = 0;
    cartArray.forEach((item)=>{
        totalItems = item.unitesNumber
        totalPrice = item.price * item.unitesNumber
    })
    subtotalEl.innerHTML = `Subtotal (${totalItems} items): $ ${totalPrice.toFixed(2)}`
    totalitemsincart.innerHTML= cartArray.length
}

updateCart()