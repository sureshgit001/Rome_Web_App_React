import Carousel from 'react-bootstrap/Carousel';
import React from 'react';

function CarouselCom() {
  return (
   <div className="container">
    <Carousel>
      <Carousel.Item interval={2500}>
        <img src="https://img.freepik.com/free-photo/grilled-prawn-salad-fresh-healthy-gourmet-generated-by-ai_188544-18616.jpg?t=st=1698762314~exp=1698765914~hmac=21661e3ab923df5a7e2cb5c97ef93beba2dac8fb8ecc7262482a6ebea2472ce7&w=900" alt='Tandoori Prawns'/>
        <Carousel.Caption>
          <h2>Tandoori Prawns</h2>
          <p >Spiced grilled prawns with a smoky flavor.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={2500}>
        <img src="https://img.freepik.com/free-photo/top-view-spicy-chicken-with-lettuce-lemon-pan-table_181624-61795.jpg?w=900&t=st=1698762286~exp=1698762886~hmac=ee63c1e78d785b176d11c1d7a97af92f4c2711c7f6bdc6917796e7a982d69758" alt='Chicken 65' />
        <Carousel.Caption>
          <h2>Chicken 65</h2>
          <p>Spicy and tangy fried chicken bites.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={2500}>
        <img src="https://img.freepik.com/free-photo/meat-dish-with-vegetables_144627-18115.jpg?w=900&t=st=1698762183~exp=1698762783~hmac=4cd1a78548bd7f09f763ef7505a2f851bf8c3f7928fb3645ea795e281f70f77d" alt='Chicken Chilli Fry'/>
        <Carousel.Caption>
          <h2>Chicken Chilli Fry</h2>
          <p>
          Chicken cooked with green chilies and spices.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
    </div>
  );
}

export default React.memo(CarouselCom);