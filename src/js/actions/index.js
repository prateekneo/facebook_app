
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

export default function loginUser(payload) {
    alert('prateek');
    fetch('/Signup/User', {
        method: 'post',
        body: JSON.stringify(payload)
    }).then(function(response) {
        return response.json();
    })
    return {
        type : LOGIN_USER, payload
    }
} 