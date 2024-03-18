import React, { useState } from 'react'
import { CiCirclePlus } from "react-icons/ci";
import { CiCircleMinus } from "react-icons/ci";
import { CiCircleRemove } from "react-icons/ci";

let CartProduct=((props)=>{
    const { storage, data } = props
    let defaultstorage=JSON.parse(localStorage.getItem('yourcart'))
    let amount=storage?.amount

    let subtotal=(data?.price) * (storage?.amount)
    let countCart = (type) => {
        let findProduct = defaultstorage.findIndex((it) => it.id === storage?.id);
        if (type === 'plus') {
            defaultstorage[findProduct].amount = amount + 1;
            localStorage.setItem('yourcart', JSON.stringify(defaultstorage));
            window.location.reload()
        } else if (type === 'minius' && amount > 1) {
            defaultstorage[findProduct].amount = amount - 1;
            localStorage.setItem('yourcart', JSON.stringify(defaultstorage));
            window.location.reload()
        }
    };
    
    return (
        <div className="cart_item">
            <div className="cart-product">
                <div className="cart_item_img">
                    <img
                        src={storage?.img}
                        alt="product"
                    />
                </div>
                <p>{data?.productName}</p>
            </div>
            <div className="cart_item_info">
                <p className="price">Price: ${data?.price}</p>
                <div className="cart_item_quantity">
                    <span className="amount" onClick={() => countCart('minius')}><CiCircleMinus /></span>
                    <p>{amount}</p>
                    <span className="amount" onClick={() => countCart('plus')}><CiCirclePlus /></span>
                </div>
            </div>
            <p className="subtotal">Price: ${subtotal}</p>
            <span className="delete-cart"><CiCircleRemove /></span>
        </div>
    )
})
export default CartProduct