const Total = ({parts}) => {
    return (    
        <>
            <h4>
                total of&nbsp;
                {parts.reduce((sum, part) => part.exercises + sum, 0)}&nbsp;
                exercises
            </h4>
        </>
    );
};

export default Total;