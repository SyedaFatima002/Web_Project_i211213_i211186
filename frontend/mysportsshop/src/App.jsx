import  usePage  from './Hooks/usePage.js'

import HomePage from './Pages/HomePage';
import WishList from './Pages/Wishlist';
import ItemDisplay from './Pages/ItemDisplay.jsx';


function App() {
  const {currentPage}=usePage();

  return (
    <div>
      {currentPage=="HomePage" && <HomePage />}
      {currentPage=="WishList" && <WishList />}
      {currentPage=="ItemDisplay" && <ItemDisplay />}
    </div>
  )
}

export default App
