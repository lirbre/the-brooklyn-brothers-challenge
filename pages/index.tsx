import React, { ChangeEvent, useMemo, useState } from 'react';
import Image from 'next/image';
import { NextSeo } from 'next-seo';
import { FaGithub } from 'react-icons/fa';
import data from '../data/productsCategory.json';

interface DataProps {
  name: string;
  shortDescription: string;
  id: string;
  images: {
    alt: string;
    asset: {
      url: string;
    };
  }[];
  category: {
    _id: string;
    name: string;
  };
}

type CategoryType = 'all' | 'alcoholengel' | 'aerosol' | 'barra' | 'jabónlíquido' | 'jabónbarra' | 'alcoholenspray' | 'alcoholenaerosol' | 'talco';

export default function Home() {
  const [category, setCategory] = useState<CategoryType>('all');

  const handleCategory = (e: ChangeEvent<HTMLSelectElement>) =>
    setCategory(e.target.value as CategoryType);

  const memoizedMap = useMemo(
    () =>
      data.data.nodes.map((item: DataProps, i: number) => {
        if (
          item.category.name.toLowerCase().split(' ').join('') !== category &&
          category !== 'all'
        )
          return <></>;

        return (
          <div key={i} className="px-5 py-2 rounded-md bg-gray-100 flex gap-2 items-center justify-between">
            <Image src={item.images[0].asset.url} alt={item.images[0].alt} height={50} width={50}/>
            <small>{item.name}</small>
          </div>
        );
      }),
    [category],
  );

  return (
    <>
      <NextSeo
        title="TBB - Sorting"
        description="This is description"
        openGraph={{
          url: 'https://tbb-challenge.vercel.app/',
          title: 'TBB - Sorting',
          description: 'A React challenge about sorting data',
          images: [
            {
              url: '/aaa',
              width: 800,
              height: 600,
              alt: 'bg',
            },
          ],
          site_name: 'TBB - Sorting',
          locale: 'en',
        }}
      />

      <div className="border-b border-gray-300 mb-5 shadow-md sticky top-0 z-10 bg-gray-300">
        <div className="container mx-auto px-5">
          <div className="flex justify-between items-center py-5 space-x-3">
            <div className="text-2xl text-gray-700 md:block hidden">
              The Brooklyn Brothers
            </div>

            <select
              placeholder="category"
              className="md:w-1/4 w-3/4 h-8 rounded-sm shadow-md cursor-pointer px-2 bg-gray-100"
              value={category}
              onChange={(e) => handleCategory(e)}
            >
              <option value="all">All</option>
              <option value="aerosol">Aerosol</option>
              <option value="alcoholengel">Alcool em Gel</option>
              <option value="barra">Barra</option>
              <option value="jabónlíquido">Sabão Líquido</option>
              <option value="jabónbarra">Sabão Barra</option>
              <option value="alcoholenspray">Alcool em Spray</option>
              <option value="alcoholenaerosol">Alcool em Aerosol</option>
              <option value="talco">Talco</option>
            </select>

            <div
              className="cursor-pointer"
              onClick={() =>
                window.open(
                  'https://github.com/lirbre/the-brooklyn-brothers-challenge',
                )
              }
            >
              <FaGithub className="text-2xl" />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-5 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {memoizedMap}
        </div>
      </div>
    </>
  );
}
