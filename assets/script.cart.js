const pdpFullImage = document.querySelector('.pdp__full--image');
const pdpImage = document.querySelector('.pdp__fullImage');
const pdpImageClose = document.querySelector('.pdp__fullImage--close');
const headerCart = document.querySelector('.header__cart');
const cartSection = document.querySelector('.cart-section');
const cartCloseIcon = document.querySelector('.cart-section__icon');

headerCart.addEventListener('click', (e) => {
  cartSection.style.transform = 'translateX(0)';
  body.style.overflow = 'hidden';
})

cartCloseIcon.addEventListener('click', (e) => {
  cartSection.style.transform = 'translateX(600px)';
  body.style.overflow = 'auto';
})

pdpFullImage.addEventListener('click', (e) => {
    console.log(e);
    pdpImage.style.display = 'flex';
    body.style.position = 'relative';
})
pdpImageClose.addEventListener('click', (e) => {
    pdpImage.style.display = 'none';
    body.style.position = 'unset';
})  


const form = document.querySelector('#AddToCartForm');


    
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
    
      let productID;
      console.log(e.target);
        if (e.target.dataset.novariant == "true") {
          const span = form.querySelector(".product-novariant");
          productID = span.dataset.id;
        } else {
          const variantId = document.querySelector(".product-variants__list").value;
    
          productID = variantId;
        }
    
      let formData = {
            'items': [{
                    'id': productID,
                    'quantity': 1
                }]
        };

        // Cart Show
        cartSection.style.transform = 'translateX(0)';
        body.style.overflow = 'hidden';
    
      await fetch(window.Shopify.routes.root + 'cart/add.js', {
            method: 'POST',
            headers: {
                'dataType': 'json',
                'Content-Type': 'application/json'
        },
            body: JSON.stringify(formData)
        }).then((response) => {
                renderCartItems();
                return response.json()
        })
            .catch((error) => {
                console.error('Error:', error);
        });
    })

    let cartProducts = document.querySelector('.cart-section__products');
    async function renderCartItems(){
      let cartSubtotal = document.querySelector('.cart-section__subtotal');
      let response = await fetch(window.Shopify.routes.root + 'cart.js');
      let data = await response.json();

      formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 2
      });

      cartProducts.innerHTML = '';
      let template = '';

      data.items.forEach((item) => {
        console.log(item);
        template += `
        <div class="cart-section__wrapper item" data-id="${item.key}" data-amount="${item.quantity}" >
        <a href="${item.url}">
          <img class="cart-section__image" src="${item.image}" alt="${item.title}">
        </a>
        <div>
          <div>
            <a class="cart-section__title" href="${item.url}">${item.product_title}</a>
            <p>${this.formatter.format(item.price / 100)}</p>
            <p>Size: ${item.variant_title}</p>
            <nav class="cart-section__nav">
            <button onclick="decreaseItemQuantity('${item.key}', ${item.quantity})" class="cart-section__minus" id="minus">-</button>
            <p class="item__count">${item.quantity}</p>
            <button onclick="increaseItemQuantity('${item.key}', ${item.quantity})" class="cart-section__plus" id="plus">+</button>
            </nav>
            <h4 class="cart-section__remove" id="remove_product" onclick="removeItem('${item.key}')">Remove</h4>
          </div>
        </div>
      </div>
        `
        cartSubtotal.innerText = this.formatter.format(data.original_total_price / 100)
      });

      cartProducts.insertAdjacentHTML('beforeend', template)
    }

    renderCartItems();


    function changeCart({id, qty}){
      let form_data = {
          id: id,
          quantity: qty
      };
      fetch(window.Shopify.routes.root + "cart/change.js", {
          method: 'POST',
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify(form_data),
      })
      .then((response) => {
          return response.json();
      })
      .then((data) => {
          renderCartItems();
      })
      .catch((error) => {
          console.error("Error: ", error)
      })
  }

  async function decreaseItemQuantity(itemKey, quantity) {
    await changeCart({id:itemKey, qty: quantity - 1})
  }

  async function increaseItemQuantity(itemKey, quantity){
    await changeCart({id: itemKey, qty: quantity + 1})
  }

  async function removeItem(itemKey){
    await changeCart({id: itemKey, qty: 0})
  }