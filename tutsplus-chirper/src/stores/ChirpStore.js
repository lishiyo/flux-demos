import constants from '../constants';
import createStore from './Store';

let ChirpStore = createStore({
    // custom methods
    init () {
        console.log("ChirpStore init", this.set);
        // set chirps from server
        this.bindAction(constants.GOT_CHIRPS, this.set);
        this.bindAction(constants.CHIRPED, this.add);
    }
});

export default ChirpStore;
