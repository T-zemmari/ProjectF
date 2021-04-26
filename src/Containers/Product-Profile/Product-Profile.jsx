import React from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import {Avatar, Button, ClickAwayListener} from '@material-ui/core';
import './Product-Profile.scss';



const ProductProfile = ({tamaño})=>{
   
     let datosProducto = JSON.parse(localStorage.getItem('productos'));
     console.log(datosProducto);
     let credentials = JSON.parse(localStorage.getItem('credentials'));

    if(datosProducto?.name && credentials?.user.name){

    return (
        <>
        <Header style ='logged-two'></Header>
        <div className="vista-product-profile-container">

         <div className="Image-and-datainfo-together-product-profile">

          <div className="image-product-profile">
           <img className='img-product-size-on-profile'tamaño ='grande' src={datosProducto.imgUrl} alt={datosProducto.name}/>
          </div>

        
          <div className="data-product-profile">
                  <h1 className='h1-vista-product-profile'>{datosProducto.name}</h1>
              <div className="masdatos">
                  <div className="vista-color-product-profile">
                    <h2 className='h2-vista-product-profile'>Color : {datosProducto.color}</h2>
                  </div>
                  <div className="vista-rate-product-profile">
                    <h2 className='h2-vista-product-profile'>Rate : {datosProducto.rate}</h2>
                  </div>
                  <div className="vista-pantalla-product-profile">
                    <h2 className='h2-vista-product-profile'>Pantalla : {datosProducto.pantalla} Pulgadas</h2>
                  </div>
                  <div className="vista-price-product-profile">
                    <h3 className='h3-vista-product-profile'>{datosProducto.price}</h3>
                  </div>
              </div>
          </div>

          <div className="vista-right-menu-product-profile">
              <div className="vista-disponible-product-profile">
                  <h3 className='h3-vista-disponible-product-profile'>Producto Disponible</h3>
              </div>
              <div className="vista-garantia-product-profile">

              </div>
              <div className="vista-entrega-product-profile">

              </div>

              <div className="vista-boton-comprar-product-profile">
                  <Button variant="contained" color="secondary">
                      Comprar Ahora
                  </Button>
              </div>
          </div>
          <div className="vista-description-product-profile">
          <h2 className='h2-vista-product-profile'>Descripción</h2>
           <p className='p-vista-product-profile'>{datosProducto.description}</p>
          </div>
       </div>

          {/*<div className="vista-description-product-profile">
          <h2 className='h2-vista-product-profile'>Descripción</h2>
           <p className='p-vista-product-profile'>{datosProducto.description}</p>
           </div>*/}
           <div tamaño ='product-profile'><Footer/></div>
        </div>
        </>
    )}if(datosProducto?.name && !credentials?.user.name){

        return(
            <div>
                <>
        
        <div className="vista-product-profile-container">
        <Header style ='register'></Header>
         <div className="Image-and-datainfo-together-product-profile">

          <div className="image-product-profile">
           <img className='img-product-size-on-profile'tamaño ='grande' src={datosProducto.imgUrl} alt={datosProducto.name}/>
          </div>

        
          <div className="data-product-profile">
                  <h1 className='h1-vista-product-profile'>{datosProducto.name}</h1>
              <div className="masdatos">
                  <div className="vista-color-product-profile">
                    <h2 className='h2-vista-product-profile'>Color : {datosProducto.color}</h2>
                  </div>
                  <div className="vista-rate-product-profile">
                    <h2 className='h2-vista-product-profile'>Rate : {datosProducto.rate}</h2>
                  </div>
                  <div className="vista-pantalla-product-profile">
                    <h2 className='h2-vista-product-profile'>Pantalla : {datosProducto.pantalla} Pulgadas</h2>
                  </div>
                  <div className="vista-price-product-profile">
                    <h3 className='h3-vista-product-profile'>{datosProducto.price}</h3>
                  </div>
              </div>
          </div>

          <div className="vista-right-menu-product-profile">
              <div className="vista-disponible-product-profile">
                  <h3 className='h3-vista-disponible-product-profile'>Producto Disponible</h3>
              </div>
              <div className="vista-garantia-product-profile">

              </div>
              <div className="vista-entrega-product-profile">

              </div>

              <div className="vista-boton-comprar-product-profile">
                  <Button variant="contained" color="secondary">
                      Comprar Ahora
                  </Button>
              </div>
          </div>
          <div className="vista-description-product-profile">
          <h2 className='h2-vista-product-profile'>Descripción</h2>
           <p className='p-vista-product-profile'>{datosProducto.description}</p>
          </div>
       </div>

          {/*<div className="vista-description-product-profile">
          <h2 className='h2-vista-product-profile'>Descripción</h2>
           <p className='p-vista-product-profile'>{datosProducto.description}</p>
           </div>*/}
           <div tamaño ='product-profile'><Footer/></div>
        </div>
        </>
                
            </div>
        )
    }
}

export default ProductProfile;