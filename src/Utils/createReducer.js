export const createReducersAutomatically = (initialStates) => {
  const reducers = {};
  Object.keys(initialStates).forEach((sliceName) => {
    const reducerActions = (state, action) => {
      state[sliceName] = action.payload;
    };
    reducers[sliceName] = reducerActions;
  });
  return reducers;
};
