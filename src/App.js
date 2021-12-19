import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import ErrorPage from './Page/Error/ErrorPage';
import Home from './Page/Home/Home/Home';
import Footer from './Page/Share/Footer/Footer';
import Navigation from './Page/Share/Navigation/Navigation';
import AddProducts from './Page/AddProducts/AddProducts';
import Alhouse from './Page/HousList/AllHouse/Alhouse';
import Login from './Page/LoginAndRegistration/Login/Login';
import Registration from './Page/LoginAndRegistration/Registration/Registration';
import AuthProvider from './Contexts/AuthProvider/AuthProvider';
import PrivateRoute from './Page/PrivateRoute/PrivateRoute';
import Deshbord from './Page/Dashboard/Dashboard/Deshbord';
import MakeAdmin from './Page/Dashboard/MakeAdmin/MakeAdmin';
import MyOrder from './Page/Dashboard/MyOrder/MyOrder';



function App() {
  return (
    <div className="App">
      <AuthProvider>
        <BrowserRouter>
          <Navigation></Navigation>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/add" element={<AddProducts />} />
            <Route
              path="/house"
              element={
                <PrivateRoute>
                  <Alhouse />
                </PrivateRoute>
              }
            />

            {/* <Route exact path="/house" element={<Alhouse />} /> */}
            <Route exact path="/login" element={<Login />} />

            <Route path="/dashbord" element={<Deshbord />}>

              <Route path="myorder" element={<MyOrder />} />
              <Route path="makeAdmin" element={<MakeAdmin />} />
            </Route>
            <Route exact path="/registerd" element={<Registration />} />

            <Route path="*" element={<ErrorPage />} />
          </Routes>
          <Footer></Footer>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
