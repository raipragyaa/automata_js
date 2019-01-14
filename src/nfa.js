class NFA {

  constructor(tuple) {
    this.states = tuple.states;
    this.initialState = tuple["start-state"];
    this.finalState = tuple["final-states"];
    this.transitions = tuple.delta;
  };

  doesAccept(string) {
    let setOfCharacter = string.split('');
    let currentStates = [this.initialState];
    let finalStates = this.getFinalStates(currentStates, setOfCharacter);
    return finalStates.some((finalState) => this.finalState.includes(finalState));
  };

  getEpsilonTransitions(states, statesToExclude = []) {
    if (states.length < 1) return states;

    let nextEpsilonStates = states.flatMap((state) => {
      let deltaElement = this.transitions[state];
      return deltaElement ? deltaElement.e || [] : [];
    }).filter(state => !statesToExclude.includes(state));
    statesToExclude.push(states);
    return this.getEpsilonTransitions(nextEpsilonStates, statesToExclude.flat()).concat(states);
  };

  getFinalStates(states, setOfChars) {
    if (setOfChars.length < 1) {
      return this.nextStates(states);
    }
    return setOfChars.reduce((states, char) => {
      return this.nextStates(states, char);
    }, states);
  };

  nextStates(states, char) {
    return (this.getEpsilonTransitions(states)).flatMap((state) => {
      if (this.transitions[state]) {
        let newStates = char ? (this.transitions[state][char] || []) : [state];
        return this.getEpsilonTransitions(newStates);
      }
      return [];
    });
  };

}

module.exports = NFA;