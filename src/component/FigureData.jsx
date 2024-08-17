import { ApiConstant } from "../repository/ApiConstant.js";
import React , { useEffect, useState, useRef  } from 'react';
import { useHistory  } from "react-router-dom";
import { FaUsers, FaTshirt, FaPalette, FaTags, FaGlobe, FaRulerCombined } from 'react-icons/fa';
import Chart from "chart.js/auto";

function FigureData(){
    const [totalUser, setTotalUser] = useState(0);
    const [totalUserError, setTotalUserError] = useState("");
    const [totalGarment, setTotalGarment] = useState(0);
    const [totalGarmentError, setTotalGarmentError] = useState("");
    const [varianceCount, setVarianceCount] = useState([]);
    const [varianceCountError, setVarianceCountError] = useState("");
    const [durationData, setDurationData] = useState([]);
    const [durationDataError, setDurationDataError] = useState("");
    const [countryData, setcountryData] = useState(undefined);
    const [countryDataError, setCountryDataError] = useState("");
    const [colourData, setColourData] = useState([]);
    const [colourDataError, setColourDataError] = useState("");
    const [sizeData, setSizeData] = useState([]);
    const [sizeDataError, setSizeDataError] = useState("");
    const [brandData, setBrandData] = useState([]);
    const [brandDataError, setBrandDataError] = useState("");
    const chartRef = useRef(null);
    const chartRef1 = useRef(null);
    const chartRef2 = useRef(null);
    const chartRef3 = useRef(null);

    const chartInstanceRef = useRef(null); 
    const chartInstanceRef1 = useRef(null); 
    const chartInstanceRef2 = useRef(null); 
    const chartInstanceRef3 = useRef(null); 

    const history = useHistory ();

    async function getTotalUserNumber(){
        let token = localStorage.getItem("token");
        if (token != null){
            let header = {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token
                }
            }
            
            let totalUserURL = ApiConstant.TotalNumUserCount;
            try{
                let userResponse = await fetch(totalUserURL, header);
                if (userResponse.status == 200){
                    let r = await userResponse.json();
                    if (r.total_user !== undefined) {
                        setTotalUser(r.total_user);
                    } else {
                        setTotalUserError("Unexpected response format");
                    }
                } else {
                    setTotalUserError("Error in getting total user count")
                    setTotalUser(0)
                }
            } catch (error){
                setTotalUserError(error);
            }

            let totalGarmentURL = ApiConstant.TotalNumGarmentCount;
            try{
                let response = await fetch(totalGarmentURL, header);
                if (response.status == 200){
                    let r = await response.json();
                    if (r.total_garment !== undefined) {
                        setTotalGarment(r.total_garment);
                    } else {
                        setTotalGarmentError("Unexpected response format");
                    }
                } else {
                    setTotalGarmentError("Error in getting total user count");
                    setTotalGarment(0);
                }
            } catch (error){
                setTotalGarmentError(error);
            }

            let varianceURL = ApiConstant.TotalVarianceCount;
            try{
                let response = await fetch(varianceURL, header);
                if (response.status == 200){
                    let r = await response.json();
                    console.log(r.result);
                    if (r.result !== undefined) {
                        setVarianceCount(r.result);
                    } else {
                        setTotalGarmentError("Unexpected response format");
                    }
                } else {
                    setTotalGarmentError("Error in getting total user count");
                    setVarianceCount(undefined);
                }
            } catch (error){
                setVarianceCountError(error);
            }
            
            let durationURL = ApiConstant.GarmentByDuration;
            try{
                let response = await fetch(durationURL, header);
                if (response.status == 200){
                    let r = await response.json();
                    console.log(r.result);
                    if (r.result !== undefined) {
                        setDurationData(r.result);
                    } else {
                        setDurationDataError("Unexpected response format");
                    }
                } else {
                    setDurationDataError("Error in getting total user count");
                    setDurationData(undefined);
                }
            } catch (error){
                setDurationDataError(error);
            }
        }
        else {
            console.error('token');
            history.push("/");
        }
    }

    function getRandomHexColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    async function countryChart(chartRef) {
        let countryURL = ApiConstant.GarmentByCountry;
        try{
            let response = await fetch(countryURL, header);
            if (response.status == 200){
                let r = await response.json();
                console.log(r.result);
                if (r.result !== undefined) {
                    setcountryData(r.result);
                    
                } else {
                    setCountryDataError("Unexpected response format");
                }
            } else {
                setCountryDataError("Error in getting total user count");
                setcountryData(undefined);
            }
        } catch (error){
            setCountryDataError(error);
        }
        
        
        const ctx = chartRef.getContext('2d');
        const labels = Object.keys(countryData);
        const datas = Object.values(countryData);
        const count = labels.length;

        const backgroundColor = Array.from({length:count}, () => getRandomHexColor());
        const borderColor = Array.from({length:count}, ()=> getRandomHexColor());
        if (chartInstanceRef.current) {
            chartInstanceRef.current.destroy();
        }
        
        alert(JSON.stringify(labels));
        chartInstanceRef.current = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: labels,
                datasets: [{
                    label: '# of Garment',
                    data: datas,
                    backgroundColor: backgroundColor,
                    borderColor: borderColor,
                    borderWidth: 1,
                }],
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    title: {
                        display: true,
                        text: 'Country Data Chart',
                    },
                },
            },
        });
    }
    
    async function brandChart(chartRef) {
        let brandURL = ApiConstant.GarmentByBrand;
        try{
            let response = await fetch(brandURL, header);
            if (response.status == 200){
                let r = await response.json();
                console.log(r.result);
                if (r.result !== undefined) {
                    setBrandData(r.result);
                } else {
                    setBrandDataError("Unexpected response format");
                }
            } else {
                setBrandDataError("Error in getting total user count");
                setBrandData(undefined);
            }
        } catch (error){
            setBrandDataError(error);
        }
        const ctx = chartRef.getContext('2d');
        const labels = Object.keys(brandData);
        const datas = Object.values(brandData);
        const count = labels.length;

        const backgroundColor = Array.from({length:count}, () => getRandomHexColor());
        const borderColor = Array.from({length:count}, ()=> getRandomHexColor());
        if (chartInstanceRef1.current) {
            chartInstanceRef1.current.destroy();
        }
    
        chartInstanceRef1.current = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: labels,
                datasets: [{
                    label: '# of Garment',
                    data: datas,
                    backgroundColor: backgroundColor,
                    borderColor: borderColor,
                    borderWidth: 1,
                }],
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    title: {
                        display: true,
                        text: 'Brand Data Chart',
                    },
                },
            },
        });
    }

    async function colourChart(chartRef) {
        let colourURL = ApiConstant.GarmentByColour;
        try{
            let response = await fetch(colourURL, header);
            if (response.status == 200){
                let r = await response.json();
                console.log(r.result);
                if (r.result !== undefined) {
                    setColourData(r.result);
                } else {
                    setColourDataError("Unexpected response format");
                }
            } else {
                setColourDataError("Error in getting total user count");
                setColourData(undefined);
            }
        } catch (error){
            setColourDataError(error);
        }
        const ctx = chartRef.getContext('2d');
        const labels = Object.keys(colourData);
        const datas = Object.values(colourData);
        const count = labels.length;

        const backgroundColor = Array.from({length:count}, () => getRandomHexColor());
        const borderColor = Array.from({length:count}, ()=> getRandomHexColor());
        if (chartInstanceRef2.current) {
            chartInstanceRef2.current.destroy();
        }
    
        chartInstanceRef2.current = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: labels,
                datasets: [{
                    label: '# of Garment',
                    data: datas,
                    backgroundColor: backgroundColor,
                    borderColor: borderColor,
                    borderWidth: 1,
                }],
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    title: {
                        display: true,
                        text: 'Garment Colour Data Chart',
                    },
                },
            },
        });
    }

    async function sizeChart(chartRef) {
        let sizeURL = ApiConstant.GarmentBySize;
        try{
            let response = await fetch(sizeURL, header);
            if (response.status == 200){
                let r = await response.json();
                console.log(r.result);
                if (r.result !== undefined) {
                    setSizeData(r.result);
                } else {
                    setSizeDataError("Unexpected response format");
                }
            } else {
                setSizeDataError("Error in getting total user count");
                setSizeData(undefined);
            }
        } catch (error){
            setSizeDataError(error);
        }

        const ctx = chartRef.getContext('2d');
        const labels = Object.keys(sizeData);
        const datas = Object.values(sizeData);
        const count = labels.length;

        const backgroundColor = Array.from({length:count}, () => getRandomHexColor());
        const borderColor = Array.from({length:count}, ()=> getRandomHexColor());
        if (chartInstanceRef3.current) {
            chartInstanceRef3.current.destroy();
        }
    
        chartInstanceRef3.current = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: labels,
                datasets: [{
                    label: '# of Garment',
                    data: datas,
                    backgroundColor: backgroundColor,
                    borderColor: borderColor,
                    borderWidth: 1,
                }],
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    title: {
                        display: true,
                        text: 'Garment Size Data Chart',
                    },
                },
            },
        });
    }

    //  [] to show only run once
    useEffect(() => {
        getTotalUserNumber();
        if (chartRef.current){
            countryChart(chartRef.current);
        }
        if (chartRef1.current){
            brandChart(chartRef1.current);
        }
        if (chartRef2.current){
            colourChart(chartRef2.current);
        }
        if(chartRef3.current){
            sizeChart(chartRef3.current);
        }

        return () => {
            if (chartInstanceRef.current) {
                chartInstanceRef.current.destroy();
            }
            if (chartInstanceRef1.current) {
                chartInstanceRef1.current.destroy();
            }
            if (chartInstanceRef2.current) {
                chartInstanceRef2.current.destroy();
            }
            if (chartInstanceRef3.current) {
                chartInstanceRef3.current.destroy();
            }
        };
    }, []); // Run this effect when countryData changes
    

    return (
        <>
        <div className="">

            {/* display the number */}
            <div className="card m-3 shadow">
                <div className="card-body">
                    <div className="row g-4 mb-4">
                        <div className="col-md-6">
                            {totalUser ? (
                                <div className="p-4 bg-info text-white shadow-sm rounded d-flex justify-content-between align-items-center">
                                    <div>
                                        <span className="fs-4">Total Users</span><br />
                                        <span className="fs-2">{totalUser}</span>
                                    </div>
                                    <FaUsers className="fs-2"/>
                                </div>
                            ) : (
                                totalUserError && (
                                    <div className="p-4 bg-danger text-white shadow-sm rounded d-flex justify-content-between align-items-center">
                                        <span className="fs-4">Error: {totalUserError}</span>
                                    </div>
                                )
                            )}
                        </div>
                        <div className="col-md-6">
                            {totalGarment ? (
                                <div className="p-4 bg-success text-white shadow-sm rounded d-flex justify-content-between align-items-center">
                                    <div>
                                        <span className="fs-4">Total Garments</span><br />
                                        <span className="fs-2">{totalGarment}</span>
                                    </div>
                                    <FaTshirt className="fs-2"/>
                                </div>
                            ) : (
                                totalGarmentError && (
                                    <div className="p-4 bg-danger text-white shadow-sm rounded d-flex justify-content-between align-items-center">
                                        <span className="fs-4">Error: {totalGarmentError}</span>
                                    </div>
                                )
                            )}
                        </div>
                    </div>

                    <div className="row g-4 justify-content-between">
                        <div className="col-md-3">
                            {varianceCount["total_colors"] ? (
                                <div className="p-4 bg-primary text-white shadow-sm rounded d-flex justify-content-between align-items-center">
                                    <div>
                                        <span className="fs-5">Total Colours</span><br />
                                        <span className="fs-3">{varianceCount["total_colors"]}</span>
                                    </div>
                                    <FaPalette className="fs-2"/>
                                </div>
                            ) : (
                                varianceCountError && (
                                    <div className="p-4 bg-danger text-white shadow-sm rounded  align-items-center">
                                        <span className="fs-4">Error: {varianceCountError}</span>
                                    </div>
                                )
                            )}
                        </div>
                        <div className="col-md-3">
                            {varianceCount["total_brands"] ? (
                                <div className="p-4 bg-dark text-white shadow-sm rounded d-flex justify-content-between align-items-center">
                                    <div>
                                        <span className="fs-5">Total Brands</span><br />
                                        <span className="fs-3">{varianceCount["total_brands"]}</span>
                                    </div>
                                    <FaTags className="fs-2"/>
                                </div>
                            ) : (
                                varianceCountError && (
                                    <div className="p-4 bg-danger text-white shadow-sm rounded  align-items-center">
                                        <span className="fs-4">Error: {varianceCountError}</span>
                                    </div>
                                )
                            )}
                        </div>
                        <div className="col-md-3">
                            {varianceCount["total_countries"] ? (
                                <div className="p-4 bg-primary text-white shadow-sm rounded d-flex justify-content-between align-items-center">
                                    <div>
                                        <span className="fs-5">Total Countries</span><br />
                                        <span className="fs-3">{varianceCount["total_countries"]}</span>
                                    </div>
                                    <FaGlobe className="fs-2"/>
                                </div>
                            ) : (
                                varianceCountError && (
                                    <div className="p-4 bg-danger text-white shadow-sm rounded  align-items-center">
                                        <span className="fs-4">Error: {varianceCountError}</span>
                                    </div>
                                )
                            )}
                        </div>
                        <div className="col-md-3">
                            {varianceCount["total_sizes"] ? (
                                <div className="p-4 bg-dark text-white shadow-sm rounded d-flex justify-content-between align-items-center">
                                    <div>
                                        <span className="fs-5">Total Sizes</span><br />
                                        <span className="fs-3">{varianceCount["total_sizes"]}</span>
                                    </div>
                                    <FaRulerCombined className="fs-2"/>
                                </div>
                            ) : (
                                varianceCountError && (
                                    <div className="p-4 bg-danger text-white shadow-sm rounded  align-items-center">
                                        <span className="fs-4">Error: {varianceCountError}</span>
                                    </div>
                                )
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* display the piechart */}
            <div className="card mt-2">
                <div style={{ width: '400px', height: '400px' }}>
                    <canvas ref={chartRef} width={500} height={500}/>
                </div>                
            </div>

            {/* <div className="card mt-2">
                <div style={{ width: '400px', height: '400px' }}>
                    <canvas ref={chartRef1} width={500} height={500}/>
                </div>                
            </div> */}

            {/* <div className="card mt-2">
                <div style={{ width: '400px', height: '400px' }}>
                    <canvas ref={chartRef2} width={500} height={500}/>
                </div>                
            </div> */}

            {/* <div className="card mt-2">
                <div style={{ width: '400px', height: '400px' }}>
                    <canvas ref={chartRef3} width={500} height={500}/>
                </div>                
            </div> */}

            {durationData && (
                    <div>
                    <span>Duration data: { JSON.stringify(durationData) }</span><br/>
                    </div>
                )}

                {countryData && (
                    <div>
                    <span>Country data: { JSON.stringify(countryData) }</span><br/>
                    </div>
                )}

                {colourData && (
                    <div>
                    <span>Colour data: { JSON.stringify(colourData) }</span><br/>
                    </div>
                )}

                {brandData && (
                    <div>
                    <span>Brand data: { JSON.stringify(brandData) }</span><br/>
                    </div>
                )}

                {sizeData && (
                    <div>
                    <span>Size data: { JSON.stringify(sizeData) }</span><br/>
                    </div>
                )}
                
        </div>
          
        </>
    );
}

export default FigureData;