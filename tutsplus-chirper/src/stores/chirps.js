import constants from '../constants';
import createStore from './store';

const ChirpStore = createStore({
    // custom methods
    init () {
        // set chirps from server
        this.bind(constants.GOT_CHIRPS, this.set);
        this.bind(constants.CHIRPED, this.add);
    }
});

export default ChirpStore;
