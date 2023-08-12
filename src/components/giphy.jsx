import React from "react";
import { useEffect, useState } from "react";

import '../App.css'

import Loader from "./Loader";
import Paginate from "./Pagination";


const Giphy = () => {

    // State Variables
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)
    const [search, setSearch] = useState("")


    // Pagination States and Variables
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage, setItemsPerPage] = useState(10)
    const lastItemIndex = currentPage*itemsPerPage
    const firstItemIndex = lastItemIndex - itemsPerPage
    const curentItems = data.slice(firstItemIndex, lastItemIndex)

    // Hook to fetch GIPHY API
    useEffect(() => {
        const fetchData = async () => {
            const API_KEY="FRBw0oIVsmPSFBa82wdhJesZMl2ZDtO2";
            const LIMIT = 50;

            setIsError(false)
            setIsLoading(true)
            try{
                const response = await fetch(
                    `https://api.giphy.com/v1/gifs/trending?api_key=${API_KEY}&limit=${LIMIT}`,{
                        method:'get'}
                )
                const responseJson = await response.json()
                        setData(responseJson.data)

            } catch(err) {
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

        return curentItems.map(item => {
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
        setIsLoading(true)

        const API_KEY="FRBw0oIVsmPSFBa82wdhJesZMl2ZDtO2";
        const LIMIT = 50
        try {
            const response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${search}&limit=${LIMIT}`,{method:'get'})

            const responseJson = await response.json()
            // console.log(responseJson.data)
            setData(responseJson.data)

        }catch(err) {
            setIsError(true)
            setTimeout(() => setIsError(false), 5000)
        }
        setIsLoading(false)
    }

    const pageSelected = (pageNumber) => {

        setCurrentPage(pageNumber)
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
            className="btn btn-primary mx-2">
            Go
            </button>
        </form>


        <div className="gifs">
            {renderGifs()}
        </div>
        <Paginate 
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            totalItems={data.length}
            pageSelected={pageSelected} 
        />

        </div>
    )
};

export default Giphy
