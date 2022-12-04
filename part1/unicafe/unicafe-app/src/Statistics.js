import StatisticLine from "./StatisticLine";

const Statistics = ({good, neutral, bad}) => {
    let total = good + neutral + bad;

    if (total === 0) {
        return (
            <div>
                <h1>statistics</h1>
                <p>No feedback given</p>
            </div>
        );
    };

    let avg = (good - bad)/total;
    let pos = good/total;

    return (
        <div>
            <h1>statistics</h1>
            <table>
                <tbody>
                    <StatisticLine
                        label={"good"}
                        value={good}
                    />
                    <StatisticLine
                        label={"neutral"}
                        value={neutral}
                    />
                    <StatisticLine
                        label={"bad"}
                        value={bad}
                    />
                    <StatisticLine
                        label={"all"}
                        value={total}
                    />
                    <StatisticLine
                        label={"average"}
                        value={avg}
                    />
                    <StatisticLine
                        label={"positive"}
                        value={(pos*100) + "%"}
                    />
                </tbody>
            </table>
        </div>
    );
};

export default Statistics;