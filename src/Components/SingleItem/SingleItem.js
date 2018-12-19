import React from 'react';
import { Link } from "react-router-dom";
import moment from 'moment';
import GeneralStore from '../../store/GeneralStore';

import './SingleItem.scss';

const singleItem = (props) => {
	const data = GeneralStore.results.find(e => e.id == props.match.params.id) || {};
	const betterPic = data.artworkUrl100 ? data.artworkUrl100.replace('100x100', '480x480') : data.artworkUrl100;
	const kind = data.previewUrl ? data.previewUrl.substr(data.previewUrl.length -3) : '';
	if (!data || !data.id) {
		props.history.push('/404');
		return null;
	}
	return (
		<div className="single-item">
			<img src={betterPic} alt={data.trackName}/>
			{data.artistName
				? <div>
					Artist name -
					{data.artistViewUrl
						? <a href={data.artistViewUrl} target={'_blank'}>{data.artistName}</a>
						: data.artistName
					}
					</div>
				: null
			}
			{data.trackName
				? <div>
					Track name -
					{data.trackViewUrl
						? <a href={data.trackViewUrl} target={'_blank'}>{data.trackName}</a>
						: data.trackName
					}
					</div>
				: null
			}
			{data.collectionName
				? <div>
					Collection name -
					{data.collectionViewUrl
						? <a href={data.collectionViewUrl} target={'_blank'}>{data.collectionName}</a>
						: data.collectionName
					}
					</div>
				: null
			}
			{data.releaseDate
				? <div>
					Release date - {moment(data.releaseDate).format('DD/MM/YYYY')}
				</div>
				: null
			}
			{kind === 'm4a'
				? <div>
					<audio controls src={data.previewUrl}></audio>
				</div>
				: null
			}
			{kind === 'm4v'
				? <div>
					<video controls src={data.previewUrl}></video>
				</div>
				: null
			}
		</div>
	);
};

export default singleItem;
