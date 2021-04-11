import React from 'react'
import ReactDom from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import reduxThunk from 'redux-thunk'
import { AppStore } from './contexts/AppStore';
import App from './components/App'

import reducers from './reducers'

import ScrollToTop from './components/ui/ScrollToTop'
import thunk from 'redux-thunk'

// ReactDom.render(
//     <BrowserRouter>
//         <ScrollToTop>
//             <AppStore >
//                 <App />
//             </AppStore>
//         </ScrollToTop>
//     </BrowserRouter>,
//     document.querySelector('#root')
// )

// const store = createStore(reducers,
//     composeEnhancers(applyMiddleware(reduxThunk))
//     )

// const store = createStore(reducers, applyMiddleware(reduxThunk))

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(reducers, applyMiddleware(thunk))
// const store = createStore(reducers,
//     composeEnhancers(applyMiddleware(reduxThunk))
//     )


console.log("store",store.getState())

ReactDom.render(
    <Provider store={store}>
    <BrowserRouter>
        <ScrollToTop>
            <AppStore >
                <App />
            </AppStore>
        </ScrollToTop>
    </BrowserRouter>,
    </Provider>,
    document.querySelector('#root')
)