import ProductionCard from '../ProductionCard/ProductionCard'
import './styles.css'

const ProductionsContainer = ({productions}) => {
  return (
    <div className='productions-container'>
        <h1 className='productions-heading'><span className='heading-highlight'>F</span>latiron Theater <span className='heading-highlight'>C</span>ompany</h1>
        <section className='card-container'>
          {productions.map(production => <ProductionCard key={production.id} production={production}/>)}
        </section>
    </div>
  )
}
export default ProductionsContainer