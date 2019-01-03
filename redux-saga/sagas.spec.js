import test from 'tape';
import { put, call } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import { incrementAsync } from './sagas';

test('increamentAsync Saga test', (assert) => {
  const gen = incrementAsync();

  assert.deepEqual(
    gen.next().value,
    call(delay, 1000),
    'increamentAsync should return a Promise that will resolver after 1 second'
  );

  assert.deepEqual(
    gen.next().value,
    put({type: 'INCREMENT'}),
    'incrementAsync Saga must dispatch an IN'
  );

  assert.deepEqual(
    gen.next(),
    { done: true, value: undefined},
    'incrementAsync Saga must be done'
  );

  assert.end();
});