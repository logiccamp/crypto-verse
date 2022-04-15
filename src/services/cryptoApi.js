import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

const cryptoApiHeaders = {
    'x-rapidapi-host': 'coinranking1.p.rapidapi.com',
    'x-rapidapi-key': '9b92733af7msh39c5f0bf9092520p131692jsneb3db8443b5c'
}


const baseUrl = 'apiurl'

const createRequest = (url) => ({url, headers: cryptoApiHeaders})

export const cryptoApi = createApi({
    reducerPath : 'cryptoApi',
    baseQuery: fetchBaseQuery({baseUrl}),
    endpoints: (builder)=>({
        getCryptos: builder.query({
            query: (count)=>createRequest(`/coins?limit=${count}`)
        })
    })
})


export const {
    useGetCryptosQuery,
} = cryptoApi;

