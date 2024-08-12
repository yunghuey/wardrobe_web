import { ApiConstant } from "../repository/ApiConstant.js";
import { useHistory  } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import '../Dashboard.css';

function Dashboard(){
    const history = useHistory();
    useEffect(() => {
        let user = localStorage.getItem('token');
        if(!user){
            history.push('/');
        }
    }, [history]);

    async function logout(){
        let token = localStorage.getItem('token');
        if (token != null){

            let url = ApiConstant.LogoutURL;
            let header = {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token
                },
            };
            let response = await fetch(url, header);
            if(response.status == 200){
                localStorage.removeItem('token');
                history.push('/');
            }
            else {
                alert(response.data);
            }
        }
        else {
            alert('Token not found');
        }
    }

    return  (
        <>
        <h2>Dashboard at here</h2>
        <a href="#" className="nav-link" onClick={logout}>Logout</a>
        </>

    );
}
export default Dashboard;