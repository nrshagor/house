import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './AllHouse.css'

const Alhouse = () => {

    const [products, setProducts] = useState([]);
    useEffect(() => {
        fetch('http://localhost:5000/products')
            .then(res => res.json())
            .then(data => setProducts(data));

    }, []);
    const handleDeleteProduct = id => {
        const proced = window.confirm('Are You sure you want to delete..?');
        if (proced) {
            const url = `http://localhost:5000/products/${id}`;
            fetch(url, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount > 0) {
                        alert('deleted successfully');
                        const remainingServices = products.filter(product => product._id !== id);
                        setProducts(remainingServices);
                    }
                })
        }
    }
    return (
        <>
            <section>
                <div className="products">
                    <h1>Our Latest Products</h1>
                    <div className="card-body">


                        <div className="card">
                            <div className="products-img">
                                <img src="" alt="" />
                            </div>
                            <div className="products-info">
                                <h1>House Name</h1>
                                <p>Price</p>
                                <div className='house-info'>
                                    <p><span><i class="fas fa-bed"></i> 4 bedrooms</span> <span><i class="fas fa-bath"></i> 2 bathrooms
                                    </span>
                                        <span><i class="fas fa-th"></i> 1200 squre ft</span> <span><i class="fas fa-warehouse"></i> 2 garages</span></p>
                                </div>

                                <Link to="/products"><button className="btn btn-warning">View All</button></Link>
                            </div>
                        </div>


                    </div>
                </div>
            </section>
            <div className=" mr-3 w-100  d-flex justify-content-center align-items-center row row-cols-1 row-cols-md-4 my-3 g-5">


                {
                    products.map(product =>
                        <div className="card">
                            <div className="products-img">
                                <img src={product.img} alt="" />
                            </div>
                            <div className="products-info">
                                <h1>Brand Name: {product.brand}</h1>
                                <p>Model: {product.model}</p>
                                <p><span>Trim: {product.trim}</span> <span>Manufacture: {product.manufacture}</span></p>
                                <p>Description:{product.description}</p>

                                <p>Price{product.price}</p>



                            </div>
                        </div>)
                }
            </div >


        </>
    );
};

export default Alhouse;