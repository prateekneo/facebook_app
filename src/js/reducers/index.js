const initialState = {
    users : null,
    token : null,
    isAuth : false
  };

function rootReducer (state = initialState, action) {

    if(action.type === 'SAVE_TOKEN'){
        console.log(action.payload);
        return {
          ...state,
          users : { userid : action.payload.userid},
          token: action.payload.token,
          isAuth : action.payload.isAuth,

      }
    }
    return state;
}


export default rootReducer