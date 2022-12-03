const History = ({allClicks}) => {

    if (allClicks.length === 0) {
        return (
            <>Press left or right to increment the counters! Reset to clear.</>
        );
    }

    return (
    <>History:&nbsp;{allClicks.join(" ")}</>
    );
};

export default History;
