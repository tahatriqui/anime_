import React from 'react'
import { useGlobalContext } from '../Context/global'
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Airing = ({ rendred }) => {
  const { airingAnime, isSearch, searchResults, loading } = useGlobalContext()
  const conditionalRender = () => {
    if (loading) {
      return (<>
        <Link><img src={ " https://i.pinimg.com/originals/86/ac/90/86ac9098393e8b3b35eed58aeab20d5a.gif" } /></Link>
        <Link><img src={ " https://i.pinimg.com/originals/86/ac/90/86ac9098393e8b3b35eed58aeab20d5a.gif" } /></Link>
        <Link><img src={ " https://i.pinimg.com/originals/86/ac/90/86ac9098393e8b3b35eed58aeab20d5a.gif" } /></Link>
        <Link><img src={ " https://i.pinimg.com/originals/86/ac/90/86ac9098393e8b3b35eed58aeab20d5a.gif" } /></Link>
        <Link><img src={ " https://i.pinimg.com/originals/86/ac/90/86ac9098393e8b3b35eed58aeab20d5a.gif" } /></Link>
        <Link><img src={ " https://i.pinimg.com/originals/86/ac/90/86ac9098393e8b3b35eed58aeab20d5a.gif" } /></Link>
        <Link><img src={ " https://i.pinimg.com/originals/86/ac/90/86ac9098393e8b3b35eed58aeab20d5a.gif" } /></Link>
        <Link><img src={ " https://i.pinimg.com/originals/86/ac/90/86ac9098393e8b3b35eed58aeab20d5a.gif" } /></Link>
        <Link><img src={ " https://i.pinimg.com/originals/86/ac/90/86ac9098393e8b3b35eed58aeab20d5a.gif" } /></Link>
        <Link><img src={ " https://i.pinimg.com/originals/86/ac/90/86ac9098393e8b3b35eed58aeab20d5a.gif" } /></Link>
      </>)
    }
    else if (!isSearch && rendred === "airing") {
      return airingAnime.map((anime) => {
        return <Link to={ `anime/${anime.mal_id}` } key={ anime.mal_id }>
          <img src={ anime.images.jpg.large_image_url } />
          <div className='overlay'>
            <i className='fas fa-play'></i>
            <div className='title'>{ anime.title }</div>
          </div>
        </Link>
      })
    } else {
      return searchResults.map((anime) => {
        return <Link to={ `anime/${anime.mal_id}` } key={ anime.mal_id }>
          <img src={ anime.images.jpg.large_image_url } />
        </Link>
      })
    }
  }
  return (
    <AiringStyled>
      <div className='airing-anime'>
        { conditionalRender() }
      </div>
    </AiringStyled>
  )
}

const AiringStyled = styled.div`
  display: flex;
  .airing-anime {
    margin-top: 2.5rem;
    padding: 2rem;
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    grid-gap: 1rem;
    background-color: #fff;
    border-top: 5px solid #e5e7eb;
    @media (max-width: 650px) {
      grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
    }
  }
  a {
    position: relative;
    height: 100%;
    border-radius: 7px;
    border: 5px solid #e5e7eb;
    display: block;
    overflow: hidden;
    transition: opacity 0.4s ease;

   

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 5px;
    }

    .overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      background-color: rgba(255, 255, 255, 0.8);
      opacity: 0;
      transition: opacity 0.3s ease;
      color: darkblue;

      i {
        font-size: 3rem;
        margin-bottom: 5px;
        @media (max-width: 650px) {
          font-size: 1.5rem;
                        }
        
      }

      .title {
        font-size: 1.2rem;
        font-weight: bold;
        text-align: center;
        margin-top: 18px;
        @media (max-width: 650px) {
          font-size: .8rem;
                        }
      
      }
    }

    &:hover .overlay {
      opacity: 0.9;
    }
  }
`;

export default Airing