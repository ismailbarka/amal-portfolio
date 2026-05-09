export interface Project {
  id: string
  slug: string
  title: string
  category: 'residential' | 'villa' | 'office' | 'bank' | 'kitchen' | 'furniture'
  image: string
  description: string
  location?: string
  year?: number
  featured?: boolean
  images?: string[]
  challenge?: string
  solution?: string
  designProcess?: string
  materials?: string[]
}

export interface Service {
  id: string
  icon: string
  title: string
  description: string
  details: string[]
  image?: string
}

export interface Testimonial {
  id: string
  name: string
  role: string
  content: string
  image?: string
}

export interface Reference {
  id: string
  name: string
  type: 'bank' | 'corporate' | 'hospitality'
  description: string
}
