import { EventEmitter } from 'events';
import dispatcher from './dispatcher';

class GeneralStore extends EventEmitter {
	results = [];
	searchString = '';
	topTen = {};
	
	handleActions(action) {
		switch (action.type) {
			case "GET_SEARCH_RESULTS": {
				this.results = action.results;
				this.searchString = action.searchString;
				this.topTen = action.topTen;
				this.emit('change');
				break;
			}
		}
	}
}

const generalStore = new GeneralStore;
generalStore.setMaxListeners(Infinity);

dispatcher.register(generalStore.handleActions.bind(generalStore));

export default generalStore;
