const { error, getUsernameFromEmail, getEnvVariable } = require('../src/utils/base');

const invalidIITKEmails = [
  'abc@gmail.com',
  'abc1@iitk.ac.in',
  'abc@cse.iitk.ac.in',
  'abc1@cse.iitk.ac.in',
  '@iitk.ac.in',
  'abc@',
  'abc@.iitk.ac.in',
  'abc@cse..iitk.ac.in',
  'abc@someRandom.iitk.ac.in',
  'ABC@iitk.ac.in'
];

describe('Test the base utilities', () => {
  test('Error utility test', () => {
    const recErr = error('ValidationError', 'name must be a string');
    let expErr = new Error();
    expErr.name = 'ValidationError';
    expErr.message = 'name must be a string';
    expect(() => {
      throw recErr;
    }).toThrow(expErr);
  });

  test('IITK email id parser test', () => {
    expect(getUsernameFromEmail('abc@iitk.ac.in')).toEqual('abc');
    invalidIITKEmails.forEach(email => {
      expect(() => getUsernameFromEmail(email)).toThrow();
    });
  });

  test('Test env variable getter', () => {
    process.env.COURZA_SOMEVAR = 'thevalue';
    const defValue = getEnvVariable('somenonexistent', 'default');
    const noDefValue = getEnvVariable('somenonexistent');
    const someValue = getEnvVariable('somevar', 'default');
    expect(defValue).toBe('default');
    expect(noDefValue).toBeUndefined();
    expect(someValue).toBe('thevalue');
  });
});
