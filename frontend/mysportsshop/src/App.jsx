import  usePage  from './Hooks/usePage.js'

import HomePage from './Pages/HomePage';
import WishList from './Pages/Wishlist';
import ItemDisplay from './Pages/ItemDisplay.jsx';
import Login from './Pages/Login.jsx';
import Register from './Pages/Register.jsx';
import Profile from './Pages/Profile.jsx'
import ProductFeed from './Pages/ProfuctFeed.jsx';
import Order from './Pages/Order.jsx';
import PaymentDisplay from './Pages/PaymentDisplay.jsx';


function App() {
  const {currentPage}=usePage();

  return (
    <div>
      {currentPage=="HomePage" && <HomePage />}
      {currentPage=="WishList" && <WishList />}
      {currentPage=="ItemDisplay" && <ItemDisplay />}
      {currentPage=='Login' && <Login />}
      {currentPage=='Register' && <Register />}
      {currentPage=='Profile' && <Profile />}
      {currentPage=='ProductFeed' && <ProductFeed />}
      {currentPage=='Order' && <Order />}
      {currentPage=='PaymentDisplay' && <PaymentDisplay />}

    </div>
  )
}

export default App
