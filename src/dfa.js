class DFA {
  constructor(tuple) {
    this.tuple = tuple;
    this.transitions = tuple.delta;
    this.initialState = tuple["start-state"];
    this.finalStates = tuple["final-states"];
  };

  doesAccept(string){
    let setOfChars = string.split('');
    let currentState = this.initialState;
    let finalState = this.getFinalState(currentState, setOfChars);
    return this.finalStates.includes(finalState);
  };

  getFinalState(state, setOfChars) {
    return setOfChars.reduce((state, char) => {
      return this.transitions[state][char];
    }, state);
  };
}

module.exports = DFA;
