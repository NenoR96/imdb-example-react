import React, { useState } from 'react';
import { fetchById, getYear } from '../utils/imdb';
import ActorList from './ActorList';
import RatingList from './RatingList';

const ListItem = (props) => {
    const [itemInfo, setInfo] = useState(null);
    const [showInfo, setShowInfo] = useState(false);
    const item = props.item;

    const handleShowInfo = async (e) => {
        if (!showInfo) {
            const info = await fetchById(props.item.id);
            setInfo(info);
        }
        setShowInfo(!showInfo);
    }

    return (
        <div className="accordion__item">
            <div className="accordion__header">
                <div className="accordion__toggle">
                    <img src={item.image} className="accordion-img" alt={item.title}
                        onClick={(e) => handleShowInfo(e)} />
                </div>

                <div className="accordion__title">
                    {item.title} ({getYear(item.description)})
                    <p>#{item.id}</p>
                </div>
            </div>

            <div className={showInfo ? "accordion__content--selected" : "accordion__content"} id='content'>
                {showInfo && itemInfo ?
                    <>
                        <RatingList items={itemInfo.ratings}></RatingList>
                        <ActorList items={itemInfo.actorList}></ActorList>
                    </>
                    : null}
            </div>
        </div>
    );
};

export default ListItem;