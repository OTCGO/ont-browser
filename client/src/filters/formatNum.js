const formatNum = function (value,num) {
    if (value) {
        return Number(value).toFixed(num)
    }
};

export default formatNum;