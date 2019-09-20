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
    items.forEach(testItem => {
      // set all statuses to running
      testItem.status = RUNNING;
      setItems([...items]);
      testItem.run(result => {
        if (result) {
          // change test item's status
          testItem.status = PASSED;
          setItems([...items]);
        } else {
          // change test item's status
          testItem.status = FAILED;
          setItems([...items]);
        }
      });
    });
  };

  // get a count of the items statuses
  const passedCount = items.filter(item => item.status === PASSED).length;
  const failedCount = items.filter(item => item.status === FAILED).length;
  const runningCount = items.filter(item => item.status === RUNNING).length;
  const finished = passedCount + failedCount === items.length;

  return (
    <div>
      <div>total passed</div>
      <div>{passedCount}</div>
      <div>total failed</div>
      <div>{failedCount}</div>
      <div>total running</div>
      <div>{runningCount}</div>
      {items &&
        items.map(({ id, description, status }) => (
          <div key={id}>
            <div>{description}</div>
            <div>{status}</div>
          </div>
        ))}
      {finished && <div>{`${FINISHED}`}</div>}
      <button onClick={startTest}>Start Tests</button>
    </div>
  );
};

export default App;
