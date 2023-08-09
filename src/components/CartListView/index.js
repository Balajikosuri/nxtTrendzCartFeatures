import CartItem from '../CartItem'
import CartContext from '../../context/CartContext'

import './index.css'

const CartListView = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList, removeAllCartItems} = value
      const numberOfItems = cartList.length
      let totalAmount = 0

      if (cartList) {
        cartList.forEach(eachProduct => {
          totalAmount += eachProduct.price * eachProduct.quantity
        })
      }

      return (
        <div className="CartListView-container">
          <button
            className="remove-all-btn"
            onClick={removeAllCartItems}
            type="button"
          >
            Remove all
          </button>

          <ul className="cart-list">
            {cartList.map(eachCartItem => (
              <CartItem key={eachCartItem.id} cartItemDetails={eachCartItem} />
            ))}
          </ul>
          <div className="summary-checkout-container">
            <p className="Order-Total">
              Order Total:{' '}
              <span className="sub-Order-Total">Rs {totalAmount}/-</span>
            </p>
            <p className="no-of-items">{`${numberOfItems} items in cart`}</p>
            <div className="button-container">
              <button className="checkout-button" type="button">
                Checkout
              </button>
            </div>
          </div>
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default CartListView
