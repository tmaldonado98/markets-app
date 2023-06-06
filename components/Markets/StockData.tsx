function handleChartRequest(){

    if (props.market === 'Straits Times Index (STI)') {
        const indexTicker = '^STI';
        return fetchMarketData(indexTicker)
    }
}

// 
function fetchMarketData(ticker:string): Promise<any>{
    return new Promise((resolve, reject) => {
        axios.get(`https://www.alphavantage.co/query?function=SMA&symbol=${ticker}&interval=5min&time_period=60&series_type=open&apikey=${process.env.avKey}`,
        {headers: {
            'Content-Type': 'application/json'
        }}
        )
        .then(response =>{
            console.log(response.data);
            resolve(response.data)
        })
        .catch(error => {
            console.error(error)
            reject(error);
        })
    })

}


const { data, isLoading, isError, error } = useQuery([props.market], handleChartRequest, {
    refetchOnWindowFocus: false,
  })

if (isLoading) {
    return <div><Loading/></div>
}

if (isError) {
    return <div style={{textAlign:'center'}}>Please Try Again In A Minute <Loading/></div>
}


return (
    <section id='container-chart+fund'>
        <div>
            <p>Last Refreshed: {data?.['Meta Data']['3: Last Refreshed']}</p>
            <p>Time Zone: {data?.['Meta Data']['7: Time Zone']}</p>
            <p>
                {data?.['Meta Data']['2: Indicator']}
            </p>
        </div>
        <div id="chart">
            {data?.['Meta Data']['1: Symbol']}
        </div>

        <div className="fundamentals-container">

        </div>
    </section>
)
}