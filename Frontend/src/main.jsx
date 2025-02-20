import { React} from 'react'
import ReactDOM from "react-dom/client";
import App from "./App.jsx"
import "./index.css"
import { Route , RouterProvider , createRoutesFromElements} from "react-router"
import { createBrowserRouter } from "react-router";
import { Provider } from "react-redux";
import { store } from "./redux/features/store";
import { Register } from './pages/Auth/Register.jsx';

import PrivateRoute from './components/PrivateRoute.jsx';

//users
import { Profile } from './pages/User/Profile.jsx';

// Auth
import Login from './pages/Auth/Login.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element = {<App />} >
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route path="" element={<PrivateRoute />}>
        <Route path="/profile" element={<Profile />} />
      </Route>
    </Route>

  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router = {router} />
  </Provider>
);