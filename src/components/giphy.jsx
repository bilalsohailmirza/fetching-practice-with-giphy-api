import React from "react";
import { useEffect, useState } from "react";
import '../App.css'
import Loader from "./Loader";

const Giphy = () => {

    // State Variables
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)
    const [search, setSearch] = useState("")

    // Hook to fetch GIPHY API
    useEffect(() => {
        const fetchData = async () => {
            const API_KEY="FRBw0oIVsmPSFBa82wdhJesZMl2ZDtO2";
            const LIMIT = 10;

            setIsError(false)
            setIsLoading(true)
            try{
                const response = await fetch(
                    `https://api.giphy.com/v1/gifs/trending?api_key=${API_KEY}&limit=${LIMIT}`,{
                        method:'get'}
                )
                const responseJson = await response.json()
                    // .then(response => response.json())
                    // .then(content => {
                        // console.log(result)
                        // setData(result.data)
                        console.log(responseJson)
                        setData(responseJson.data)
                    // })      
            }catch(err) {
                setIsError(true)
                setTimeout(() => setIsError(false), 5000)
            }
            setIsLoading(false)
            }

            return () => fetchData();
        },[])

    const renderGifs = () => {

        if(isLoading) {
            return  <div className="loader"><Loader /></div>
        }

        return data.map(item => {
            return (
                <div key={item.id} className="gif">
                    <img src={item.images.fixed_height.url} alt="" />
                </div>
            )
        })
        
    }

    const renderError = () => {
        if (isError) {
            return (
            <div
                className="alert alert-danger alert-dismissible fade show"
                role="alert">
                Unable to get Gifs, please try again in a few minutes
            </div>
            );
        }
    }

    const handleSearchChange = (event) => {
        setSearch(event.target.value)
    }

    const handleSubmit = async (event) => {

        event.preventDefault()
        setIsError(false)
        setIsLoading(false)

        const api_key="FRBw0oIVsmPSFBa82wdhJesZMl2ZDtO2";

        try {
            const response = await fetch(`https://api.giphy.com/v1/gifs/trending?api_key=${api_key}`,{method:'get'})
            const responseJson = await response.json()
            console.log(responseJson)
            setData(responseJson.data)
        }catch(err) {

        }
    }

    return (
        <div className="container justify-content-center">
            <div className="mt-3">{renderError()}</div>
        <form className="form-inline justify-content-center m-4">
            <input value={search} onChange={handleSearchChange} type="text" placeholder="search"className="form-control"
            />
            <button
            onClick={handleSubmit}
            type="submit"
            className="btn btn-primary mx-2"
            >
            Go
            </button>
        </form>

        <div className="gifs">
            {renderGifs()}
        </div>
        </div>
    )
};

export default Giphy
