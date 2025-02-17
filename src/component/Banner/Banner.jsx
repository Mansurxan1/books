import React from 'react'
import './Banner.scss'
import banner from "@i/banner.jpg"

const Banner = () => {
  return (
    <section className="banner">
        <div className="container">
            <div className="banner__box">
                <img src={banner} alt={banner} />
            </div>
        </div>
    </section>
  )
}

export default Banner