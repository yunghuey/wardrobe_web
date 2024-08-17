import React, { useEffect, useState } from 'react';
import { useHistory  } from "react-router-dom";
import { ApiConstant } from "../repository/ApiConstant.js";
import '../Login.css';

function Login() {
    const [errorMessage, setMessage] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const history = useHistory ();

    async function login() {
        if (isLoading) return;

        setIsLoading(true);
        if (username.length == 0 || password.length == 0){
            setIsLoading(false);
            return setMessage("Please fill up the form");
        }
        let url = ApiConstant.LoginURL;
        let item = { username: username, password:password };  // Assuming you're using 'username' as 'email'
        let header = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json", // This header is usually necessary
            },
            body: JSON.stringify(item)
        };
        try{
            let response = await fetch(url, header);

            if (response.status == 200){
                let result = await response.json();
                let token = result.token.replace(/^"|"$/g, '');
                localStorage.setItem("token", token); // Assuming 'result' contains login status/token
                history.push("/dashboard");
            }
            else if (response.status == 401 || response.status == 404){
                setMessage("Invalid username or password");
            }
            else {
                setMessage("Unexpected error occured. Please try again");
            }
        }catch (error) {
            console.log(`error: ${error.message} stake trace ${error.stack}`);
            alert(`error: ${error.message} stake trace ${error.stack}`);
        }finally{
            setIsLoading(false);
        }
    }

    return (
        <>
            <center><img src="/src/assets/logo.png" className="mt-3" alt="logo" /></center>
            <h3><center>Login</center></h3>
            <div className="col-sm-6 offset-sm-3">
                <label htmlFor="username">Username: </label>
                <input
                    type="text"
                    name="username"
                    className="form-control"
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter username"
                />
            </div>

            <div className="col-sm-6 offset-sm-3 mt-3">
                <label htmlFor="password">Password: </label>
                <input
                    type="password"
                    name="password"
                    className="form-control"
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                />
                {errorMessage &&
                (
                    <div className="mt-3">
                    <div className="alert alert-danger">{errorMessage}</div>
                </div>

                )}

            </div>
            <div className="col-sm-6 mt-3 offset-sm-3">
                <center><button 
                onClick={login} 
                className="btn btn-dark"
                disabled={isLoading}>
                    {isLoading ? "Logging in ..." : "Submit"}
                </button></center>
            </div>
        </>
    );
}

export default Login;