import React from 'react'
import { useGlobalContext } from '../Context/global'
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import SideBar from './SideBar';

const Popular = ({rendred}) => {
  const { popularAnime, isSearch,searchResults,loading } = useGlobalContext()
  const conditionalRender = () => {
    if(loading){ return(<>
    <Link><img src={ " https://gifdb.com/images/high/ace-fire-finger-one-piece-0r8h28t2po7oijru.webp" }/></Link>
    <Link><img src={ " https://gifdb.com/images/high/ace-fire-finger-one-piece-0r8h28t2po7oijru.webp" }/></Link>
    <Link><img src={ " https://gifdb.com/images/high/ace-fire-finger-one-piece-0r8h28t2po7oijru.webp" }/></Link>
    <Link><img src={ " https://gifdb.com/images/high/ace-fire-finger-one-piece-0r8h28t2po7oijru.webp" }/></Link>
    <Link><img src={ " https://gifdb.com/images/high/ace-fire-finger-one-piece-0r8h28t2po7oijru.webp" }/></Link>
    <Link><img src={ " https://gifdb.com/images/high/ace-fire-finger-one-piece-0r8h28t2po7oijru.webp" }/></Link>
    <Link><img src={ " https://gifdb.com/images/high/ace-fire-finger-one-piece-0r8h28t2po7oijru.webp" }/></Link>
    <Link><img src={ " https://gifdb.com/images/high/ace-fire-finger-one-piece-0r8h28t2po7oijru.webp" }/></Link>
    <Link><img src={ " https://gifdb.com/images/high/ace-fire-finger-one-piece-0r8h28t2po7oijru.webp" }/></Link>
    <Link><img src={ " https://gifdb.com/images/high/ace-fire-finger-one-piece-0r8h28t2po7oijru.webp" }/></Link>
    </>) }
    else if (!isSearch && rendred==="popular") {
      return popularAnime?.map((anime) => {
        return <Link to={ `anime/${anime.mal_id}` } key={ anime.mal_id }>
          <img src={ anime.images.jpg.large_image_url } />
          <div className='overlay'> 
            <i className='fas fa-play'></i>
            <div className='title'>{anime.title}</div>
          </div>
        </Link>
      })
    }else{
      return searchResults?.map((anime) => {
        return <Link to={ `anime/${anime.mal_id}` } key={ anime.mal_id }>
          <img src={ anime.images.jpg.large_image_url } />
        </Link>
      })
    }
  }
  return (
    <PopularStyled>
      <div className='popular-anime'>
        { conditionalRender() }
      </div>
      <SideBar/>
    </PopularStyled>
  )
}


const PopularStyled = styled.div`
  display: flex;
  .popular-anime {
    margin-top: 2rem;
    padding-top: 2rem;
    padding-bottom: 2rem;
    padding-left: 4rem;
    padding-right: 0;
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    grid-gap: 1rem;
    background-color: #fff;
    border-top: 5px solid #e5e7eb;
    @media (max-width: 650px) {
      grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
      padding-left: 1rem;
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

  

    div.overlay {
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

    &:hover div.overlay {
      opacity: 0.9;
    }
  }
  a img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 5px;
  }
`;
export default Popular