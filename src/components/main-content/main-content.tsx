import './main-content.css'

function MainContent(): JSX.Element {
  return (
    <section className="main-content container">
      <section className="main-content__block next-meeting">
        <h3 className="main-content__title">Next meeting:</h3>
        <div>TIME</div>
      </section>
      <section className="main-content__block next-host">
        <h3 className="main-content__title">Who choose book next:</h3>
        <div>NAME</div>
      </section>
      <section className="main-content__block last-book">
        <h3 className="main-content__title">Last discussed book:</h3>
        <div>BOOK_NAME</div>
      </section>
      <section className="main-content__block raiting">
        <h3 className="main-content__title">Average raiting last book:</h3>
        <div className="raiting">RAITING</div>
      </section>
    </section>
  )
}

export default MainContent;