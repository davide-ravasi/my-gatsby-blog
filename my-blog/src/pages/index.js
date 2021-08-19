import * as React from "react"
import { Link, graphql } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

import Layout from "../components/layout"
import Seo from "../components/seo"

export const query = graphql`
  query MyQuery {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          id
          frontmatter {
            date
            description
            title
          }
          excerpt
          html
        }
      }
      totalCount
    }
  }
`

export default ({ data }) => (
  <Layout>
    <Seo title="Home" />
    <div>
      <h1>Davide's thoughts</h1>
      <h4>{data.allMarkdownRemark.totalCount}</h4>
      {data.allMarkdownRemark.edges.map(({ node }) => {
        return <div key={node.id}>
          <span>{node.frontmatter.title} - {node.frontmatter.date}</span>
          <p>{node.excerpt}</p>
        </div>
      })}
    </div>
  </Layout>
)
