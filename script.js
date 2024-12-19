
if (document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded', ready)

}else{

ready()

}
var contAmountInCart = 0
var totalamount = '0'
function ready(){ 

    var cart = document.querySelector('.cart')
    var littleCart = document.querySelector('.LittleCart')
    var overlay = document.querySelector('.overlay')
    var closeCart = document.querySelector('.closeCart')
    var menu = document.querySelector('.menu-nav')
    var btnMenu = document.querySelector('.menu-hamburger')
    btnMenu.addEventListener('click', function(){
        menu.classList.toggle('active')
    })
    
    cart.addEventListener('click', function(){
    
        littleCart.style.display = 'block'
        overlay.style.display = 'block'
        document.body.classList.add('no-scroll');
        
    })
    closeCart.addEventListener('click', function(){
        
        littleCart.style.display = 'none';
        overlay.style.display = 'none'
        document.body.classList.remove('no-scroll')
    })
    
    overlay.addEventListener('click', function(){
       
        closeCart.click() /// é como se estivesse chamando uma função, mas como não defini função e sim um eventListner, ele chama o click desse enventListener
    })
    const removeProductButton = document.getElementsByClassName('remove-product-button')
    for (let i = 0; i < removeProductButton.length; i++){
        removeProductButton[i].addEventListener('click', removeProductCart)
    }
    const inputQtd = document.getElementsByClassName('product-qtd-input')
    for ( let i = 0; i < inputQtd.length;i++){
        
        
        inputQtd[i].addEventListener('change', updateTotal)
       
    }
    const btnAddToCart = document.getElementsByClassName('btn-addTOcart')
    
    for( i = 0; i < btnAddToCart.length;i++){
        
        btnAddToCart[i].addEventListener('click', addToCart)
    }
    const finalPurchase = document.querySelector('.finish-purchase')
    finalPurchase.addEventListener('click', makePurchase)
   
    
}
var data = new Date()
var hour = data.getHours()
if(hour >= 8 && hour < 22){
    document.title = 'Cafeteria - Local: OPEN'
    
}else{
document.title = 'Cafeteria - Local: CLOSE'
}
function makePurchase(){
    contAmountInCart = 0
    if(totalamount == '0' || totalamount == '0,00' ){
        alert('Seu carrinho está vazio')

    }else{
        alert(`
            Obrigado pela sua compra !
            Valor do pedido: R$ ${totalamount}
            `)
     document.querySelector('.totalPrice-final').innerHTML = 'R$0,00'
     document.querySelector('.cartItens').innerHTML= ''
     document.getElementsByClassName('amountInCar')[0].innerHTML = '0'
     window.location.reload(true)
    }
    
    
}

function inputIsZero(event){
    let target = event.target
    if (target.value == '0'){
        target.parentElement.parentElement.remove()

    }
    updateTotal()
    
}
function removeProductCart(event){
    let target = event.target
    target.parentElement.parentElement.remove()
    updateTotal()
    contAmountInCart-=1
    document.getElementsByClassName('amountInCar')[0].innerHTML = contAmountInCart
    
}

function updateTotal(){
totalamount = 0
const cartProduct = document.getElementsByClassName('cart-product')
    for( i = 0; i < cartProduct.length;i++){
        
        const productPrice = cartProduct[i].getElementsByClassName('cart-product-price')[0].innerText.replace('R$', '').replace(',','.')
        
        const productQtd = cartProduct[i].getElementsByClassName('product-qtd-input')[0].value
        
        totalamount += productPrice * productQtd
        

    }
    totalamount = totalamount.toFixed(2)
    totalamount = totalamount.replace('.',',')
    var priceFinal = document.querySelector('.totalPrice-final').innerText = 'R$ ' + totalamount


}
function addToCart(event){
    const button = event.target
   
    const productImg =  button.parentElement.parentElement.querySelector('img').src
    const productTitle =  button.parentElement.parentElement.getElementsByClassName('product-title')[0].innerText
    const productValue = button.parentElement.parentElement.getElementsByClassName('product-price')[0].innerText
    const cartProductTitle = document.getElementsByClassName('cart-product-title')
    for( i = 0; i < cartProductTitle.length;i++){
      
       if(cartProductTitle[i].innerText == productTitle){
        cartProductTitle[i].parentElement.parentElement.getElementsByClassName('product-qtd-input')[0].value++
        //console.log(  )
        updateTotal()
        popUpAdd('ADICIONADO AO CARRINHO NOVAMENTE!!!')
        
        return
        
       }
    }
    
    
    var newProduct = document.createElement('tr')
    newProduct.classList.add('cart-product')
    
    newProduct.innerHTML = `<div class="product-identification">
                                    <img src="${productImg}" alt="">
                                    
                                </div>
                                <div>
                                    <p class="cart-product-title">${productTitle}</p>
                                    <span class="cart-product-price">${productValue}</span>
                                </div>
                                <div>
                                    <input type="number" name="" value="1" min="0" class="product-qtd-input">
                                    <button type="button" class="remove-product-button">Remover</button>
                                </div>`
                        
    
    const productContainer = document.querySelector('.cartItens')
    productContainer.appendChild(newProduct)
    contAmountInCart+=1
    document.getElementsByClassName('amountInCar')[0].innerHTML = contAmountInCart

    popUpAdd('ADICIONADO AO CARRINHO!!!')
    newProduct.getElementsByClassName('product-qtd-input')[0].addEventListener('change',inputIsZero)
    newProduct.getElementsByClassName('remove-product-button')[0].addEventListener('click',removeProductCart)
    updateTotal()
 }

function popUpAdd(message){
    var popUpAddToCart = document.querySelector('.Area-popupAddToCart')
    var divPopupAddToCart = document.createElement('div')
    divPopupAddToCart.classList.add('popupAddToCart')
    divPopupAddToCart.textContent = message
    popUpAddToCart.appendChild(divPopupAddToCart)
    
    let intervalId = setTimeout(() => {
        if (divPopupAddToCart.parentNode) {
            popUpAddToCart.removeChild(divPopupAddToCart);
            clearInterval(intervalId);
        }
    }, 600);
}





