import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container, Nav, Navbar, Button } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../Redux/actions/cartActions';
import WOW from 'wowjs';
import CarouselCom from "./Carousel";
import './Dashboard.css';

export default function Dashboard() {
    const dispatch = useDispatch();
    const cartItems = useSelector(state => state.cartItems);
    const navigate = useNavigate();

    const [items, setItems] = useState([]);
    const [categories, setCategories] = useState([]);
    const [subCategories, setSubCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(0);
    const [searchTerm, setSearchTerm] = useState(""); // State for search term

    useEffect(() => {
        new WOW.WOW({ live: false }).init();
        fetchInitialData();
    }, []);

    const fetchInitialData = async () => {
        try {
            const [itemRes, categoryRes] = await Promise.all([
                axios.get('http://localhost:8081/v1/users/items'),
                axios.get('http://localhost:8081/v1/users/categories')
            ]);
            setItems(itemRes.data);
            setCategories(categoryRes.data);
            setSubCategories([]);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const fetchCategoryItems = async (categoryId) => {
        setSelectedCategory(categoryId);
        if (categoryId === "0") return fetchInitialData();
        
        try {
            const [itemsRes, subCategoriesRes] = await Promise.all([ 
                axios.get(`http://localhost:8081/v1/users/items/byCat/${categoryId}`),
                axios.get(`http://localhost:8081/v1/users/get-subcat-by-cat/${categoryId}`)
            ]);
            setItems(itemsRes.data);
            setSubCategories(subCategoriesRes.data);
        } catch (error) {
            console.error("Error fetching category items:", error);
        }
    };

    const fetchSubCategoryItems = async (subCategoryId) => {
        if (subCategoryId === "0") return fetchCategoryItems(selectedCategory);
        
        try {
            const response = await axios.get(`http://localhost:8081/v1/users/items/bySubCat/${subCategoryId}`);
            setItems(response.data);
        } catch (error) {
            console.error("Error fetching subcategory items:", error);
        }
    };

    // Filtered items based on search term
    const filteredItems = items.filter(item =>
        item.itemName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Reset filters
    const resetFilters = () => {
        setSearchTerm(""); // Clear search term
        setSelectedCategory(0); // Reset category
        setCategories([])
        setSubCategories([]); // Clear subcategories
        fetchInitialData(); // Fetch all items again
    };

    return (
        <>
            <section className="bg-transparent p-0 navbar-bg">
                <Container>
                    <Navbar className="bg-transparent headerMargin">
                        <Container fluid className="bannerHeight">
                            <Navbar.Brand><img src="/images/Rome-logo.png" alt="Logo" /></Navbar.Brand>
                            <Navbar.Toggle aria-controls="navbarScroll" />
                            <Navbar.Collapse id="navbarScroll">
                                <Nav className="ms-auto">
                                    <Nav.Link onClick={() => navigate('/success')}>Home</Nav.Link>
                                    <Nav.Link onClick={() => navigate('/cart')}>
                                        <div className="cart-icon">
                                            <FontAwesomeIcon className="cart-icon" icon={faCartPlus} />
                                            <span className="cartSizeNumber">{cartItems.length}</span>
                                        </div>
                                    </Nav.Link>
                                </Nav>
                            </Navbar.Collapse>
                        </Container>
                    </Navbar>
                </Container>
            </section>

            <section className="bg-dark pt-5 pb-5">
                <div className="cursorelDiv">
                    <CarouselCom />
                </div>
            </section>

            <section className="bg-dark">
                <Container>
                    <div className="filterDiv pb-5">
                        <h3 className="text-light">Filter</h3>
                        <div className="category pb-4">
                            <select onChange={(e) => fetchCategoryItems(e.target.value)} className="form-select">
                                <option value="0">Category</option>
                                {categories.map(cat => (
                                    <option key={cat.categoryId} value={cat.categoryId}>{cat.categoryName}</option>
                                ))}
                            </select>
                        </div>
                        <div className="subCategory">
                            <select onChange={(e) => fetchSubCategoryItems(e.target.value)} className="form-select">
                                <option value="0">SubCategory</option>
                                {subCategories.map(subcat => (
                                    <option key={subcat.subId} value={subcat.subId}>{subcat.subCatName}</option>
                                ))}
                            </select>
                        </div>
                        <div className="searchDiv pt-4">
                            <input 
                                type="text" 
                                className="form-control" 
                                placeholder="Search for items..." 
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)} // Update search term on change
                            />
                        </div>
                        <Button variant="secondary" onClick={resetFilters} className="mt-3">Reset Filters</Button>
                    </div>
                </Container>
            </section>

            <section className="itemsDiv bg-dark">
                <Container>
                    <h1 className="text-center text-light">Items</h1>
                    <div className="itemdev row column-gap-3 row-gap-4 pb-5">
                        {filteredItems.length > 0 ? (
                            filteredItems.map(item => (
                                <div className="item wow bounceInUp" key={item.itemId}>
                                    <img src={item.itemUrl} alt={item.itemName} />
                                    <h5>{item.itemName}</h5>
                                    <p>
                                        <span className="itemPrice">Price: </span>₹{item.itemPrice}
                                    </p>
                                    <button className='btn btn-warning ItemButton' onClick={() => dispatch(addToCart(item))}>
                                        Add to Cart
                                    </button>
                                </div>
                            ))
                        ) : (
                            <p className="text-center text-light">No items matched</p> // Display when no items match
                        )}
                    </div>
                </Container>
            </section>
        </>
    );
}
