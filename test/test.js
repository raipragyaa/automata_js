const fs = require('fs');
const assert = require('chai').assert;
const NFA = require('../src/dfa');
const DFA = require('../src/nfa');

let testCases = JSON.parse(fs.readFileSync('testCases.json'));

let dfaTestData = testCases.filter(testCase => testCase.type === 'dfa');
let nfaTestData = testCases.filter(testCase => testCase.type === 'nfa');

describe('DFA', function () {
  dfaTestData.forEach(function (dfaTestCase) {
    describe(dfaTestCase.name, function () {
      let validInputs = dfaTestCase["pass-cases"];
      let invalidInputs = dfaTestCase["fail-cases"];
      let machine = new DFA(dfaTestCase.tuple);
      validInputs.forEach(function (validInput) {
        it(validInput + " should be accepted", function () {
          assert.isOk(machine.doesAccept(validInput));
        });
      });
      invalidInputs.forEach(function (invalidInput) {
        it(invalidInput + " should not be accepted", function () {
          assert.isNotOk(machine.doesAccept(invalidInput));
        });
      })
    });
  });
});

describe('NFA', function () {
  nfaTestData.forEach(function (nfaTestCase) {
    describe(nfaTestCase.name, function () {
      let validInputs = nfaTestCase["pass-cases"];
      let invalidInputs = nfaTestCase["fail-cases"];
      let machine = new NFA(nfaTestCase.tuple);
      validInputs.forEach(function (validInput) {
        it(validInput + " should be accepted", function () {
          assert.isOk(machine.doesAccept(validInput));
        });
      });
      invalidInputs.forEach(function (invalidInput) {
        it(invalidInput + " should not be accepted", function () {
          assert.isNotOk(machine.doesAccept(invalidInput));
        });
      })
    });
  });
});