import React from 'react'
import Banner from '@component/Banner/Banner'
import Search from '@component/Search/Search'
import Category from '@component/Category/Category'
import BooksAll from '@component/BooksAll/BooksAll'
import BgImg from '@component/bg-img/BgImg'

const Home = () => {
  return (
    <main>
      <Banner />
      <Search />
      <BgImg />
      <Category />
      <BooksAll />

      
    </main>
  )
}

export default Home