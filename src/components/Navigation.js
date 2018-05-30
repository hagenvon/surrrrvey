import React from 'react';

export default function Navigation (props) {

    let {pages, currentPage, navigate, skipped} = props;

    const indexOfPage = pages.indexOf(currentPage);
    const nextPage = getNextPage(indexOfPage, pages);
    const prevPage = getPreviousPage(indexOfPage, pages);

    return (
        <div>
            <button onClick={navigate(prevPage, 'back')}>back</button>
            <button onClick={navigate(nextPage, 'forward')}>next</button>

        </div>
    );
}

function getNextPage(indexOfPage, pages, skipped){
    if (pages[indexOfPage+1]){
        return pages[indexOfPage+1]
    } else {
        return pages[indexOfPage]
    }
}


function getPreviousPage(indexOfPage, pages){
    if (pages[indexOfPage-1]){
        return pages[indexOfPage-1]
    } else {
        return pages[indexOfPage]
    }
}