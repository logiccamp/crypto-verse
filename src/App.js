import React from 'react'
import {Routes, Route, Link} from 'react-router-dom'
import {Layout, Typography, Space} from 'antd'
import './App.css'
import {Navbar, CryptoDetails, Cryptocurrencies, Homepage, Exchanges, News} from './components'


export default function App (){
    return (
        <div className='app'>
            <div className="navbar">
                <Navbar />
            </div>
            <div className='main'>
                <Layout >
                    <div className='routes'>
                        <Routes>
                            <Route exact path="/" element={<Homepage />} />

                            <Route exact path="/exchanges" element={<Exchanges />} />

                            <Route exact path="/cryptocurrencies" element={<Cryptocurrencies />} />

                            <Route exact path="/crypto/:coinId" element={<CryptoDetails />} />

                            <Route exact path="/news" element={<News />}>
                            </Route>
                        </Routes>
                    </div>
                </Layout>

                <div className='footer'>
                    <Typography.Title level={5} style={{color: 'white', textAlign: 'center'}}>
                        Cryptoverse <br /> All rights reserved
                    </Typography.Title>
                    <Space>
                        <Link to="/">Home</Link>
                        <Link to="/news">News</Link>
                        {/* <Link to="/exchanges">Exchanges</Link> */}
                        <Link to="/currencies">Currencies</Link>
                    </Space>
                </div>
            </div>
        </div>
    )
}