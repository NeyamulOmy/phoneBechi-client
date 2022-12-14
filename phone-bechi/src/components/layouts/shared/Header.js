import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider';
import useAdmin from '../../../hooks/useAdmin';
import useBuyer from '../../../hooks/useBuyer';
import useSeller from '../../../hooks/useSeller';

const Header = ({ categories }) => {

    const { user, logOut } = useContext(AuthContext)
    const [isSeller] = useSeller(user?.email);
    const [isBuyer] = useBuyer(user?.email);
    const [isAdmin] = useAdmin(user?.email);
    const handleLogOut = () => {
        logOut()
            .then(() => { })
            .catch(err => console.error(err))
    }
    return (
        <div className="navbar bg-cyan-900 text-white lg:px-5">
            <div className="flex-1">
                <Link to='/' className="btn btn-ghost normal-case text-xl">Phone Bechi</Link>
            </div>
            <div className="flex-none">
                <ul className="menu menu-horizontal p-0">

                    <li tabIndex={0}>
                        <Link>
                            Categories
                            <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" /></svg>
                        </Link>

                        <ul className="p-2 bg-cyan-900 z-50">
                            {
                                categories.map(category => {
                                    return (
                                        <li key={category._id}><Link to={`/category/${category.name}`}>{category.name}</Link></li>
                                    )
                                })
                            }

                        </ul>
                    </li>
                    {
                        isSeller && <><li><Link to={`/addproduct`}>Add a product</Link></li>
                            <li><Link to={`/myproducts`}>My products</Link></li></>

                    }
                    {
                        isAdmin && <><li><Link to={`/sellers`}>Sellers</Link></li>
                            <li><Link to={`/buyers`}>Buyers</Link></li><li><Link to={`/`}>Reported Items</Link></li></>

                    }
                    {
                        isBuyer && <li><Link to={`/mybookings`}>My Bookings</Link></li>
                    }
                    {
                        user?.uid ? <li><button onClick={handleLogOut}>Log out</button></li>
                            :
                            <li><Link to='/login'>Log in</Link></li>
                    }
                    <li><Link to={'/blog'}>Blog</Link></li>
                </ul>
            </div>
        </div>
    );
};

export default Header;