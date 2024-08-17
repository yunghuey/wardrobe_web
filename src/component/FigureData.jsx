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
    const [countryData, setcountryData] = useState([]);
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
    const lineChartRef4 = useRef(null);

    const chartInstanceRef = useRef(null); 
    const chartInstanceRef1 = useRef(null); 
    const chartInstanceRef2 = useRef(null); 
    const chartInstanceRef3 = useRef(null); 
    const lineChartInstanceRef4 = useRef(null);

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
            
            let countryURL = ApiConstant.GarmentByCountry;
            try{
                let response = await fetch(countryURL, header);
                if (response.status == 200){
                    let r = await response.json();
                    console.log(r.result);
                    if (r.result !== undefined) {
                        setcountryData(r.result);
                        console.log(JSON.stringify(r));
                        countryChart(r.result);
                    }
                    else {
                        console.log('empty country data at CountryChart');
                    }
                } else {
                    setCountryDataError("Error in country");
                    setcountryData(undefined);
                }
            } catch (error){
                setCountryDataError(error);
            }

            let brandURL = ApiConstant.GarmentByBrand;
            try{
                let response = await fetch(brandURL, header);
                if (response.status == 200){
                    let r = await response.json();
                    console.log(r.result);
                    if (r.result !== undefined) {
                        setBrandData(r.result);
                        brandChart(r.result);
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
            
            let colourURL = ApiConstant.GarmentByColour;
            try{
                let response = await fetch(colourURL, header);
                if (response.status == 200){
                    let r = await response.json();
                    console.log(r.result);
                    if (r.result !== undefined) {
                        setColourData(r.result);
                        colourChart(r.result);
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
            
            let sizeURL = ApiConstant.GarmentBySize;
            try{
                let response = await fetch(sizeURL, header);
                if (response.status == 200){
                    let r = await response.json();
                    console.log(r.result);
                    if (r.result !== undefined) {
                        setSizeData(r.result);
                        sizeChart(r.result);
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
            
            let durationURL = ApiConstant.GarmentByDuration;
            try{
                let response = await fetch(durationURL, header);
                if (response.status == 200){
                    let r = await response.json();
                    console.log(r.result);
                    if (r.result !== undefined) {
                        console.log(r.result);
                        setDurationData(r.result);
                        durationChart(r.result);
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

    function countryChart(data) {
        const ctx = chartRef.current.getContext('2d');
        const labels = Object.keys(data);
        const datas = Object.values(data);
        const count = labels.length;

        const backgroundColor = Array.from({ length: count }, () =>getRandomHexColor());
        const borderColor = Array.from({ length: count }, () =>getRandomHexColor());

        if (chartInstanceRef.current) {
            chartInstanceRef.current.destroy();
        }

        chartInstanceRef.current = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: labels,
                datasets: [{
                label: '# of Garments',
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

    function brandChart(data) {
        const ctx = chartRef1.current.getContext('2d');
        const labels = Object.keys(data);
        const datas = Object.values(data);
        const count = labels.length;

        const backgroundColor = Array.from({ length: count }, () =>getRandomHexColor());
        const borderColor = Array.from({ length: count }, () =>getRandomHexColor());

        if (chartInstanceRef1.current) {
            chartInstanceRef1.current.destroy();
        }

        chartInstanceRef1.current = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: labels,
                datasets: [{
                label: '# of Garments',
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
 
    function colourChart(data) {
        const ctx = chartRef2.current.getContext('2d');
        const labels = Object.keys(data);
        const datas = Object.values(data);
        const count = labels.length;

        const backgroundColor = Array.from({ length: count }, () =>getRandomHexColor());
        const borderColor = Array.from({ length: count }, () =>getRandomHexColor());

        if (chartInstanceRef2.current) {
            chartInstanceRef2.current.destroy();
        }

        chartInstanceRef2.current = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: labels,
                datasets: [{
                label: '# of Garments',
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
                    text: 'Colour Data Chart',
                },
                },
            },
        });
    }

    function sizeChart(data) {
        const ctx = chartRef3.current.getContext('2d');
        const labels = Object.keys(data);
        const datas = Object.values(data);
        const count = labels.length;

        const backgroundColor = Array.from({ length: count }, () =>getRandomHexColor());
        const borderColor = Array.from({ length: count }, () =>getRandomHexColor());

        if (chartInstanceRef3.current) {
            chartInstanceRef3.current.destroy();
        }

        chartInstanceRef3.current = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: labels,
                datasets: [{
                label: '# of Garments',
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
                    text: 'Size Data Chart',
                },
                },
            },
        });
    }

    function durationChart(data){
        const ctx = lineChartRef4.current.getContext('2d');
        const labels = data.map(item => item.date);
        const numbers = data.map(item => item.count);
        if (lineChartInstanceRef4.current){
            lineChartInstanceRef4.current.destroy();
        }
        lineChartInstanceRef4.current = new Chart(ctx, {
            type : 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: "# of Garment",
                    data: numbers,
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderWidth: 1,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                scales: {
                  x: {
                    title: {
                      display: true,
                      text: 'Date'
                    }
                  },
                  y: {
                    title: {
                      display: true,
                      text: 'Count'
                    },
                    beginAtZero: true
                  }
                }
              }
        });
    }

    //  [] to show only run once
    useEffect(() => {
        getTotalUserNumber();
        
        
        colourChart(chartRef2.current);
        // if (chartRef2.current){
        // }
        // if(chartRef3.current){
        //     sizeChart(chartRef3.current);
        // }

        return () => {
            if (chartInstanceRef.current) {
                chartInstanceRef.current.destroy();
            }
            if (chartInstanceRef1.current) {
                chartInstanceRef1.current.destroy();
            }
            // if (chartInstanceRef2.current) {
            //     chartInstanceRef2.current.destroy();
            // }
            // if (chartInstanceRef3.current) {
            //     chartInstanceRef3.current.destroy();
            // }
        };
    }, []);// Run this effect when countryData changes
    

    return (
        <>
        <div className="">

            {/* display the number */}
            <div className="card m-3 shadow">
                <div className="card-body">
                    <div className="row g-4 mb-4">
                        <div className="col-md-6">
                            {totalUser ? (
                                <div className="p-3 text-white shadow-sm rounded d-flex justify-content-between align-items-center" 
                                style={{ backgroundColor: 'rgba(131, 32, 201, 0.72)' }}>
                                    <div>
                                        <span className="fs-5">Total Users</span><br />
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
                                <div className="p-3 text-dark shadow-sm rounded d-flex justify-content-between align-items-center"
                                style={{backgroundColor:'#E6C53F'}}>
                                    <div>
                                        <span className="fs-5">Total Garments</span><br />
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
                                <div className="p-3 text-dark shadow-sm rounded d-flex justify-content-between align-items-center"
                                style={{backgroundColor: '#E7DDFF'}}>
                                    <div>
                                        <span className="fs-5">Total Colours</span><br />
                                        <span className="fs-3">{varianceCount["total_colors"]}</span>
                                    </div>
                                    <FaPalette className="fs-2"/>
                                </div>
                            ) : (
                                varianceCountError && (
                                    <div className="p-3 bg-danger text-white shadow-sm rounded  align-items-center">
                                        <span className="fs-4">Error: {varianceCountError}</span>
                                    </div>
                                )
                            )}
                        </div>
                        <div className="col-md-3">
                            {varianceCount["total_brands"] ? (
                                <div className="p-3 text-dark shadow-sm rounded d-flex justify-content-between align-items-center"
                                style={{backgroundColor: '#FFECA1'}}>
                                    <div>
                                        <span className="fs-5">Total Brands</span><br />
                                        <span className="fs-3">{varianceCount["total_brands"]}</span>
                                    </div>
                                    <FaTags className="fs-2"/>
                                </div>
                            ) : (
                                varianceCountError && (
                                    <div className="p-3 bg-danger text-white shadow-sm rounded  align-items-center">
                                        <span className="fs-4">Error: {varianceCountError}</span>
                                    </div>
                                )
                            )}
                        </div>
                        <div className="col-md-3">
                            {varianceCount["total_countries"] ? (
                                <div className="p-3 text-dark shadow-sm rounded d-flex justify-content-between align-items-center"
                                style={{backgroundColor: '#EFC3CA'}}>
                                    <div>
                                        <span className="fs-5">Total Countries</span><br />
                                        <span className="fs-3">{varianceCount["total_countries"]}</span>
                                    </div>
                                    <FaGlobe className="fs-2"/>
                                </div>
                            ) : (
                                varianceCountError && (
                                    <div className="p-3 bg-danger text-white shadow-sm rounded  align-items-center">
                                        <span className="fs-4">Error: {varianceCountError}</span>
                                    </div>
                                )
                            )}
                        </div>
                        <div className="col-md-3">
                            {varianceCount["total_sizes"] ? (
                                <div className="p-3 text-dark shadow-sm rounded d-flex justify-content-between align-items-center"
                                style={{backgroundColor: '#98F5F9'}}>
                                    <div>
                                        <span className="fs-5">Total Sizes</span><br />
                                        <span className="fs-3">{varianceCount["total_sizes"]}</span>
                                    </div>
                                    <FaRulerCombined className="fs-2"/>
                                </div>
                            ) : (
                                varianceCountError && (
                                    <div className="p-3 bg-danger text-white shadow-sm rounded  align-items-center">
                                        <span className="fs-4">Error: {varianceCountError}</span>
                                    </div>
                                )
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* display the piechart */}
            <div className="card m-3 shadow">
                <div className="card-body">
                    <div className="row justify-content-center">
                        <div style={{ width: '400px', height: '400px' }}>
                            <canvas ref={chartRef} width={500} height={500}/>
                        </div>                
                        <div style={{ width: '400px', height: '400px' }}>
                            <canvas ref={chartRef1} width={500} height={500}/>
                        </div>                
                    </div>
                    <div className="row justify-content-center">
                        <div style={{ width: '400px', height: '400px' }}>
                            <canvas ref={chartRef2} width={500} height={500}/>
                        </div> 
                        <div style={{ width: '400px', height: '400px' }}>
                            <canvas ref={chartRef3} width={500} height={500}/>
                        </div>    
                    </div>                
                </div>
            </div>

            {/* display line chart */}
            <div className="card m-3 shadow"> 
                <div className="card-body">
                    <div class="btn-group" role="group" aria-label="Basic example">
                        <button type="button" class="btn btn-primary">One week</button>
                        <button type="button" class="btn btn-primary">Two weeks</button>
                        <button type="button" class="btn btn-primary">One month</button>
                    </div>
                    <div className="row justify-content-center">
                        <div style={{ height: '400px' }}>
                            <canvas ref={lineChartRef4} width={500} height={500}/>
                        </div>    
                    </div>
                </div>
            </div>  
        </div>
          
        </>
    );
}

export default FigureData;