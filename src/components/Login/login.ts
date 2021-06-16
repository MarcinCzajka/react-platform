import basePath from '../../api/basePath';
import { loginPath } from '../../apiConfig';

interface loginDataInterface {
    userId: string,
    userName: string,
    fullName: string,
    token: string
}

const login = (username?: string, password?: string) => {

    const loginData = username && password ? {
        username: username,
        password: password
    } : {};

    return new Promise((resolve, reject) => {


        //Spare server while testing
        /*resolve({
            fullName: "Anonymous user",
            loggedIn: true,
            token: "eyJhbGciOiJBMTI4S1ciLCJlbmMiOiJBMTI4Q0JDLUhTMjU2IiwidHlwIjoiSldUIn0.SI3_fvxJKzsbfcRKG1B-NAGH-sL_oYkXMLPPtDsIrKpOMjLc23osWg.isiy7H7zjXNAvaJd4hlqgA.N26njHD3t7Xof1MDFyE_3ZqbRZLWwbhsmdkjsMt1DCP1tZeD4yDC1ef67kVJHA-R47c6dzAmljFA-vYzI9AJFn8hUguLU2F4FnxoUEWM2ym9lV6H0qeikeSpEf5Ah3U8eUWv8wWNe8AO2uyyZAd84z9FaEKymUuPdPsZWAwFQuE4cTLDtcqr2BkDs56DdL17c5erWitlFoYt3w0wF2wefTCixUX5rzTZvCgaYhn9WPvyjeL38Jnup8Fy_rISAUzHvK2D3mpa2IVrlYgjnBt7EnX8tD6yyutU_vuS9vgy5rHPfzI5UHQ9BkjVy5UR_bbEcwU4wOUy03UMDglJWR7_nAc-daMXYQB7lsKmnz5nSoP0MNtGXcNKW6SGfwiNm2U6XQmVMh5KAR9ya7FciectGv5yeEyEpYQ9fryoxibsxNY1Jgr2Ab2rI7BkQEeXBDupe7FnIwRCMHzEM40ynrXx31cpPFmq_YSPmzhDVbq2aDkCb9OqpuVzVgCw-IFqj_s_25X3iyNeW9d9ryFeYmJEK64QzRPzy7dZt-GBrY2uK2CWa5QIWK8oNySC9O6VBTXnI0LvkfUhnqYQY0BYewOrpw.nqNVh8OEr-6heiZtfPkqnw",
            userId: -999,
            userName: "Anonymous"
        })*/

        basePath({
        method: 'post',
        url: loginPath,
        data: loginData,
        withCredentials: true
        }).then(res => {
            if (res.status === 200) {
                const user = res.data.User;
                const data: loginDataInterface = {
                    userId: user.Id,
                    userName: user.UserName,
                    fullName: user.FullName,
                    token: 'Bearer ' + res.data.AuthorizationToken.Token
                };

                resolve(data)
            }
        }).catch(error => {
            reject(error.response.data);
        });
    })
}

export default login;