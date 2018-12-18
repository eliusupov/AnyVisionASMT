import dispatcher from './dispatcher';

export function fetchResults(e, string, topTen) {
	e.preventDefault();
	dispatcher.dispatch({
		type: 'GET_SEARCH_RESULTS',
		results: [],
		searchString: string,
		topTen,
	});
	if (string) {
		dispatcher.dispatch({
			type: 'ERROR',
			error: '',
		});
		dispatcher.dispatch({
			type: 'SPINNER',
			spinner: true,
		});
		localStorage.results = JSON.stringify([]);
		localStorage.searchString = string;
		localStorage.topTen = JSON.stringify(topTen);
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
				e.id = i
				return e;
			});
			dispatcher.dispatch({
				type: 'SPINNER',
				spinner: false,
			});
			if (data.resultCount === 0) {
				dispatcher.dispatch({
					type: 'ERROR',
					error: 'Sorry, no results found.',
				});
				return;
			}
			if (topTen[string]) {
				topTen[string] += 1;
			} else {
				topTen[string] = 1;
			}
			dispatcher.dispatch({
				type: 'GET_SEARCH_RESULTS',
				results: data.results,
				searchString: string,
				topTen,
			});
			localStorage.results = JSON.stringify(data.results);
			localStorage.searchString = string;
			localStorage.topTen = JSON.stringify(topTen);
		}).fail(err => {
			dispatcher.dispatch({
				type: 'ERROR',
				error: 'There was a problem with the request please try again later.',
			});
			dispatcher.dispatch({
				type: 'SPINNER',
				spinner: false,
			});
		});
	}
}
