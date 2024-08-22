import { ApiConstant } from "../repository/ApiConstant.js";
import React , { useEffect, useState, useRef  } from 'react';
import { useHistory  } from "react-router-dom";
import { FaUsers, FaTshirt, FaPalette, FaTags, FaGlobe, FaRulerCombined,FaChevronUp,FaChevronDown   } from 'react-icons/fa';
import Chart from "chart.js/auto";

function FigureData(){
    const colour_name = ['RED', 'PURPLE', 'PINK', 'BLUE', 'BLUE GREEN', 'GREEN', 'YELLOW', 'ORANGE','WHITE','BLACK', 'GREY', 'BROWN', 'BEIGE', 'MULTI COLOUR'];
    const colour_code = ['#ff0000', '#800080', '#ffc0cb', '#0000ff', '#0d98ba', '#008000', '#ffff00', '#ffa500','#ffffff','#000000', '#808080', '#8b4513', '#f5f5dc', '#ffffff'];

    const [totalUser, setTotalUser] = useState([]);
    const [totalUserError, setTotalUserError] = useState("");
    const [totalGarmentError, setTotalGarmentError] = useState("");
    const [varianceCount, setVarianceCount] = useState([]);
    const [varianceCountError, setVarianceCountError] = useState("");
    const [durationString, setDurationString] = useState(1);
    
    const [topColour, setTopColour] = useState([]);
    const [topBrand, setTopBrand] = useState([]);
    const [topCountry, setTopCountry] = useState([]);
    const [topSize, setTopSize] = useState([]);

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

    const [isCollapsedGarment, setIsCollapsedGarment] = useState(false);
    const handleGarmentToggle = () => {
        setIsCollapsedGarment(!isCollapsedGarment);
    }

    const [isCollapsedUser, setIsCollapsedUser] = useState(false);
    const handleUserToggle = () => {
        setIsCollapsedUser(!isCollapsedUser);
    }

    const [isCollapsedCountry, setIsCollapsedCountry] = useState(false);
    const handleCountryToggle = () => {
        setIsCollapsedCountry(!isCollapsedCountry);
    }

    const [isCollapsedColour, setIsCollapsedColour] = useState(false);
    const handleColourToggle = () => {
        setIsCollapsedColour(!isCollapsedColour);
    }

    const [isCollapsedSize, setIsCollapsedSize] = useState(false);
    const handleSizeToggle = () => {
        setIsCollapsedSize(!isCollapsedSize);
    }

    const [isCollapsedBrand, setIsCollapsedBrand] = useState(false);
    const handleBrandToggle = () => {
        setIsCollapsedBrand(!isCollapsedBrand);
    }


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
                        setTotalUser(r);

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


            let varianceURL = ApiConstant.TotalVarianceCount;
            try{
                let response = await fetch(varianceURL, header);
                if (response.status == 200){
                    let r = await response.json();
                    console.log(r.result);
                    if (r.result !== undefined) {
                        setVarianceCount(r.result);
                        console.log(r.result);
                    } else {
                        setTotalGarmentError("Unexpected response format");
                    }
                } else {
                    setTotalGarmentError("Error in getting total variance count");
                    setVarianceCount(undefined);
                }
            } catch (error){
                setVarianceCountError(error);
            }
            
            let categoryURL = ApiConstant.GarmentByCategory;
            try{
                let response = await fetch(categoryURL, header);
                if (response.status == 200){
                    let r = await response.json();
                    console.log(r.result);
                    if (r.result !== undefined) {
                        countryChart(r.result['country']);
                        brandChart(r.result['brand']);
                        colourChart(r.result['colour']);
                        sizeChart(r.result['size']);
                        setTopColour(r.result['top_colour']);
                        setTopSize(r.result['top_size']);
                        setTopCountry(r.result['top_country']);
                        setTopBrand(r.result['top_brand']);
                    }
                } else {
                }
            } catch (error){
                alert('error')
            }
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
            type: 'bar',
                data: {
                    labels: labels,
                    datasets: [{
                        label: "# of Garment",
                        data: datas,
                        backgroundColor: backgroundColor,
                        borderColor: '#FDDFFF',
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
                            ticks: {
                                stepSize: 1
                            },
                            beginAtZero: true
                        }
                    }
                }
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
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: "# of Garment",
                    data: datas,
                    backgroundColor: backgroundColor,
                    borderColor: '#FDDFFF',
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
                        ticks: {
                            stepSize: 1
                        },
                        beginAtZero: true
                    }
                }
            }
        });
    }
 
    function colourChart(data) {
        
        const ctx = chartRef2.current.getContext('2d');
        const labels = Object.keys(data);
        const datas = Object.values(data);

        const colourMapping = labels.map(label => {
            const index = colour_name.indexOf(label.toUpperCase());
            return index !== -1 ?colour_code[index] : '#000000';
        });

        if (chartInstanceRef2.current) {
            chartInstanceRef2.current.destroy();
        }

        chartInstanceRef2.current = new Chart(ctx, {
            type: 'bar',
                data: {
                    labels: labels,
                    datasets: [{
                        label: "# of Garment",
                        data: datas,
                        backgroundColor: colourMapping,
                        borderColor: '#FDDFFF',
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
                            ticks: {
                                stepSize: 1
                            },
                            beginAtZero: true
                        }
                    }
                }
        });
    }

    function sizeChart(data) {
        const ctx = chartRef3.current.getContext('2d');
        const labels = Object.keys(data);
        const datas = Object.values(data);
        const count = labels.length;

        const backgroundColor = Array.from({ length: count }, () =>getRandomHexColor());
        // const borderColor = Array.from({ length: count }, () =>getRandomHexColor());

        if (chartInstanceRef3.current) {
            chartInstanceRef3.current.destroy();
        }

        chartInstanceRef3.current = new Chart(ctx, {
            type: 'bar',
                data: {
                    labels: labels,
                    datasets: [{
                        label: "# of Garment",
                        data: datas,
                        backgroundColor: backgroundColor,
                        borderColor: '#FDDFFF',
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
                            ticks: {
                                stepSize: 1
                            },
                            beginAtZero: true
                        }
                    }
                }
        });
    }

    async function durationChart(query) {
        setDurationString(query)
        const token = localStorage.getItem("token");
        let header = {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            },
        };
    
        // Include the duration as a query parameter in the URL
        let durationURL = `${ApiConstant.GarmentByDuration}/${query}`;
        try {
            let response = await fetch(durationURL, header);
            if (response.status === 200) {
                let r = await response.json();
                console.log(JSON.stringify(r.result));
                durationBarChart(r.result);
            } 
        } catch (error) {
        }
    }

    function durationBarChart(data){
        try{    
            const ctx = lineChartRef4.current.getContext('2d');
            const labels = data.map(item => item.date);
            const numbers = data.map(item => item.count);
            const count = labels.length
            const backgroundColor = Array.from({ length: count }, () =>getRandomHexColor());

            if (lineChartInstanceRef4.current) {
                lineChartInstanceRef4.current.destroy();
            }
            
            lineChartInstanceRef4.current = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [{
                        label: "# of Garment",
                        data: numbers,
                        backgroundColor: backgroundColor,
                        borderColor: '#FDDFFF',
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
                            ticks: {
                                stepSize: 1
                            },
                            beginAtZero: true
                        }
                    }
                }
            });
        }catch (error){
            alert(error);
        }
        
    }
    
    //  [] to show only run once
    useEffect(() => {
        getTotalUserNumber();
        durationChart(1);

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
            if(lineChartInstanceRef4.current){
                lineChartInstanceRef4.current.destroy();
            }
        };
    }, []);// Run this effect when countryData changes
    
    return (
        <>
        <div className="">

            {/* display the number */}
            <div className="card m-3 shadow">
                <div className="card-body">
                    <div className="row g-4 mb-4">
                        {/* user detail */}
                        <div className="col-md-6"
                        data-bs-toggle="collapse" data-bs-target="#userDetails" aria-expanded="false" aria-controls="userDetails" onClick={handleUserToggle}>
                            {totalUser ? (
                                <div className="p-3 text-white shadow-sm rounded d-flex justify-content-between align-items-center" 
                                style={{ backgroundColor: 'rgba(131, 32, 201, 0.72)' }}>
                                    <FaUsers className="fs-2"/>
                                    <div>
                                        <span className="fs-5">Total Users</span><br />
                                        <span className="fs-2">{totalUser['total_user']}</span>
                                    </div>
                                    <span className="fs-3">{totalUser['growth_rate']} %</span>
                                </div>
                            ) : (
                                totalUserError && (
                                    <div className="p-4 bg-danger text-white shadow-sm rounded d-flex justify-content-between align-items-center">
                                        <span className="fs-4">Error: {totalUserError}</span>
                                    </div>
                                )
                            )}
                            <div className="collapse mt-2" id="userDetails">
                                <div className="card card-body">
                                    {
                                        totalUser['growth_rate'] === 0 ? (
                                            <span>There is no increase or decrease of user in this month</span>
                                        ) : totalUser['growth_rate'] > 0 ? (
                                            <span>There is total increase of {totalUser['growth_rate']}%</span>
                                        ) : (
                                            <span>There is drop of {totalUser['growth_rate']}% for our new user</span>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                        {/* garment detail */}
                        <div className="col-md-6" 
                        data-bs-toggle="collapse" data-bs-target="#garmentDetails" aria-expanded="false" aria-controls="garmentDetails" onClick={handleGarmentToggle}>
                            {varianceCount["total_garments"] ? (
                                <div className="p-3 text-dark shadow-sm rounded d-flex justify-content-between align-items-center"
                                style={{backgroundColor:'#E6C53F'}}>
                                    <FaTshirt className="fs-2"/>
                                    <div>
                                        <span className="fs-5">Total Garments</span><br />
                                        <span className="fs-2">{varianceCount['total_garments']}</span>
                                    </div>
                                    {isCollapsedGarment ? <FaChevronUp className="fs-4"/>: <FaChevronDown className="fs-4"/>}
                                </div>
                            ) : (
                                totalGarmentError && (
                                    <div className="p-4 bg-danger text-white shadow-sm rounded d-flex justify-content-between align-items-center">
                                        <span className="fs-4">Error: {totalGarmentError}</span>
                                    </div>
                                )
                            )}
                            <div className="collapse mt-2" id="garmentDetails">
                                <div className="card card-body">
                                    Total number of new garment in this month: {varianceCount['new_garment_month']}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row g-4 justify-content-between">
                        {/* colour details */}
                        <div className="col-md-3"
                        data-bs-toggle="collapse" data-bs-target="#colourDetails" aria-expanded="false" aria-controls="colourDetails" onClick={handleColourToggle}>

                            {varianceCount["total_colors"] ? (
                                <div className="p-3 text-dark shadow-sm rounded d-flex justify-content-between align-items-center"
                                style={{backgroundColor: '#E7DDFF'}}>
                                    <FaPalette className="fs-2"/>
                                    <div>
                                        <span className="fs-5">Total Colours</span><br />
                                        <span className="fs-3">{varianceCount["total_colors"]}</span>
                                    </div>
                                    {isCollapsedColour? <FaChevronUp className="fs-4"/>: <FaChevronDown className="fs-4"/>}

                                </div>
                            ) : (
                                varianceCountError && (
                                    <div className="p-3 bg-danger text-white shadow-sm rounded  align-items-center">
                                        <span className="fs-4">Error: {varianceCountError}</span>
                                    </div>
                                )
                            )}
                        <div className="collapse mt-2" id="colourDetails">
                            <div className="card card-body">
                                Three highest colour
                                <ol>
                                    {Object.entries(topColour).map(([color, count], index) => (
                                        <li key={index}>
                                            {color} : {count}
                                        </li>
                                    ))}
                                </ol>
                            </div>
                        </div>
                        </div>
                        <div className="col-md-3"
                        data-bs-toggle="collapse" data-bs-target="#brandDetails" aria-expanded="false" aria-controls="brandDetails" onClick={handleBrandToggle}>
                            {varianceCount["total_brands"] ? (
                                <div className="p-3 text-dark shadow-sm rounded d-flex justify-content-between align-items-center"
                                style={{backgroundColor: '#FFECA1'}}>
                                    <FaTags className="fs-2"/>
                                    <div>
                                        <span className="fs-5">Total Brands</span><br />
                                        <span className="fs-3">{varianceCount["total_brands"]}</span>
                                    </div>
                                    {isCollapsedBrand? <FaChevronUp className="fs-4"/>: <FaChevronDown className="fs-4"/>}

                                </div>
                            ) : (
                                varianceCountError && (
                                    <div className="p-3 bg-danger text-white shadow-sm rounded  align-items-center">
                                        <span className="fs-4">Error: {varianceCountError}</span>
                                    </div>
                                )
                            )}
                        <div className="collapse mt-2" id="brandDetails">
                            <div className="card card-body">
                                Three highest brand
                                <ol>
                                    {Object.entries(topBrand).map(([brand, count], index) => (
                                        <li key={index}>
                                            {brand} : {count}
                                        </li>
                                    ))}
                                </ol>
                            </div>
                        </div>
                        </div>
                        <div className="col-md-3"
                        data-bs-toggle="collapse" data-bs-target="#countryDetails" aria-expanded="false" aria-controls="countryDetails" onClick={handleCountryToggle}>
                            {varianceCount["total_countries"] ? (
                                <div className="p-3 text-dark shadow-sm rounded d-flex justify-content-between align-items-center"
                                style={{backgroundColor: '#EFC3CA'}}>
                                    <FaGlobe className="fs-2"/>
                                    <div>
                                        <span className="fs-5">Total Countries</span><br />
                                        <span className="fs-3">{varianceCount["total_countries"]}</span>
                                    </div>
                                    {isCollapsedCountry? <FaChevronUp className="fs-4"/>: <FaChevronDown className="fs-4"/>}
                                </div>
                            ) : (
                                varianceCountError && (
                                    <div className="p-3 bg-danger text-white shadow-sm rounded  align-items-center">
                                        <span className="fs-4">Error: {varianceCountError}</span>
                                    </div>
                                )
                            )}
                        <div className="collapse mt-2" id="countryDetails">
                            <div className="card card-body">
                                Three highest country
                                <ol>
                                    {Object.entries(topCountry).map(([brand, count], index) => (
                                        <li key={index}>
                                            {brand} : {count}
                                        </li>
                                    ))}
                                </ol>
                                
                            </div>
                        </div>
                        </div>
                        <div className="col-md-3"
                        data-bs-toggle="collapse" data-bs-target="#sizeDetails" aria-expanded="false" aria-controls="sizeDetails" onClick={handleSizeToggle}>
                            {varianceCount["total_sizes"] ? (
                                <div className="p-3 text-dark shadow-sm rounded d-flex justify-content-between align-items-center"
                                style={{backgroundColor: '#98F5F9'}}>
                                    <FaRulerCombined className="fs-2"/>
                                    <div>
                                        <span className="fs-5">Total Sizes</span><br />
                                        <span className="fs-3">{varianceCount["total_sizes"]}</span>
                                    </div>
                                    {isCollapsedSize? <FaChevronUp className="fs-4"/>: <FaChevronDown className="fs-4"/>}
                                </div>
                            ) : (
                                varianceCountError && (
                                    <div className="p-3 bg-danger text-white shadow-sm rounded  align-items-center">
                                        <span className="fs-4">Error: {varianceCountError}</span>
                                    </div>
                                )
                            )}
                        <div className="collapse mt-2" id="sizeDetails">
                            <div className="card card-body">
                                Top three size
                                <ol>
                                    {Object.entries(topSize).map(([size, count], index) => (
                                        <li key={index}>
                                            {size} : {count}
                                        </li>
                                    ))}
                                </ol>
                            </div>
                        </div>
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
                    <div className="row justify-content-center mt-3">
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
                    <div className="d-flex justify-content-center">
                        <div className="btn-group border" role="group" aria-label="Basic example">
                            <button type="button" className="btn" style={{backgroundColor: '#F0DEFE',border: '2px solid #872FD4'}} onClick={() => durationChart(1)}>One week</button>
                            <button type="button" className="btn" style={{backgroundColor: '#F0DEFE',border: '2px solid #872FD4'}} onClick={() => durationChart(2)}>Two weeks</button>
                            <button type="button" className="btn" style={{backgroundColor: '#F0DEFE',border: '2px solid #872FD4'}} onClick={() => durationChart(3)}>One month</button>
                        </div>
                        
                    </div>
                    <div>
                    <div className="d-flex justify-content-center mt-3">
                        {durationString && (
                            <span>
                                {durationString === 1 ? "Number of garment in one week" :
                                durationString === 2 ? "Number of garment in two weeks" :
                                durationString === 3 ? "Number of garment in one month" : ""}
                            </span>
                        )}
                    </div>
                    </div>
                    <div className="row justify-content-center">
                        <div className="d-flex justify-content-center align-items-center" style={{ height: '400px' }}>
                            <canvas ref={lineChartRef4} style={{ maxWidth: '100%', maxHeight: '100%' }}/>
                        </div>    
                    </div>
                </div>
            </div>  
        </div>
          
        </>
    );
}

export default FigureData;
