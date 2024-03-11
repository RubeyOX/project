  import React, { useContext, useEffect, useState } from 'react'
  import { useParams } from 'react-router-dom'
  import { FirebaseContext } from '../contexts/FirebaseProvider'
  import { doc, getDoc, onSnapshot, query } from 'firebase/firestore'

  export default function DetailProduct() {
    let param=useParams()

    const { messItem } = useContext(FirebaseContext)

    let singledoc = doc(messItem, param.id)
    let [data, setData] = useState(null)
    useEffect(() => {
    let getmess = async () => {
      const data = await getDoc(singledoc)
      setData(data.data())
    }
    getmess()
  }, [])

    console.log(data.img[0])
    return (
      <div className="bg-product">
      <div className='product-detail'>
        <div className="detail-section">
          <div className="product-img">
            {/* <img src={data.img[0]} alt="item" /> */}
            <div className="another-img">
              {/* <img src={data.img[1]} alt="item" /> */}
              {/* <img src={data.img[2]} alt="item" /> */}
            </div>
          </div>
          <div className="product-buy">
            {/* <p className="categories-header">Home / {data.categories[0]} / {data.productName}</p> */}
          </div>
        </div>
      </div>
      </div>
    )
  }
