import './card-wrapper.scss';

type CardWrapperProps = {
  children: React.ReactElement,
  additionalClass?: string
};

function CardWrapper({ children, additionalClass }: CardWrapperProps): JSX.Element {
  return (
    <section className={`card-wrappper ${additionalClass}`}>
      {children}
    </section>
  )
}

export default CardWrapper;