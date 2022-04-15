import React, { useEffect, useState } from 'react';
import millify from 'millify';
import { Collapse, Row, Col, Typography, Avatar } from 'antd';
import HTMLReactParser from 'html-react-parser';


const { Text } = Typography;
const { Panel } = Collapse;

const Exchanges = () => {
  const [isFetching, setIsFetching] = useState(true)
  const [exchanges, setExchanges] = useState([])

  useEffect(() => {
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Host': 'coinlore-cryptocurrency.p.rapidapi.com',
        'X-RapidAPI-Key': '3ef9601de3msh99819729462e3bep11d45ejsn679d1912acc5'
      }
    };
    
    fetch('https://coinlore-cryptocurrency.p.rapidapi.com/api/exchanges/', options)
      .then(response => response.json())
      .then(response => {
        console.log(response)
        
        setExchanges(response)
        // console.log(exchanges)
        setIsFetching(false)
      })
      .catch(err => console.error(err));
  }, [])
  
  if (isFetching) return "Loading...";

  return (
    <>
      <Row>
        <Col span={6}>Exchanges</Col>
        <Col span={6}>24h Trade Volume</Col>
        <Col span={6}>Markets</Col>
        <Col span={6}>Change</Col>
      </Row>
      <Row>
        {exchanges.map((exchange) => (
          <Col span={24}>
            <Collapse>
              <Panel
                key={exchange[0]}
                showArrow={false}
                header={(
                  <Row key={exchange[0]}>
                    <Col span={6}>
                      <Text><strong>{exchange[0]}.</strong></Text>
                      {/* <Avatar className="exchange-image" src={exchange.iconUrl} /> */}
                      <Text><strong>{exchange.name}</strong></Text>
                    </Col>
                    <Col span={6}>${millify(exchange.volume_usd)}</Col>
                    {/* <Col span={6}>{millify(exchange.numberOfMarkets)}</Col> */}
                    {/* <Col span={6}>{millify(exchange.marketShare)}%</Col> */}
                  </Row>
                  )}
              >
                {HTMLReactParser(exchange.description || '')}
              </Panel>
            </Collapse>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Exchanges;