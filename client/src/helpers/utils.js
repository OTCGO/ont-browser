const balanceGtZero = function (arr) {
    // console.log('arr', arr)
    const result = []
    arr.forEach(element => {
        if (element.Balance > 0) {
            return result.push(element)
        }
    })

    return result

}
export default {
    balanceGtZero
}