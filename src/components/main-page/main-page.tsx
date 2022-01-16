import Header from '../header/header';
import MainContent from '../main-content/main-content';


function MainPage(): JSX.Element {

  return (
    <section className="main-page">
      <Header />
      <MainContent />
    </section>
  )
}

export default MainPage;