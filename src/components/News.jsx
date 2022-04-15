import react, { useEffect, useState } from 'react';
import {Select, Typography, Card, Row, Col, Avatar, Button} from 'antd'
import moment from 'moment';



const {Text, Title} = Typography;
const {Option} = Select;


const News = ({simplified}) => {
  const [limit, setLimit] = useState(simplified ? 10 : 100);
  const [isFetching, setIsFetching] = useState(true)
  const [cryptoNews, setCryptoNews] = useState([])
  const [cryptoNewsCategory, setCryptoNewsCategory] = useState("")
  const [allCoins, setAllCoins] = useState([])
  const [page, setPage] = useState(1)

  const updatePage = () => {
    setPage(page + 1)
  }
  useEffect(() => {
    
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Host': 'investing-cryptocurrency-markets.p.rapidapi.com',
        'X-RapidAPI-Key': '3ef9601de3msh99819729462e3bep11d45ejsn679d1912acc5'
      }
    };
    
    fetch(`https://investing-cryptocurrency-markets.p.rapidapi.com/coins/get-news?pair_ID=1057391&page=${page}&time_utc_offset=28800&lang_ID=1`, options)
      .then(response => response.json())
      .then(response => {
        const oldNews = cryptoNews
        const news = response.data[0].screen_data.news
        console.log(news)
        setCryptoNews(oldNews.concat(news))
        
        setIsFetching(false)
      })
      .catch(err => console.error(err));
  }, [page])

  // output raw html
  const RawHTML = ({children, className = ""}) => 
  <div className={className}
    dangerouslySetInnerHTML={{ __html: (children.replace(/\n/g, '<br />')).length > 100 ? (children.replace(/\n/g, '<br />')).substring(0, 100): children.replace(/\n/g, '<br />')}} />
  
  useEffect(() => {
    const options1 = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com',
        'X-RapidAPI-Key': '9b92733af7msh39c5f0bf9092520p131692jsneb3db8443b5c'
      }
    };
    let url1 = `https://coinranking1.p.rapidapi.com/coins?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=24h&tiers=1&orderBy=marketCap&orderDirection=desc&limit=100&offset=0`
    fetch(url1, options1)
    .then(response => response.json())
    .then(response => {
      setAllCoins(response.data.coins)
    })
    .catch(err => console.error(err));  
  }, [])
  
  
  if (isFetching) return "Loading...";
  return (
        <Row gutter={[24, 24]}>
              {!simplified && (
                // <Col span={24}>
                //   <Select
                //     showSearch
                //     className="select-news"
                //     placeholder="Select a Crypto"
                //     optionFilterProp="children"
                //     onChange={(value) => setCryptoNewsCategory(value)}
                //     filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                //   >
                    
                //     <Option value="">Cryptocurrency</Option>
                //     {allCoins?.map((currency) => <Option key={currency.uuid} value={currency.symbol}>{currency.name}</Option>)} 
                //   </Select>
                // </Col>
                <Col span={24}>
                  <div className='home-heading-container'>
                    <Title level={2} className='home-title'>Latest Crypto News</Title>
                  </div> 
                </Col>
              )}
              
              {
              cryptoNews?.map((news, i) => (
              <Col xs={24} sm={12} lg={8} key={i}>
                <Card hoverable className="news-card">
                  <a href={news.third_party_url} target="_blank" rel="noreferrer">
                    <div className="news-image-containers">
                      <Title className="news-titlde" level={4}>{news.HEADLINE}</Title> <br />
                      <img style={{width: '100%'}} src={news?.related_image} alt="" />
                    </div>
                    {/* <p>{news.BODY.replace("<p>", "").length > 100 ? `${news.BODY.replace("<p>", "").substring(0, 100)}...` : news.BODY.replace("<p>", "")}</p> */}
                    <RawHTML children={news.BODY}></RawHTML>
                    <div className="provider-container">
                      <div>
                        {/* <Avatar src={news.provider[0]?.image?.thumbnail?.contentUrl } alt="" /> */}
                        <Text className="provider-name">{news?.news_provider_name}</Text>
                      </div>
                      <Text>{moment(news.date).startOf('ss').fromNow()}</Text>
                    </div>
                  </a>
                </Card>
              </Col>
            ))
          }
          <Col span={24} >
            <Button className='btn' onClick={updatePage}>Load More</Button>
          </Col>
         </Row>
  );
};

export default News;
