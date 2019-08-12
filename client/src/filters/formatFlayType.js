import { confirmFlagType } from '@/confirmFlagType/index';

const formatFlayType = function (value) {
    if (value) {
        // return this.$t(confirmFlagType[value]);
        return confirmFlagType[value];
    }
}

export default formatFlayType