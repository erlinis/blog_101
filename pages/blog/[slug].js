import React from 'react';
import { useRouter } from 'next/router';
import Axios from 'axios';

export default function Item({post}) {  
  if (Object.keys(post).length === 0) {
    return null;
  }
  
  return (
    <React.Fragment>
      <h1 dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
      <div dangerouslySetInnerHTML={{ __html: post.content.rendered }}></div>
    </React.Fragment>
  );
}

export function getStaticPaths(){
  return Axios
    .get(`${process.env.HOST_NAME}/wp-json/wp/v2/posts`)
    .then(
      response => {
        const paths = response.data.map(post => `/blog/${post.slug}`);

        return {
          paths: paths,
          fallback: false
        };
    });
}

export function getStaticProps({params}){
  const { slug } = params;
  return Axios.get(`${process.env.HOST_NAME}/wp-json/wp/v2/posts/?slug=${slug}`)
  .then(
    response => {
      return {
        props: {
          post: response.data[0] || {},
        }
      }
    }
  )
}