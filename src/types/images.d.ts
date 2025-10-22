import type { Seller } from './sellers'

export interface RootImages {
  hits: Image[]
  total: number
  totalHits: number
}

export interface ImageData {
  image: string
  height: number
  width: number
  alt: string
  seller: Seller | null
}

export interface Image {
  collections: number
  comments: number
  downloads: number
  id: number
  imageHeight: number
  imageSize: number
  imageWidth: number
  isAiGenerated: boolean
  isGRated: boolean
  isLowQuality: boolean
  largeImageURL: string
  likes: number
  noAiTraining: boolean
  pageURL: string
  previewHeight: number
  previewURL: string
  previewWidth: number
  tags: string
  type: string
  user: string
  userImageURL: string
  userURL: string
  user_id: number
  views: number
  webformatHeight: number
  webformatURL: string
  webformatWidth: number
}
