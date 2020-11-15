/*this part is to link the add to cart to shop cart later*/
 let carts=document.querySelectorAll('.add-cart');
 /*track how many time we have the product in the cart*/
  let products = [
      {
          name: 'citron',
          tag: 'citronn',
          price: 18,
          inCart: 0
      },

      {
          name: 'Lavande',
          tag: 'Lavandee',
          price: 20,
          inCart: 0
      },

      {
          name: 'gel',
          tag: 'gell',
          price: 24,
          inCart: 0  
      },

      {
          name: 'serum',
          tag: 'serumm',
          price: 26,
          inCart: 0 
      }
  ];
 
 for ( let i=0 ; i < carts.length ; i++ ) {
     carts[i].addEventListener('click',() =>{
        cartNumbers(products[i]);
        totalCost(products[i])
 })
 }
/*this one need to be called */
function onLoadcartNumbers(){
    let productNumbers=localStorage.getItem('cartNumbers');

    if (productNumbers){
        document.querySelector('.cart span').textContent=productNumbers;
    }
}
/*this function is attached to the click action */
 function cartNumbers(product){
     /*console.log(product);/*looooooooooooooooooooook*/
     let productNumbers=localStorage.getItem('cartNumbers');
     /*console.log(productNumbers);test*/
   
     productNumbers=parseInt(productNumbers);
     /*console.log(productNumbers);test ici si on a donc il ya un ajout si non il ya 1*/
     if (productNumbers){
     localStorage.setItem('cartNumbers',productNumbers + 1);
     document.querySelector('.cart span').textContent=productNumbers +1;/* we could change the zero next to the shop bag*/ 
    }else{
         localStorage.setItem('cartNumbers',1);
         document.querySelector('.cart span').textContent=1;
    }
    setItems(product);
 }
 /*we ask it if we load the page 1st time there is nothing bag is empty if not it's full and give the lcal storage number that stil exist*/
  function  setItems(product){
     let cartItems = localStorage.getItem('productsIncart');
     cartItems = JSON.parse(cartItems);  /*change from json to js*/
     console.log("mycart are ", cartItems);
      if (cartItems != null){
          if (cartItems[product.tag] == undefined){
              cartItems = {
                  ...cartItems,
                  [product.tag] :product
              }
          }
          /*cartItems[citron] is like the function oen and e will add 1 so we know we have 2 */
          cartItems[product.tag].inCart +=1;
      } else {
             product.inCart = 1;

           cartItems ={
          [product.tag]:product
      }
      }
     
      
      localStorage.setItem("productsIncart", JSON.stringify
      (cartItems));
    }
  function totalCost(product){
      let cartCost =localStorage.getItem('totalCost');
      
if (cartCost != null) {
    cartCost = parseInt(cartCost);
 localStorage.setItem('totalCost', cartCost + product.price);
}else { localStorage.setItem("totalCost", product.price );

}

      //console.log(typeof cartCost); there it's naw a number !
    //   console.log(cartCost);
    //   console.log(typeof cartCost) we undertsant that it came back as a string and we want a number so we will change the typeof
     

// console.log("eeeeee" , product.price);
  }

  function displayCart(){
      let cartItems = localStorage.getItem("productsIncart");
      cartItems= JSON.parse(cartItems);
      let productContainer = document.querySelector(".products");
      let cartCost =localStorage.getItem('totalCost');


if (cartItems && productContainer ){
    productContainer.innerHTML = '';
         Object.values(cartItems).map(item => {
    productContainer.innerHTML +=`
    <div class="products"> 
    <button onclick=" remove()" type="button class="btn_add >X</button>
    <img src="./img/${item.tag}.jpg">
    <span>${item.name}</span>
    </div>
    <div class="price">
   ${item.price},00
    </div>
    <div class="quantity">
   
    <span>${item.inCart}dt</span></div>
    <div class="total">
    ${item.inCart*item.price},00 dt
    </div>`
});
productContainer.innerHTML += `
<div class="basketTotalcontainer">
<h4 class=basketTotalTitle">
Basket Total</h4>
<h4 class="basketTotal">
${cartCost},00 dt
</h4>
</div>`
    //console.log("run");
}
      //console.log(cartItems);to know what w have in our storage
}
function remove(){
var par = document.getElementById('parent');
var candi=document.getElementById('child');
  par.removeChild(candi);
}

 onLoadcartNumbers();
displayCart();
remove;

 /*with this we finishied the part leated to the home page*/
