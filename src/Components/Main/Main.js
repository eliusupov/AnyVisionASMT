import React, { Component } from 'react';
import { Link, withRouter } from "react-router-dom";
import GeneralStore from '../../store/GeneralStore';
import * as ActionsGeneral from '../../store/ActionsGeneral';

import './Main.scss';

class Main extends Component {
	state = {
		searchString: GeneralStore.searchString,
		results: GeneralStore.results,
		error: GeneralStore.error,
		showTopTen: false,
		topTen: GeneralStore.topTen,
		spinner: GeneralStore.spinner,
	}
	
	inputHandler = searchString => this.setState({searchString});
	
	showTopTenHandler = () => {
		if (Object.keys(this.state.topTen).length > 0) {
			this.setState({showTopTen: !this.state.showTopTen})
		} else {
			this.setState({error: 'Please search first'});
		}
	};
	
	updateResults = () => {
		if (JSON.stringify(this.state.results) != JSON.stringify(GeneralStore.results)) {
			this.setState({
				results: GeneralStore.results,
				topTen: GeneralStore.topTen,
				searchString: GeneralStore.searchString,
				spinner: GeneralStore.spinner,
			});
		}
		if (JSON.stringify(this.state.error) != JSON.stringify(GeneralStore.error)) {
			this.setState({error: GeneralStore.error});
		}
		if (JSON.stringify(this.state.spinner) != JSON.stringify(GeneralStore.spinner)) {
			this.setState({spinner: GeneralStore.spinner});
		}
	}
	
	componentDidMount() {
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
					return <li key={e}>{e} - {this.state.topTen[e]}</li>;
				}
			});
		const results = this.state.results.map((e, i) => {
			const betterPic = e.artworkUrl100.replace('100x100', '480x480');
			return (
				<div
					key={i}
					className="item"
					data={e}
					onClick={() => this.props.history.push(`/item/${i}`)}
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
		});
		return (
			<div className='main'>
				<h1>iTunes Search</h1>
				<div className="top-ten-container">
					<button
						className="top-ten-btn"
						onClick={() => this.showTopTenHandler()}
					>
						{this.state.showTopTen
							? 'Hide Top 10 Searches'
							: 'Show Top 10 Searches'
						}
					</button>
					{this.state.showTopTen
						? <ul className="top-ten-list">
							{topTen}
						</ul>
						: null
					}
				</div>
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
					<input
						type="submit"
						className="search-input-button"
						value="Search"
						onClick={e => ActionsGeneral.fetchResults(e, this.state.searchString, this.state.topTen)}
					/>
				</form>
				{this.state.spinner
					? <i className="fas fa-spinner fa-spin fa-2x"></i>
					: <div className="items-container">
						{results}
					</div>
				}
				{this.state.error
					? <div>{this.state.error}</div>
					: null
				}
			</div>
		);
	}
}

export default withRouter(Main);
