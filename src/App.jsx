import { Global } from "./styles/Global"
import Router from "./router"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './index.css'

function App() {

  return (
    <>
      <Global />
      <ToastContainer 
        theme="dark"
      />
      <Router/>
    </>
  )
}

export default App
