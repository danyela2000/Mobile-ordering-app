import {menuArray} from './data.js'
const modalPayContainer = document.getElementById("modal-pay-container")
const payForm = document.getElementById("pay-form")
const orderArray = []


// 2. LISTEN FOR ANY CLICKS IN DOCUMENT AND TARGET THAT ELEMENT + CALL THE APPROPRIATE FUNCTION
document.addEventListener("click", function(e){

   if(e.target.dataset.addOrderBtn){
     handleAddOrderBtn(e.target.dataset.addOrderBtn)

   } else if(e.target.dataset.removeOrder){
     removeOrderClick(e.target.dataset.removeOrder)

   } else if(e.target.id === 'close-modal-container'){
      closeModalContainer()

   } else if(e.target.id === 'complete-order-btn'){
     completeOrderBtn()
     
   } else if(e.target.id ==='order-again-btn'){
     closeModalContainer()
     refreshOrderList()
   }
})


// 3. ADD ORDER AND RENDER IT

// this function just modifies the orderArray by adding the menu item associated to the button, in the array
function handleAddOrderBtn(itemId){

    document.getElementById("order-inner").style.display = 'block'
    const menuItemTargetObj = menuArray.filter(function(menuItem){
        return itemId == menuItem.id
    })[0]
    
    orderArray.push(menuItemTargetObj)
       
    renderOrder()
}

// creates the html string using the name and the price from the objects (order) from the orderArray + render it

function createOrder(){
    let orderHtml='' 
    orderArray.forEach(function(order){
        orderHtml += `
        <div class="order-detail">
            <div class="order-detail-name">
                <h3 class="order-name">${order.name}</h3>
                <p class="remove-order" data-remove-order="${order.id}">✖</p>
            </div>
            <p class="order-quantity"></p>   
            <h4 class="order-price">$${order.price}</h4>
       </div>`

    })
    return orderHtml
}

// calculates and returns the total price of the orders
function totalCalc(){
    let total = 0
    orderArray.forEach(function(order){
        total += order.price
    })
    return total
}

function renderOrder(){
    document.getElementById("order-display").innerHTML = createOrder()
    document.getElementById("total-price").innerHTML = `$${totalCalc()}`
}

//4. REMOVE THE ORDER FROM THE ORDER ARRAY
function removeOrderClick(orderId){
    const targetOrderObj = orderArray.filter(function(order){
        return order.id == orderId
    })[0]

    let indexOfOrder = orderArray.indexOf(targetOrderObj)
    orderArray.splice(indexOfOrder, 1)
    renderOrder()
}

//5. CLICKING THE "COMPLETE ORDER BTN" WILL MAKE THE PAY-FORM TO APPEAR ON THE SCREEN ONLY IF THERE IS AT LEAST 1 ORDER
function completeOrderBtn(){
    if(orderArray.length){
        modalPayContainer.style.display='block'
    } else if(!orderArray.length) {
        alert('Please, add an order first!')
    } 

}

//6. LISTENS FOR A SUBMIT IN THE PAY-FORM AND RENDERS THE GREETIG MESSAGE
payForm.addEventListener("submit", function(e){
    e.preventDefault()
    const formData = new FormData(payForm)
    modalPayContainer.classList.add('green-background')
    modalPayContainer.innerHTML = `
    <p class="confirm-order">Thanks, ${formData.get('name')}! Your order is on its way!  (๑ᵔ⤙ᵔ๑)</p>
    <button class="order-again-btn btn" id="order-again-btn">Order again</button> `
})

// 7.  CLICKING THE "CLOSE BTN" OR THE "ORDER AGAIN BTN" WILL CLOSE THE MODAL-PAY CONTAINER
function closeModalContainer(){
    modalPayContainer.style.display='none'
}

//8. BY CLICKING THE ORDER-AGAIN BTN WILL REFRESH THE ORDER LIST
function refreshOrderList(){
    window.location.reload();
    
}


// 1. GET AND RENDER THE MENU ITMES FROM THE MENU ARRAY
function getMenuHTML(){
    let menuHtml = ''
    menuArray.forEach(function(menuItem){
        menuHtml += `
        <div class='menu-item'>
           <div class='menu-inner'>
                <p class='menu-emoji'> ${menuItem.emoji}</p>
                <div class='menu-detail'>
                    <h3 class='menu-name'>${menuItem.name}</h3> 
                    <p class='menu-ingredients'>${menuItem.ingredients}</p>               
                    <h4 class='menu-price'>$${menuItem.price}</h4>  
                </div>
                <button class='add-order-btn' data-add-order-btn='${menuItem.id}'>+</button>    
           </div>
        </div>
        `
    })

    return menuHtml
}

function renderMenu(){
    document.getElementById('menu').innerHTML = getMenuHTML()
}

renderMenu()