import { useState } from 'react'
import Popular from './Popular';
import { useGlobalContext } from '../Context/global';
import styled from 'styled-components';
import Upcoming from './UpComing';
import Airing from './Airing';


function HomePage() {
  const [rendred, setRendred] = useState('popular')
  const { searchResults,
    handleChange,
    handleSubmit,
    searchAnime,
    search,
    getpopularanime,
    getairinganime,
    getupcominganime, } = useGlobalContext()

  const switchComponenet = () => {
    switch (rendred) {
      case "popular":
        return <Popular rendred={ rendred } />
      case "airing":
        return <Airing rendred={ rendred } />
      case "upcoming":
        return <Upcoming rendred={ rendred } />
      default:
        return <Popular rendred={ rendred } />
    }
  }

  return (
    <HomePageStyle>
      <header>
        <div className='logo'>
          <h1>
            { rendred === 'popular' ? 'Popular Anime' :
              rendred === 'airing' ? 'Airing Anime' : 'upcoming anime' }
          </h1>
        </div>
        <div className='search-container'>
          <div className='filter-btn popular-filter'>
            <button onClick={ () => {
              setRendred("popular")
            } }><i className="fas fa-fire"></i>
            Popular</button>
          </div>

          <form action='' className='search-form' onSubmit={ handleSubmit }>
            <div className='input-control'>
              <input type="text" placeholder='search anime' value={ search } onChange={ handleChange } />
              <button type='submit'  > search</button>
            </div>
          </form>
          <div className='filter-btn airing-filter'>
            <button onClick={ () => {
              setRendred("airing")
              getairinganime()
            } }>airing</button>
          </div>
          <div className='filter-btn upcoming-filter'>
            <button onClick={ () => {
              setRendred("upcoming")
              getupcominganime()
            } }>upcoming</button>
          </div>
        </div>
      </header>
      { switchComponenet() }

    </HomePageStyle>

  )
}
const HomePageStyle = styled.div`
  background-color: #EDEDED;
  
  header{
    padding: 2rem 5rem;
    width:80%;
    margin:0 auto;
    transition :all .4s ease-in-out;
    @media (max-width:650px){
      padding: 1rem 0rem;
      width:100%;
 }
    .logo{
      display: flex;
      align-items:center;
      justify-content:center;
      margin-bottom:2rem;
      h1{
        color:#ff1d58;
      }
    }
    .search-container{
      display: flex;
      align-items:center;
      justify-content:center;
      gap:1rem;  
      @media (max-width:650px){
        gap:.2rem;
          }
       
        button{
          display: flex;
          align-items:center;
          gap:.5rem;
          padding: .7rem 1.5rem;
          outline:none;
          border-radius: 30px;
          font-size:1.2rem;
          background-color:#fff;
          cursor:pointer;
          transition: all .4s ease-in-out;
          font-family: inherit;
          border:5px solid #e5e7eb;
            @media (max-width:650px){
              font-size:.9rem;
              padding: .4rem 0.4rem;
                                    }
        }
      form{
        position:relative;
        width: 100%;
        .input-control{
          position:relative;
          transition:.4s all ease-in-out;
        }
        .input-control input{
          width: 100%;
          padding:.7rem 1rem;
          border:none;
          outline:none;
          border-radius:30px;
          font-size:1.2rem;
          background-color: #fff;
          border:5px solid #e5e7eb;
          transition:all .4s ease-in-out;
          @media (max-width:650px){
              font-size:.9rem;
              padding: .4rem .9rem;
                                    }
        }
        .input-control button{
          position: absolute;
          right:0;
          top:50%;
          transform:translateY(-50%);
        }
      }
    }
  }
`
export default HomePage