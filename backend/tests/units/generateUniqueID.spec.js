const generateUniqueId = require('../../src/utils/generateUniqueId');

describe('Generate unique id', () => {
  test('Should generate an unique id', () => {
    const id = generateUniqueId(4);

    expect(id).toHaveLength(8);
  });
});
