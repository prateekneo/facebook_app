import { SAVE_TOKEN } from '../constant/action-types'


import { LOGIN_USER } from '../constant/action-types'

// export function getData() {
//     return function (dispatch) {
//         return fetch("https://jsonplaceholder.typicode.com/users")
//         .then(response => response.json())
//       .then(json => {
//           console.log(json);
          
//         dispatch({ type: DATA_LOADED, payload: json });
//       });
//     }
//   }

// export function loginUser(payload) {
//     fetch('/Signup/User', {
//         method: 'post',
//         body: JSON.stringify(payload)
//     }).then(function(response) {
//         return response.json();
//     })
//     return {
//         type : LOGIN_USER, payload
//     }
// } 

export function saveToken(payload) {
    return {
        type : SAVE_TOKEN, payload
    }
} 