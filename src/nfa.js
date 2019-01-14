class NFA {

  constructor(tuple) {
    this.tuple = tuple;
    this.states = tuple.states;
    this.initialState = tuple["start-state"];
    this.finalState = tuple["final-states"];
    this.delta = tuple.delta;
  };

  doesAccept(string) {
    let setOfCharacter = string.split('');
    let currentStates = [];
    currentStates.push(this.initialState);
    let finalStates = this.transition(currentStates, setOfCharacter);
    return finalStates.some((finalState) => this.finalState.includes(finalState));
  };

  getEpsilonTransitions(states) {
    if (states.length < 1) return states;
    let nextEpsilonStates = states.flatMap((state) => {
      if (this.delta[state]) {
        return this.delta[state] ? this.delta[state].e || [] : [];
      }
    });
    return this.getEpsilonTransitions(nextEpsilonStates).concat(states);
  };

  transition(states, setOfChars) {
    if (setOfChars.length < 1) {
      return this.nextStates(states);
    }
    return setOfChars.reduce((states, char) => {
      return this.nextStates(states, char);
    }, states);
  };

  nextStates(states, char) {
    return (this.getEpsilonTransitions(states)).flatMap((state) => {
      if (this.delta[state]) {
        let newStates = char ? (this.delta[state][char] || []) : [state];
        return this.getEpsilonTransitions(newStates);
      }
      return [];
    });
  };

}

module.exports = NFA;