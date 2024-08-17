import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Home from "./components/pages/Home";
import Profile from "./components/pages/Profile";
import Login from "./components/pages/Login";
import ResetPassword from "./components/pages/ResetPassword";
import SingUp from "./components/pages/SingUp";
import ProtectedRoute from "./components/ProtectedRoute";
import AuthProvider from "./auth/AuthProvider";
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import './styles/App.css'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>
  },
  {
    path: "/login",
    element: <Login/>
  },
  {
    path: "/singup",
    element: <SingUp/>
  },
  {
    path: "/",
    element: <ProtectedRoute/>,
    children: [
      {
        path: "/profile",
        element: <Profile/>
      },
    ]
  },
  {
    path: "/reset-password",
    element: <ResetPassword/>
  }
])


const App = () => {
  return (
    <>
    <Nav/>
    <main>
      <AuthProvider>
        <RouterProvider router={router}/>
      </AuthProvider>
    </main>
    <Footer/>
    </>
  );
}

export default App