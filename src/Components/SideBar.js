import React from 'react'
import styled from 'styled-components'
import { useGlobalContext } from '../Context/global'
import { Link } from 'react-router-dom'

const SideBar = () => {
    const { popularAnime } = useGlobalContext()
    const sorted = popularAnime?.sort((a, b) => {
        return b.score - a.score
    })
    return (
        <SideBarStyled>
            <h3>Top 5 popular</h3>
            <div className='anime'>
                { sorted.slice(0, 5).map((anime) => {
                    return <Link to={ `anime/${anime.mal_id}` } key={ anime.mal_id }>
                        <img src={ anime.images.jpg.large_image_url } />
                        <h5>
                            { anime.title }
                        </h5>
                    </Link>
                }) }
            </div>
        </SideBarStyled>
    )
}
const SideBarStyled = styled.div`
    margin-top: 2rem;
    background-color:#fff;
    border-top:5px solid #e5e7eb;
    padding-right:5rem;
    padding-left:2rem;
    padding-top:2rem;
    @media (max-width: 650px) {
        padding-right:2rem;
                        }
        
    .anime{
        display: flex;
        flex-direction:column;
        width:150px;
            @media (max-width: 650px) {
                width:90px;
                        }
        img{
            width: 100%;
            border-radius:5px;
            border:5px solid #e5e7eb;
        }
        a{
            margin-top: 1rem;
            display:flex;
            flex-direction:column;
            gap: 0.4rem;
            color: darkviolet;
            h5{
                font-size: 1rem;
                @media (max-width: 650px) {
                    font-size: 12px;
                        }
            }
        }
    }
`
export default SideBar