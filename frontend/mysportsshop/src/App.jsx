import  usePage  from './Hooks/usePage.js'

import HomePage from './Pages/HomePage';
import WishList from './Pages/Wishlist';
import ItemDisplay from './Pages/ItemDisplay.jsx';
import Login from './Pages/Login.jsx';
import Register from './Pages/Register.jsx';



function App() {
  const {currentPage}=usePage();

  return (
    <div>
      {currentPage=="HomePage" && <HomePage />}
      {currentPage=="WishList" && <WishList />}
      {currentPage=="ItemDisplay" && <ItemDisplay />}
      {currentPage=='Login' && <Login />}
      {currentPage=='Register' && <Register />}

    </div>
  )
}

export default App
