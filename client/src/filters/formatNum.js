const formatNum = function (value,num) {
    if (value) {
        if(num==='ong'){
            return parseFloat(value)
        }
        return Number(value).toFixed(num)
    }
};

export default formatNum;