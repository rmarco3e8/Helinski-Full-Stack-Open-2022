const Part = (props) => {
    return (
        <>
            <p>
                {props.partNum.name} {props.partNum.exercises}
            </p>
        </>
    );
};

export default Part;