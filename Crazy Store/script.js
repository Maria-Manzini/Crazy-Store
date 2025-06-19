// Hamburger Menu Toggle
const hamburger = document.getElementById('hamburger');
const navList = document.getElementById('nav-list');

hamburger.addEventListener('click', () => {
  navList.classList.toggle('show');
});

// Newsletter Form Validation
const newsletterForm = document.getElementById('newsletter-form');
const newsletterEmail = document.getElementById('email');
const newsletterMessage = document.getElementById('form-message');

if (newsletterForm) {
  newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const emailValue = newsletterEmail.value.trim();

    if (!emailValue || !validateEmail(emailValue)) {
      newsletterMessage.textContent = 'Please enter a valid email address.';
      newsletterMessage.style.color = 'crimson';
      newsletterEmail.focus();
      return;
    }

    newsletterMessage.textContent = 'Thank you for subscribing!';
    newsletterMessage.style.color = 'limegreen';
    newsletterForm.reset();
  });
}

// Contact Form Validation
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contact-form');
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('contact-email'); // updated
  const messageInput = document.getElementById('message');
  const formMessage = document.getElementById('form-message');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    formMessage.textContent = '';
    formMessage.style.color = 'crimson';

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const message = messageInput.value.trim();

    // Name Validation
    if (!name) {
      formMessage.textContent = 'Please enter your name.';
      return;
    }
    if (/\d/.test(name)) {
      formMessage.textContent = 'Name should not contain numbers.';
      return;
    }

    // Email Validation
    if (!email.includes('@')) {
      formMessage.textContent = 'Email must contain "@" symbol.';
      return;
    }
    if (!validateEmail(email)) {
      formMessage.textContent = 'Please enter a valid email address.';
      return;
    }

    // Message Validation
    if (!message) {
      formMessage.textContent = 'Please enter a message.';
      return;
    }

    // Success
    formMessage.style.color = 'green';
    formMessage.textContent = 'Thank you for contacting us! Your message has been received.';
    form.reset();
  });
});

// Helper function for email validation
function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

const cart = [];

document.querySelectorAll('.add-to-cart-btn').forEach((btn, index) => {
  btn.addEventListener('click', () => {
    const productCard = btn.closest('.product-card');
    const name = productCard.querySelector('h3').innerText;
    const priceText = productCard.querySelector('.price').innerText;
    const price = parseFloat(priceText.replace('R', ''));
    const quantity = parseInt(productCard.querySelector('input[type="number"]').value);

    const existing = cart.find(item => item.name === name);
    if (existing) {
      existing.quantity += quantity;
    } else {
      cart.push({ name, price, quantity });
    }

    updateCartSummary();
  });
});

function updateCartSummary() {
  const cartList = document.getElementById('cart-items');
  const totalField = document.getElementById('cart-total');
  cartList.innerHTML = '';
  
  let total = 0;
  cart.forEach(item => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;

    const li = document.createElement('li');
    li.innerText = `${item.name} (x${item.quantity}) - R${itemTotal.toFixed(2)}`;
    cartList.appendChild(li);
  });

  totalField.innerText = total.toFixed(2);
}
// Cart Summary Section
const cartSummary = document.getElementById('cart-summary');
if (cartSummary) {
  cartSummary.style.display = 'none'; // Initially hide the cart summary
}
// Show cart summary when there are items in the cart
function showCartSummary() {
  if (cart.length > 0) {
    cartSummary.style.display = 'block';
  } else {
    cartSummary.style.display = 'none';
  }
}  
// Call showCartSummary after adding items to the cart
document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
  btn.addEventListener('click', showCartSummary);
});
// Show cart summary on page load if there are items in the cart
document.addEventListener('DOMContentLoaded', () => {
  if (cart.length > 0) {
    showCartSummary();
  }
});
// Show cart summary when the cart is updated
document.addEventListener('cartUpdated', showCartSummary);
// Custom event to trigger cart update
function triggerCartUpdate() {
  const event = new Event('cartUpdated');
  document.dispatchEvent(event);
}
// Trigger cart update when items are added
document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    triggerCartUpdate();
  });
});

// Remove redeclaration of cart here, since it's already declared above.
// If you want to persist cart in localStorage, update the cart array and save it after changes:
function saveCartToStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

// Call saveCartToStorage() after modifying the cart
document.querySelectorAll('.add-to-cart-btn').forEach((btn, index) => {
  btn.addEventListener('click', () => {
    // ...existing add-to-cart logic...
    saveCartToStorage();
  });
});

// On page load, load cart from storage if available
document.addEventListener('DOMContentLoaded', () => {
  const storedCart = JSON.parse(localStorage.getItem('cart'));
  if (storedCart && Array.isArray(storedCart)) {
    cart.length = 0;
    cart.push(...storedCart);
    updateCartSummary();
    updateCartDisplay();
    showCartSummary();
  }
});

function updateCartDisplay() {
  const list = document.getElementById('cart-items');
  const totalEl = document.getElementById('cart-total');
  list.innerHTML = '';
  let total = 0;

  cart.forEach(item => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;

    const li = document.createElement('li');
    li.textContent = `${item.name} (x${item.quantity}) - R${itemTotal.toFixed(2)}`;
    list.appendChild(li);
  });

  totalEl.textContent = total.toFixed(2);
}

updateCartDisplay();

document.getElementById('checkout-form').addEventListener('submit', function (e) {
  e.preventDefault();

  // Simulated checkout
  localStorage.removeItem('cart');
  document.getElementById('checkout-form').style.display = 'none';
  document.getElementById('checkout-cart').style.display = 'none';
  document.getElementById('confirmation').style.display = 'block';
});

document.getElementById('search-bar').addEventListener('input', function (e) {
  const query = e.target.value.toLowerCase();
  const products = document.querySelectorAll('.product-card');

  products.forEach(card => {
    const title = card.querySelector('h3').innerText.toLowerCase();
    const matches = title.includes(query);
    card.style.display = matches ? 'block' : 'none';
  });
});
// Add event listener for search bar
document.getElementById('search-bar').addEventListener('input', function (e) {
  const query = e.target.value.toLowerCase();
  const products = document.querySelectorAll('.product-card');

  products.forEach(card => {
    const title = card.querySelector('h3').innerText.toLowerCase();
    const matches = title.includes(query);
    card.style.display = matches ? 'block' : 'none';
  });
});   
// Add event listener for search bar
   document.addEventListener('DOMContentLoaded', function () {
      const searchInput = document.getElementById('search-bar');

      if (searchInput) {
        searchInput.addEventListener('input', function (e) {
          const query = e.target.value.toLowerCase();
          const cards = document.querySelectorAll('.product-card');

          cards.forEach(card => {
            const title = card.querySelector('h2, h3').innerText.toLowerCase();
            card.style.display = title.includes(query) ? 'block' : 'none';
          });
        });
      }
    });