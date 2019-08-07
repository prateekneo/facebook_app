const initialState = {
    users : null,
    token : null,
    isAuth : false,
    userDetails : null,
    mobileOpen : false,
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
    } else if(action.type === 'SAVE_USER_DETAILS'){
        console.log(action.payload);
        return {
          ...state,
          userDetails : action.payload
        }
    } else if(action.type === 'TOGGLE_SIDEBAR'){
      return {
        ...state,
        mobileOpen : !state.mobileOpen
      }
  }
    return state; 
} 


export default rootReducer