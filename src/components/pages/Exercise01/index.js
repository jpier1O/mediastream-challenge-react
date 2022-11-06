/**
 * Exercise 01: The Retro Movie Store
 * Implement a shopping cart with the next features for the Movie Store that is selling retro dvds:
 * 1. Add a movie to the cart
 * 2. Increment or decrement the quantity of movie copies. If quantity is equal to 0, the movie must be removed from the cart
 * 3. Calculate and show the total cost of your cart. Ex: Total: $150
 * 4. Apply discount rules. You have an array of offers with discounts depending of the combination of movie you have in your cart.
 * You have to apply all discounts in the rules array (discountRules).
 * Ex: If m: [1, 2, 3], it means the discount will be applied to the total when the cart has all that products in only.
 * 
 * You can modify all the code, this component isn't well designed intentionally. You can redesign it as you need.
 */

import './assets/styles.css'
import { useState } from 'react'
import { DISCOUNTRULES, MOVIES, parseValue } from './utils'

export default function Exercise01 () {

  const [cart, setCart] = useState([
    {
      id: 1,
      name: 'Star Wars',
      price: 20,
      quantity: 2
    }
  ])

  const getTotal = () => parseValue(cart.reduce(
    (total, item) => total + (item.price * item.quantity), 0
  ))

  const checkExistDiscount = (cartIds, discountArr) => {
    const cartIdSort = cartIds.slice().sort();
    const discountArrSort = discountArr.slice().sort();
    return (JSON.stringify(cartIdSort) === JSON.stringify(discountArrSort));
  }

  const searchDiscount = (cartIds, discountArr) => {
    let discount = 0;
    for (let i = 0; i < cartIds.length; i++) {
      for (let j = 0; j < discountArr.length; j++) {
        if (checkExistDiscount(cartIds, discountArr[j].m)) {
          discount = discountArr[j].discount;
          break;
        }
      }
    }
    return discount;
  };

  
  const getDiscountCart = () => {
    const cartIds = cart.map((item) => item.id);
    const discount = searchDiscount(cartIds, DISCOUNTRULES);
    const formatDiscount = +(parseValue(discount));
    return parseValue(formatDiscount * getTotal());
  }

  const getTotalWithDiscount = () => {
   
    const totalWithDiscount =  getTotal() - getDiscountCart();
    return parseValue(totalWithDiscount)
  }

  const handleChangeCart = (item, n) => {
    setCart((cart) =>
      cart.flatMap((cartItem) =>
        cartItem.id === item.id
          ? cartItem.quantity + n < 1
            ? [] // <-- remove item if amount will be less than 1
            : [
                {
                  ...cartItem,
                  quantity: cartItem.quantity + n
                }
              ]
          : [cartItem]
      )
    );
  }

  const addToCart = (item) => {
    // Update cart item quantity if already in cart
    if (cart.some((cartItem) => cartItem.id === item.id)) {
      setCart((cart) =>
        cart.map((cartItem) =>
          cartItem.id === item.id
            ? {
                ...cartItem,
                quantity: cartItem.quantity + 1
              }
            : cartItem
        )
      );
      return;
    }


    // Add item to cart
    setCart((cart) => [
      ...cart,
      {...item, quantity: 1}
    ])
  }

  return (
    <section className="exercise01">
      <div className="movies__list">
        <ul>
          {MOVIES.map(mov => (
            <li className="movies__list-card">
              <ul>
                <li>
                  ID: {mov.id}
                </li>
                <li>
                  Name: {mov.name}
                </li>
                <li>
                  Price: ${mov.price}
                </li>
              </ul>
              <button onClick={() => addToCart(mov)}>
                Add to cart
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="movies__cart">
        <ul>
          {cart.map((cItem) => (
            <li className="movies__cart-card">
              <ul>
                <li>
                  ID: {cItem.id}
                </li>
                <li>
                  Name: {cItem.name}
                </li>
                <li>
                  Price: ${cItem.price}
                </li>
              </ul>
              <div className="movies__cart-card-quantity">
                <button onClick={() => handleChangeCart(cItem, -1)}>
                  -
                </button>
                <span>
                  {cItem.quantity}
                </span>
                <button onClick={() => handleChangeCart(cItem, 1)}>
                  +
                </button>
              </div>
            </li>
          ))}
        </ul>
        <div className="movies__cart-total">
          <p>Subtotal: ${getTotal()}</p>
        </div>
        <div className={+getDiscountCart() === 0 ? "movies__cart-total" : "movies__cart-discount"}>
          <p>Discount: {+getDiscountCart() > 0 ? '-': ''}${getDiscountCart()}</p>
        </div>
        <div className="movies__cart-total">
          <p>Estimated Total: ${getTotalWithDiscount()}</p>
        </div>
      </div>
    </section>
  )
} 