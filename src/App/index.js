import React, { Component, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import Loadable from 'react-loadable';
import app from 'firebase/app';
import '../../node_modules/font-awesome/scss/font-awesome.scss';

import Loader from './layout/Loader'
import Aux from "../hoc/_Aux";
import ScrollToTop from './layout/ScrollToTop';
import routes from "../route";
import SignIn from "../Demo/Authentication/SignIn/SignIn1"
const AdminLayout = Loadable({
    loader: () => import('./layout/AdminLayout'),
    loading: Loader
});

const firebaseConfig = {
    apiKey: "AIzaSyCuh0RGbUDqpxkkyq8ohzI0wIGKu1FeHp4",
    authDomain: "cx-app-b3b2a.firebaseapp.com",
    databaseURL: "https://cx-app-b3b2a.firebaseio.com",
    projectId: "cx-app-b3b2a",
    storageBucket: "cx-app-b3b2a.appspot.com",
    messagingSenderId: "136046956873",
    appId: "1:136046956873:web:9ede56d9c1a0373e390a98",
    measurementId: "G-YW5M5KSEVD"
};

class App extends Component {
    constructor(props){
        super(props)
        app.initializeApp(firebaseConfig);
    }
    render() {
        const menu = routes.map((route, index) => {
          return (route.component) ? (
              <Route
                  key={index}
                  path={route.path}
                  exact={route.exact}
                  name={route.name}
                  render={props => (
                      <route.component {...props} />
                  )} />
          ) : (null);
        });

        return (
            <Aux>
                <ScrollToTop>
                    <Suspense fallback={<Loader/>}>
                        <Switch>
                            {menu}
                            {/* <Route path="/" component={AdminLayout} /> */}
                            <SignIn />
                        </Switch>
                    </Suspense>
                </ScrollToTop>
            </Aux>
        );
    }
}

export default App;
