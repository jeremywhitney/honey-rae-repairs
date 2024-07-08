import { useState } from "react";

export const App = () => {
  const [count, setCount] = useState(0); // [stateVariable, setterFunction]

  const handleBtnClick = () => {
    setCount(count + 1);
    console.log(count);
  };

  return (
    <>
      <h1>Hello!</h1>
      <div>This is amazing!</div>
      <button className="btn-secondary" onClick={handleBtnClick}>
        Click me!
      </button>
      <div>Count: {count}</div>
    </>
  );
};
