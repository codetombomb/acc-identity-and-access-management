import ProductionsContainer from '../ProductionsContainer/ProductionsContainer'
import './styles.css'


const Home = ({productions}) => {
  return (
    <div className='home'>
        <img className="hero-image" src="https://images.unsplash.com/photo-1518834107812-67b0b7c58434?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1335&q=80" alt="graceful ballerina" />
        <ProductionsContainer productions={productions} />
    </div>
  )
}
export default Home