const template = document.createElement('template');
template.innerHTML = `
<style>
.cart{
    /* width: 353px; */
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    flex-direction: column;
    height: 100%;
    height: 410px;
    position: relative;
    background-color: white;
    clip-path: polygon(
      20px 0%,
      calc(100% - 20px) 0%,
      100% 20px,
      100% calc(100% - 20px),
      calc(100% - 20px) 100%,
      20px 100%,
      0% calc(100% - 20px),
      0% 20px
    );
}
.cart__content{
    margin: 0 auto;
    text-decoration: none;
    position: absolute;
    flex-direction: column;
    position: absolute;
    bottom: 19px;
}
.cart__image{
    width: 100%;
    z-index: -1;
    height: 100%;
    object-fit: contain;
    position: absolute;
    /* top: -20px; */
    overflow: hidden;
}
.cart__link{
    text-decoration: none;
    color: #C5978D;
}
h3,
h4{
  font-weight: 700;
  line-height: 24px;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  margin: 0;
}
</style>
<div class="cart">
  <img class="cart__image"/>
  <div class="cart__content">
    <h3 class="cart__title"></h3>
    <h4 class="cart__price"></h4>
    <h4><a class="cart__link">New collection</a></h4>
  </div>
</div>
`;

class productComponent extends HTMLElement{
    constructor(){
        super();

        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        this.shadowRoot.querySelector('.cart__title').innerText = this.getAttribute('name');
        this.shadowRoot.querySelector('.cart__image').src = this.getAttribute('image');
        this.shadowRoot.querySelector('.cart__price').innerText = this.getAttribute('price');
        this.shadowRoot.querySelector('.cart__link').href = this.getAttribute('href');
    }
}

window.customElements.define('product-component', productComponent);