import React from 'react';
import { useParams } from 'react-router-dom';
import DynamicTitle from './DynamicTitle';

function Watch() {
    const { id } = useParams()
    return (
        <div>
            <DynamicTitle
                pageTitle={`${id} Watch  Online | Free Streaming`}
                pageDescription="Gojo is a free Anime, Hollywood, Bollywood, Movies, TV Series streaming website. Where you can watch Hindi Dubbed, English Dubbed, Subbed and Multi-Language Dubbed content with daily updates. No account required. Watch Now!"
                pageKeywords="watch anime online, movies online, TV series streaming, anime streaming, Hollywood movies online, Bollywood movies stream, TV series, free streaming, Hindi dubbed movies, English anime, Hindi dubbed series, online streaming, gojoo.fun. Anime to watch, movies to watch, tv series to watch, watch anime marvel, hollywood movies, bollywood movies, tv series, movies online, tv series online, anime online, free anime online, online anime, anime movies streaming, stream anime online, hindi anime, hindi dubbed movies, hindi dubbed series, english anime, english dubbed anime, hindi dubbed movies, hindi dubbed anime"
            />
            Watch {id}
        </div>
    )
}

export default Watch