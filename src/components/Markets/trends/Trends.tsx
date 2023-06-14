import { useState, useEffect } from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

export default function Trends(){
    const [trends, setTrends] = useState<any>(null)

    function saveTrend(type:string){
        const options = {
            method: 'GET',
            url: 'https://real-time-finance-data.p.rapidapi.com/market-trends',
            params: {
              trend_type: type,
              country: 'us',
              language: 'en'
            },
            headers: {
                'X-RapidAPI-Key': process.env.RAKey,
                'X-RapidAPI-Host': 'real-time-finance-data.p.rapidapi.com'
            }
        };
    
        try {
            if(localStorage.getItem('trends'+ type) === null){
                axios.request(options)
                .then(response => {
                    console.log(response.data.data.trends)
                    localStorage.setItem('trends' + options.params.trend_type, JSON.stringify(response.data.data.trends))
                    setTrends(response.data.data.trends)
                })
            } else {
                const jsonTrends = localStorage.getItem('trends' + type);
                const parsedTrends = jsonTrends ? JSON.parse(jsonTrends) : '';
                setTrends(parsedTrends);
                console.log('trends fetched from localStorage.')
                console.log(parsedTrends)
            }
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div>

        </div>
    )
}


////Move this function to a new component, to be mounted on global markets route parent comp.
