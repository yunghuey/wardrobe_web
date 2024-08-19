const apiUrl = "http://10.131.76.245:8000";    
export const ApiConstant = {
    URL: apiUrl,
    LoginURL: `${apiUrl}/account/login/`,
    LogoutURL: `${apiUrl}/account/logout/`,
    TotalNumUserCount: `${apiUrl}/garment/getTotalNumberUserCount`,
    // TotalNumGarmentCount: `${apiUrl}/garment/getTotalNumberGarmentCount`,
    TotalVarianceCount: `${apiUrl}/garment/getTotalVarianceCountForGarment`,
    // -----------------------------------------------------------------------
    GarmentByDuration:`${apiUrl}/garment/getGarmentByDuration`,
    GarmentByCountry: `${apiUrl}/garment/getGarmentChartByCountry`,
    GarmentByColour: `${apiUrl}/garment/getGarmentChartByColour`,
    GarmentByBrand: `${apiUrl}/garment/getGarmentChartByBrand`,
    GarmentBySize: `${apiUrl}/garment/getGarmentChartBySize`
};