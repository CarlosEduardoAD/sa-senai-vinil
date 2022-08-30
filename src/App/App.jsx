import React from 'react';
import { Switch, Route } from "react-router-dom";
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer'
import Cart from '../pages/Cart/Cart';
import Home from '../pages/Home';
import Cards from '../pages/Catalog';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Favourites from '../pages/Favourites/Favourites';
import Error from '../components/Error/Error';

const App = () => {
    return (
        <>
            <Header />
            <main>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/catalog" component={Cards} />
                    <Route exact path="/cart" component={Cart} />
                    <Route exact path="/favourites" component={Favourites} />
                    <Route exact path="/signin" component={SignIn} />
                    <Route exact path="/signup" component={SignUp} />
                    <Route path="/*" component={Error} />
                </Switch>
<Footer />
            </main>
        </>
    );
};



export default App;