const fs = require('fs');

class Contenedor {
    constructor(archivo){
        this.archivo = archivo
    }

    async save(new_product){
        try {
            const products = await fs.promises.readFile(this.archivo,'utf-8')
            if( products === ""){
                let ps = []
                const new_id = 1
                new_product['id'] = new_id
                ps.push(new_product)
                let content = JSON.stringify(ps)
                content = await fs.promises.writeFile(this.archivo,content)
                return new_id
            }
            else {
                const parse_products = JSON.parse(products)
                const id_max = Math.max(...parse_products.map(p => p.id))
                const new_id = id_max + 1
                new_product['id'] = new_id
                parse_products.push(new_product)
                let content = JSON.stringify(parse_products)
                content = await fs.promises.writeFile(this.archivo,content)
                return new_id
            }
        }
        catch(err) {
            console.log('Error al intentar guardar el archivo',err)

        }
    }

    async getById(number) {
        try {
            const content = await fs.promises.readFile(this.archivo,'utf-8')
            const products = JSON.parse(content)
            return products.filter( p => p.id === number)        
        }

        catch(err) {
            console.log('Error al leer el contenido',err)
        }
    }

    async getAll() {
        try {
            const content = await fs.promises.readFile(this.archivo,'utf-8')
            const products = JSON.parse(content)
            return products
        }

        catch(err) {
            console.log('Error al leer el contenido',err)
        }
    }

    async deleteById(number) {
        try {
            const content = await fs.promises.readFile(this.archivo,'utf-8')
            const products = JSON.parse(content)
            const filterProduct = products.filter( p => p.id != number)
            const remainingproducts = JSON.stringify(filterProduct) 
            const remainingcontent = await fs.promises.writeFile(this.archivo,remainingproducts)
            
        }

        catch(err) {
            console.log('Error al borrar el producto',err)
        }
    }

    async deleteAll() {
        try {
            const deleted = await fs.promises.writeFile(this.archivo,"")
            
        }

        catch(err) {
            console.log('Error al borrar el producto',err)
        }
    }




}



const c = new Contenedor ('./Coder-House/2. Manejo de Archivos en Javascript programación sincrónica y asincrónica/productos.txt')
//c.save({title:'Cafetera Nespresso Krups Essenza',price:19999,thumbnail:'https://http2.mlstatic.com/D_NQ_NP_2X_675732-MLA32619197440_102019-F.webp'}).then(new_id => console.log(new_id))
//c.getById(2).then((p) => p.forEach(console.log))
c.getAll().then((p) => p.forEach(console.log))
//c.deleteById(2)
//c.deleteAll()

