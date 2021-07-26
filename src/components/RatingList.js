import React from 'react';
import { cleanRatingsObject } from '../utils/imdb';

const RatingList = (props) => {
    const ratings = cleanRatingsObject(props.items);

    const getPortalName = (key) => {
        let name = null;
        switch (key.toLowerCase()) {
            case 'filmaffinity':
                name = 'Film Affinity';
                break;
            case 'metacritic':
                name = 'Metacritic';
                break;
            case 'imdb':
                name = 'IMDB';
                break;
            case 'themoviedb':
                name = 'The Movie DB';
                break;
            case 'rottentomatoes':
                name = 'Rotten Tomatoes';
                break;
            case 'tv_com':
                name = 'TV COM';
                break;
            default:
                break;
        }
        return name;
    }

    return (
        <>
            <div className="rating-list">
                <h3>Ratings List</h3>
                <ul>
                    {Object.entries(ratings).map(([k, v]) =>
                        <li key={k}>{getPortalName(k)}: {v ? v : 'N/A'}</li>
                    )}
                </ul>
            </div>
        </>
    );
};

export default RatingList;