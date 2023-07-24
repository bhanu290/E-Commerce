import { Facebook, Instagram, MailOutlineOutlined, Phone, Pinterest, Room, Twitter } from '@material-ui/icons'
import React from 'react'
import styled from "styled-components"
import {mobile} from "..//responsive"

const Container = styled.div`
display: flex;
${mobile({flexDirection:"column"})}

`
const Left = styled.div`
flex: 1;
display: flex;
flex-direction: column;
padding: 20px;
`
const Logo = styled.h1`
`;

const Desc = styled.p`
margin : 20px 0px;
`;
const SocialIcon = styled.div`
width: 40px;
height: 40px;
border-radius: 50%;
color:white;
background-color: #${props=>props.color};
display: flex;
align-items: center;
margin-right: 20px;
justify-content: center;
`;

const SocialContainer = styled.div`
display: flex;
`;

const Center = styled.div`
flex: 1;
padding: 20px;
${mobile({display:"none"})}
`
const Title = styled.h3`
margin-bottom: 30px;

`
const List = styled.ul`
margin: 0;
padding: 0;
list-style: none;
display: flex;
flex-wrap: wrap;
`
const ListItem = styled.li`
width:50%;
margin-bottom: 10px;
`

const Right = styled.div`
flex: 1;
padding: 20px;
${mobile({backgroundColor:"#fff8f8"})}
`

const ContactItem = styled.div`
margin-bottom: 20px;
display: flex;
align-items: center;
`

const Payment = styled.img`
width: 50%;
`


const Footer = () => {
  return (
    <Container>
      <Left>
        <Logo>PREETHAM.</Logo>
        <Desc>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
        </Desc>
        <SocialContainer >
        <SocialIcon color='385999'>
            <Facebook/>
        </SocialIcon>
        <SocialIcon color='E4405F'>
            <Twitter/>
        </SocialIcon>
        <SocialIcon color='55ACEE'>
            <Instagram/>
        </SocialIcon>
        <SocialIcon color='E60023'>
            <Pinterest/>
        </SocialIcon>
      </SocialContainer>
      </Left>
      
      <Center>
        <Title>Useful Links</Title>
        <List>
        <ListItem>Home</ListItem>
        <ListItem>Cart</ListItem>
        <ListItem>Man Fashion</ListItem>
        <ListItem>Woman Fashion</ListItem>
        <ListItem>Accessories</ListItem>
        <ListItem>My Account</ListItem>
        <ListItem>Order Tracking</ListItem>
        <ListItem>Wishlist</ListItem>
        <ListItem>Terms</ListItem>
        </List>
        
      </Center>
      <Right>
        <Title></Title>
        <ContactItem>
        <Room style={{marginRight:"10px"}}/>IIT BHILAI Campus, Old Dhamtari Road, Sejbahar, Raipur.
        </ContactItem>
        <ContactItem>
        <Phone style={{marginRight:"10px"}}/>+91 9390698628
        </ContactItem>
        <ContactItem>
        <MailOutlineOutlined style={{marginRight:"10px"}}/>contact@bhanupreetham19082002@gmail.com
        </ContactItem>
        <Payment src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAdjZMaC5Fl_hqiYhpcxMcpOZbfklUyzNMqg&usqp=CAU'/>
      </Right>
    </Container>
  )
}

export default Footer
