import React from "react";
import ReactDOM from "react-dom/client";
import { createStore } from 'redux'
import Display from "./Display";
import Button from "./Button";

const counterReducer = (state = 0, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    case "ZERO":
      return 0;
    default:
      return state;
  }
}
const store = createStore(counterReducer);

const App = () => {

  const increaseByOne = () => store.dispatch({ type: 'INCREMENT' });

  const setToZero = () => store.dispatch({ type: 'ZERO' });

  const decreaseByOne = () => store.dispatch({ type: 'DECREMENT' });

  // const store = createStore(counterReducer);

  // store.subscribe(() => {
  //   const storeNow = store.getState()
  //   console.log(storeNow)
  // })

  // store.dispatch({ type: 'INCREMENT' })
  // store.dispatch({ type: 'INCREMENT' })
  // store.dispatch({ type: 'INCREMENT' })
  // store.dispatch({ type: 'ZERO' })
  // store.dispatch({ type: 'DECREMENT' })

  return (
      <>
          <Display counter={store.getState()} />
          <Button 
              onClick={increaseByOne} 
              text="add"
          />
          <Button 
              onClick={setToZero}
              text="reset"
          />
          <Button 
              onClick={decreaseByOne}
              text="subtract"
          />
      </>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'))
const renderApp = () => root.render(<App />);

renderApp();
store.subscribe(renderApp);
