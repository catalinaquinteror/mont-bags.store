import 'src/styles/pages/homepage.scss'

import { graphql } from 'gatsby'
import { GatsbySeo, JsonLd } from 'gatsby-plugin-next-seo'
import { mark } from 'src/sdk/tests/mark'
import type { PageProps } from 'gatsby'
import type { HomePageQueryQuery } from '@generated/graphql'
import RenderPageSections from 'src/components/cms/RenderPageSections'
import { getCMSPageDataByContentType } from 'src/cms/client'
import type { ContentData } from '@vtex/client-cms'
import { useSession } from 'src/sdk/session'
import BannerMain from 'src/components/sections/BannerMain'
import BannerDescription from 'src/components/sections/BannerDescription'
import BannerCategory from 'src/components/sections/BannerCategory'
import BannerBlog from 'src/components/sections/BannerBlog'
// import BannerText from 'src/components/sections/BannerText'
// import Newsletter from 'src/components/sections/Newsletter'

export type Props = PageProps<
  HomePageQueryQuery,
  unknown,
  unknown,
  { cmsHome: ContentData }
>

function Page(props: Props) {
  const {
    data: { site },
    serverData: { cmsHome },
  } = props

  const { locale } = useSession()

  const title = site?.siteMetadata?.title ?? ''
  const siteUrl = `${site?.siteMetadata?.siteUrl}`

  return (
    <>
      {/* SEO */}
      <GatsbySeo
        title={title}
        description={site?.siteMetadata?.description ?? ''}
        titleTemplate={site?.siteMetadata?.titleTemplate ?? ''}
        language={locale}
        canonical={siteUrl}
        openGraph={{
          type: 'website',
          url: siteUrl,
          title: title ?? '',
          description: site?.siteMetadata?.description ?? '',
        }}
      />
      <JsonLd
        json={{
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          url: siteUrl,
          potentialAction: {
            '@type': 'SearchAction',
            target: `${siteUrl}/s/?q={search_term_string}`,
            'query-input': 'required name=search_term_string',
          },
        }}
      />

      {/*
        WARNING: Do not import or render components from any
        other folder than '../components/sections' in here.

        This is necessary to keep the integration with the CMS
        easy and consistent, enabling the change and reorder
        of elements on this page.

        If needed, wrap your component in a <Section /> component
        (not the HTML tag) before rendering it here.
      */}
      <RenderPageSections sections={cmsHome?.sections} />
      {/* <BannerText /> */}
      <BannerMain href="" alt="" classBanner="" />
      <BannerDescription
        text="ERES LO QUE LLEVAS DENTRO
Llega un momento en el que hay que sacar aquello que te amarra a la cotidianidad. Todas las cosas que pesan y no sirven para nada. Luego, empiezas empacar nuevos sueños y es a ese viaje al que queremos acompañarte. No te vamos a mentir, hay miles de mochilas con las que podrías recorrer el mundo, pero, si te quedas y echas un vistazo a lo que tenemos, prometemos que vas a encontrar algo que va contigo, con tu forma de ver la vida y con el espacio perfecto para llevar todo lo que eres.
¡Bienvenid@!"
        url="https://mont.com.co/wp-content/uploads/2023/02/Avion-4k-01-copia-1024x683.jpg"
        alt="Mujer en Avion"
        classBanner="banner-secundario-home"
      />
      <BannerCategory href="" alt="" classBanner="" />
      {/* Vitrina */}
      <BannerBlog href="" alt="" classBanner="" />
      {/* {console.log('index', cmsHome)} */}
      {/* <Newsletter
        title="Regístrate "
        description="Sé el primero en conocer nuestras novedades y ofertas exclusivas."
      /> */}
    </>
  )
}

export const querySSG = graphql`
  query HomePageQuery {
    site {
      siteMetadata {
        title
        description
        titleTemplate
        siteUrl
      }
    }
  }
`

export async function getServerData() {
  const ONE_YEAR_CACHE = `s-maxage=31536000, stale-while-revalidate`

  const cmsHome = await getCMSPageDataByContentType('home')

  return {
    status: 200,
    props: { cmsHome },
    headers: {
      'cache-control': ONE_YEAR_CACHE,
      'content-type': 'text/html',
    },
  }
}

Page.displayName = 'Page'
export default mark(Page)
