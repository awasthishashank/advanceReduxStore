import ProductItem from './ProductItem';
import classes from './Products.module.css';


const Dummy_Products = [
  { id: 'p1', price: 6, title: "My First Book", description: "This is the First Book" },
  { id: 'p2', price: 6, title: "My Second Book", description: "This is the Second Book" }
];

const Products = (props) => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {Dummy_Products.map((product) => (
          <ProductItem
            key={product.id}
            id = {product.id}
            title={product.title}
            price={product.price}
            description={product.description}
          />
        ))}
      </ul>
    </section>
  );
};

export default Products;
