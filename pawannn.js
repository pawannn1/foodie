var swiper = new Swiper(".mySwiper", {
  loop: true,
  navigation: {
    nextEl: "#next",
    prevEl: "#prev",
  },
});

const cartIcon = document.querySelector('.cart-list');
const cartTab = document.querySelector('.cart-tab');
const closeBtn = document.querySelector('.close-btn');
const cardList = document.querySelector('.card-list');
const cartList = document.querySelector('.cart-list-tab');
const cartValue = document.querySelector('.cart-value');

// Open sidebar
cartIcon.addEventListener('click', () => {
  cartTab.classList.add('cart-tab-active');
});

// Close sidebar
closeBtn.addEventListener('click', (e) => { e.preventDefault(); cartTab.classList.remove('cart-tab-active');});

let productlist = [];
let cartProduct = [];


const updateTotal = () => {


  let total = 0;
  let totalQuanitity = 0;




  const cartItems = cartList.querySelectorAll(".item");

  cartItems.forEach(item => {



    const quantity = parseInt(item.querySelector('.quantity-value').textContent);
    const basePrice = parseFloat(item.getAttribute("data-price"));
    const qty = parseInt(item.querySelector(".quantity-value").textContent);
    total += basePrice * qty;   
    totalQuanitity += quantity;
  });

  document.getElementById("total-price").textContent = `$${total.toFixed(2)}`;
  cartValue.textContent =totalQuanitity;


};

const showCards = () => {
  cardList.innerHTML = "";

  productlist.forEach(product => {
    const orderCard = document.createElement('div');
    orderCard.classList.add('order-card');

    orderCard.innerHTML = `
       <div class="card-image">
          <img src="${product.image}" alt="">
        </div>
        <h4>${product.name}</h4>
        <h4 class="price">${product.price}</h4>
        <a href="#" class="btn card-btn">Add to cart</a>
    `;

    cardList.appendChild(orderCard);

    const cardBtn = orderCard.querySelector('.card-btn');
    cardBtn.addEventListener('click', (e) => {
      e.preventDefault();
      addToCart(product);
    });
  });
}

const addToCart = (product) => {
  const existingProduct = cartProduct.find(item => item.id === product.id);
  if (existingProduct) {
    alert('Item already in your cart');
    return;
  }

  cartProduct.push(product);

  let quantity = 1;
  let price = parseFloat(product.price.replace('$', ''));

const cartItem = document.createElement('div');
cartItem.classList.add('item');
cartItem.setAttribute("data-price", price);   

cartItem.innerHTML = `
  <div class="item-image">
      <img src="${product.image}">
  </div>
  <div class="detail">
      <h4>${product.name}</h4>
      <h4 class="item-total">$${price.toFixed(2)}</h4>
  </div>
  <div class="flex gap-5">
      <a href="#" class="quantity-btn minus">
        <i class="fa-solid fa-minus"></i>
      </a>
      <h4 class="quantity-value">1</h4>
      <a href="#" class="quantity-btn plus">
        <i class="fa-solid fa-plus"></i>
      </a>
  </div>
`;


  cartList.appendChild(cartItem);

  const plusBtn = cartItem.querySelector('.plus');
  const quantityValue = cartItem.querySelector('.quantity-value');
  const itemTotal = cartItem.querySelector('.item-total');
  const minusBtn = cartItem.querySelector('.minus');

  plusBtn.addEventListener('click', (e) => {
    e.preventDefault();
    quantity++;
    quantityValue.textContent = quantity;
    itemTotal.textContent = `$${(price * quantity).toFixed(2)}`;
    updateTotal();
  });

  minusBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (quantity > 1) {
      quantity--;
      quantityValue.textContent = quantity;
      itemTotal.textContent = `$${(price * quantity).toFixed(2)}`;
      updateTotal();
    } else {
      cartItem.remove();
      cartProduct = cartProduct.filter(item => item.id !== product.id);
      updateTotal();
    }
  });

  updateTotal();
}

const initApp = () => {
  fetch('products.json')
    .then(Response => Response.json())
    .then(data => {
      productlist = data;
      showCards();
    });
}

initApp();
