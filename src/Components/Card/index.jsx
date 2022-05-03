import "./style.css";

export function Card(props) {
  return (
    <div className="card">
      <strong>{props.name}</strong>
      <small>{props.time}</small>
      <small>{props.age}</small>
    </div>
  );
}
