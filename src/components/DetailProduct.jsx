import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { FirebaseContext } from '../contexts/FirebaseProvider'
import { doc, getDoc, onSnapshot, query } from 'firebase/firestore'
import { FaChevronLeft } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";
import { FaCcVisa } from "react-icons/fa";
import { FaCcMastercard } from "react-icons/fa";
import { SiAmericanexpress } from "react-icons/si";
import { FaCcDiscover } from "react-icons/fa";
import { CiStar } from "react-icons/ci";
import { FaCheckCircle } from "react-icons/fa";

export default function DetailProduct() {
  let param = useParams()
  const { messItem } = useContext(FirebaseContext)


  let singledoc = doc(messItem, param.id)
  let [data, setData] = useState(null)
  useEffect(() => {
    let getmess = async () => {
      const data = await getDoc(singledoc)
      setData(data.data())
      setColorImg(data.data().img[0])
    }
    getmess()
  }, [])

  let roundPrice = () => {
    let price = data?.price
    let floor = Math.floor(data?.price * (1 - data?.discount / 100))
    if (price - floor > 0.5) {
      return floor + 1
    } else {
      return floor
    }
  }
  let renderCategories = () => {
    let Categories = []
    for (let i = 0; i < data?.categories.length; i++) {
      Categories.push(data.categories[i])
    }
    return <span className="categories-header-2">{Categories.join(', ')}</span>
  }

  let [colorImg, setColorImg] = useState('')
  let changeColor = (color) => {
    setColorImg(color)
  }

  let [count, setCount] = useState(1)
  let countCart = () => {
    setCount(count++)
  }

  let handleChange = (e) => {
    return e.target.value
  }

  let [move, setMove] = useState(0)
  let test = (id) => {
    setMove(id)
  }
  console.log(move)
  return (
    <div className="bg-product">
      <div className='product-detail'>
        <div className="detail-section">
          <div className="product-img">
            <img src={colorImg} alt="item" />
            <div className="another-img">
              <img src={data?.img[1]} alt="item" />
              <img src={data?.img[2]} alt="item" />
            </div>
          </div>
          <div className="product-buy">
            <div className="header-detail">
              <p className="categories-header">Home / {data?.categories[0]} / {data?.productName}</p>
              <div className="next-product-section">
                <button><FaChevronLeft /></button>
                <button><FaChevronRight /></button>
              </div>
            </div>
            {renderCategories()}
            <p className='product-name'>{data?.productName}</p>
            <h4 className='product-price'>${data?.price}.00 - ${roundPrice()}.00</h4>
            <span className='free-ship'> & Free Shipping</span>
            <p className="product-description">{data?.description}</p>
            <div className="color-section">
              <div className="match-color" style={{ backgroundColor: `${data?.productColor[0].colorCode}` }} onClick={() => changeColor(`${data?.img[0]}`)}></div>
              <div className="match-color" style={{ backgroundColor: `${data?.productColor[1].colorCode}` }} onClick={() => changeColor(`${data?.img[1]}`)}></div>
              <div className="match-color" style={{ backgroundColor: `${data?.productColor[2].colorCode}` }} onClick={() => changeColor(`${data?.img[2]}`)}></div>
            </div>
            <div className="add-cart-section">
              <button onClick={() => countCart('minius')}>-</button>
              <input type="text" value={count} onChange={handleChange} />
              <button onClick={() => countCart('plus')}>+</button>
              <button className='addtocart'>ADD TO CART</button>
            </div>
            <div className="product-meta">
              <span>SKU: N/A</span>
              <span>Categories: {renderCategories()}</span>
            </div>
            <div className="bank-list">
              <span className='title-bank'>Guaranteed Safe Checkout</span>
              <div className="bank-content">
                <div className="bank-type bank-visa"><FaCcVisa /></div>
                <div className="bank-type bank-mastercard"><FaCcMastercard /></div>
                <div className="bank-type bank-American"><SiAmericanexpress /></div>
                <div className="bank-type bank-discover"><FaCcDiscover /></div>
              </div>
            </div>
            <div className="freeShip-section">
              <b>Free shipping on orders over $50!</b>
              <p><FaCheckCircle /> No-Risk Money Back Guarantee!</p>
              <p><FaCheckCircle /> No Hassle Refunds</p>
              <p><FaCheckCircle /> Secure Payments</p>
            </div>
          </div>
        </div>
        <div className="description-section">
          <h4 className='title-description'>Description</h4>
          <div className="few-word">
            <h4 className="title">A few words about the product</h4>
            <div className="test">
              <CiStar className={move >= 1 ? 'active' : "none"} onMouseMove={() => test(1)} />
              <CiStar className={move >= 1 ? 'active' : "none"} onMouseMove={() => test(2)} />
              <CiStar className={move >= 1 ? 'active' : "none"} onMouseMove={() => test(3)} />
              <CiStar className={move >= 1 ? 'active' : "none"} onMouseMove={() => test(4)} />
              <CiStar className={move >= 1 ? 'active' : "none"} onMouseMove={() => test(5)} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
