import { ApiConstant } from "../repository/ApiConstant.js";
import { useHistory  } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import '../Dashboard.css';
import { FaSignOutAlt } from 'react-icons/fa';
import FigureData from './FigureData.jsx';

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
        <nav className="navbar " style={{backgroundColor: '#F0DEFE'}}>
            <div className="container" >
                <h2 className="navbar-brand">Cloth Loom Dashboard</h2>
                <button className="btn d-flex" onClick={logout}>
                    <FaSignOutAlt style={{ marginRight: '10px', marginTop: '4px'}}/>
                    <a href="#" className="nav-link" onClick={logout}>Logout</a>
                </button>
            </div>
        </nav>
        <FigureData></FigureData>
       </>
    );
}
export default Dashboard;