import { useState } from "react";
import Display from "./Display";
import Button from "./Button";
import History from "./History";

const App = () => {

    const [left, setLeft] = useState(0);
    const [right, setRight] = useState(0);
    const [allClicks, setAll] = useState([]);

    const handleLeftClick = () => {
        setLeft(left + 1);
        setAll(allClicks.concat("L"));
    };

    const handleRightClick = () => {
        setRight(right + 1);
        setAll(allClicks.concat("R"));
    };

    const setToZero = () => {
        setLeft(0);
        setRight(0);
        setAll([]);
    };

    return (
        <>
            <div>
                <Display counter={left} />
                :
                <Display counter={right} />
            </div>
            <div>
                <History allClicks={allClicks} />
            </div>
            <Button
                onClick={handleLeftClick}
                text="left"
            />
            <Button
                onClick={setToZero}
                text="reset"
            />
            <Button
                onClick={handleRightClick}
                text="right"
            />
        </>
    );
};

export default App;
