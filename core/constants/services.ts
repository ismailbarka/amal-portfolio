import { Service } from './types'

export const services: Service[] = [
  {
    id: 'interior-design',
    icon: '✨',
    title: 'Interior Design',
    description: 'Complete interior design solutions from concept to implementation',
    image: '/images/hero-main.png',
    details: [
      'Space planning and layout optimization',
      'Color and material selection',
      'Lighting design and integration',
      'Furnishing and accessories curation',
    ],
  },
  {
    id: 'concept-3d',
    icon: '🎨',
    title: '2D / 3D Concept',
    description: 'Detailed visualization of design concepts using latest technology',
    image: '/images/design-process.jpg',
    details: [
      ' 2D floor plans and layouts',
      '3D renderings and walkthroughs',
      'Virtual reality presentations',
      'Presentation materials',
    ],
  },
  {
    id: 'site-supervision',
    icon: '👁️',
    title: 'Site Supervision / Follow-up',
    description: 'Professional project management and site supervision throughout execution',
    image: '/images/hall-office.jpg',
    details: [
      'Quality control and inspection',
      'Timeline management',
      'Budget monitoring',
      'Contractor coordination',
    ],
  },
  {
    id: 'turnkey-renovation',
    icon: '🔨',
    title: 'Turnkey Renovation',
    description: 'Complete renovation and implementation services from start to finish',
    image: '/images/villa-luxury.png',
    details: [
      'Full project coordination',
      'Construction management',
      'Material sourcing',
      'Installation and finishing',
    ],
  },
  {
    id: 'woodwork',
    icon: '🪵',
    title: 'Woodwork / Joinery',
    description: 'Custom woodwork and joinery solutions for bespoke interiors',
    image: '/images/furniture.jpg',
    details: [
      'Custom cabinetry design',
      'Built-in furniture solutions',
      'Fine joinery and detailing',
      'Material selection and finishing',
    ],
  },
  {
    id: 'upholstery',
    icon: '🛋️',
    title: 'Upholstery / Tapisserie',
    description: 'Professional upholstery and fabric selection for furniture and interiors',
    image: '/images/residential.jpg',
    details: [
      'Furniture upholstery',
      'Fabric and material sourcing',
      'Customization and restoration',
      'Textile consultation',
    ],
  },
  {
    id: 'furniture-expertise',
    icon: '🪑',
    title: 'Furniture Expertise',
    description: 'Comprehensive furniture selection and curation services',
    image: '/images/project-detail-1.jpg',
    details: [
      'Furniture sourcing and procurement',
      'Brand consultation',
      'Space-specific recommendations',
      'Budget optimization',
    ],
  },
  {
    id: 'kitchen-design',
    icon: '🍳',
    title: 'Kitchen Design',
    description: 'Bespoke kitchen design combining functionality with aesthetics',
    image: '/images/kitchen-bespoke.png',
    details: [
      'Layout optimization',
      'Appliance integration',
      'Custom cabinetry',
      'Material and finish selection',
    ],
  },
]

export const getServiceById = (id: string) =>
  services.find(s => s.id === id)
