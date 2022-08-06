import React from 'react'
import 'semantic-ui-css/semantic.min.css'
import '../styles/globals.css'
import Layout from '../components/Layout.js'

function MyApp({ Component, pageProps }) {//esta es la entrada de nuestra app
  return (
    <Layout>
      <Component  {...pageProps}/>
    </Layout>
  )
}

export default MyApp
