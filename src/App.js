import React from "react";
import Header from './component/Layout/Header'
import Footer from './component/Layout/Footer'
import MenuLeft from './component/Layout/MenuLeft'
import { useLocation } from "react-router-dom";
import MenuAcc from "./component/Layout/MenuAcc";
import { UserProvider } from "./UserContext";
function App(props) {
  let params1 = useLocation()
  return (
    <>
      <UserProvider>
        <Header></Header>
        <section>
          <div className="container">
            <div className="row">
                {params1['pathname'].includes("account") ? <MenuAcc /> : <MenuLeft />}
                {props.children}
            </div>
          </div>
        </section>
        <Footer></Footer>
      </UserProvider>
    </>
  );
}

export default App;
