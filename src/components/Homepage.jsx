import react, { useEffect, useState } from 'react';
import millify from 'millify';
import {Typography, Row, Col, Statistic} from 'antd'
import { Link } from 'react-router-dom';
import { Cryptocurrencies, News } from '.';

const {Title} = Typography;



const Homepage = () => {
    const [globalStats, setGlobalStats] = useState([])
    const [isFetching, setIsFetching] = useState(true)
    let url = `https://coinranking1.p.rapidapi.com/coins?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=24h&tiers=1&orderBy=marketCap&orderDirection=desc&limit=50&offset=0`
    const options = {
        method: 'GET',
        headers: {
          'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com',
          'X-RapidAPI-Key': '9b92733af7msh39c5f0bf9092520p131692jsneb3db8443b5c'
        }
      };
    useEffect(() => {
        fetch(url, options)
        .then(response => response.json())
        .then(response => {
            console.log(response)
            setGlobalStats(response.data.stats)
            setIsFetching(false)
        })
        .catch(err => console.error(err));  
      }, [])

    if (isFetching) return 'Loading...';
    return ( 
        <>
            <Title level={2} className="heading">Global Crypto Stats</Title>
            <Row gutter={[32, 32]}>
                <Col span={12}><Statistic title="Total Cryptocurrencies" value={globalStats?.total} /></Col>
                <Col span={12}><Statistic title="Total Exchanges" value={millify(globalStats.totalExchanges)} /></Col>
                <Col span={12}><Statistic title="Total Market Cap:" value={`$${millify(globalStats.totalMarketCap)}`} /></Col>
                <Col span={12}><Statistic title="Total 24h Volume" value={`$${millify(globalStats.total24hVolume)}`} /></Col>
                <Col span={12}><Statistic title="Total Cryptocurrencies" value={globalStats.total} /></Col>
                <Col span={12}><Statistic title="Total Markets" value={millify(globalStats.totalMarkets)} /></Col>
            </Row>
            <div className="home-heading-container">
                <Title level={2} className="home-title">Top 10 Cryptos In The World</Title>
                <Title level={3} className="show-more"><Link to="/cryptocurrencies">Show more</Link></Title>
            </div>
            <Cryptocurrencies simplified={true} />

            <div className='home-heading-container'>
                <Title level={2} className='home-title'>Latest Crypto News</Title>
                <Title level={3} className='show-more'><Link to="/news">Show More</Link></Title>
            </div>
            <News simplified={true} />

        </>
    )
};

export default Homepage;
