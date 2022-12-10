import Part from "./Part";

const Content = ({parts}) => {
    return (
        <>
            {parts.map((part, index) => <Part key={part.id} partNum={part} />)}
        </>
    );
};

export default Content;