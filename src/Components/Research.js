import React, { useEffect } from 'react'
import AllArticles from '../Components/AllArticels'
import UploadForm from './UploadForm'
import * as articlesAction from '../Redux/articleSlice/articleSlice'
import { useDispatch } from 'react-redux'


const Research = () => {

  const dispatch = useDispatch()

useEffect(() => {
  dispatch(articlesAction.getAllArticlesAsync());
}, []);

  return (
    <AllArticles />

  )

}

export default Research
