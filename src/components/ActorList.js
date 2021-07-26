import React, { useCallback, useEffect, useState } from 'react';
import { paginate } from '../utils/imdb';

const ActorList = (props) => {
    const items = Object.freeze(props.items);
    const pageSize = 20, pageNumber = Math.round(items.length / pageSize);

    const [paginatedItems, setPaginatedItems] = useState([]);
    const [activePage, setActivePage] = useState(1);

    const showPage = (e, i) => {
        if (e) { e.preventDefault(); e.stopPropagation(); }
        let toShow = null;
        if (!i) {
            toShow = paginate(items, pageSize, e.target.id);
            setActivePage(e.target.id);
        } else {
            toShow = paginate(items, pageSize, i);
            setActivePage(i);
        }
        setPaginatedItems(toShow);
    }

    const renderActors = useCallback((e) => {
        showPage(null, activePage);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activePage]);

    const IncrementDecrementPage = (bool) => {
        if (!bool && activePage > 1) {
            showPage(null, activePage - 1)
        } else if (bool && activePage < pageNumber) {
            showPage(null, Number(activePage) + 1)
        }
    }

    const ShowPagination = () => {
        const pages = [];
        for (var i = 0; i < pageNumber; i++) {
            pages.push(<a
                key={i}
                href="/"
                className={activePage - 1 === i ? 'active' : null}
                onClick={(e) => showPage(e)}
                id={i + 1}>
                {i + 1}
            </a>)
        }

        return (
            <div className="pagination" id='pagination'>
                <button onClick={() => IncrementDecrementPage(false)}>&laquo;</button>
                {pages}
                <button onClick={() => IncrementDecrementPage(true)}>&raquo;</button>
            </div>
        )
    }
    useEffect(() => {
        renderActors();
    }, [renderActors]);

    return (
        <>
            <div className="actor-list">
                <h3>Actor List</h3>
                {paginatedItems && paginatedItems.map(e => <div key={e.name}>{e.name}</div>)}
            </div>
            <ShowPagination></ShowPagination>
        </>
    );
};

export default ActorList;