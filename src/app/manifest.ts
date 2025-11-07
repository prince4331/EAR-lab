import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'EAR Lab - Embedded, Autonomous & Robotics Research',
    short_name: 'EAR Lab',
    description: 'Leading research laboratory specializing in embedded systems, autonomous vehicles, and robotics.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#0f172a',
    icons: [
      {
        src: '/favicon.ico',
        sizes: '48x48',
        type: 'image/x-icon',
      },
    ],
    categories: ['technology', 'research', 'robotics', 'education'],
  }
}
