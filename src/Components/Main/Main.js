import React, {Component} from 'react';
import {Link, withRouter} from "react-router-dom";
import GeneralStore from '../../store/GeneralStore';
import * as ActionsGeneral from '../../store/ActionsGeneral';

import './Main.scss';

class Main extends Component {
	state = {
		searchString: '',
		results: [],
		error: '',
		showTopTen: false,
		topTen: {},
	}
	
	inputHandler = searchString => this.setState({searchString});
	
	showTopTenHandler = () => this.setState({showTopTen: !this.state.showTopTen});
	
	updateResults = () => {
		this.setState({results: GeneralStore.results});
	}
	
	componentDidMount() {
		this.setState({
			results: GeneralStore.results,
			topTen: GeneralStore.topTen,
			searchString: GeneralStore.searchString,
		});
		GeneralStore.on('change', this.updateResults);
	}
	
	componentWillUnmount() {
		GeneralStore.removeListener('change', this.updateResults);
	}
	
	render() {
		const topTen = Object.keys(this.state.topTen)
			.sort((a, b) => this.state.topTen[b] - this.state.topTen[a])
			.map((e, i) => {
				if (i < 10) {
					return <li key={e}>{e}</li>;
				}
			});
		return (
			<div className='main'>
				<h1>iTunes Search</h1>
				<button
					className="top-ten"
					onClick={() => this.showTopTenHandler()}
				>
					{this.state.showTopTen
						? 'Hide Top 10 Searches'
						: 'Show Top 10 Searches'
					}
				</button>
				{this.state.showTopTen
					? <ol className="top-ten-container">{topTen}</ol>
					: null
				}
				<form
					className="form"
					onSubmit={e => e.preventDefault()}
				>
					<input
						className="search-input"
						type="text"
						value={this.state.searchString}
						placeholder="Search the iTunes store"
						onChange={e => this.inputHandler(e.target.value)}
					/>
					<input type="submit" className="search-input-button" value="Search" onClick={e => ActionsGeneral.fetchResults(e, this.state.searchString, this.state.topTen)}/>
				</form>
				<div className="items-container">
					{this.state.results.map(e => {
						console.log(e);
						const betterPic = e.artworkUrl100.replace('100x100', '480x480');
						return (
							<div
								key={e.trackId}
								className="item"
								data={e}
								onClick={() => this.props.history.push(`/item/${e.trackId}`)}
							>
								<img src={betterPic} alt={e.collectionName}/>
								<div className="item-details">
									<div className="artist">{e.artistName}</div>
									<div className="name">{e.trackName}</div>
									<div className="collection">{e.collectionName}</div>
								</div>
								{e.trackName}
							</div>
						);
					})}
				</div>
			</div>
		);
	}
}

export default withRouter(Main);
