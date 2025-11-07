import { Metadata } from 'next'

interface SEOProps {
  title?: string
  description?: string
  keywords?: string[]
  image?: string
  url?: string
  type?: 'website' | 'article'
  publishedTime?: string
  modifiedTime?: string
  authors?: string[]
  noindex?: boolean
  nofollow?: boolean
}

const defaultMetadata = {
  siteName: 'EAR Lab',
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  title: 'EAR Lab - Embedded, Autonomous & Robotics Research',
  description:
    'Leading research laboratory specializing in embedded systems, autonomous vehicles, and robotics. Expert consultation, cutting-edge projects, and innovative solutions.',
  keywords: [
    'robotics',
    'embedded systems',
    'autonomous vehicles',
    'AI',
    'machine learning',
    'research',
    'innovation',
    'technology',
    'automation',
    'IoT',
  ],
  image: '/og-image.jpg',
  twitterHandle: '@earlab',
}

export function generateSEOMetadata({
  title,
  description,
  keywords = [],
  image,
  url,
  type = 'website',
  publishedTime,
  modifiedTime,
  authors,
  noindex = false,
  nofollow = false,
}: SEOProps = {}): Metadata {
  const fullTitle = title
    ? `${title} | ${defaultMetadata.siteName}`
    : defaultMetadata.title

  const fullDescription = description || defaultMetadata.description
  const fullKeywords = [...defaultMetadata.keywords, ...keywords]
  const fullImage = image || defaultMetadata.image
  const fullUrl = url || defaultMetadata.siteUrl

  const metadata: Metadata = {
    title: fullTitle,
    description: fullDescription,
    keywords: fullKeywords,
    authors: authors ? authors.map((name) => ({ name })) : [{ name: defaultMetadata.siteName }],
    creator: defaultMetadata.siteName,
    publisher: defaultMetadata.siteName,
    robots: {
      index: !noindex,
      follow: !nofollow,
      googleBot: {
        index: !noindex,
        follow: !nofollow,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      type,
      siteName: defaultMetadata.siteName,
      title: fullTitle,
      description: fullDescription,
      url: fullUrl,
      images: [
        {
          url: fullImage,
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
      ...(type === 'article' && publishedTime
        ? {
            publishedTime,
            modifiedTime,
            authors,
          }
        : {}),
    },
    twitter: {
      card: 'summary_large_image',
      site: defaultMetadata.twitterHandle,
      creator: defaultMetadata.twitterHandle,
      title: fullTitle,
      description: fullDescription,
      images: [fullImage],
    },
    alternates: {
      canonical: fullUrl,
    },
    metadataBase: new URL(defaultMetadata.siteUrl),
  }

  return metadata
}

interface StructuredDataProps {
  type: 'Organization' | 'Article' | 'WebPage' | 'BreadcrumbList' | 'FAQPage'
  data: Record<string, any>
}

export function generateStructuredData({
  type,
  data,
}: StructuredDataProps): string {
  const baseContext = {
    '@context': 'https://schema.org',
    '@type': type,
  }

  const structuredData = {
    ...baseContext,
    ...data,
  }

  return JSON.stringify(structuredData)
}

// Organization schema for the entire site
export const organizationSchema = generateStructuredData({
  type: 'Organization',
  data: {
    name: defaultMetadata.siteName,
    url: defaultMetadata.siteUrl,
    logo: `${defaultMetadata.siteUrl}/logo.png`,
    description: defaultMetadata.description,
    sameAs: [
      'https://twitter.com/earlab',
      'https://linkedin.com/company/earlab',
      'https://github.com/earlab',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      email: 'contact@earlab.com',
    },
  },
})

// Generate Article schema for blog posts
export function generateArticleSchema({
  title,
  description,
  url,
  image,
  publishedTime,
  modifiedTime,
  authors,
}: {
  title: string
  description: string
  url: string
  image: string
  publishedTime: string
  modifiedTime?: string
  authors: string[]
}): string {
  return generateStructuredData({
    type: 'Article',
    data: {
      headline: title,
      description,
      image,
      datePublished: publishedTime,
      dateModified: modifiedTime || publishedTime,
      author: authors.map((name) => ({
        '@type': 'Person',
        name,
      })),
      publisher: {
        '@type': 'Organization',
        name: defaultMetadata.siteName,
        logo: {
          '@type': 'ImageObject',
          url: `${defaultMetadata.siteUrl}/logo.png`,
        },
      },
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': url,
      },
    },
  })
}

// Generate Breadcrumb schema
export function generateBreadcrumbSchema(
  items: Array<{ name: string; url: string }>
): string {
  return generateStructuredData({
    type: 'BreadcrumbList',
    data: {
      itemListElement: items.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        item: item.url,
      })),
    },
  })
}
