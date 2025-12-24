
import { useEffect } from "react";
import { auth, db } from "./firebase";
import Dashboard from "./pages/Dashboard";
import { setUser } from "./store/userSlice";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { Route, Routes, useNavigate } from "react-router-dom";

// components
import Login from "./pages/Login";
import Pages from "./pages/Pages";
import Contact from "./pages/Contact";
import HomePage from "./pages/HomePage";
import Register from "./pages/Register";
import Products from "./pages/Products";
import Customize from "./pages/Customize";
import ProductList from "./pages/ProductList";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import ProductDetailes from "./pages/ProductDetailes";

// styles
import "./styles/card.css";
import "./styles/index.css";
import "./styles/layout.css";
import "./styles/button.css";
import Popup from "./components/helpers/Popup";
import Activiteis from "./pages/Activiteis";
import EditProfile from "./pages/EditProfile";
import { setProducts } from "./store/productsSlice";

function App() {
  const user = useSelector((state) => state.userSlice.user);
  const dispatch = useDispatch();

  // popup states
  const isOpen = useSelector(state => state.popupSlice.isOpen)
  const popupType = useSelector(state => state.popupSlice.type)


  useEffect(() => {
    const unsub = () => {
      try {
        onAuthStateChanged(auth, async user => {

          if (user) {
            dispatch(setUser({
              uid: user.uid,
              email: user.email,
              displayName: user.displayName,
              photoURL: user.photoURL,
            }))

            // get userProfiles or create new
            const userProfileRef = doc(db, "usersProfile", user.uid)
            const userProfile = await getDoc(userProfileRef);

            if (!userProfile.exists()) {
              setDoc(userProfileRef, {
                displayName: user.displayName,
                photoURL: user.photoURL,
                email: user.email,
                uid: user.uid,
              });
            }

            // get publicProducts or create new
            const userProductsRef = doc(db, "publicProducts", user.uid)
            const userProducts = await getDoc(userProductsRef);

            if (!userProducts.exists()) {
              setDoc(userProductsRef, { products: [] });
            } else {
              dispatch(setProducts(userProducts.data()))
            }
          }
        })
      } catch (err) {
        console.log('Error: ', err);
      }
    }

    return () => unsub();
  }, [dispatch])

  return (
    <div className="App">
      <Header />
      <Routes>
        {user ? (
          <>
            <Route index path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/customize" element={<Customize />} />
            <Route path="/dashboard/activities" element={<Activiteis />} />
            <Route path="/dashboard/products" element={<ProductList />} />
            <Route path="/dashboard/edit-profile" element={<EditProfile />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/:category" element={<Products />} />
            <Route path="/pages" element={<Pages />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/products/:category/:id" element={<ProductDetailes />} />
          </>
        )
          : (
            <>
              <Route index path="/" element={<HomePage />} />
              <Route path="/:category" element={<Products />} />
              <Route path="/pages" element={<Pages />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/Login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/products/:category/:id" element={<ProductDetailes />} />
            </>
          )}
      </Routes>
      <Footer />
      <Popup isOpen={isOpen} type={popupType} />
    </div>
  );
}

export default App;
