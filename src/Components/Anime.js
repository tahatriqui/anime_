import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import styled from 'styled-components';

function AnimeItem() {
    const { id } = useParams()

    //state's
    const [anime, setAnime] = useState({})
    const [characteres, setCharacters] = useState([])
    const [showMore, setShowMore] = useState(false)

    //disctructure anime
    const { title, synopsis,
        trailer, duration,
        aired, season, images,
        rank, score, scored_by, popularity,
        status, rating, source, loading } = anime

    //get anime's based on id
    const getAnime = async (anime) => {
        const response = await fetch(`https://api.jikan.moe/v4/anime/${anime}`)
        const data = await response.json()
        setAnime(data.data)

    }

    //get charactere
    const getCharactere = async (anime) => {
        const response = await fetch(`https://api.jikan.moe/v4/anime/${anime}/characters`)
        const data = await response.json()
        setCharacters(data.data)
    }

    useEffect(() => {
        getAnime(id)
        getCharactere(id)
    }, [])
    return (
        <AnimeItemStyled>
            <h1>{ title }</h1>
            <div className='details'>
                <div className='detail'>
                    <div className='image'>
                        <img src={ loading === false ? "https://media.gettyimages.com/id/1302436578/fr/vid%C3%A9o/animation-dic%C3%B4ne-de-cercle-de-chargement-sur-le-fond-noir-pr%C3%A9chargeur-loopable-vid%C3%A9o-4k.jpg?s=640x640&k=20&c=TEAXD6BhR0j9c_exR9FqB81uCNM0zI8dEjnDwYRIM3k=" : images?.jpg.large_image_url } />

                    </div>
                    <div className='anime-details'>
                        <p><span>Aired:</span>{ aired?.string }</p>
                        <p><span>Raiting:</span>{ rating }</p>
                        <p><span>Rank:</span>{ rank }</p>
                        <p><span>Score:</span>{ score }</p>
                        <p><span>Score by:</span>{ scored_by }</p>
                        <p><span>Status:</span>{ status }</p>
                        <p><span>Source:</span>{ source }</p>
                        <p><span>Season:</span>{ season }</p>
                        <p><span>Duration:</span>{ duration }</p>
                    </div>
                </div>
                <p className='decription' title={ !showMore ? synopsis?.substring(450) : "" }>
                    { showMore ? synopsis : synopsis?.substring(0, 450) + "..." }

                    <button onClick={ () => { setShowMore(!showMore) } }>{ showMore ? "show Less" : "show More" }</button>
                </p>
            </div>
            <h3 className='title'>Trailer</h3>
            <div className='trailer-con'>
                { trailer?.embed_url ? <iframe
                    src={ trailer?.embed_url }
                    title={ "title" }
                    width='800'
                    height='450'
                    allow="accelerometer;autoplay;clipboard-write;encrypted-media;"
                    allowFullScreen></iframe> : <h3>trailer are not available</h3> }
            </div>
            <h3 className='title'>characteres</h3>
            <div className='characteres'>
                { characteres?.map((charactre, index) => {
                    const { role } = charactre;
                    const { images, name, mal_id } = charactre.character
                    return <Link to={ `/character/${mal_id}` } key={ index }>
                        <div title={ name } className='charactere'>
                            <img src={ images?.jpg.image_url } alt='' />
                            <h4 >{ name }</h4>
                            <p>{ role }</p>
                        </div>
                    </Link>
                }) }
            </div>
        </AnimeItemStyled>
    )
}
const AnimeItemStyled = styled.div`
padding: 3rem 15rem;
background-color:#EDEDED;
    @media (max-width: 650px) {
        padding: 1rem .5rem;
                            }
    h1{
        display: inline-block;
        font-size:3rem;
        margin-bottom:1.5rem;
        cursor:pointer;
        background: linear-gradient(to right,red,black);
        -webkit-background-clip:text;
        -webkit-text-fill-color:transparent;
        transition:all .4s ease-in-out;
        @media (max-width: 650px) {
                font-size:1.5rem;
                margin-bottom:.8rem;
                        }
        &:hover{
            transform:skew(-3deg)
        };
    };
    .title{
        display: inline-block;
        margin:3rem 0;
        font-size:2rem;
        cursor:pointer;
        background: linear-gradient(to right,red,black);
        -webkit-background-clip:text;
        -webkit-text-fill-color:transparent;
        transition:all .4s ease-in-out;
        @media (max-width: 650px) {
                font-size:1.7rem;
                        }
    }
    .decription{
        margin-top: 2rem;
        color:#6c7983;
        line-height: 1.7rem;
        @media (max-width: 650px) {
                font-size:.8rem;
                line-height: 1rem;
                margin-top: 1.5rem;
                            }
        button{
            background-color: transparent;
            border:none;
            outline:none;
            cursor:pointer;
            font-size:1.2rem;
            color: #9e1212;
            font-weight: 600;
            @media (max-width: 650px) {
                font-size:.8rem;
                            }
        }
    }
    .trailer-con{      
            display: flex;
            justify-content:center;
            align-items:center;
            iframe{
                outline:none;
                border:5px solid #e5e7eb;

            }
    }
    .details{ 
        background-color: #fff;
        border-radius: 20px;
        padding:2rem;
        border: 5px solid #e5e7eb;
        @media (max-width: 650px) {
                font-size:.7rem;                 
                margin-top: 1.5rem;
                            }
        .detail{
            display: grid;
            grid-template-columns:repeat(2,1fr);
            img{
                border-radius: 7px;
                width: 90%;
                height:90%;
                @media (max-width: 650px) {
                    width: 70%;
                    height:70%;
                            }
            }
        }
        .anime-details{
            display: flex;
            flex-direction:column;
            justify-content:space-between;
            p{
                display: flex;
                gap:1rem;
            }
            p span:first-child{
                font-weight: 600;
                color:#454e56;
                
            }
        }
    }
    .characteres{
        display: grid;
        grid-template-columns:repeat(auto-fill,minmax(200px,1fr));
        grid-gap:2rem;
        background-color:white;
        border-radius:20px;
        border:5px solid #e5e7eb;
        padding:2rem;
        @media (max-width: 650px) {
                grid-template-columns:repeat(auto-fill,minmax(100px,1fr));
                grid-gap:1rem;             
                padding:2rem;
                            }
        .charactere{
            padding:.4rem .6rem;
            border-radius: 7px;
            background-color:#EDEDED;
            transition:all ease-in-out .4s;
            
            img{
                width: 100%;
            }
            h4{
                padding: .5rem 0;
                color:#454e56;
            }
            p{
                color: #27AE60;
            }
            &:hover{
                transform: translateY(-5px);
            }
        }
        
    }
`;

export default AnimeItem