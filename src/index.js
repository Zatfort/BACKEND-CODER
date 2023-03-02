import express from "express"
import ProductRouter from "./router/product.routes.js"
import CartRouter from "./router/carts.routes.js"



const app = express()

const PORT = 8080

app.use(express.json())
app.use(express.urlencoded({ entended: true }))

app.use("/api/products", ProductRouter)
app.use("/api/cart", CartRouter)

 

app.listen(PORT, () =>{
    console.log(`servidor express puerto ${PORT}`)
})
