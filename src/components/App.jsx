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
  const [maxPage, setMaxPage] = useState(0)
  const [page, setPage] = useState(1)
  const refElem = useRef()
  const [isLoading, setIsLoading] = useState(false)
  const [showImage, setShowImage] = useState({ largeImageURL: "" })
  const [isShowModal, setIsShowModal] = useState(false)
  const refModal= useRef()




  const handleChange = e=> setQuery(e.target.value)

    const resetSearch = () => {
    setImages([])
    setPage(1)
    setMaxPage(0)
    setIsLoading(true)
  }

const handleSubmit = e => {
    e.preventDefault()
    if (!query.trim()) return Notiflix.Notify.failure(`Fill the search field`);
    resetSearch()
  };

 useEffect(() => {
    if(isShowModal) refModal.current.focus()
  }, [isShowModal])
  
  useEffect(() => {
    if (isLoading) {
      getImages(query, page).then(
        data => {
          if (!data.hits.length) throw new Error(
            'Sorry, there are no images matching your search query. Please try again.'
          );
          if (maxPage === 0) setMaxPage(Math.ceil(data.totalHits / 12));
          return findGalleryImage(data.hits);
        }
      ).then(imagesPage => setImages([...images, ...imagesPage])).catch(onError).finally(() => setIsLoading(false))
    }
    if (images.length > 0) refElem.current.scrollIntoView({ behavior: 'smooth' })
  },[images, isLoading, isShowModal, maxPage, page, query, refElem, refModal])

          
        
         

  const loadBtn = () => {
    setPage(prevState => prevState + 1)
    setIsLoading(true)
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
      <Searchbar query={query} onChange={handleChange} onSubmit={handleSubmit} />

      {images.length > 0 && <ImageGallery images={images} onClick={clickOnImage} ref={refElem} />}

      <Loader render={isLoading} />

      {page < maxPage && <Loaderbtn onClick={loadBtn} />}

      {isShowModal && <Modal imageFunction={showImage} refModal={refModal} onClick={modalClick} onKeyDown={escCloseModal} />}
        
    </div>
  )
}

  




  

  

  //  export class App extends Component {
  //   state = {
  //     images: [],
  //     query: '',
  //     maxPage: 0,
  //     page: 1,
  //     refElem: React.createRef(),
  //     isLoading: false,
  //     showImage: { largeImageURL: "" },
  //     isShowModal: false,
  //     refModal: React.createRef(),
     
  //    }
  

  

  
  //  handleChange = ({ target: { value, name } }) => {
  //       this.setState({ [name]: value.trim() })
  //     }

 


  // handleSubmit = e => {
  //     const { query } = this.state;
  //     this.setState({ query: e });
  //   if (!query.trim()) return Notiflix.Notify.failure(`Fill the search field`);
  //   this.resetSearch()
  //   };

  // resetSearch = () => this.setState({ images: [], page: 1, maxPage: 0, isLoading: true })


 
      
    
  // loadBtn = () => {
  //   this.setState(prev => {
  //     return { page: prev.page + 1, loading: true }
  //   }
  //   )
  // }

  // onError = err => Notiflix.Notify.failure(err.message)

 

  
   

  
  // componentDidUpdate(prevProps, prevState) {
  //   const {
  //     query,
  //     page,
  //     maxPage,
  //     isLoading,
  //     images,
  //     isShowModal,
  //     refModal,
  //     refElem,
      
  //   } = this.state;
  //   if (prevState.query !== query || prevState.page !== page) {
  //     const getPhotos = async () => {
  //       try {
  //         const data = await getImages(query, page);
  //         if (!data.hits.length)
  //           throw new Error(
  //             'Sorry, there are no images matching your search query. Please try again.'
  //           );
  //         const imagesPage = this.findGalleryImage(data.hits);
  //         this.setState({ images: [...images, ...imagesPage] });
  //         if (maxPage === 0)
  //           this.setState({ maxPage: Math.ceil(data.totalHits / 12) });
  //       } catch (error) {
  //         this.onError(error);
  //       } finally {
  //         this.setState({ isLoading: false });
  //       }
  //     };
  //     getPhotos();
  //   }
  //   if (isShowModal) refModal.current.focus();
  //   if (isLoading) {
  //     const prevImages = prevState.images;
  //     if (images.length > 0 && prevImages.length !== images.length)
  //       refElem.current.scrollIntoView({ behavior: 'smooth' });
  //   }
  // }
    

    // const findGalleryImage = data => data.map(({ webformatURL,tags, largeImageURL }) => {
    //   return { id: nanoid(), webformatURL,tags, largeImageURL }
    // })
    


  
 


  //   clickOnImage = ({ target: { dataset: { large },alt } }) => {
  // if(!large) return
  //     const imageFunction = { largeImageURL: large,tags:alt }
  //     this.setState({ showImage: imageFunction, isShowModal: true })
  //   }
  //   closeModal = () => this.setState({ isShowModal: false })

  //   modalClick = (e) => {
  //     if (!e.target.src) this.closeModal()
  //   }
  //   escCloseModal = e => {
  //     if (e.key === 'Escape') this.closeModal()
  //   }
 

   
     
    //  return (
    //    <div>
    //      <Searchbar query={query} onChange={handleChange} onSubmit={handleSubmit} />

    //      {images.length > 0 && <ImageGallery images={images} onClick={clickOnImage} ref={refElem} />}

    //      {/* <Loader render={isLoading} /> */}

    //      {page < maxPage && <Loaderbtn onClick={loadBtn} />}

    //      {isShowModal && <Modal imageFunction={showImage} refModal={refModal} onClick={modalClick} onKeyDown={escCloseModal} />}
        
    //    </div>
    //  )
   
   

