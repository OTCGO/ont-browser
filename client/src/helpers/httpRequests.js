import axios from "axios";

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
        if (response.data.Error === 0) return response.data.Result;
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
        if (response.data.Error === 0) return response.data.Result;
    });
}

export default { get, post };
