import React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  startAfter,
} from 'firebase/firestore';
import { db } from '../firebase.config';
import { toast } from 'react-toastify';
import Spinner from '../components/Spinner';
import { async } from '@firebase/util';
import ListingItem from '../components/ListingItem';

const Category = () => {
  const [listings, setListings] = useState(null);
  const [loading, setLoading] = useState(true);
  const params = useParams();
  useEffect(() => {
    const fetchListing = async () => {
      try {
        const listingRef = collection(db, 'listings');
      

        // create a query
        const q = query(
          listingRef,
          where('type', '==', params.categoryName),
          orderBy('timestamp'),
          limit(10)
        );
        //   execute the query
        const querySnap = await getDocs(q);
        
        let listings = [];
        querySnap.forEach((doc) => {
          
          return listings.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setListings(listings);
        console.log(listings)
        setLoading(false);
      } catch (error) {
        toast.error('could not fetch listing');
      }
    };
    fetchListing();
  }, []);
  return (
    <div className="category">
      <header>
        <p className="pageHeader">
          {params.categoryname == 'rent'
            ? 'Places for Rent'
            : 'Places for sale'}
        </p>
      </header>
      {loading ? (
        <Spinner />
      ) : listings && listings.length > 0 ? (
        <>
          <main>
            <ul className="categoryListings">
              {listings.map((list) => {
                return (
                  <ListingItem listing={list.data} id={list.id} key={list.id} />
                );
              })}
            </ul>
          </main>
        </>
      ) : (
        <p>No listing for {params.categoryName}</p>
      )}
    </div>
  );
};

export default Category;
