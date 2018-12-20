import dispatcher from './dispatcher';

export function setLocalStorage(results, searchString, topTen) {
	localStorage.results = JSON.stringify(results);
	localStorage.searchString = searchString;
	localStorage.topTen = JSON.stringify(topTen);
}

export function dispatchSpinner(bool) {
	dispatcher.dispatch({
		type: 'SPINNER',
		spinner: bool,
	});
}

export function dispatchError(errorMsg) {
	dispatcher.dispatch({
		type: 'ERROR',
		error: errorMsg,
	});
}

export function fetchResults(e, string, topTen) {
	e.preventDefault();
	dispatcher.dispatch({
		type: 'GET_SEARCH_RESULTS',
		results: [],
		searchString: string,
		topTen,
	});
	if (string) {
		dispatchError('');
		dispatchSpinner(true);
		if (topTen[string]) {
			topTen[string] += 1;
		} else {
			topTen[string] = 1;
		}
		setLocalStorage([], string, topTen);
		$.ajax({
			url: 'https://itunes.apple.com/search',
			crossDomain: true,
			dataType: 'jsonp',
			data: {
				term: string,
				limit: 25,
			}
		}).done(data => {
			const mappedData = data.results.map((e, i) => {
				e.id = i;
				return e;
			});
			dispatchSpinner(false);
			if (data.resultCount === 0) {
				dispatchError(`Sorry, no results found for ${string}.`);
				setLocalStorage([], '', topTen);
				return;
			}
			dispatcher.dispatch({
				type: 'GET_SEARCH_RESULTS',
				results: data.results,
				searchString: string,
				topTen,
			});
			setLocalStorage(data.results, string, topTen);
		}).fail(err => {
			dispatchError('There was a problem with the request please try again later.');
			dispatchSpinner(false);
		});
	} else {
		setLocalStorage([], string, topTen);
		dispatchError('');
		dispatchSpinner(false);
	}
}

export function getUsers() {
	$.ajax({
		url: 'http://localhost:3000/user/get/all',
		type: 'GET',
	}).done(data => {
		if (data.success) {
			dispatcher.dispatch({
				type: 'GET_USERS',
				users: data.users,
			});
		}
	}).fail(err => {
	
	});
}

export function deleteUser(userId) {
	$.ajax({
		url: `http://localhost:3000/user/delete/${userId}`,
		type: 'DELETE',
	}).done(data => {
		if (data.success) {
			dispatcher.dispatch({
				type: 'DELETE_USER',
				id: data.id,
			});
		}
	}).fail(err => {
	
	});
}

export function resetReuslts() {
	dispatcher.dispatch({
		type: 'RESET_RESULTS',
	});
}
