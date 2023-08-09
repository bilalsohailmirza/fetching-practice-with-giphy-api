import React from "react";
import { useEffect, useState } from "react";
import '../App.css'
const Giphy = () => {

    const [data, setData] = useState([])
    useEffect(() => {
        const fetchData = () => {
            const api_key="FRBw0oIVsmPSFBa82wdhJesZMl2ZDtO2";

            fetch(`https://api.giphy.com/v1/gifs/trending?api_key=${api_key}`)
                .then(response => response.json())
                .then(content => {
                        console.log(content)
                        setData(content.data)
                    }
                )
            }
            return () => fetchData();
        },[])

        const renderGifs = () => {

            return data.map(item => {
                return (
                    <div className="gif">
                        <img src={item.images.fixed_height.url} alt="" />
                    </div>
                )
            })
            
        }

    return (
        <div className="container gifs">
            {renderGifs()}
        </div>
    )
};

export default Giphy