import {  useEffect, useRef, useState } from "react";
import { Searchbar } from "./searchbar/searchbar";
import {getImages} from '../service/api.js'
import Notiflix from 'notiflix'; 
import { ImageGallery } from './imageGallery/imageGallery'
import React from 'react';
import { Loaderbtn } from './button/button'
import { Loader } from "./loader/loader";
import { nanoid } from "nanoid";
import { Modal } from './modal/modal'



export const App = () => {
  const [images, setImages] = useState([])
  const [query, setQuery] = useState('')
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const refElem = useRef()
  const [isLoading, setIsLoading] = useState(false)
  const [showImage, setShowImage] = useState({ largeImageURL: "" })
  const [isShowModal, setIsShowModal] = useState(false)
  const refModal= useRef()


// const handleChange = e=> setQuery(e.target.value)

    const resetSearch = () => {
    setImages([])
    setPage(1)
    setIsLoading(true)
  }

const handleSubmit = e => {
    setQuery(e)
    
    resetSearch()
  };

 useEffect(() => {
    if(isShowModal)refModal.current.focus()
  }, [isShowModal])
  
  useEffect(() => {
    if (!query) return
      
    setIsLoading(true)
    const getPhotos = async () => {
      try {
        const data = await getImages(query, page);
        if (!data.hits.length)
          throw new Error(
            'Sorry, there are no images matching your search query. Please try again.'
          );
       
        setTotal(data.totalHits)
        const imagesPage = findGalleryImage(data.hits);
        setImages(i=>[...i,...imagesPage]);
       
      
         
      } catch (error) {
        onError(error);
      } finally {
        setIsLoading(false);
      }
      // if (images.length > 0 && prev.images.length !== images.length)
      //   refElem.current.scrollIntoView({ behavior: 'smooth' }) 
    };
    
    getPhotos();
   
    
     
    
  }
     , [query, page])

          
        
         

  const loadBtn = () => {
    setPage(prev => prev + 1)
    
  }

  const onError = err => Notiflix.Notify.failure(err.message)

  const findGalleryImage = data => data.map(({ webformatURL, tags, largeImageURL }) => {
    return { id: nanoid(), webformatURL, tags, largeImageURL }
  })

   const clickOnImage = ({ target: { dataset: { large }, alt } }) => {
    if (!large) return
    const imageFunction = { largeImageURL: large, tags: alt }
    setShowImage(imageFunction)
    setIsShowModal(true)
  }

  const closeModal = () => setIsShowModal(false)
  
  const modalClick = (e) => {
    if (!e.target.src) closeModal()
  }
  
  const escCloseModal = e => {
    if (e.key === 'Escape') closeModal()
  }

 return (
    <div>
      <Searchbar query={query} onChange={e=> setQuery(e.target.value)} onSubmit={handleSubmit} />

      {images.length > 0 && <ImageGallery images={images} onClick={clickOnImage} ref={refElem} />}

      <Loader render={isLoading} />

      {images.length<total && <Loaderbtn onClick={loadBtn} />}

      {isShowModal && <Modal imageFunction={showImage} refModal={refModal} onClick={modalClick} onKeyDown={escCloseModal} />}
        
    </div>
  )
}

  







//  useEffect(() => {
//     if(isShowModal)refModal.current.focus()
//   }, [isShowModal])
  
//   useEffect(() => {
//     if (isLoading) {
//       getImages(query, page).then(
//         data => {
//           if (!data.hits.length) throw new Error(
//             'Sorry, there are no images matching your search query. Please try again.'
//           );
//           if (maxPage === 0) setMaxPage(Math.ceil(data.totalHits / 12));
//           return findGalleryImage(data.hits);
//         }).then(imagesPage => setImages([...images, ...imagesPage])).catch(onError).finally(() => setIsLoading(false))
//     }
//     if (images.length > 0) refElem.current.scrollIntoView({ behavior: 'smooth' })
//   },[images, isLoading, isShowModal, maxPage, page, query, refElem, refModal])