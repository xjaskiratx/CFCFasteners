import { MetadataRoute } from 'next'
import productsData from '@/data/products.json'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://cfcfasteners.com'
  
  // Static routes
  const routes = ['', '/about', '/contact', '/catalog'].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  // Dynamic product routes
  const productRoutes = (productsData as any[]).map((product) => ({
    url: `${baseUrl}/product/${product.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }))

  return [...routes, ...productRoutes]
}
