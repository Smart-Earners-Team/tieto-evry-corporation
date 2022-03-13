import React from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import { StaticQuery, graphql } from 'gatsby';
import ogImage from '../images/tteb-finance-og-image.jpg';
import twitterImage from '../images/tteb-finance-twitter-image.jpg';

const query = graphql`
  query GetSiteMetadata {
    site {
      siteMetadata {
        title
        description
        siteUrl
      }
    }
  }
`;

function SEO({ meta, title, description, slug, lang = 'en' }) {
  return (
    <StaticQuery
      query={query}
      render={(data) => {
        const { siteMetadata } = data.site;
        const metaDescription = description || siteMetadata.description;
        const metaImages = { og: ogImage, twitter: twitterImage };
        const getMetaImageUrl = (image) => `${siteMetadata.siteUrl}${image}`;
        const url = `${siteMetadata.siteUrl}${slug}`;
        const twitterUrl = "@TTEBfinance";
        return (
          <Helmet
            htmlAttributes={{ lang }}

            {...(title
              ? {
                titleTemplate: `%s — ${siteMetadata.title}`,
                title,
              }
              : {
                title: `${siteMetadata.title} — Official website`,
              })}
            meta={[
              {
                name: 'description',
                content: metaDescription,
              },
              {
                property: 'og:url',
                content: url,
              },
              {
                property: 'og:title',
                content: title || siteMetadata.title,
              },
              {
                property: 'og:description',
                content: metaDescription,
              },
              {
                name: 'twitter:card',
                content: 'summary',
              },
              {
                name: 'twitter:creator',
                content: twitterUrl,
              },
              {
                name: 'twitter:title',
                content: title || siteMetadata.title,
              },
              {
                name: 'twitter:description',
                content: metaDescription,
              },
            ]
              .concat(
                [
                  {
                    property: 'og:image',
                    content: getMetaImageUrl(metaImages.og),
                  },
                  {
                    name: 'twitter:image',
                    content: getMetaImageUrl(metaImages.twitter),
                  },
                ]
              )
              .concat(meta)}
          />
        );
      }}
    />
  );
}

SEO.defaultProps = {
  meta: [],
  title: '',
  slug: '',
};

SEO.propTypes = {
  description: PropTypes.string,
  image: PropTypes.string,
  meta: PropTypes.array,
  slug: PropTypes.string,
  title: PropTypes.string.isRequired,
};

export default SEO;
