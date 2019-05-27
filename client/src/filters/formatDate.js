import moment from 'moment'

const formatDate = function (value) {
    if (value) {
        return moment(value * 1000).format('YYYY-MM-DD | HH:mm:ss')
    }
}

export default formatDate