class DFA {
  constructor(tuple) {
    this.tuple = tuple;
  };

  doesAccept(string){
    let setOfChars = string.split('');
    let currentState = this.tuple['start-state'];
    let finalState = this.transition(currentState, setOfChars);
    return this.tuple['final-states'].includes(finalState);
  };

  transition(state, setOfChars){
    return setOfChars.reduce((state, char) => {
      return this.tuple.delta[state][char];
    }, state);
  };
}

module.exports = DFA;
