import  usePage  from './Hooks/usePage.js'

import HomePage from './Pages/HomePage';
import WishList from './Pages/Wishlist';


function App() {
  const {currentPage}=usePage();

  return (
    <div>
      {currentPage=="HomePage" && <HomePage />}
      {currentPage=="WishList" && <WishList />}
    </div>
  )
}

export default App
