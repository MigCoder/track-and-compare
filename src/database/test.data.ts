import { Listing } from '../models/listing'
import * as img1 from '../assets/imgs/1.jpg'
import * as img2 from '../assets/imgs/2.jpg'
import * as img3 from '../assets/imgs/3.jpg'
import * as img4 from '../assets/imgs/4.jpg'
import * as img5 from '../assets/imgs/5.jpg'
import * as img6 from '../assets/imgs/6.jpg'

export const TestData: Listing[] = [
  {
    name: 'Property A',
    price: 5000,
    size: 2000,
    developer: 'Universal Building Company',
    address: 'Central District, Street 66',
    features: [
      'Pet friendly',
      'Cloak room'
    ],
    medias: [img1]
  },
  {
    name: 'Property B',
    price: 5000,
    size: 2000,
    features: [
      'Pet friendly',
      'Cloak room'
    ],
    medias: [img2]
  },
  {
    name: 'Property C',
    price: 5000,
    size: 2000,
    features: [
      'Pet friendly',
      'Cloak room'
    ],
    medias: [img3]
  },
  {
    name: 'Property D',
    price: 5000,
    size: 2000,
    features: [
      'Pet friendly',
      'Cloak room'
    ],
    medias: [img4]
  },
  {
    name: 'Property E',
    price: 5000,
    size: 2000,
    features: [
      'Pet friendly',
      'Cloak room'
    ],
    medias: [img5]
  },
  {
    name: 'Property F',
    price: 5000,
    size: 2000,
    features: [
      'Pet friendly',
      'Cloak room'
    ],
    medias: [img6]
  }
]

export function getListingByName(name: string): Listing {
  return TestData.find(x => x.name === name)!
}
