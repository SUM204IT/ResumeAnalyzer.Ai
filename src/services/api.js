const BASE_URL = process.env.REACT_APP_BASE_URL

export const apiurl = {
    SIGNUPAPI_URL: BASE_URL + "/auth/signup",
    LOGINAPI_URL:BASE_URL + "/auth/login",
    SENDOTPAPI_URL:BASE_URL + "/auth/sendotp",
    RESUMEANALYZER_API:BASE_URL + "/resume-analyzer"
}