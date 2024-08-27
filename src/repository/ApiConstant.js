// const apiUrl = "http://10.131.76.245:8000";    
const apiUrl = "http://192.168.0.6:8000";    
export const ApiConstant = {
    URL: apiUrl,
    LoginURL: `${apiUrl}/account/login/`,
    LogoutURL: `${apiUrl}/account/logout/`,
    TotalNumUserCount: `${apiUrl}/garment/getTotalNumberUserCount`,
    TotalVarianceCount: `${apiUrl}/garment/getTotalVarianceCountForGarment`,
    // -----------------------------------------------------------------------
    GarmentByDuration:`${apiUrl}/garment/getGarmentByDuration`,
    GarmentByCategory: `${apiUrl}/garment/getGarmentCategoriesChart`
};