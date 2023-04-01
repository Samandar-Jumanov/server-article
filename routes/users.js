const express = require('express')
const UserModel = require('../modules/users')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const userRouter = express.Router()
userRouter.post('', async (request, response) => {
    const { username, password } = request.body;
    const user = await UserModel.findOne({ username });
    if (user) {
      response.json({ message: 'User already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await new UserModel({ username, password: hashedPassword });
    await newUser.save();
    response.json({ message: 'User created' });
  });


userRouter.post('/login', async (request , response)=>{
    const {username , password } = request.body 
    const user = await UserModel.findOne({username})
    if(!user){
        response.json({message:'User didnt recognized'})
    }
    try {
        const isValidUser = await bcrypt.compare(password, user.password)
        if (!isValidUser) {
          response.json({ message: 'Password is incorrect' })
          return
        }
    
        // Create JWT token for authenticated user
        const token = jwt.sign({ userID: user.id }, 'secretKey')
        response.json({ message: 'Logged in', token })
      } catch (error) {
        response.status(500).json({ message: 'Server error' })
      }
})

module.exports = userRouter 