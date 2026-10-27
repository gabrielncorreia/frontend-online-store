import { addItem, cartCount, cartTotal, normalizeCart, setQuantity } from './cart';

const phone = { id: 'MLB1', title: 'Celular', thumbnail: 'a.jpg', price: 1000 };
const charger = { id: 'MLB2', title: 'Carregador', thumbnail: 'b.jpg', price: 32.9 };

describe('cart', () => {
  it('groups the old one-entry-per-unit format into quantities', () => {
    expect(normalizeCart([phone, phone, charger])).toEqual([
      { ...phone, quantity: 2 },
      { ...charger, quantity: 1 },
    ]);
  });

  it('ignores anything that is not a cart', () => {
    expect(normalizeCart(null)).toEqual([]);
    expect(normalizeCart([null, { title: 'no id' }])).toEqual([]);
  });

  it('adds to an existing line instead of duplicating it', () => {
    const cart = addItem(addItem([], phone), phone, 2);
    expect(cart).toEqual([{ ...phone, quantity: 3 }]);
  });

  it('changes quantities and removes a line at zero', () => {
    const cart = [{ ...phone, quantity: 1 }, { ...charger, quantity: 1 }];
    expect(setQuantity(cart, 'MLB1', 4)[0].quantity).toBe(4);
    expect(setQuantity(cart, 'MLB1', 0)).toEqual([{ ...charger, quantity: 1 }]);
  });

  it('counts units and totals prices', () => {
    const cart = [{ ...phone, quantity: 2 }, { ...charger, quantity: 3 }];
    expect(cartCount(cart)).toBe(5);
    expect(cartTotal(cart)).toBeCloseTo(2098.7);
  });
});
