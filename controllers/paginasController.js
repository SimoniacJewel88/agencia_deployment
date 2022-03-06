import { Viaje } from "../models/Viaje.js";
import { Testimonial } from "../models/Testimoniales.js";

const paginaInicio = async (req, res) => {  // req-lo que enviamos : res-lo que express nos responde
    
    // Consultar 3 viajes del modelo Viaje
    /** Crearemos un PROMISE para ejecutar simultaneamente funciones
     * que tengan await, y asi no tengan que esperar a que una termine para que
     * se empiece a ejecutar la otra.
     *
     * ESTA BIEN BLOQUEAR UNA SI DEPENDE DEL RESULTADO DE LA OTRA, pero
     * en este caso son entidades separadas e independientes
     */
    const promiseDB = [];

    promiseDB.push( Viaje.findAll({ limit: 3 }) );
    promiseDB.push( Testimonial.findAll({ limit: 3 }) );

    try {
        const resultado = await Promise.all(promiseDB);
        // const viajes = await Viaje.findAll({ limit: 3 });
        // const testimoniales = await Testimonial.findAll({ limit: 3 });

        res.render('inicio', { 
            pagina: 'Inicio',
            clase: 'home',
            viajes: resultado[0],
            testimoniales: resultado[1],
        });

    } catch (error) {
        console.log(error);
    }
    
    
}

const paginaNosotros = (req, res) => { // req-lo que enviamos : res-lo que express nos responde
    res.render('nosotros', {
        pagina : 'Nosotros'
    });
}

const paginaViajes = async (req, res) => { // req-lo que enviamos : res-lo que express nos responde
    // Consultar BD
    const viajes = await Viaje.findAll();

    console.log(viajes);
    
    res.render('viajes', {
        pagina : 'Proximos Viajes',
        viajes,
    });
}

const paginaTestimoniales = async (req, res) => { // req-lo que enviamos : res-lo que express nos responde
    try {
        const testimoniales = await Testimonial.findAll();

        res.render('testimoniales', {
            pagina : 'Testimoniales',
            testimoniales
        });
    } catch (error) {
        console.log(error);

    }
}

// Muestra un viaje por su slug
const paginaDetalleViaje = async (req, res) => { // req-lo que enviamos : res-lo que express nos responde
    const { viaje } = req.params;
    
    try {
        const resultado = await Viaje.findOne({ where : { slug: viaje }})

        res.render('viaje', {
            pagina: 'Informacon Viaje',
            resultado,
        })
    } catch (error) {
        console.log(error);
        
    }
}

export {
    paginaInicio,
    paginaNosotros,
    paginaViajes,
    paginaTestimoniales,
    paginaDetalleViaje
}