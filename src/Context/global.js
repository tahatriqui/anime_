import {  createContext, useContext, useEffect, useReducer, useState } from "react";

const GlobalContext = createContext()

const baseUrl = "https://api.jikan.moe/v4"

//actions
const LOADING = "LOADING";
const SEARCH = "SEARCH";
const GET_POPULAR_ANIME = "GET_POPULAR_ANIME";
const GET_UPCOMING_ANIME = "GET_UPCOMING_ANIME";
const GET_AIRING_ANIME = "GET_AIRING_ANIME"
const GET_PICTURES = "GET_PICTURES"


const reducer = (state,action) =>{
    switch(action.type){
        case LOADING :
            return{
                ...state,loading:true
            }
            case GET_POPULAR_ANIME :
            return{
                ...state,popularAnime:action.payload,loading:false
            }
            case SEARCH :
            return{
                ...state,searchResults:action.payload,loading:false
            }
            case GET_UPCOMING_ANIME :
            return{
                ...state,upcomingAnime:action.payload,loading:false
            }
            case GET_AIRING_ANIME :
            return{
                ...state,airingAnime:action.payload,loading:false
            }
            case GET_PICTURES :
            return{
                ...state,pictures:action.payload,loading:false
            }
            case 'clear' :
            return{
                ...state,pictures:[],loading:false
            }
            default : 
            return state
    }
    
}
export const GlobalContextProvier = ({children})=>{
    const initialState = {
        popularAnime:[],
        upcomingAnime:[],
        airingAnime:[],
        pictures:[],
        isSearch:false,
        searchResults:[],
        loading:false
    }

    //global state's
    const [state,dispatch] = useReducer(reducer,initialState)
    const [search,setSearch] = useState("")

    const handleChange = (e) =>{
        setSearch(e.target.value)
        if(e.target.value === ""){
            state.isSearch = false
        }
    }
    const handleSubmit = (e)=>{
        e.preventDefault()
        if(search){
            searchAnime(search)
            state.isSearch = true
        }else{
            state.isSearch = false;
            alert("please enter a valid search term")
        }
    }
        //fetch popular anime
        const getpopularanime = async()=>{
            dispatch({type:LOADING});
            const response =await fetch(`${baseUrl}/top/anime?filter=bypopularity`)
            const data = await response.json()
            dispatch({type:GET_POPULAR_ANIME ,payload:data.data})
        }

        //fetch upcoming anime
        const getupcominganime = async()=>{
            dispatch({type:LOADING});
            const response =await fetch(`${baseUrl}/top/anime?filter=upcoming`)
            const data = await response.json()
            dispatch({type:GET_UPCOMING_ANIME ,payload:data.data})
        }

        //fetch airing anime
        const getairinganime = async()=>{
            dispatch({type:LOADING});
            const response =await fetch(`${baseUrl}/top/anime?filter=airing`)
            const data = await response.json()
            dispatch({type:GET_AIRING_ANIME ,payload:data.data})
        }

        //search  anime
        const searchAnime = async(anime)=>{
            dispatch({type:LOADING});
            const response =await fetch(`${baseUrl}/anime?q=${anime}&order_by=popularity&sort=asc&sfw`)
            const data = await response.json()
            dispatch({type:SEARCH ,payload:data.data})
        }

        //get anime pictures
        const getAnimePictures = async(id)=>{
            dispatch({type:LOADING});
            const response =await fetch(`https://api.jikan.moe/v4/characters/${id}/pictures`)
            const data = await response.json()
            dispatch({type:GET_PICTURES,payload:data.data})
        }

        const clear = () =>{
            dispatch({type:"clear"})
        }

        useEffect(()=>{
            getpopularanime()
        },[])
    return ( <GlobalContext.Provider value={{
        ...state,
        handleChange,
        handleSubmit,
        searchAnime,
        search,
        getpopularanime,
        getairinganime,
        getupcominganime,
        getAnimePictures,
        clear
        }}>
        {children}
    </GlobalContext.Provider>)
}

export const useGlobalContext = () =>{
    return useContext(GlobalContext)
} 