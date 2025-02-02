import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Product from '../../components/Products/Product';
import Android from '../../img/MovAcc.jpg';
import accesorios from '../../img/accesories.png';
import smartphone from '../../img/smarts.jpeg';
import repuestos from '../../img/flex.png';
import { connect } from 'react-redux';
import axios from 'axios';
import { PRODUCT } from '../../Redux/Types';
import calidad from '../../img/Quality.jpg';
import './Home.scss';


const Home = (props) => {

   let history = useHistory();
   const goto = (go) => {

      history.push(go)

   }
   //................Me traigo los productos destacados..........//

   const [destacados, setDestacados] = useState([]);
   const [accessorios_destacados, setAccessoriosDestacados] = useState([]);
   useEffect(async () => {

      //------------Me traigo los productos destacados-----------//


      let response_uno = await axios.get('http://localhost:3002/products');
      localStorage.setItem('destacados', JSON.stringify(response_uno.data));

      let primeraPagina = response_uno.data.slice(3, 11);
      setDestacados(primeraPagina);

      props.dispatch({ type: PRODUCT, payload: response_uno.data })





      let response_dos = await axios.get('http://localhost:3002/accessorios');
      localStorage.setItem('accesoriosDestacados', JSON.stringify(response_dos.data))

      let primeraPaginaAccessorios = response_dos.data.slice(0, 3)
      setAccessoriosDestacados(primeraPaginaAccessorios);







   }, []);

   const GetProductInfo = (product) => {
      localStorage.removeItem('productos');
      localStorage.setItem('productos', JSON.stringify(product));
      history.push('/product-profile')

   };

   return (
      <>

         <div className="home-container">


            <div className="vista-portada-uno-home">

               <div className="header-home"><Header style='home' /></div>
               <img className="vista-portada-uno-home" src={Android} alt="android" />
            </div>


            <nav classNAme='navbar-escondido'>
               <li className='li-nav-hidden' onClick={() => history.push('/tienda')}>Tienda</li>
               <li className='li-nav-hidden' onClick={() => history.push('/presupuestos')}> Presupuesto</li>
               <li className='li-nav-hidden' onClick={() => history.push('/tienda')}>Mi espacio</li>
               <li className='li-nav-hidden' onClick={() => history.push('/contacto')}>Contact</li>
               <li className='li-nav-hidden' onClick={() => history.push('/login')}>Entrar</li>
            </nav>






            <div className='separador-home'></div>



            <h2 className='h2-vista-product-home'>
               Productos destacados</h2>

            <div className="destacados-z-index-superior-home">

               {destacados?.map(destacados => <Product tamaño='normal' key={destacados._id}  {...destacados} onClick={() => GetProductInfo(destacados)} />)}

            </div>

            <div className='separador-home'></div>

            <h2 className='h2-vista-product-home'>Accesorios destacados</h2>

            <div className="destacados-accesorios-home">

               {accessorios_destacados?.map(accessorios_destacados => <Product label='accessorios-destacados' key={accessorios_destacados._id}  {...accessorios_destacados} onClick={() => GetProductInfo(accessorios_destacados)} />)}

            </div>

            <h2 className='h2-vista-product-home'>Categorias</h2>
            <div className="home-categorias"></div>

            <div className="vista-contenedor-rep-smart-acces">

               <div className="vista-contenedor-divs-rep-smart-acces">
                  <div className="vista-contenido">
                     <img onClick={(go) => goto('/tienda')} className="vista-contenido" src={smartphone} alt="smart" />
                  </div>
                  <p className='p-home-titulo'>Telefonos</p>
                  <p className='p-home-parrafo'>Navega por nuestro catalogo, y elige el accesorio que <br />
           mas te gusta, a un precio de chollo.</p>
               </div>

               <div className="vista-contenedor-divs-rep-smart-acces">
                  <div className="vista-contenido">
                     <img className="vista-contenido" src={repuestos} alt="repuestos" onClick={() => { history.push('repuestos') }} />
                  </div>
                  <p className='p-home-titulo'>Repuestos</p>
                  <p className='p-home-parrafo'>Navega por nuestro catalogo, y elige el accesorio que <br />
           mas te gusta, a un precio de chollo.</p>
               </div>

               <div className="vista-contenedor-divs-rep-smart-acces">
                  <div className="vista-contenido">
                     <img className="vista-contenido" src={accesorios} alt="accesorios" onClick={() => { history.push('tienda') }} />
                  </div>
                  <p className='p-home-titulo'>Accesorios</p>
                  <p className='p-home-parrafo'>Navega por nuestro catalogo, y elige el accesorio que <br />
           mas te gusta, a un precio de chollo.</p>
               </div>
            </div>

            <div className="separador-home"></div>

            <div className="publicidad-uno">
               <div className="span-my-space">
                  <div className="parrafo  parrafo-uno">
                     En <strong>TEcMobil</strong>  Sabemos lo importante que es tu Telefono o Tu Tablet, por eso Cuidaremos todos los detalles para que tu dispositivo reciba el mejor trato posible , a fin de que vuelvas a utilizarlo con la misma ilusion que el primer dia.
                    </div>

                  <h2>LOS MEJORES PROFESIONALES PARA MANIPULAR TU SMARTPHONE</h2>



                  <div className='parrafo parrafo-dos'>
                     El trabajo empieza desde el primer momento, para hacer una buena reparación hay que entender la avería, muchos fallos que presentan hoy en día los equipos son producidos por problemas de configuraciones.
                    </div>
               </div>

            </div>
            <div className="separador-home"></div>
            <h2> PRODUCTOS ESTRELLA</h2>


            {<footer className='footer-special-presupuesto'>
               <div className="footer-container">
                  <div className="vista-sobre-nosotros">
                     Enlaces de interes
                                         <div>Envios</div>
                     <div>Repuestos</div>
                     <div>Accesorios</div>
                     <div>Telefonos nuevos y de segunda mano</div>
                     <div>Copyright TEcMovil</div>

                  </div>
                  <div className="vista-sobre-nosotros">
                     Sobre Nosotros
                                    <div>Calle los leones 28 bajo 46022 Valencia</div>

                  </div>

                  <div className="vista-sobre-nosotros">

                     <div className='calidad'>
                        <img className='calidad' src={calidad} />
                     </div>

                  </div>

               </div>
            </footer>}

         </div>
      </>
   )


}
const mapStateToProps = (state) => {

   return {
      carrito: state.carritoReducer.carrito,
      user: state.userReducer.user,
      product: state.productReducer.product
   }
}


export default connect(mapStateToProps)(Home);