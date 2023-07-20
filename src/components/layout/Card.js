import Button from "./Button";

const Card = (props) => {
    return (
        <div className={`p-2 m-auto ${props.className}`}>
          <div className="card shadow-sm p-2">
            <h4 className="card-title">{ props.title }</h4>
            <div className="card-body">
              {props.children}
            </div>
          </div>
        </div>
    );
}
 
export default Card;