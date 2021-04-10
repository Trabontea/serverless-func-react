import React, {useEffect, useState} from 'react';
import axios from "axios";
import{ Link, useParams } from 'react-router-dom'

const url = '/api/products';
const Product = () => {
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState(null);
  // id of product
  const { productID } = useParams();
  // data {productID: "rec6dj4OzRY0remcr"}
  // console.log('id', productID);

  const fetchData = async() => {
    try {
      const { data } = await axios.get(`${url}?id=${productID}`);
      setProduct(data);
    } catch(error) {

    }
    setLoading(false)
  }

  useEffect(()=>{
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (loading) {
    return (
        <section className="section section-center">
          <h2>Loading ...</h2>
        </section>
    )
  }

  const { fields } = product;
  const {name,  desc, price, image} = fields;
  // console.log(name)

  return (
      <section className="section section-center">
        <Link to="/" className='link'>Back To Products</Link>
        <div>
          <div className="title">
            <h2>{name}</h2>
            <div className="title-underline"/>
          </div>

          <article className='single-product'>
            <img className="single-product-img"
                 src={image[0].url}
                 alt={name}
            />
            <div>
              <h5>{name}</h5>
              <h5 className="price"><span>Price: </span>${price}</h5>
              <p className='description'>{desc}</p>
            </div>
          </article>

        </div>
      </section>
  )
}

export default Product