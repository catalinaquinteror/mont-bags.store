import { Banner, BannerContent, BannerImage, BannerLink } from '@faststore/ui'
// import { ButtonLink } from 'src/components/ui/Button'
// import type { HTMLAttributes } from 'react'

import Section from '../Section'
import styles from './banner-main.module.scss'

export type BannerMainProps = {
  href: string
  alt: string
  classBanner: string
  text?: string
}

function BannerMain({
  // title,
  // url,
  href,
  // // alt,
  classBanner,
  text,
}: BannerMainProps) {
  return (
    <Section className="layout__section">
      <Banner
        variant="horizontal"
        className={styles.fsBannerDescription}
        data-fs-banner-description={classBanner}
      >
        <BannerContent data-fs-banner-description-content={classBanner}>
          {text}
        </BannerContent>
        <BannerLink data-fs-banner-description-link>
          <a href={href}>
            <BannerImage>{/* <img src={url} alt={alt}/> */}</BannerImage>
          </a>
          {/* <ButtonLink href={''}>
            </ButtonLink> */}
        </BannerLink>
      </Banner>
    </Section>
  )
}

export default BannerMain
