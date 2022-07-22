import React, { ChangeEvent, useMemo, useState } from 'react';
import Image from 'next/image';
import { NextSeo } from 'next-seo';
import { FaGithub } from 'react-icons/fa';
import data from '../data/data.json';

interface DataProps {
  name: string;
  shortDescription: string;
  id: string;
  images: {
    alt: string;
    src: string;
  }[];
  category: {
    name: string;
    id: string;
  };
}

type CategoryType = 'all' | 'rollon' | 'aerosol' | 'stick';

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
          <div key={i} className="px-5 py-5 rounded-md bg-gray-100">
            {/* API returns 404 - image not found with this src */}
            {/* <Image src={item.images[0].src} alt={item.images[0].alt} height={50} width={50}/> */}
            <small>{item.name}</small>
            <div className="text-sm text-gray-500"></div>
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
          locale: 'en'
        }}
      />

      <div className="border-b border-gray-300 mb-5 shadow-md">
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
              <option value="rollon">Roll On</option>
              <option value="stick">Stick</option>
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

      <div className="container mx-auto px-5">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {memoizedMap}
        </div>
      </div>
    </>
  );
}
