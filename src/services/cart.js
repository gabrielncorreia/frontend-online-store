const CART_ITENS_KEY = 'in_cart';

const saveCartItens = (cartItens) => {
  localStorage
    .setItem(CART_ITENS_KEY, JSON.stringify(cartItens));
};

const readCartItens = () => JSON.parse(localStorage.getItem(CART_ITENS_KEY));

export { saveCartItens, readCartItens };
