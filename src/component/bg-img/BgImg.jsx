import React from 'react'
import img from '@i/bg-img.png'
import "./BgImg.scss"

const BgImg = () => {
  return (
    <section className='bgimg'>
        <img src={img} alt="" />
    </section>
  )
}

export default BgImg