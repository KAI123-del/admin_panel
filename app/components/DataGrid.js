"use client"; //this is a client component
import React, { useState, useEffect } from 'react'
import { FiSearch } from 'react-icons/fi'
import { MdModeEditOutline, MdDelete } from 'react-icons/md'
import { RxCross2 } from 'react-icons/rx';
import axios from 'axios';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"

function DataGrid() {

  const [revealForm, setRevealForm] = useState(false);
  const [allProducts, setAllProducts] = useState();
  const [filterData, setFilterData] = useState();
  const [searchProduct, setSearchProduct] = useState()
  const [newProductData, setNewProductData] = useState({
    title: '',
    brand: '',
    category: '',
    discount: '',
    price: '',
    stock: '',
    rating: ''
  })

  // creating a toast pop theme
  const errorTheme = {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  }


  // FORM REVEAL ANIMATION STATE UPDATE
  const createNewProduct = () => {
    setRevealForm(true)
  }

  // update state for category filter
  const categoryFilterHandler = (x) => {
    const filterData = allProducts?.filter((y) => y.category === x);
    setFilterData(filterData)
  }

  // update state for brand filter
  const brandFilterHandler = (x) => {
    const filterData = allProducts?.filter((y) => y.brand === x);
    setFilterData(filterData)
  }

  // filter based on brand 
  const checkDuplicateBrand = allProducts?.map(o => o.brand);
  const filteredBrands = allProducts?.filter(({ brand }, index) => !checkDuplicateBrand?.includes(brand, index + 1))


  // filter based on category 
  const checkDuplicateCategory = allProducts?.map(o => o.category);
  const filteredCategory = allProducts?.filter(({ category }, index) => !checkDuplicateCategory?.includes(category, index + 1))

  // add a new product
  const newProductHandler = async () => {
    // error handling before sending the post request
    if (newProductData.title.length > 1 && newProductData.brand.length > 1 && newProductData.category.length > 1 && newProductData.discount.length > 1 && newProductData.price.length > 1 && newProductData.stock.length > 1 && newProductData.rating.length > 1) {
      setRevealForm(false)
      const { data } = await axios.post('https://dummyjson.com/products/add', newProductData);
      allProducts?.unshift(data)
      toast.success("Product added successfully !!!", errorTheme)

    } else {
      toast.error("All fields are required !!!", errorTheme)
    }

  }



  // search Product by NAME,BRAND,CATEGORY:
  const searchByProductHandler = (x) => {
    setSearchProduct(x)
    if (typeof window !== 'undefined') {
      let filter, table, tr, td, i, txtValue;
      filter = x.toUpperCase();
      table = document.getElementById("myTable");
      tr = table.getElementsByTagName("tr");
      for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[0];
        if (td) {
          txtValue = td.textContent || td.innerText;
          if (txtValue.toUpperCase().indexOf(filter) > -1) {
            tr[i].style.display = "";
          } else {
            tr[i].style.display = "none";
          }
        }
      }
    }
  }

  // FUNCTION TO FETCH ALL PRODUCT DATA
  const getAllProducts = async () => {
    const { data } = await axios.get('https://dummyjson.com/products');
    const slicedData = data.products.slice(0, 10)
    setAllProducts(slicedData)

    // to set the filter
    setFilterData(slicedData)
  }

  // call product data at the mount 
  useEffect(() => {
    getAllProducts()

  }, [])

  return (
    <div className='p-[3rem] '>

      {/* MAIN DIV */}
      <div className='shadowBox rounded-lg pl-[2rem] py-[2rem] relative overflow-hidden'>

        {/* HEADING */}
        <div className='flex justify-between items-center border-b-2 pb-8 border-gray-300'>
          <p className='font-josefinRegular text-[1.3rem] font-[600] tracking-wider text-[#0a2351] uppercase'>List of Products</p>
          <div className='pr-4'>
            <button onClick={createNewProduct} className='font-josefinRegular text-[1.1rem] px-6 py-2 bg-green-500 text-green-100 hover:bg-green-100 hover:shadow-2xl hover:text-green-500 tracking-wider rounded-lg transition duration-[0.5s] '>
              Add new product
            </button>
          </div>
        </div>

        {/* SEARCH AND FILTER */}
        <div className='flex justify-between items-center mt-4'>
          <div className='flex py-[0.3rem] px-[0.5rem] justify-start items-center border border-gray-500 rounded-lg space-x-2'>
            <p className='text-[1.5rem] text-gray-500'>
              <FiSearch />
            </p>
            <input value={searchProduct} onChange={(e) => searchByProductHandler(e.target.value)} className='outline-none font-josefinRegular text-[1.2rem] pt-2 text-[#0a2351]' placeholder='Enter Product Name' />
          </div>
          <div className='flex  space-x-6 pr-[1rem] '>
            <select onChange={(e) => brandFilterHandler(e.target.value)} defaultValue={'select a brand'} name="brand" id="brand" className='border p-[0.5rem] outline-none border-gray-500 rounded-lg w-[10rem]'>
              {
                filteredBrands?.map((x, index) =>
                  <option key={index} value={x.brand}>{x.brand}</option>
                )
              }
            </select>

            <select onChange={(e) => categoryFilterHandler(e.target.value)} defaultValue={'select a category'} name="category" id="category" className='border p-[0.5rem] outline-none border-gray-500 rounded-lg w-[10rem]'>
              {
                filteredCategory?.map((x, index) =>
                  <option key={index} value={x.category}>{x.category}</option>
                )
              }

            </select>
          </div>
        </div>

        {/* TABLE */}
        <div className='mt-[2rem] pr-[2rem] '>
          <table id="myTable" className="table-auto w-[100%]">
            <thead className=''>
              <tr className='border-b-2 border-[#6b7078]  '>
                <th className=' text-start text-gray-500 pb-[1rem]'>Name</th>
                <th className=' text-start text-gray-500 pb-[1rem]'>Brand</th>
                <th className=' text-start text-gray-500 pb-[1rem]'>Category</th>
                <th className=' text-start text-gray-500 pb-[1rem]'>Discount (%)</th>
                <th className=' text-start text-gray-500 pb-[1rem]'>Price</th>
                <th className=' text-start text-gray-500 pb-[1rem]'>Rating</th>
                <th className=' text-start text-gray-500 pb-[1rem]'>Stock</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {
                filterData?.map((x, index) =>
                  <tr className='' key={index}>
                    <td className='text-[#0a2351] font-josefinRegular text-[1rem] font-[600] py-[1rem]'>{x.title}</td>
                    <td className='text-[#0a2351] font-josefinRegular text-[1rem] font-[600] py-[1rem]'>{x.brand}</td>
                    <td className='text-[#0a2351] font-josefinRegular text-[1rem] font-[600] py-[1rem]'>{x.category}</td>
                    <td className='w-[18%]'>
                      <div className='flex justify-start items-center space-x-2'>
                        <p className='text-gray-500 font-josefinRegular text-[1rem] font-[600]'>{x.discountPercentage}%</p>
                        <p className='w-[60%] h-[0.6rem] bg-gray-400 rounded-full relative'>
                          <span style={{ width: `${x.discountPercentage * 2}%` }} className={` h-[100%] bg-pink-500 absolute left-0 rounded-full`}></span>
                        </p>
                      </div>
                    </td>
                    <td className='text-[#0a2351] font-josefinRegular text-[1rem] font-[600] py-[1rem]'>₹{x.price}</td>
                    <td className='text-[#0a2351] font-josefinRegular text-[1rem] font-[600] py-[1rem]'>
                      <p className='text-pink-500 font-josefinRegular text-[1rem] font-[600]'>{x.rating}</p>
                      <p className='text-gray-500 font-josefinRegular text-[1rem] font-[600]'>
                        out of 5
                      </p>
                    </td>
                    <td className='text-[#0a2351] font-josefinRegular text-[1rem] font-[600] py-[1rem]'>{x.stock}</td>
                    <td className='py-[1rem] flex items-center space-x-2'>
                      <p className='bg-[#0a2351] hover:text-[#0a2351] hover:shadow-2xl hover:bg-gray-200 transition duration-[0.6s] text-white px-[1rem] py-[0.5rem] rounded-lg text-[1.3rem]'>
                        <MdModeEditOutline />
                      </p>
                      <p className='bg-pink-500 hover:text-pink-500 hover:bg-gray-200 transition duration-[0.6s] text-white px-[1rem] py-[0.5rem] rounded-lg text-[1.3rem]'>
                        <MdDelete />
                      </p>
                    </td>
                  </tr>
                )
              }



            </tbody>
          </table>
        </div>

        {/* FORM REVEAL ANIMATION */}
        <div className={revealForm ? ' absolute top-0 slideForm bg-white  h-[100%] rounded-lg w-[35%] p-[1rem] shadowBox overflow-y-scroll' : 'absolute top-0 exitSlideForm bg-white  h-[100%] rounded-lg w-[35%] p-[1rem] shadowBox overflow-y-scroll'}>
          <div className='flex justify-end border-b-2 pb-[1rem]'>
            <button onClick={() => setRevealForm(false)} className='text-[1.5rem] text-gray-500'>
              <RxCross2 />
            </button>
          </div>
          <div className='mt-4'>
            <p className='font-josefinRegular text-[1.3rem] font-[600] tracking-wider text-[#0a2351]'>Create New Product</p>
            <div className='mt-8'>
              <label htmlFor='name' className='block font-josefinRegular text-[1rem] font-[600] tracking-wider text-gray-500'>Name of Product</label>
              <input value={newProductData.title} id="name" type='text' placeholder='iphone x' className='outline-none border-2 border-gray-500 rounded-[6px] w-[100%] h-[2.5rem] px-[0.5rem] mt-1' onChange={(e) => setNewProductData((prevState) => ({
                ...prevState,
                title: e.target.value
              }))} />
            </div>
            <div className='mt-6'>
              <label htmlFor='brand' className='block font-josefinRegular text-[1rem] font-[600] tracking-wider text-gray-500'>Brand</label>
              <input value={newProductData.brand} id="brand" type='text' placeholder='apple' className='outline-none border-2 border-gray-500 rounded-[6px] w-[100%] h-[2.5rem] px-[0.5rem] mt-1' onChange={(e) => setNewProductData((prevState) => ({
                ...prevState,
                brand: e.target.value
              }))} />
            </div>
            <div className='mt-6'>
              <label htmlFor='category' className='block font-josefinRegular text-[1rem] font-[600] tracking-wider text-gray-500'>Category</label>
              <input value={newProductData.category} id="category" type='text' placeholder='smartphones' className='outline-none border-2 border-gray-500 rounded-[6px] w-[100%] h-[2.5rem] px-[0.5rem] mt-1' onChange={(e) => setNewProductData((prevState) => ({
                ...prevState,
                category: e.target.value
              }))} />
            </div>
            <div className='mt-6'>
              <label htmlFor='discount' className='block font-josefinRegular text-[1rem] font-[600] tracking-wider text-gray-500'>Discount</label>
              <input value={newProductData.discount} id="discount" type='number' placeholder='10' className='outline-none border-2 border-gray-500 rounded-[6px] w-[100%] h-[2.5rem] px-[0.5rem] mt-1' onChange={(e) => setNewProductData((prevState) => ({
                ...prevState,
                discount: e.target.value
              }))} />
            </div>
            <div className='mt-6'>
              <label htmlFor='price' className='block font-josefinRegular text-[1rem] font-[600] tracking-wider text-gray-500'>Price</label>
              <input value={newProductData.price} id="price" type="number" placeholder='500' className='outline-none border-2 border-gray-500 rounded-[6px] w-[100%] h-[2.5rem] px-[0.5rem] mt-1' onChange={(e) => setNewProductData((prevState) => ({
                ...prevState,
                price: e.target.value
              }))} />
            </div>
            <div className='mt-6'>
              <label htmlFor='rating' className='block font-josefinRegular text-[1rem] font-[600] tracking-wider text-gray-500'>Rating</label>
              <input value={newProductData.rating} id="rating" type="number" placeholder='4.2' className='outline-none border-2 border-gray-500 rounded-[6px] w-[100%] h-[2.5rem] px-[0.5rem] mt-1' onChange={(e) => setNewProductData((prevState) => ({
                ...prevState,
                rating: e.target.value
              }))} />
            </div>
            <div className='mt-6'>
              <label htmlFor='stock' className='block font-josefinRegular text-[1rem] font-[600] tracking-wider text-gray-500'>Stock</label>
              <input value={newProductData.stock} id="stock" type="number" placeholder='100' className='outline-none border-2 border-gray-500 rounded-[6px] w-[100%] h-[2.5rem] px-[0.5rem] mt-1' onChange={(e) => setNewProductData((prevState) => ({
                ...prevState,
                stock: e.target.value
              }))} />
            </div>
          </div>
          <div className='mt-[60%] flex justify-start items-center space-x-4'>
            <button className='w-1/2 border border-[#0a2351] font-josefinRegular text-[1rem] tracking-wider text-[#0a2351] py-[0.3rem] rounded-lg' onClick={() => setNewProductData({
              title: '',
              brand: '',
              category: '',
              discount: 0,
              price: 0,
              stock: 0,
              rating: 0
            })}>Reset</button>
            <button className='w-1/2 bg-[#0a2351] font-josefinRegular text-[1rem] tracking-wider text-white py-[0.3rem] rounded-lg' onClick={newProductHandler}>Create New</button>
          </div>
        </div>
      </div>
      
      {/* TOAST CONTAINER */}
      <ToastContainer autoClose={2000} />

    </div>
  )
}

export default DataGrid