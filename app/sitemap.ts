import { MetadataRoute } from 'next'

const baseUrl = 'https://www.devadasuhosanna.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    '',
    '/about',
    '/ministries',
    '/pastor',
    '/gallery',
    '/contact',
    '/live',
    '/prayer',
    '/todays-promise',
    '/udayakala-daiva-sandesham',
    '/updates',
  ]

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'daily' : 'weekly',
    priority: route === '' ? 1 : 0.7,
  }))
}
