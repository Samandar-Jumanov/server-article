const ArticlesModel = require('../modules/articles')
const express = require('express')
const articlesRoute  = express.Router()


//Get all articles 
articlesRoute.get('/all', async (request , response )=>{
    const article = await ArticlesModel.find({})
    response.json(article)
})

//Post artciles 
articlesRoute.post('', async (request , response )=>{
    const {title , theme } = request.body 
    try{
       const newArticle = await ArticlesModel({title, theme})
       await newArticle.save()
       response.json(newArticle);
    }catch(err){
        response.json(err)
    }
})

//get by id 
articlesRoute.get('/:id', async (request , response )=>{
    const id = request.params.id 
    const user = await ArticlesModel.findById(id)
    response.json(user)
})


//delete artciles 

articlesRoute.delete('/:id', async (request , response )=>{
    const id = request.params.id 
    const deletableArticle = await ArticlesModel.findByIdAndDelete(id)
    response.json({message:'Deleted succesfully'})
})


//update articles 

articlesRoute.put('/:id', async (req, res) => {
    const id = req.params.id;
    const newData = req.body;
  
    try {
      const updatedArticle = await ArticlesModel.findByIdAndUpdate(id, newData, 
    { new: true, runValidators: true }).lean();
  
      // Check if the article was found and updated
      if (!updatedArticle) {
        return res.status(404).json({ message: 'Article not found' });
      }
  
      // Return a success message with the updated article
      return res.status(200).json(updatedArticle);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Server error' });
    }
  });


module.exports = articlesRoute