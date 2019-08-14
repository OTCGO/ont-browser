const formatNum = function (value) {
    if (value) {
        const arr = value.toString().split(".")
        if(arr.length === 1){
            return value.toString().replace(/(?=((?!\b)\d{3})+$)/g, ',')
        }
        if(arr.length === 2){
            return arr[0].toString().replace(/(?=((?!\b)\d{3})+$)/g, ',') +'.'+ arr[1]
        }
      // return value.toString().replace(/(?=((?!\b)\d{3})+$)/g, ',')
    }
};

export default formatNum;