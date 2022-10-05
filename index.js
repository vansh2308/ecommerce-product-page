const thumbnails = document.getElementsByClassName("thumbnail");
const preview = document.getElementById("mainimg");
const plus = document.getElementById("plus");
const minus = document.getElementById("minus");
const addToCart = document.querySelector(".addtocart");



plus.addEventListener("click", ()=>{
  document.getElementById("count").innerHTML++;
})
minus.addEventListener("click", ()=>{
  if(document.getElementById("count").innerHTML>=1){
    document.getElementById("count").innerHTML--;
  }
})

thumbnails[0].style.border =  "3px solid hsl(26, 100%, 55%)";
thumbnails[0].style.opacity = "50%";
let active = 0;

for(let i=0; i<4; i++){
  thumbnails[i].addEventListener("mouseenter", ()=>{
    if(i!=active){
      thumbnails[i].style.opacity = "50%";
    }
  })
  thumbnails[i].addEventListener("mouseout", ()=>{
    if(i != active){
      thumbnails[i].style.opacity = "100%";
    }
  })
  thumbnails[i].addEventListener("click", ()=>{
    active = i;
    document.querySelector("#count").innerHTML = 0;
    preview.src = `images/image-product-${i+1}.jpg`;
    thumbnails[i].style.border = "3px solid hsl(26, 100%, 55%)";
    thumbnails[i].style.opacity = "50%";
    for(let j=0; j<4; j++){
      if(j!=active){
        thumbnails[j].style.border = "none";
        thumbnails[j].style.opacity = "100%";
      }
    }
  })
}

let cart = [0, 0, 0, 0];

function isEmpty(){
  for(let i=0; i<4; i++){
    if(cart[i] != 0){
      return false;
    }
  }
  return true;
}

function display(){
  document.querySelector(".items-cont").innerHTML = "";
  if(isEmpty()){
    document.querySelector(".items-cont").innerHTML = 
    `<div style="height: 100%; width: 100%; text-align: center; font-weight: 600; color: hsl(219, 9%, 45%); font-size: 16px;">
    Your Cart is Empty!
  </div>`
    document.querySelector(".checkout-btn").style.display = "none";
  }
  else{
    document.querySelector(".checkout-btn").style.display = "flex";
    for(let i=0; i<4; i++){
      if(cart[i] > 0){
        const item = document.createElement("div");
        item.className = "item";
        item.innerHTML = 
          `<img src="./images/image-product-${i+1}-thumbnail.jpg" alt="itemimg">
           <section style="padding: 0 17px; font-size: 13px; line-height: 22px; color: hsl(217, 5%, 50%); font-weight: 500;">
             Fall Limited Edition Sneakers <br>
             $125.00 x ${cart[i]} <b style="color: black;">$${125.00*cart[i]}</b>
           </section>
           <img src="./images/icon-delete.svg" alt="bin" style="transform: scale(40%);" class="bin" onclick = remove(${i})></img>`
        document.querySelector(".items-cont").appendChild(item);
      }
    }
  }
}

function size_cart(){
  let ct =0;
  for(let i=0; i<4; i++){
    if(cart[i] != 0){
      ct++;
    }
  }
  return ct;
}

addToCart.addEventListener("click", ()=>{
  if(document.querySelector("#count").innerHTML > 0){
    cart[active] = parseInt(document.querySelector("#count").innerHTML);
  }
  display();
  console.log(cart);  
})

function remove(i){
  cart[i] = 0;
  active = i;
  document.querySelector("#count").innerHTML = "0";
  display();
  console.log(cart);
}


function change_active(){
  const white_overlay = document.createElement("div");
  white_overlay.className = "white-overlay";


  document.querySelector(`#lb-thumbnail${active+1}`).style.border = "2px solid hsl(26, 100%, 55%)";
  document.querySelector(`#lb-thumbnail${active+1}`).appendChild(white_overlay);

  for(let i=0; i<4; i++){
    if(i!=active){
      document.querySelector(`#lb-thumbnail${i+1}`).style.border = "2px solid transparent";
      document.querySelector(`#lb-thumbnail${i+1}`).innerHTML = "";
    }
  }
}

for(let i=0; i<4; i++){
  let thumbnail = document.querySelector(`#lb-thumbnail${i+1}`);
  thumbnail.style.height = "100px";
  thumbnail.style.width = "100px";
  thumbnail.style.background = `url(./images/image-product-${i+1}-thumbnail.jpg)`;
  thumbnail.style.backgroundSize = "cover";
  thumbnail.style.backgroundPosition = "center";
  thumbnail.style.backgroundRepeat = "no-repeat";
  // thumbnail.style.borderRadius = "11px";
  
}

document.querySelector("#mainimg").addEventListener("click", ()=>{
  document.querySelector(".lightbox").style.display = "block";
  document.querySelector(".lbmain").src = `./images/image-product-${active+1}.jpg`;
  change_active();

  
})
document.querySelector("#close").addEventListener("click", ()=>{
  document.querySelector(".lightbox").style.display = "none";

})


document.querySelector(".next-btn").addEventListener("click", ()=>{
  active = (active+1)%4;
  document.querySelector(".lbmain").src = `./images/image-product-${active+1}.jpg`;
  change_active();
})
document.querySelector(".prev-btn").addEventListener("click", ()=>{
  if(active > 0){
    active-=1;
  }
  else{
    active = 3;
  }
  document.querySelector(".lbmain").src = `./images/image-product-${active+1}.jpg`;
  change_active();
})

