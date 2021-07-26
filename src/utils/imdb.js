export const SEARCH_URL = 'https://imdb-api.com/en/API/SearchSeries/API_KEY/';
export const DETAILS_URL = 'https://imdb-api.com/en/API/Title/API_KEY/';

export const fetchSearchResults = async query => {
    if (query && query.length > 0) {
        const url = SEARCH_URL + query.trim();
        const res = await fetch(url);
        const resJson = res.json();
        return resJson;
    } else {
        return [];
    }
};

export const fetchById = async id => {
    if (id && id.length > 0) {
        const queryParams = 'FullActor,Ratings';
        const url = DETAILS_URL + id.trim() + '/' + queryParams;
        const res = await fetch(url);
        const resJson = res.json();
        return resJson;
    } else {
        return [];
    }
};

export const paginate = (array, page_size, page_number) => {
    return array.slice((page_number - 1) * page_size, page_number * page_size);
}

export const cleanRatingsObject = (data) => {
    let ratings = JSON.parse(JSON.stringify(data));
    delete ratings.errorMessage;
    delete ratings.title;
    delete ratings.type;
    delete ratings.year;
    delete ratings.fullTitle;
    delete ratings.imDbId;
    return ratings;
}

export const getYear = (string) => {
    return string.replace(/^[^(]*\(/, "")
        .replace(/\)[^(]*$/, "")
        .split(/\)[^(]*\(/)[0];
}

export const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            timeout = null;
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};