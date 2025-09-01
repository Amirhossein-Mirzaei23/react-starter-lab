import React from 'react';

function reactHooks() {

  const [count, setCount] = React.useState(0)

  return (
    <div>
      <div>
      /// use stat
      <h1>Count: {count}</h1>
      <button onClick={()=> setCount(count+1)} ></button>
      </div>
      <div>
        // use efect
        <p></p>
      </div>
    </div>
  );
}

export default reactHooks;