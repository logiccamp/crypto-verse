import react, {useEffect, useState} from 'react';
import millify from 'millify'
import { Link } from 'react-router-dom';
import {Card, Row, Col, Input} from 'antd';


// import { useGetCryptosQuery } from '../services/cryptoApi';
// import { filter } from 'domutils';


const Cryptocurrencies = ({simplified}) => {
  
  const count = simplified ? 10 : 100
  const [cryptos, setCryptos] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const [searchTerm, setSearchTerm] = useState('')
  
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com',
      'X-RapidAPI-Key': '9b92733af7msh39c5f0bf9092520p131692jsneb3db8443b5c'
    }
  };
  
  useEffect(() => {
    let url = `https://coinranking1.p.rapidapi.com/coins?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=24h&tiers=1&orderBy=marketCap&orderDirection=desc&limit=${count}&offset=0`
    fetch(url, options)
    .then(response => response.json())
    .then(response => {
      console.log(response.data.coins)
      setCryptos(response.data.coins)
      setIsFetching(false)
    })
    .catch(err => console.error(err));  
  }, [count])
  

  if (isFetching) return 'Loading...';
  return (
    <>
    {
      !simplified && (
        <div className='search-crypto'>
          <Input placeholder='Search Cryptocurrency' onChange={(e) => setSearchTerm(e.target.value)} />
        </div>
      )
    }
      <Row gutter={[32, 32]} className='crypto-card-container'>
        {
          cryptos?.map((currency)=>(
            <Col xs={24} sm={12} lg={6} className='crypto-card' key={currency.uuid}>
              <Link to={`/crypto/${currency.uuid}`}>
                <Card 
                  title={`${currency.rank}.${currency.name}`}
                  extra={<img className='crypto-image' src={currency.iconUrl} />}
                  hoverable>
                    <p>Price : {millify(currency.price)}</p>
                    <p>Market Cap : {millify(currency.marketCap)}</p>
                    <p>Price : {millify(currency.change)}%</p>
                  </Card>
              </Link>
            </Col>
          )
        )};
      </Row>
    </>
  );
};

export default Cryptocurrencies;
