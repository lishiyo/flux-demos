import constants from '../constants';
import extend from './store';

const ChirpStore = extend({
    init: function () {
        // set chirps from server
        this.bind(constants.GOT_CHIRPS, this.set);
        this.bind(constants.CHIRPED, this.add);
    }
});

export default ChirpStore;
