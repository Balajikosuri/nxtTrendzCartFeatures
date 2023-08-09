import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  //   TODO: Add your code for remove all cart items, increment cart item quantity, decrement cart item quantity, remove cart item

  addCartItem = (product, id) => {
    const {cartList} = this.state
    if (cartList.find(eachProduct => eachProduct.id === id)) {
      const updatedCartList = cartList.map(eachProduct => {
        if (eachProduct.id === id) {
          return {...eachProduct, ...product} // Return the modified product
        }
        return eachProduct // Return unchanged product if ID doesn't match
      })

      this.setState({cartList: updatedCartList})
    } else {
      this.setState({cartList: [...cartList, product]})
    }
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  removeCartItem = id => {
    const {cartList} = this.state
    const filteredCartList = cartList.filter(
      eachProduct => eachProduct.id !== id,
    )
    this.setState({cartList: filteredCartList})
  }

  incrementCartItemQuantity = itemId => {
    this.setState(prevState => ({
      cartList: prevState.cartList.map(item =>
        item.id === itemId ? {...item, quantity: item.quantity + 1} : item,
      ),
    }))
  }

  decrementCartItemQuantity = itemId => {
    this.setState(prevState => ({
      cartList: prevState.cartList.map(item =>
        item.id === itemId && item.quantity > 1
          ? {...item, quantity: item.quantity - 1}
          : item,
      ),
    }))
  }

  render() {
    const {cartList} = this.state
    console.table(cartList)

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          removeAllCartItems: this.removeAllCartItems,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
