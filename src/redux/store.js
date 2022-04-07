import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './rootReducer';

const composeEnhancers = composeWithDevTools({
  // Specify here name, actionsBlacklist, actionsCreators and other options
});

const initialStore={
    cartReducer :{
        cartItems : JSON.parse(localStorage.getItem('cartItems'))?? []
    }
}
export const store = createStore(
  rootReducer, initialStore,
  composeEnhancers());