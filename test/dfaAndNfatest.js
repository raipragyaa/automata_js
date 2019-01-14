const DFA = require('../src/dfa');
const NFA = require('../src/nfa');
const fs = require('fs');
const assert = require('chai').assert;

const testData = JSON.parse(fs.readFileSync('testCases.json'));

const nfasData = testData.filter((data) => data.type === 'nfa');
const dfasData = testData.filter((data) => data.type === 'dfa');

const getValidInputTestStatement = (validInput) => `${validInput || 'Empty string'} should be accepted`;
const getInValidInputTestStatement = (validInput) => `${validInput || 'Empty string'} should be rejected`;

describe('Automaton', function() {

  describe('Dfa',function () {
    dfasData.forEach(function(dfaData) {
      describe(dfaData.name, function () {
        let dfa = new DFA(dfaData.tuple);

        dfaData["pass-cases"].forEach(function (validInput) {
          it(getValidInputTestStatement(validInput), function () {
            assert.isTrue(dfa.doesAccept(validInput))
          })
        });

        dfaData['fail-cases'].forEach(function (invalidInput) {
          it(getInValidInputTestStatement(invalidInput), function () {
            assert.isFalse(dfa.doesAccept(invalidInput))
          })
        });
      })
    });
  });

  describe('Nfa',function () {
    nfasData.forEach(function(nfaData) {
      describe(nfaData.name, function () {
        let nfa = new NFA(nfaData.tuple);

        nfaData["pass-cases"].forEach(function (validInput) {
          it(getValidInputTestStatement(validInput), function () {
            assert.isTrue(nfa.doesAccept(validInput))
          })
        });

        nfaData['fail-cases'].forEach(function (invalidInput) {
          it(getInValidInputTestStatement(invalidInput), function () {
            assert.isFalse(nfa.doesAccept(invalidInput))
          });
        });
      })
    });
  });
});
