import { EventEmitter } from 'events';
import dispatcher from './dispatcher';

class GeneralStore extends EventEmitter {
	results = localStorage.results ? JSON.parse(localStorage.results) : [];
	searchString = localStorage.searchString ? localStorage.searchString : '';
	topTen = localStorage.topTen ? JSON.parse(localStorage.topTen) : {};
	spinner = false;
	error = '';
	
	handleActions(action) {
		switch (action.type) {
			case "GET_SEARCH_RESULTS": {
				this.results = action.results;
				this.searchString = action.searchString;
				this.topTen = action.topTen;
				this.emit('change');
				break;
			}
			case "SPINNER": {
				this.spinner = action.spinner;
				this.emit('change');
				break;
			}
			case "ERROR": {
				this.error = action.error;
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
