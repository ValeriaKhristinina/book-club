import './thumbler.scss';

type ThumblerProps = {
  booleanValue: boolean
}

function Thumbler({booleanValue}:ThumblerProps): JSX.Element {
  return (
    <div className="thumbler">
      <label className="switch">
        <input type="checkbox" defaultChecked={booleanValue} />
        <span className="slider round"></span>
      </label>
    </div>
  )
}

export default Thumbler