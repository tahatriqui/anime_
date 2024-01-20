import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { useGlobalContext } from '../Context/global'

const Gallery = () => {
    const { getAnimePictures, pictures, clear,loading } = useGlobalContext()
    const { id } = useParams()

    const [index, setIndex] = useState(0)

    const handelIndex = (i) =>{
        setIndex(i)
    }

    useEffect(() => {
        getAnimePictures(id)

    }, [])
    useEffect(() => { clear() }, [id])
    return (
        <GalleryStyled>
            <div className='back'>
                <Link  to={ '/' }><i class="fas fa-arrow-left"></i> Back to home</Link>
            </div>
            <div className='big-image'>
                <img src={pictures[index]?.jpg.image_url} alt="" />
            </div>
            <div className='small-images'>
                { pictures?.map((picture, i) => {
                    return <div className='ima-con' onClick={()=>{handelIndex(i)}} key={ i }>
                        <img src={ picture.jpg.image_url } alt=''
                        style={{border: i === index ?"3px solid #27AE60":"3px solid #e5e7eb",
                                filter: i === index ?"grayScale(0)":"grayScale(60%)",
                                transform: i === index ?"sclae(1.1)":"scale(1)",
                                transition:"ease-in-out"
                                
                    }}
                        />
                    </div>
                }) }
            </div>
        </GalleryStyled>
    )
}

const GalleryStyled = styled.div`
        background-color: #EDEDED;
        min-height:100vh;
        display:flex;
        flex-direction:column;
        align-items:center;
    .back{
        position: absolute;
        top:2rem;
        left:2rem;
        @media (max-width: 650px) {
            position:static;
            margin-top: 15px;
                            }
    }
        a{
            font-weight: 600;
            text-decoration:none;
            color:#EB5757;
            display:flex;
            align-items:center;
            gap:.5rem;
        }
    .big-image{
        display:inline-block;
        padding: 2rem;
        margin:2rem 0;
        background-color:#fff;
        border-radius:7px;
        border :5px solid #e5e7eb;
        position:relative;
        img{
            width:350px;
            @media (max-width: 650px) {
            position:static;
            margin-top: 15px;
            width:250px;
                            }
        }
    }
    .small-images{
        display:flex;
        flex-wrap:wrap;
        gap: .5rem;
        width:80%;
        padding:2rem;
        border-radius:7px;
        background-color: #fff;
        border:5px solid #e5e7eb;
        @media (max-width: 650px) {
            width:100%;
            padding:1rem;
                            }
        img{
            width:6rem;
            height: 6rem;
            object-fit:cover;
            cursor:pointer;
            border-radius:5px;
            border:3px solid #e5e7eb;
            @media (max-width: 600px) {
                width:4rem;
                height:4rem;
                            }
        }
    }
    

`

export default Gallery