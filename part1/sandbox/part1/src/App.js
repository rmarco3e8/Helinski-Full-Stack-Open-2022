const Hello = (props) => {
  return (
    <>
      <p>
        Hello {props.name}, you are {props.age} years old.
      </p>
    </>
  );
};

const App = () => {
  const name = "Raph";
  const age = 24;

  return (
    <>
      <h1>Greetings</h1>
      <Hello name="Bryce" age = {age - 1}/>
      <Hello name="Gabe" age = {20 + 3}/>
      <Hello name={name} age = {age}/>
    </>
  );
};

export default App;
