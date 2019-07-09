import axios from "axios";
const SUCCESS_CODE=0
function post(url = ``, data = {}, opts = {}) {
    const defaultOptions = {
        cache: "no-cache",
        headers: {
            "Content-Type": "application/json; charset=utf-8"
        },
        data: JSON.stringify(data)
    };
    const options = {
        ...defaultOptions,
        ...opts,
        ...{ method: "POST" }
    };
    return axios(url, options).then(response => {
        if (response.data.code === SUCCESS_CODE) return response.data.result;
    });
}

function get(url = ``, opts = {}) {
    const defaultOptions = {
        cache: "no-cache"
    };
    const options = {
        ...defaultOptions,
        ...opts,
        ...{ method: "GET" }
    };
    return axios(url, options).then(response => {
        if (response.data.code === SUCCESS_CODE) return response.data.result;
    });
}

export default { get, post };
