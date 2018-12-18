import dispatcher from './dispatcher';

export function fetchResults(e, string, topTen) {
	e.preventDefault();
	if (string) {
		$.ajax({
			url: 'https://itunes.apple.com/search',
			crossDomain: true,
			dataType: 'jsonp',
			data: {
				term: string,
				limit: 25,
			}
		}).done(data => {
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
		}).fail(err => {
			// this.setState({error: 'There was a problem with your request please try again.'})
			// this.error = 'There was a problem with your request please try again.';
		});
	} else {
		this.setState({results: []})
	}
}
