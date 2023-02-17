"use client"; //this is a client component
import React, { useState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation';
import axios from 'axios';
import { Typography, Grid, Box } from '@mui/material'
import { BiArrowBack } from 'react-icons/bi'

function ProductDetail() {

    const searchParams = useSearchParams();
    const router = useRouter()
    const id = searchParams.get('id');
    const [productData, setProductData] = useState({})

    const fetchProduct = async () => {
        const { data } = await axios.get(`https://dummyjson.com/products/${id}`);
        setProductData(data)
    }

    useEffect(() => {
        if (id !== null) {
            fetchProduct()
        }
    }, [])
    return (
        <Grid sx={{ padding: '3rem 4rem' }}>
            <Box sx={{ display: 'flex', justifyContent: 'start', alignItems: 'start', pb: 2, borderBottom: '2px solid gray' }}>
                <Typography onClick={() => router.push(`/`)} sx={{ fontSize: '2rem', color: 'gray' }}><BiArrowBack /></Typography>
                <Typography sx={{ fontSize: '1.5rem', ml: 4, fontWeight: 600, color: '#0a2351' }}>PRODUCT DETAIL</Typography>
            </Box>
            <Grid sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: "center", pt: 4 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '40%' }}>
                    <Typography sx={{ fontSize: '1.5rem', fontWeight: 600, color: '#0a2351' }}>NAME OF PRODUCT</Typography>
                    <Typography sx={{ fontSize: '1.5rem', fontWeight: 600, color: '#0a2351' }}>{productData.title}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '40%', mt: 3 }}>
                    <Typography sx={{ fontSize: '1.5rem', fontWeight: 600, color: '#0a2351' }}>NAME OF Brand</Typography>
                    <Typography sx={{ fontSize: '1.5rem', fontWeight: 600, color: '#0a2351' }}>{productData?.brand}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '40%', mt: 3 }}>
                    <Typography sx={{ fontSize: '1.5rem', fontWeight: 600, color: '#0a2351' }}>CATEGORY</Typography>
                    <Typography sx={{ fontSize: '1.5rem', fontWeight: 600, color: '#0a2351' }}>{productData?.category}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '40%', mt: 3 }}>
                    <Typography sx={{ fontSize: '1.5rem', fontWeight: 600, color: '#0a2351' }}>DISCOUNT</Typography>
                    <Typography sx={{ fontSize: '1.5rem', fontWeight: 600, color: '#0a2351' }}>{productData?.discountPercentage}%</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '40%', mt: 3 }}>
                    <Typography sx={{ fontSize: '1.5rem', fontWeight: 600, color: '#0a2351' }}>PRICE OF PRODUCT</Typography>
                    <Typography sx={{ fontSize: '1.5rem', fontWeight: 600, color: '#0a2351' }}>₹{productData?.price}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '40%', mt: 3 }}>
                    <Typography sx={{ fontSize: '1.5rem', fontWeight: 600, color: '#0a2351' }}>COUNT IN STOCK</Typography>
                    <Typography sx={{ fontSize: '1.5rem', fontWeight: 600, color: '#0a2351' }}>{productData?.stock}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '40%', mt: 3 }}>
                    <Typography sx={{ fontSize: '1.5rem', fontWeight: 600, color: '#0a2351' }}>RATING'S OF PRODUCT</Typography>
                    <Typography sx={{ fontSize: '1.5rem', fontWeight: 600, color: '#0a2351' }}>{productData?.rating}/5</Typography>
                </Box>
            </Grid>
        </Grid>
    )
}

export default ProductDetail