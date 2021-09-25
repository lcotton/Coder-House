class Usuario {
    constructor(nombre,apellido,libros,mascotas){
        this.nombre=nombre
        this.apellido=apellido
        this.libros=libros
        this.mascotas=mascotas
    }

    getFullName(){
        console.log(`${this.nombre} ${this.apellido}`)
    }

    addMascota(nueva_mascota){
        this.mascotas.push(nueva_mascota)
    }

    countMascotas(){
        console.log(this.mascotas.length)
    }

    addBook(name,author){
        this.libros.push({nombre:name, autor:author})
    }

    getBookNames(){
        console.log(this.libros.map((objeto) => objeto.nombre))

    }
}

const u = new Usuario (
    'Lucas',
    'Cotton',
    [{nombre:'El Enigma Spinoza',autor:'Irvin D. Yalom'},{nombre:'Amantes Bajo el Danubio',autor:'Federico Andahazi'}],
    ['Perro','Gato']
)

u.getFullName()
u.addMascota('Lombriz')
u.countMascotas()
u.addBook("La Historia del Amor","Nicole Krauss")
u.getBookNames()
