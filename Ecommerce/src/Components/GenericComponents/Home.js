import React, { useContext } from 'react'
import { UserContext } from '../Contexts/CurrentUserContext';
import { NavLink } from 'react-router-dom';
import { ProductCard } from './ProductCard';
import img from "../../filles/hats.jpg"
import sneakers from "../../filles/sneakers.jpg"
import jackets from "../../filles/jackets.jpg"
import { ItemCard } from './ItemCard';
import SHOP_DATA from '../../Helper/data';
import { useSelector } from 'react-redux';

const ProductArray = [
  {
    img: img,
    name: "Hats",
    data: SHOP_DATA.hats,
    id: 'hats'
  },
  {
    img: sneakers,
    name: "Sneakers",
    data: SHOP_DATA.sneakers,
    id: 'sneakers'
  },
  {
    img: jackets,
    name: "Jackets",
    data: SHOP_DATA.jackets,
    id: 'jackets'
  }
]

export function Home() {
  const { currentUserAdmin } = useContext(UserContext);
  const state = useSelector((state) => state.cart)
  console.log(state);
  return (
    <section className="bg-gray-900 h-full flex justify-center items-center">
      <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl lg:text-6xl text-white">Tst Ecommerce</h1>
        <p className="mb-8 text-lg font-normal lg:text-xl sm:px-16 xl:px-48 text-gray-400">Effortlessly organize Products with the intuitive Product Manager App.</p>
        <div className="flex flex-wrap gap-2 justify-center">
          {
            ProductArray.map(element => {
              return (
                <ProductCard
                  img={element.img}
                  data={element.data}
                  name={element.name}
                  id={element.id}
                />
              )
            })
          }
        </div>
      </div>
    </section>
  )
}
