import * as React from "react"
import styled from "styled-components"
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
          fields {
            slug
          }
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

const BlogLink = styled(Link)`
  text-decoration: none;
`

const BlogTitle = styled.h3`
  color: blue;
  margin-bottom: 10px;
`

export default ({ data }) => (
  <Layout>
    <Seo title="Home" />
    <div>
      <h1>Davide's thoughts</h1>
      <h4>{data.allMarkdownRemark.totalCount}</h4>
      {data.allMarkdownRemark.edges.map(({ node }) => {
        return <div key={node.id}>
          <BlogLink to={node.fields.slug}>
            <BlogTitle>
              {node.frontmatter.title} - {node.frontmatter.date}
            </BlogTitle>
          </BlogLink>
          <p>{node.excerpt}</p>
        </div>
      })}
    </div>
  </Layout>
)
