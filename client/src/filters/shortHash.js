
const shortHash = function (value) {
    if (value) {
        return value.substr(0,8)+'...'+value.substr(-8)
    }
}

export default shortHash