import Button from "./Button";

const Card = (props) => {
    return (
        <div className={`col-8 col-md-4 p-2 m-auto ${props.className}`}>
          <div className="card shadow-sm p-2">
            <h3 className="card-title">{ props.title }</h3>
            <div className="card-body">
              {props.children}
            </div>
          </div>
        </div>
    );
}
 
export default Card;