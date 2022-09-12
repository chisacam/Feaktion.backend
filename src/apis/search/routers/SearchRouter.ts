import { Router } from 'express'
import { authToken } from '../../../middleware/tokenVerify'
import { searchUserController } from '../controller/SearchController'

const SearchRouter = Router()

SearchRouter.get('/user', authToken, searchUserController)

export default SearchRouter