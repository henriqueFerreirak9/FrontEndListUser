import express from 'express'
import {v4 as uuid} from 'uuid'
import cors from 'cors'
const app = express()


app.use(express.json())
app.use(cors())

interface User {
    id: string,
    name: string,
    email: string
}

const users: User[] = []

app.get('/users', (request, response)=>{
    
    // retornar os usuários
    return response.json(users)
})

app.post('/users', (request, response) => {
    //receber dados do novo usuário
    const { name, email} = request.body
    //criar um novo usuário
    const newUser = {id: uuid(), name, email}
    //registrar no array o novo user
    users.push(newUser)
    //retornar os dados do usuário criado
    return response.json(newUser)
} )

app.put('/users/:id', (request, response) => {
    // receber os dados do usuário 
    const { id } = request.params
    const { name, email} = request.body

    //localizar o usuário no array
    const userIndex = users.findIndex((user) => user.id === id)

    // se nao existe , retornar um erro
    if (userIndex < 0){
        return response.status(404).json({error:'nao encontrado'})
    }
    //atualiza o user na base de dados
    const user = {id, name, email}
    users[userIndex] = user
    
    // retornar os dados atualizado
    return response.json(user)
   
})

app.delete('/users/:id', (request, response) => {
    //localizar o user no array
    const { id } = request.params
    const userIndex =  users.findIndex((user)=> user.id == id)
    //se nao existir retorna erro
    if (userIndex < 0 ){
        return response.status(404).json({error: 'user not found'})
    }
    //excluir o user do array
    users.splice(userIndex, 1)
    //retorna o status de sucesso
    return response.status(204).send()
})



app.listen('3333', () =>{
    console.log("back started")
} )