import type { NextPage } from 'next'
import { Html, Head, Main, NextScript, type DocumentProps } from 'next/document'

const Document: NextPage<DocumentProps> = () => (
  <Html lang="en">
    <Head>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
      />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
      />
    </Head>
    <body>
      <Main />
      <NextScript />
    </body>
  </Html>
)

export default Document
