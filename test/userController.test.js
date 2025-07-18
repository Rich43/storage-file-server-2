import test from 'node:test';
import assert from 'assert';
import {mock} from 'node:test';
import userController from '../controllers/userController.js';
import User from '../models/user.js';

function createRes() {
  return {
    statusCode: 200,
    body: undefined,
    status(code) { this.statusCode = code; return this; },
    json(payload) { this.body = payload; return this; }
  };
}

// success case for getAllUsers

test('userController.getAllUsers returns list of users', async () => {
  const users = [{id:1, name:'Alice'}];
  const stub = mock.method(User, 'getAll', async () => users);
  const req = {};
  const res = createRes();
  await userController.getAllUsers(req, res);
  assert.strictEqual(res.statusCode, 200);
  assert.deepStrictEqual(res.body, users);
  assert.strictEqual(stub.mock.callCount(), 1);
  stub.mock.restore();
});

// error case for getAllUsers

test('userController.getAllUsers handles errors', async () => {
  const err = new Error('db failed');
  const stub = mock.method(User, 'getAll', async () => { throw err; });
  const req = {};
  const res = createRes();
  await userController.getAllUsers(req, res);
  assert.strictEqual(res.statusCode, 500);
  assert.deepStrictEqual(res.body, { error: 'Failed to retrieve users' });
  assert.strictEqual(stub.mock.callCount(), 1);
  stub.mock.restore();
});

// success case for createUser

test('userController.createUser creates user', async () => {
  const newUser = {id:2, name:'Bob'};
  const stub = mock.method(User, 'create', async (body) => { assert.deepStrictEqual(body, newUser); return newUser; });
  const req = { body: newUser };
  const res = createRes();
  await userController.createUser(req, res);
  assert.strictEqual(res.statusCode, 201);
  assert.deepStrictEqual(res.body, newUser);
  assert.strictEqual(stub.mock.callCount(), 1);
  stub.mock.restore();
});

// error case for createUser

test('userController.createUser handles errors', async () => {
  const stub = mock.method(User, 'create', async () => { throw new Error('fail'); });
  const req = { body: {name:'Bad'} };
  const res = createRes();
  await userController.createUser(req, res);
  assert.strictEqual(res.statusCode, 500);
  assert.deepStrictEqual(res.body, { error: 'Failed to create user' });
  assert.strictEqual(stub.mock.callCount(), 1);
  stub.mock.restore();
});
