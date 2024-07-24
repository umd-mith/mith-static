import React from "react"
import { graphql, Link } from "gatsby"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import Layout from "../components/layout"
import Paginator from "../components/paginator"
import SEO from "../components/seo"

import "./post-index.css"

interface Props {
  data: Queries.PostsQuery
}

const PostIndex = ({ data }: Props) => {
  const posts = data.allAirtablePosts.nodes
  const pageCount = data.allAirtablePosts.pageInfo.pageCount

  return (
    <Layout>
      <SEO title="MITH News" />
      <div className="page-news">
        <section className="posts news">
          <div className="page-title">
            <a href="/news/feed.xml" className="icon-rss">
              <FontAwesomeIcon title="News RSS Feed" icon="rss" />
            </a>
            <h1>News</h1>
          </div>

          {posts.map(_post => {
            const post = _post.data!
            const slug = "/news/" + post.slug
            const markdownFile = post.slug + ".md"

            // pick out the markdown file that has the same slug
            const doc = data.allFile.nodes.find(n =>
              n.childMarkdownRemark?.fileAbsolutePath?.match(markdownFile),
            )

            // if there is no doc then we're missing the markdown file for a blog
            // post that is in airtable

            if (!doc) {
              console.warn(`missing markdown post for slug ${post.slug}`)
              // throw new Error(`missing markdown post for slug ${post.slug}`)
              return (
                <article className="post news-post" key={`news-${post.record_id}`}>
                  <h2 className="post-title">
                    <Link to={post.slug!}>{post.post_title}</Link>
                  </h2>
                  <div className="meta">
                    by <span className="author">{post.author_name}</span> on{" "}
                    <time>{post.post_date}</time>
                  </div>
                  <div className="excerpt">Currently unavailable.</div>
                </article>
              )
            }

            return (
              <article className="post news-post" key={`news-${post.record_id}`}>
                <h2 className="post-title">
                  <Link to={slug}>{post.post_title}</Link>
                </h2>
                <div className="meta">
                  by <span className="author">{post.author_name}</span> on{" "}
                  <time>{post.post_date}</time>
                </div>
                <div className="excerpt">
                  {doc.childMarkdownRemark?.excerpt}
                  <Link to={slug} className="read-more">
                    continue reading
                  </Link>
                </div>
              </article>
            )
          })}
        </section>
        <Paginator count={pageCount} path="news" />
      </div>
    </Layout>
  )
}

export const query = graphql`
  query Posts($skip: Int!, $limit: Int!) {
    allAirtablePosts(
      limit: $limit
      skip: $skip
      sort: { data: { post_date: DESC } }
    ) {
      nodes {
        data {
          slug
          record_id
          author_name
          post_title
          post_date(formatString: "MMMM D, YYYY")
        }
      }
      pageInfo {
        pageCount
      }
    }
    allFile(filter: { sourceInstanceName: { eq: "news" } }) {
      nodes {
        childMarkdownRemark {
          excerpt(pruneLength: 250)
          id
          fileAbsolutePath
        }
      }
    }
  }
`

export default PostIndex
