import { menuArray as menu } from "./data.js";

const menuEl = document.getElementById("menu");
const ordersEl = document.getElementById("orders");
const orderListEl = document.getElementById("order-list");
const totalPriceEl = document.getElementById("total-price");
const completeOrderBtn = document.getElementById("btn-order");
const modalEl = document.getElementById("modal");
const payFormEl = document.getElementById("pay-form");

const messageBoxEl = document.getElementById("message-box");
const messageEl = document.getElementById("order-message");

const ordersMap = new Map();

function renderMenu(menu) {
  return menu
    .map((item) => {
      return `<div class="menu-item">
                <img src=${item.image} alt=${item.name} />
                <div class="menu-item-info">
                  <p class="menu-item-title">${item.name}</p>
                  <p class="menu-item-ingredients">${item.ingredients.join(
                    ", "
                  )}</p>
                  <span class="menu-item-price">$${item.price}</span>
                </div>
                  <button class="icon-btn"><ion-icon class="menu-icon" data-id="${
                    item.id
                  }" name="add-outline"></ion-icon></button>
              </div>`;
    })
    .join("");
}

document.getElementById("menu").innerHTML = renderMenu(menu);

menuEl.addEventListener("click", function (e) {
  if (e.target.dataset.id) {
    const itemId = Number(e.target.dataset.id);
    const currentItem = menu.find((item) => item.id === itemId);

    if (currentItem) {
      addItemToCart(currentItem);
      ordersEl.classList.remove("hidden");
    }
  }
});

function addItemToCart(currentItem) {
  const { name, price, id } = currentItem;

  if (ordersMap.has(id)) {
    ordersMap.get(id).count++;
  } else {
    ordersMap.set(id, { name, price, count: 1 });
  }

  renderOrders();
}

function renderOrders() {
  let totalPrice = 0;
  let ordersHTML = "";

  ordersMap.forEach((order, id) => {
    totalPrice += order.price * order.count;
    ordersHTML += `<div class="order-item">
                    <p class="order-title">${order.count} x ${order.name}</p>
                    <p class="order-remove" data-id="${id}">remove</p>
                    <p class="order-price">$${order.price * order.count}</p>
                  </div>`;
  });

  totalPriceEl.textContent = `$${totalPrice}`;

  orderListEl.innerHTML = ordersHTML;
}

orderListEl.addEventListener("click", function (e) {
  if (e.target.classList.contains("order-remove")) {
    const itemId = Number(e.target.dataset.id);

    if (ordersMap.has(itemId)) {
      const item = ordersMap.get(itemId);

      if (item.count > 1) {
        item.count--;
      } else {
        ordersMap.delete(itemId);
      }

      renderOrders();

      if (ordersMap.size === 0) {
        ordersEl.classList.add("hidden");
      }
    }
  }
});

completeOrderBtn.addEventListener("click", function (e) {
  modalEl.classList.toggle("hidden");
});

modalEl.addEventListener("click", function (e) {
  if (e.target === modalEl) {
    modalEl.classList.add("hidden");
  }
});

payFormEl.addEventListener("submit", function (e) {
  e.preventDefault();

  const userName = e.target.elements.name.value;

  messageEl.textContent = `Thanks, ${userName}! Your order is on its way!`;

  ordersMap.clear();
  renderOrders();
  ordersEl.classList.add("hidden");
  modalEl.classList.add("hidden");
  messageBoxEl.classList.remove("hidden");

  setTimeout(() => {
    messageEl.classList.add("hidden");
  }, 3000);

  payFormEl.reset();
});
