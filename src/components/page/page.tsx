import React from "react"
import Header from '../header/header';
import Footer from '../footer/footer';

type PageProps = {
  children: React.ReactNode,
};

function Page({ children }: PageProps): JSX.Element {
  return (
    <React.Fragment>
      <Header />
      {children}
      <Footer />
    </React.Fragment>
  )
}

export default Page