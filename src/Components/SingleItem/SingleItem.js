import React from 'react';
import { Link } from "react-router-dom";
import moment from 'moment';
import GeneralStore from '../../store/GeneralStore';

import './SingleItem.scss';

const singleItem = (props) => {
	const data = GeneralStore.results.find(e => e.id == props.match.params.id) || {};
	const betterPic = data.artworkUrl100 ? data.artworkUrl100.replace('100x100', '480x480') : data.artworkUrl100;
	const kind = data.previewUrl ? data.previewUrl.substr(data.previewUrl.length -3) : '';
	console.log(data);
	if (!data) {
		props.history.push('/404');
		return null;
	}
	return (
		<div className="single-item">
			<img src={betterPic} alt={data.trackName}/>
			{data.artistName
				? <div>
					Artist Name :
					{data.artistViewUrl
						? <a href={data.artistViewUrl}>{data.artistName}</a>
						: data.artistName
					}
					</div>
				: null
			}
			{data.trackName
				? <div>
					Track Name :
					{data.trackViewUrl
						? <div>
							<a href={data.trackViewUrl} target={'_blank'}>{data.trackName}</a>
						</div>
						: data.trackName
					}
					</div>
				: null
			}
			{data.collectionName
				? <div>
					Collection Name :
					{data.collectionViewUrl
						? <div>
							<a href={data.collectionViewUrl} target={'_blank'}>{data.collectionName}</a>
						</div>
						: data.collectionName
					}
					</div>
				: null
			}
			{data.releaseDate
				? <div>
					Release Date : {moment(data.releaseDate).format('DD/MM/YYYY')}
				</div>
				: null
			}
			{kind === 'm4a'
				? <audio controls src={data.previewUrl}></audio>
				: null
			}
			{kind === 'm4v'
				? <video controls src={data.previewUrl}></video>
				: null
			}
		</div>
	);
};

export default singleItem;
