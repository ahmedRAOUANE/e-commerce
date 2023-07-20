

// css style
import style from './CardList.module.css'

// components
import Card from "../layout/Card";
import Button from '../layout/Button';

const CardList = () => {
    


  return (
    <div className={`d-flex ${style.cardHolder}`}>
      {/* {Object.keys(categorizedData).map(product => (
        <Card className={`${style.card}`} key={product.id} id={product.id} title={product.title}>
              {console.log(product)}
              <img src={product.image} alt='img' />
              <p>{product.description}</p>
              <small className='d-flex align-items-center justify-content-between'>
                  <p className='d-flex align-items-center m-0'>{product.price}</p>
                  <Button>show more...</Button>
              </small>
            </Card>
        )
        )} */}
    </div>
  )
}

export default CardList