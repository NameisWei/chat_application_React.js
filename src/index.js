import React from 'react';
import ReactDom from 'react-dom';
import {createStore,applyMiddleware,compose} from 'redux';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import {BrowserRouter,Route,Switch} from 'react-router-dom';
import Login from './container/login/login.js';
import Register from './container/register/register.js';
import AuthRoute from './component/authroute/authroute.js'
import Dashboard from './component/dashboard/dashboard.js'
import reducers from './reducer.js';
import PersonalInfo from './container/personalinfo/personalinfo.js'
import './index.css'
import Chat from './component/chat/chat.js'



const store = createStore(reducers,compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension():f=>f
));

ReactDom.render(
    (
        <Provider store={store}>
            <BrowserRouter>
                <div>
                    <AuthRoute></AuthRoute>
                    <Switch>
                        <Route path='/login' component={Login}></Route>
                        <Route path='/register' component={Register}></Route>
                        <Route path='/femaleinfo' component={PersonalInfo}></Route>
                        <Route path='/maleinfo' component={PersonalInfo}></Route>
                        <Route path='/chat/:userid' component={Chat}></Route>
                        <Route component={Dashboard}></Route>
                    </Switch>
                </div>
            </BrowserRouter>
        </Provider>
    ), document.getElementById('root'));

