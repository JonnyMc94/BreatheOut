
const urlReducer = (state = '', action) => {

  switch (action.type) {

    case 'changeURL':
      return action.payload;
    default:
      return state;
    
  }

}

export default urlReducer;