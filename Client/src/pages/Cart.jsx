import React, { useEffect } from 'react'
import styled from "styled-components"
import Navbar from '../Components/Navbar'
import Announcement from '../Components/Announcement'
import Newsletter from '../Components/Newsletter'
import Footer from '../Components/Footer'
import { Add, Remove } from '@material-ui/icons'
import {mobile} from "..//responsive"
import { useSelector } from 'react-redux'
import StripeCheckout from 'react-stripe-checkout'
import { useState } from 'react'
import {userRequest} from "../requestMethods"
import { useNavigate } from "react-router-dom";



const KEY = process.env.REACT_APP_STRIPE;

const Container = styled.div``

const Wrapper = styled.div`
padding: 20px;
${mobile({padding:"10px"})}

`

const Title = styled.h1`
font-weight: 300;
text-align: center;
`
const Top = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
padding: 20px;
`

const TopButton = styled.button`
padding: 10px;
font-weight: 600;
cursor: pointer;
border: ${props=>props.type === "filled" && "none"};
background-color: ${props=>props.type === "filled" ? "black":"transparent"};
color: ${props=>props.type === "filled" && "white"};
`

const TopTexts =styled.div`
${mobile({display:"None"})}
`

const TopText = styled.span`
text-decoration: underline;
cursor: pointer;
margin : 0px 10px;
`
const Bottom = styled.div`
display: flex;
justify-content: space-between;
${mobile({flexDirection:"column"})}
`

const Info = styled.div`
flex:3;
`


const Product = styled.div`
display: flex;
justify-content: space-between;
${mobile({flexDirection:"column"})}
`;
const ProductDetail = styled.div`
flex:2;
display: flex;
`;
const Image = styled.img`
width:200px;

`;
const Details = styled.div`
padding: 20px;
display: flex;
flex-direction: column;
justify-content: space-around;
`;

const ProductName = styled.span`
`;

const ProductId = styled.span`
`;

const ProductColor = styled.div`
height: 20px;
width: 20px;
border-radius: 50%;
background-color: ${props=>props.color};
`;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
flex:1;
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;

`;

const ProductAmountContainer = styled.div`
display: flex;
align-items: center;
margin-bottom: 20px;
`

const ProductAmount = styled.div`
font-size: 24px;
margin: 5px;
${mobile({margin:"5px 15px"})}
`

const ProductPrice = styled.div`
font-size: 30px;
font-weight: 200;
${mobile({marginBottom:"20px"})}
`

const Hr = styled.hr`
background-color: #eee;
border: none;
height: 1px;
margin: 5px;
`



const Summary = styled.div`
flex:1;
border: 0.5px solid lightgray;
border-radius: 10px;
padding: 20px;
height: 60vh;
`

const SummaryTitle = styled.h1`
font-weight: 200;
`

const SummaryItem = styled.div`
margin: 30px 0px;
display: flex;
justify-content: space-between;
font-weight: ${props=>props.type === "total" && "500"};
font-size: ${props=>props.type ==="total" && "24px"};
`

const SummaryItemPrice = styled.span`
`

const Button = styled.button`
width: 100%;
padding: 10px;
background-color: black;
color:white;
font-weight: 600;
cursor:pointer;

`


const SummaryItemText = styled.span`
`



const Cart = () => {
    const cart = useSelector((state)=>state.cart)
    const [stripeToken,setStripeToken] = useState(null);
    const navigate = useNavigate();
    const onToken =(token)=>{
      setStripeToken(token);
    }
    // console.log(stripeToken);
    useEffect(()=>{
     const makeRequest  = async ()=>{
        try{
          const res = await userRequest.post("/checkout/payment",{
            tokenId:stripeToken.id,
            amount:cart.total*100,

          });
          navigate("/success", { state: { data: res.data } });

        }catch{}

     };
     stripeToken&&makeRequest();
    },[stripeToken,cart.total,navigate]);
  return (
    <Container>
     <Navbar/>
     <Announcement/>
     <Wrapper>
        <Title>YOUR BAG</Title>
        <Top>
            <TopButton>CONTINUE SHOPPING</TopButton>
            <TopTexts>
                <TopText>Shopping Bag(2)</TopText>
                <TopText>Your Wishlist(0)</TopText>
            </TopTexts>
            <TopButton type="filled">CHECKOUT NOW</TopButton>
        </Top>
        <Bottom>
            <Info>
            {cart.products.map(product=>(
                <Product>
                    <ProductDetail>
                    <Image src={product.img}/>
                        <Details>
                        <ProductName><b>Product:</b>{product.title}</ProductName>
                        <ProductId><b>ID:</b>{product.id}</ProductId>
                        <ProductColor color={product.color}/>
                        <ProductSize><b>Size:</b>{product.size}</ProductSize>
                        
                    </Details>
                    </ProductDetail>
                    
                    <PriceDetail>
                        <ProductAmountContainer>
                            <Add/>
                            <ProductAmount>{product.quantity}</ProductAmount>
                            <Remove/>
                        </ProductAmountContainer>
                        <ProductPrice>${product.price*product.quantity}</ProductPrice>
                    </PriceDetail>
                </Product>
            ))}
                <Hr/>
            </Info>
            <Summary>
                <SummaryTitle>ORDER SUMMARY</SummaryTitle>
                <SummaryItem>
                    <SummaryItemText>Subtotal</SummaryItemText>
                    <SummaryItemPrice>{cart.total}</SummaryItemPrice>
                </SummaryItem>
                <SummaryItem>
                    <SummaryItemText>Estimated Shipping</SummaryItemText>
                    <SummaryItemPrice>$ 5.90</SummaryItemPrice>
                </SummaryItem>
                <SummaryItem>
                    <SummaryItemText>Shipping Discount</SummaryItemText>
                    <SummaryItemPrice>$ -5.90</SummaryItemPrice>
                </SummaryItem>
                <SummaryItem type = "total">
                    <SummaryItemText >Total</SummaryItemText>
                    <SummaryItemPrice>{cart.total}</SummaryItemPrice>
                </SummaryItem>
                <StripeCheckout
                    name='Shopit'
                    image='data:image/jpeg;base64,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'
                    billingAddress
                    shippingAddress
                    description={`Your total is $${cart.total}`}
                    amount={cart.total*100}
                    token={onToken}
                    stripeKey={KEY}

                >
                <Button>CHECKOUT NOW</Button>
                </StripeCheckout>
            </Summary>
        </Bottom>
     </Wrapper>
     <Newsletter/>
     <Footer/>
    </Container>
  )
}



export default Cart
