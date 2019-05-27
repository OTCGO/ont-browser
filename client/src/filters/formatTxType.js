import {
    TxnType
} from '@/constants'

const formatTxType = function (value) {
    if (value) {
        return TxnType[value]
    }
}

export default formatTxType