import ProductionCard from '../ProductionCard/ProductionCard'
import './styles.css'

const ProductionsContainer = ({productions}) => {
  return (
    <div className='productions-container'>
        <h1 className='productions-heading'><span className='heading-highlight'>F</span>latiron Theater <span className='heading-highlight'>C</span>ompany</h1>
        {productions.map(production => <ProductionCard key={production.id} production={production}/>)}
    </div>
  )
}
export default ProductionsContainer