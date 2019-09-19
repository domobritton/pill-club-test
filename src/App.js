import React, { useState } from 'react';

const App = () => {
  const NOT_STARTED = 'Not Started';
  const RUNNING = 'Running';
  const PASSED = 'Passed';
  const FAILED = 'Failed';
  const FINISHED = 'Finished!';
  const tests = [
    {
      id: 0,
      description: 'commas are rotated properly',
      run: generateDummyTest(),
      status: NOT_STARTED
    },
    {
      id: 1,
      description: 'exclamation points stand up straight',
      run: generateDummyTest(),
      status: NOT_STARTED
    },
    {
      id: 2,
      description: "run-on sentences don't run forever",
      run: generateDummyTest(),
      status: NOT_STARTED
    },
    {
      id: 3,
      description: 'question marks curl down, not up',
      run: generateDummyTest(),
      status: NOT_STARTED
    },
    {
      id: 4,
      description: 'semicolons are adequately waterproof',
      run: generateDummyTest(),
      status: NOT_STARTED
    },
    {
      id: 5,
      description: 'capital letters can do yoga',
      run: generateDummyTest(),
      status: NOT_STARTED
    }
  ];
// I had originally considered separating the passed, failed, running, not started items into separate states,
// but decided that manipulating a single array of objects in one state is a simpler approach
  const [items, setItems] = useState(tests);

  function generateDummyTest() {
    var delay = 7000 + Math.random() * 7000;
    var testPassed = Math.random() > 0.5;

    return function(callback) {
      setTimeout(function() {
        callback(testPassed);
      }, delay);
    };
  }

  const startTest = () => {
    items.forEach((test, idx) => {
      // set all statuses to running
      items[idx].status = RUNNING;
      setItems([...items]);
      test.run(result => {
        // separate the test item from the rest of the state items [{}]
        const filtered = items.filter(item => item.id !== test.id);
        // recombine and sort by index 0 -> 5
        const newItems = [...filtered, test].sort((a, b) => a.id - b.id);
        if (result) {
          test.status = PASSED;
          setItems([...newItems]);
        } else {
          test.status = FAILED;
          setItems([...newItems]);
        }
      });
    });
  };

  // get a count of the items statuses
  const passedItems = items.filter(item => item.status === PASSED).length;
  const failedItems = items.filter(item => item.status === FAILED).length;
  const runningItems = items.filter(item => item.status === RUNNING).length;

  return (
    <div>
      <div>total passed</div>
      <div>{passedItems}</div>
      <div>total failed</div>
      <div>{failedItems}</div>
      <div>total running</div>
      <div>{runningItems}</div>
      {items &&
        items.map(({ id, description, status }) => (
          <div key={id}>
            <div>{description}</div>
            <div>{status}</div>
          </div>
        ))}
      {passedItems + failedItems === items.length && <div>{`${FINISHED}`}</div>}
      <button onClick={startTest}>Start Tests</button>
    </div>
  );
};

export default App;
