import styled from "styled-components"

const Container = styled.div`
height: 30px;
background-color:teal;
color:white;
align-items:center;
font-size : 14px;
font-weight: 500;
display:flex;
justify-content:center;
`

const Announcement = () => {
  return (
    <div>
      <Container>
        Super Deal! Free Shipping Over $50
      </Container>
    </div>
  )
}

export default Announcement
