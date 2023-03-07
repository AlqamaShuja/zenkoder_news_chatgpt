import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createSessionThunk, getPriceList, getSubsListThunk } from '../Slices/subs.slice';
import ErrorHandler from '../utils/ErrorHandler';
import { Button } from '@mui/material';


const Subscription = () => {
    const user = useSelector(state => state.auth.user);
    const price = useSelector(state => state.subscription.priceList)[0];
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const fetchData = async () => {
        dispatch(getPriceList()).unwrap().then(x => {
            // console.log(x, "Subscription:getPriceList");
        }).catch(err => { 
            console.log(ErrorHandler(err));
        });
        dispatch(getSubsListThunk(user.stripeCustomerId)).unwrap().then(x => {
            // console.log(x.data, "Subs: getSubsListThunk");
            if(x?.data?.length > 0) {
                navigate("/news");
            }
        }).catch(err => { 
            console.log(ErrorHandler(err));
        });
    };

    useEffect(() => {
        if(user){}
        fetchData();
    }, []);

    const handleSubscribe = (priceItem) => {
        // console.log(priceItem, "priceItem");
        dispatch(createSessionThunk({ priceItem, userId: user.id })).then( (data) => {
            // console.log(data, "daaaaaattttttttttaaaa");
            window.location.href = data?.payload?.data?.url;
        });
    }

    // console.log(price, "subs Price");

  return (
    <div className='w-full h-screen flex justify-center items-center'>
        <div className="myShadow bg-white rounded-xl flex flex-col items-center px-6 py-8">
            <p className='text-gray-600'>For Reading News please Subscribe</p>
            <div className="bg-blue-200/70 rounded-full text-[#312b86] flex items-center w-fit px-4 py-1 mt-2">
                <span className="ml-1 text-sm font-semibold">${Math.round(price?.priceItem?.unit_amount/100)} / month</span>
            </div>
            <div className="w-full mt-3">
                <h3 className='font-bold'>Benefits:</h3>
                <ul className='pl-5'>
                    <li className='list-disc '>Read Updated News</li>
                    <li className='list-disc '>Summarize News</li>
                </ul>
            </div>
            <Button sx={{ mt: 2 }}
                onClick={() => handleSubscribe(price?.priceItem?.id)} 
                variant="contained" color="primary">Subscribe</Button>
            {/* <button  className="px-6 py-1 mt-4 text-white font-semibold bg-blue-600 hover:bg-blue-700 focus:bg-blue-700 rounded-full text-base md:text-2xl">Subscribe</button> */}
        </div>
    </div>
  )
}

export default Subscription