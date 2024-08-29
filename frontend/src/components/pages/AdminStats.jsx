import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import OrderAdminCard from "../OrderAdminCard";
import PropTypes from "prop-types";
import UserAdminCard from "../UserAdminCard";
import url from "../../utils/urls";
import axios from "axios";
import { useAuth } from "../../auth/AuthProvider";
import Loading from "../Loading";

/*

In this page will be showing the admin stats:

- Last month sales ($)
- Total sales (quantity of products sold)
- Top selling products (name, first image, quantity sold)
- Top buyers (name, email, first image, quantity bought)
- Top Orders (OrderCard),
- Total Orders
- Total Users
- Total Products

*/

const AdminNavbarElement = ({to, title, icon}) => {
  return (
  <li className="truncate">
    <a href={to} className="flex items-center justify-center gap-2 bg-n3 text-n1 p-2 hover:bg-n2 hover:text-n5 transition duration-150 rounded-lg">
      <span className="hidden md:text-sm md:block lg:text-lg">{title}</span>
      <img className="h-6 w-6 md:hidden lg:h-4 lg:w-4" src={`/svg/${icon}.svg`} alt={icon} />
    </a>
  </li>
  )
}

AdminNavbarElement.propTypes = {
  to: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired
}

const AdminStats = () => {
  const [loading, setLoading] = useState(true);
  const [sales, setSales] = useState(0);
  const [sold, setSold] = useState(0);
  const [TopSelling, setTopSelling] = useState([]);
  const [TopOrders, setTopOrders] = useState([]);
  const [topBuyers, setTopBuyers] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);

  const auth = useAuth();

  /*
  
  Purchase (order) example:{
		"_id": "66ce06af9356c376a5287515",
		"user": "66c162b85b8d1396d2767465",
		"products": [
			{
				"_id": "6692b5effed81becbaf19759",
				"quantity": 3,
				"price": 10
			}
		],
		"total": 30,
		"deletedAt": null,
		"deleted": false,
		"createdAt": "2024-08-27T17:02:39.549Z",
		"updatedAt": "2024-08-27T17:02:39.549Z",
		"__v": 0
	}
  
  */
  const sumAllTotals = (data) => {
    let total = 0;
    data.forEach((item) => {
      total += item.total;
    });
    return total;
  };
  const sumAllQuantities = (data) => {
    let total = 0;
    data.forEach((item) => {
      item.products.forEach((product) => {
        total += product.quantity;

      })
    });
    return total;
  }
  const getLastMothSales = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${url.backend}/purchases/stats/month`, {
        headers: {
          "Authorization": `Bearer ${auth.getAccessToken()}`,
        },
      });
      setTotalOrders(data.length);
      setSales(sumAllTotals(data));
      setSold(sumAllQuantities(data));
      // setTopOrders(data) <- Only the first 5
      setTopOrders(data.slice(0, 6));
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const getTopSelling = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${url.backend}/product?sort=-sales&limit=6`, {
        headers: {
          "Authorization": `Bearer ${auth.getAccessToken()}`,
        },
      });
      setTotalProducts(data.totalDocs);
      setTopSelling(data.docs);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const getTopBuyers = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${url.backend}/users?sort=-totalPurchases&limit=6`, {
        headers: {
          "Authorization": `Bearer ${auth.getAccessToken()}`,
        },
      });
      setTotalUsers(data.totalDocs);
      setTopBuyers(data.docs);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };



  useEffect(() => {
    getTopSelling();
    getLastMothSales();
    getTopBuyers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="grid justify-items-center gap-4 px-4 py-8">
      <h1 className="text-3xl flex gap-2 items-center">
        <Link to="/admin">
          <img className="h-8 w-8" src="/svg/leftArrow.svg" alt="Go Back" />
        </Link>
        Admin Stats
      </h1>
      <ul id="svg" className="grid grid-cols-5 sticky top-16 gap-2 py-4">
        <AdminNavbarElement to="#Lastmonth" title="Month Sales" icon="orders" />
        <AdminNavbarElement to="#TopSelling" title="Top Selling" icon="items" />
        <AdminNavbarElement to="#TopOrders" title="Top Orders" icon="purchases" />
        <AdminNavbarElement to="#TopBuyers" title="Top Buyers" icon="users" />
        <AdminNavbarElement to="#Totals" title="Totals" icon="total" />
      </ul>
      <div id="Lastmonth" className="grid pt-8 justify-items-center items-center min-h-[30vh]">
        {loading && <Loading />}
        {!loading &&
        <div className="grid grid-cols-2 justify-items-center items-center gap-8">
          <h2 className="text-2xl md:text-3xl font-bold col-span-2"> Last Moth Sales: ${sales.toFixed(2)}</h2>
          <h3 className="text-md md:text-lg lg:text-xl">Total Items Sold: {sold}</h3>
          <h3 className="text-md md:text-lg lg:text-xl">Total Orders: {totalOrders}</h3>
        </div>
        }
      </div>
      <div id="TopSelling" className="grid pt-32 justify-items-center items-center min-h-[60vh]">
        {loading && <Loading />}
        {TopSelling.length > 0 &&
          <div className="grid justify-items-center items-center gap-8 py-8">
            <h2 className="text-2xl">Top 6 Selling</h2>
            <div className="grid md:grid-cols-3 justify-items-center items-center gap-8">
              {TopSelling.map((item) => {
                return (
                  <div key={item._id} className="flex bg-n1 p-4 rounded-lg shadow-lg flex-col justify-center items-center gap-2">
                    <img className="h-40 w-40 md:h-56 md:w-56 rounded-lg object-cover" src={url.backend + "/" + item.images[0]} alt="" />
                    <h3 className="text-xl w-56 truncate text-center">{item.name}</h3>
                    <h3 className={"text-xl" + (item.discount > 0 ? " line-through text-lg" : "")}>Base Price: ${item.price}</h3>
                    {item.discount > 0 &&
                    <h3 className="text-xl flex flex-col md:flex-row items-center gap-2">Current Price: {(item.price * (1 - item.discount / 100)).toFixed(2)}$ 
                      <span className="text-n2 bg-n5 px-2 py-1 rounded-lg">(-{item.discount}%)</span>
                    </h3>}
                    <h3 className="text-xl">Items Sold: {item.sales}</h3>
                  </div>
                )
              })}
            </div>
          </div>
        }
      </div>
      <div id="TopOrders" className="grid pt-32 justify-items-center items-center min-h-[60vh]">
        {loading && <Loading />}
        {TopOrders.length > 0 &&
          <div className="grid justify-items-center items-center gap-8 py-8">
            <h2 className="text-2xl">Top 6 Orders</h2>
            <div className="grid md:grid-cols-3 justify-items-center items-center gap-8">
              {TopOrders.map((item) => {
                return (
                  <OrderAdminCard key={item._id} purchase={item} />
                )
              })}
            </div>
          </div>
        }
      </div>
      <div id="TopBuyers" className="grid pt-32 justify-items-center items-center min-h-[60vh]">
        {loading && <Loading />}
        {topBuyers.length > 0 &&
          <div className="grid justify-items-center items-center gap-8 py-8">
            <h2 className="text-2xl">Top 6 Buyers</h2>
            <div className="grid md:grid-cols-3 justify-items-center items-center gap-8">
              {topBuyers.map((item) => {
                return (
                  <UserAdminCard key={item._id} user={item} />
                )
              })}
            </div>
          </div>
        }
      </div>
      <div id="Totals" className="grid pt-32 justify-items-center items-center min-h-[60vh]">
        {loading && <Loading />}
        {topBuyers.length > 0 &&
          <div className="grid justify-items-center items-center gap-4 py-8">
            <h2 className="text-3xl font-bold">Totals</h2>
            <h3 className="text-2xl">Total Users: {totalUsers}</h3>
            <h3 className="text-2xl">Total Orders: {totalOrders}</h3>
            <h3 className="text-2xl">Total Products: {totalProducts}</h3>
          </div>}
      </div>
    </div>
  )
};

export default AdminStats