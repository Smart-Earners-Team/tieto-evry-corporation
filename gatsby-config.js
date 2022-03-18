module.exports = {
  siteMetadata: {
    name: "TTEB.finance",
    siteUrl: "https://tteb.finance",
    title: "TietoEVRY Corporation",
    description: `Audit any solidity based blockchain (eth, bsc, ftm, polygon, etc) smart contract.
      Get your audit today with our super fast processing time and keep your investors happy`,
    socials: [
      { name: "twitter", url: "https://twitter.com/TTEBfinance" },
      { name: "telegramGroup", url: "https://t.me/TietoEVRYlamborghini" },
      { name: "telegramNews", url: "https://t.me/TTEBfinance" },
      { name: "facebook", url: "https://fb.me/TTEBfinance" },
      { name: "redit", url: "https://reddit.com/r/TTEBfinance" },
    ],
  },
  plugins: [
    "gatsby-plugin-image",
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sitemap",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        icon: "src/images/icon.png",
      },
    },
    "gatsby-transformer-remark",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: "./src/images/",
      },
      __key: "images",
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "pages",
        path: "./src/pages/",
      },
      __key: "pages",
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "resources",
        path: "./src/resources/",
      },
      __key: "resources",
    },
    "gatsby-plugin-postcss",
    {
      resolve: `gatsby-plugin-nprogress`,
      options: {
        color: "rgb(37, 99, 235)",
        showSpinner: true,
      },
    },
    {
      resolve: 'gatsby-plugin-layout',
      options: {
        component: require.resolve('./src/components/GlobalAppWrapper.tsx'),
      },
    },
    "gatsby-plugin-netlify"
  ],
};
