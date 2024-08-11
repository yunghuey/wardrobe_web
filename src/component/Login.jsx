import React  from "react";
function Login(){
    return (
        <>
            <h3>Login</h3>
            <label htmlFor="username">Username: </label>
            <input type="text" name="username" className="form-control" placeholder="Enter username"/>
            <span></span>
            <br></br><br></br>
            <label htmlFor="password">Password: </label>
            <input type="password" name="password" className="form-control" placeholder="Enter password"/>
            <span></span>
            <br></br><br></br>
            <button>Submit</button>
        </>
    );
}

export default Login