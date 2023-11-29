
import fs from "fs"

const FILE_NAME = "./products.json"
export default class ProductManager {
  products;
  constructor() {
    this.products = [];
  }
  static correlativoId = 0;
  addProduct(title, description, price, thumbnail, code, stock) {
    //id: this.products.length +1,

    if (
      title == undefined ||
      description == undefined ||
      price == undefined ||
      thumbnail == undefined ||
      code == undefined ||
      stock == undefined
    ) {
      throw new Error("Todos los campos son obligatorios");
    }
    let codeExists = this.products.some((dato) => dato.code == code);

    if (codeExists) {
      throw new Error("El codigo ya existe por favor verifique");
    } else {
      ProductManager.correlativoId++;
      const newProduct = {
        id: ProductManager.correlativoId,
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
      };
      this.products.push(newProduct);
    }

    // if () {

    // }
  }
  getProducts() {
    return this.products;
  }
  getProductById(id) {
    let product = this.products.find((dato) => dato.id === id);

    if (product !== undefined) {
      return product;
    } else {
      return "no existe el producto solicitado";
    }
  }

  updateProduct(id, updatedFields) {
    if (id === undefined || updatedFields === undefined) {
      throw new Error("ID y campos actualizados son obligatorios para actualizar el producto");
    }

    let productIndex = this.products.findIndex((product) => product.id === id);

    if (productIndex !== -1) {
      updatedFields.id = id;

      this.products[productIndex] = { ...this.products[productIndex], ...updatedFields };

      this.updateFile(FILE_NAME, id);

      return "Producto actualizado correctamente";
    } else {
      throw new Error("No existe un producto con el ID proporcionado");
    }
  }

  updateFile(filename, id) {
    const updatedProducts = this.products.map((product) => {
      if (product.id === id) {
        product.title = "nuevo titulo";
        product.price = 300;
      }
      return product;
    });

    fs.writeFileSync(filename, JSON.stringify(updatedProducts));

    console.log("actualizacion exitosa");
  }

  deleteProduct(id) {
    if (id === undefined) {
        throw new Error("ID es obligatorio para eliminar el producto");
    }

    const initialLength = this.products.length;
    this.products = this.products.filter((product) => product.id !== id);

    if (this.products.length === initialLength) {
        throw new Error("No existe un producto con el ID proporcionado");
    }

    this.updateFile(FILE_NAME);
    return "Producto eliminado correctamente";
}
}


const myFirstPRoducts = new ProductManager()

myFirstPRoducts.addProduct(
  "producto prueba",
  "Este es un producto de prueba",
  200,
  "sin imagen",
  "abc123",
  25
);

/*myFirstPRoducts.addProduct(
      "producto prueba",
      "Este es un producto de prueba",
      200,
      "sin imagen",
      "abc123",
      25
    );*/
/*
    myFirstPRoducts.addProduct(
      "Pelota",
      "De futbol",
      9.99,
      "http://imagen.jgp",
      "123c",
      23
    );
    */

// console.log("desde getProducts", myFirstPRoducts.getProducts());
// console.log("desde getProducts", myFirstPRoducts.getProducts(1));

//console.log("mi producto filtrado  por id", myFirstPRoducts.getProductById(2)); // ok
//console.log("mi producto filtrado  por id", myFirstPRoducts.getProductById(5)); // error



// UPDATEPRODUCT
// myFirstPRoducts.updateProduct(1, {
//   title: "New Title",
//   price: 300,
//   stock: 30
// });

// console.log("Updated products:", myFirstPRoducts.getProducts());



// DELETEPRODUCT
try {
  myFirstPRoducts.deleteProduct(1);
  console.log("Updated products:", myFirstPRoducts.getProducts());
} catch (error) {
  console.error(error.message);
}