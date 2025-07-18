import test from 'node:test';
import assert from 'assert';
import {mock} from 'node:test';
import AWS from 'aws-sdk';

function restoreAll(...mocks) {
  for (const m of mocks) m.mock.restore();
}

test('uploadFile uses S3 upload with correct params', async () => {
  process.env.AWS_BUCKET_NAME = 'bucket';
  const expected = { Location: 'url' };
  const uploadStub = mock.method(AWS.S3.prototype, 'upload', () => {
    return { promise: () => Promise.resolve(expected) };
  });
  const { uploadFile } = await import('../utils/s3.js?case=upload');
  const result = await uploadFile('ZmFrZQ==', 'path/file.txt', 'text/plain');
  assert.deepStrictEqual(result, expected);
  assert.strictEqual(uploadStub.mock.callCount(), 1);
  assert.deepStrictEqual(uploadStub.mock.calls[0].arguments[0], {
    Bucket: 'bucket',
    Key: 'path/file.txt',
    Body: Buffer.from('ZmFrZQ==', 'base64'),
    ContentType: 'text/plain'
  });
  restoreAll(uploadStub);
});

test('downloadFile uses S3 getObject', async () => {
  process.env.AWS_BUCKET_NAME = 'bucket';
  const expected = { Body: Buffer.from('a'), ContentType: 'text/plain' };
  const ctorStub = mock.method(AWS, 'S3', function () { return {
    getObject(params) {
      return { promise: () => Promise.resolve(expected), params };
    }
  }; });
  const { downloadFile } = await import('../utils/s3.js?case=download');
  const result = await downloadFile('path/file.txt');
  assert.deepStrictEqual(result, expected);
  assert.strictEqual(ctorStub.mock.callCount(), 1);
  restoreAll(ctorStub);
});
