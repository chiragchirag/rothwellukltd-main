export const updateReducersAutomatically = (state, action, stateName, id) => {
  let stateData = JSON.parse(JSON.stringify(state[stateName]));
  stateData = stateData?.map((userObj) => {
    if (userObj[id] === action.payload[id]) {
      return {
        ...userObj,
        ...action.payload,
      };
    } else {
      return userObj;
    }
  });
  state[stateName] = stateData;
};
