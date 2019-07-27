import React from 'react'
import Form from './Signin'

class App extends React.Component {
  
  render() {

    return (
      
     <div className="page_div">{<Form />}</div>   
  
    )
  }
}

export default App