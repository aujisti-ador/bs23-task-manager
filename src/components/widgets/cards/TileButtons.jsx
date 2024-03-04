import React from 'react'
import "./TileButtons.css"

function TileButtons({ title = "title", onTitleClick}) {
    return (
        <div className='container-tile' onClick={onTitleClick}>
            <h2>{title}</h2>
        </div>
    )
}

export default TileButtons