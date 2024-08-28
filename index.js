class Product {
  constructor(id, name, price) {
    this.id = id;
    this.name = name;
    this.price = price;
  }
}

class ShoppingCartItem {
  constructor(product, quantity) {
    this.product = product;
    this.quantity = quantity;
    this.liked = false;
  }

  getTotalPrice() {
    return this.product.price * this.quantity;
  }
}

class ShoppingCart {
  constructor() {
    this.items = [];
  }

  addItem(product, quantity) {
    const existingItem = this.items.find(
      (item) => item.product.id === product.id
    );
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      const newItem = new ShoppingCartItem(product, quantity);
      this.items.push(newItem);
    }
    this.displayCartItems();
  }

  removeItem(productId) {
    this.items = this.items.filter((item) => item.product.id !== productId);
    this.displayCartItems();
  }

  updateQuantity(productId, change) {
    const item = this.items.find((item) => item.product.id === productId);
    if (item) {
      item.quantity += change;
      if (item.quantity < 1) item.quantity = 1;
      this.displayCartItems();
    }
  }

  toggleLike(productId) {
    const item = this.items.find((item) => item.product.id === productId);
    if (item) {
      item.liked = !item.liked;
      this.displayCartItems();
    }
  }

  getTotalPrice() {
    return this.items.reduce((total, item) => total + item.getTotalPrice(), 0);
  }

  displayCartItems() {
    const cartItemsList = document.getElementById("cart-items");
    cartItemsList.innerHTML = "";

    this.items.forEach((item) => {
      const li = document.createElement("li");
      li.className = "cart-item";
      li.innerHTML = `
                <button class="like" onclick="cart.toggleLike(${
                  item.product.id
                })">${item.liked ? "♥" : "♡"}</button>
                <span>${item.product.name}</span>
                <span>$${item.product.price.toFixed(2)}</span>
                <span>
                    <button onclick="cart.updateQuantity(${
                      item.product.id
                    }, -1)">-</button>
                    ${item.quantity}
                    <button onclick="cart.updateQuantity(${
                      item.product.id
                    }, 1)">+</button>
                </span>
                <button onclick="cart.removeItem(${
                  item.product.id
                })">Delete</button>
            `;
      cartItemsList.appendChild(li);
    });

    document.getElementById(
      "total-price"
    ).innerText = `$${this.getTotalPrice().toFixed(2)}`;
  }
}

const cart = new ShoppingCart();

const product1 = new Product(1, "Item 1", 10.0);
const product2 = new Product(2, "Item 2", 15.0);
const product3 = new Product(3, "Item 3", 20.0);

cart.addItem(product1, 1);
cart.addItem(product2, 2);
cart.addItem(product3, 1);

cart.displayCartItems();
