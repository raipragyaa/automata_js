const assert = require('chai').assert;
const NFA = require('../src/nfa');

describe("NFA", function () {
  describe("sparse zero sandwich - any number of 1s with utmost one zero", function () {
    beforeEach(function () {
      tuple = {
        "states": [
          "q1",
          "q2"
        ],
        "alphabets": [
          "1",
          "0"
        ],
        "delta": {
          "q1": {
            "0": [
              "q2"
            ],
            "1": [
              "q1"
            ],
            "e": [
              "q2"
            ]
          },
          "q2": {
            "1": [
              "q2"
            ]
          }
        },
        "start-state": "q1",
        "final-states": [
          "q2"
        ]
      };
    });

    it('pass-case', () => {
      let machine = new NFA(tuple);
      assert.isOk(machine.doesAccept("1"), true);
      assert.isOk(machine.doesAccept("11"), true);
      assert.isOk(machine.doesAccept("101"), true);
      assert.isOk(machine.doesAccept("01"), true);
      assert.isOk(machine.doesAccept("011"), true);
      assert.isOk(machine.doesAccept("1111"), true);
    });

    it('fail-case', () => {
      let machine = new NFA(tuple);
      assert.isNotOk(machine.doesAccept("00"), false);
      assert.isNotOk(machine.doesAccept("010"), false);
      assert.isNotOk(machine.doesAccept("100"), false);
      assert.isNotOk(machine.doesAccept("1100111"), false);
      assert.isNotOk(machine.doesAccept("1010"), false);
    });
  });
  describe("alternate characters beginning and ending with same letter", function () {
    beforeEach(function () {
      tuple = {
        "states": [
          "q1",
          "q3",
          "q7",
          "q2",
          "q5",
          "q6",
          "q4"
        ],
        "alphabets": [
          "1",
          "0"
        ],
        "delta": {
          "q1": {
            "e": [
              "q2",
              "q5"
            ]
          },
          "q2": {
            "0": [
              "q3"
            ]
          },
          "q3": {
            "1": [
              "q4"
            ]
          },
          "q4": {
            "0": [
              "q3"
            ]
          },
          "q5": {
            "1": [
              "q6"
            ]
          },
          "q6": {
            "0": [
              "q7"
            ]
          },
          "q7": {
            "1": [
              "q6"
            ]
          }
        },
        "start-state": "q1",
        "final-states": [
          "q3",
          "q6"]
      };
    });

    it('pass-case', () => {
      let machine = new NFA(tuple);
      assert.isOk(machine.doesAccept("0"), true);
      assert.isOk(machine.doesAccept("010"), true);
      assert.isOk(machine.doesAccept("01010"), true);
      assert.isOk(machine.doesAccept("10101"), true);
    });

    it('fail-case', () => {
      let machine = new NFA(tuple);
      assert.isNotOk(machine.doesAccept("0001"), false);
      assert.isNotOk(machine.doesAccept("1110"), false);
      assert.isNotOk(machine.doesAccept("111000"), false);
      assert.isNotOk(machine.doesAccept("01"), false);
      assert.isNotOk(machine.doesAccept("10"), false);
      assert.isNotOk(machine.doesAccept("000111"), false);
    });
  });
  describe("any number of zeroes followed by any number of ones", function () {
    beforeEach(function () {
      tuple = {
        "states": [
          "q1",
          "q2"
        ],
        "alphabets": [
          "1",
          "0"
        ],
        "delta": {
          "q1": {
            "0": [
              "q1"
            ],
            "e": [
              "q2"
            ]
          },
          "q2": {
            "1": [
              "q2"
            ]
          }
        },
        "start-state": "q1",
        "final-states": [
          "q2"
        ]
      };
    });

    it('pass-case', () => {
      let machine = new NFA(tuple);
      assert.isOk(machine.doesAccept(""), true);
      assert.isOk(machine.doesAccept("0"), true);
      assert.isOk(machine.doesAccept("1"), true);
      assert.isOk(machine.doesAccept("00"), true);
      assert.isOk(machine.doesAccept("0011"), true);
      assert.isOk(machine.doesAccept("0001"), true);
      assert.isOk(machine.doesAccept("011"), true);
      assert.isOk(machine.doesAccept("000111"), true);
    });

    it('fail-case', () => {
      let machine = new NFA(tuple);
      assert.isNotOk(machine.doesAccept("10"), false);
      assert.isNotOk(machine.doesAccept("1110"), false);
      assert.isNotOk(machine.doesAccept("010"), false);
      assert.isNotOk(machine.doesAccept("10101"), false);
      assert.isNotOk(machine.doesAccept("1101"), false);
    });
  });

  describe("0*1* or 1*0*", function () {
    beforeEach(function () {
      tuple = {
        "states": [
          "q1",
          "q3",
          "q2",
          "q5",
          "q4"
        ],
        "alphabets": [
          "1",
          "0"
        ],
        "delta": {
          "q1": {
            "e": [
              "q2",
              "q4"
            ]
          },
          "q2": {
            "0": [
              "q2"
            ],
            "e": [
              "q3"
            ]
          },
          "q3": {
            "1": [
              "q3"
            ]
          },
          "q4": {
            "1": [
              "q4"
            ],
            "e": [
              "q5"
            ]
          },
          "q5": {
            "0": [
              "q5"
            ]
          },
        },
        "start-state": "q1",
        "final-states": [
          "q3",
          "q5"
        ]
      }
    });

    it('pass-case', () => {
      let machine = new NFA(tuple);
      assert.isOk(machine.doesAccept(""), true);
      assert.isOk(machine.doesAccept("1"), true);
      assert.isOk(machine.doesAccept("00"), true);
      assert.isOk(machine.doesAccept("11"), true);
      assert.isOk(machine.doesAccept("001"), true);
      assert.isOk(machine.doesAccept("110"), true);
      assert.isOk(machine.doesAccept("011"), true);
      assert.isOk(machine.doesAccept("100"), true);
      assert.isOk(machine.doesAccept("0011"), true);
      assert.isOk(machine.doesAccept("1100"), true);
    });

    it('fail-case', () => {
      let machine = new NFA(tuple);
      assert.isNotOk(machine.doesAccept("101"), false);
      assert.isNotOk(machine.doesAccept("11001"), false);
      assert.isNotOk(machine.doesAccept("00110"), false);
      assert.isNotOk(machine.doesAccept("0101"), false);
      assert.isNotOk(machine.doesAccept("1010"), false);
    });
  });
  describe("0*1* or 1*0* with extra epsilons", function () {
    beforeEach(function () {
      tuple = {
        "states":[
          "q1",
          "q3",
          "q7",
          "q2",
          "q5",
          "q6",
          "q4"
        ],
        "alphabets":[
          "1",
          "0"
        ],
        "delta":{
          "q1":{
            "e":[
              "q2",
              "q4"
            ]
          },
          "q2":{
            "0":[
              "q2"
            ],
            "e":[
              "q3"
            ]
          },
          "q3":{
            "1":[
              "q3"
            ],
            "e":[
              "q6"
            ]
          },
          "q4":{
            "1":[
              "q4"
            ],
            "e":[
              "q5"
            ]
          },
          "q5":{
            "0":[
              "q5"
            ],
            "e":[
              "q7"
            ]
          }
        },
        "start-state":"q1",
        "final-states":[
          "q7",
          "q6"
        ]
      };
    });

    it('pass-case', () => {
      let machine = new NFA(tuple);
      // assert.isOk(machine.doesAccept(""), true);
      // assert.isOk(machine.doesAccept("1"), true);
      // assert.isOk(machine.doesAccept("00"), true);
      // assert.isOk(machine.doesAccept("11"), true);
      // assert.isOk(machine.doesAccept("001"), true);
      // assert.isOk(machine.doesAccept("110"), true);
      // assert.isOk(machine.doesAccept("011"), true);
      // assert.isOk(machine.doesAccept("100"), true);
      // assert.isOk(machine.doesAccept("0011"), true);
      // assert.isOk(machine.doesAccept("1100"), true);
      let nextStates = machine.getEpsilonTransitions(['q1']);
      assert.sameMembers(nextStates,['q1','q2','q3','q4','q5','q6','q7']);
    });

    it('fail-case', () => {
      let machine = new NFA(tuple);
      assert.isNotOk(machine.doesAccept("101"), false);
      // assert.isNotOk(machine.doesAccept("11001"), false);
      // assert.isNotOk(machine.doesAccept("00110"), false);
      // assert.isNotOk(machine.doesAccept("0101"), false);
      // assert.isNotOk(machine.doesAccept("1010"), false);
    });
  });
});
