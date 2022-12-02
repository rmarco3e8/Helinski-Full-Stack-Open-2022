import {useState} from "react";
import Display from "./Display";
import Button from "./Button";

const App = () => {

    const [counter, setCounter] = useState(0);

    const increaseByOne = () => setCounter(counter + 1);

    const setToZero = () => setCounter(0);

    const decreaseByOne = () => setCounter(counter - 1);

    return (
        <>
            <Display counter={counter} />
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

export default App;
