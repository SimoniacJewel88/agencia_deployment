import express from "express";
import { paginaInicio,
         paginaNosotros, 
         paginaViajes, 
         paginaTestimoniales,
         paginaDetalleViaje
} from '../controllers/paginasController.js';
import { guardarTestimonial,
} from "../controllers/testimonialController.js";

const router = express.Router();

router.get('/', paginaInicio);

// router.get('/inicio', (req, res) => {  req-lo que enviamos : res-lo que express nos responde
    // res.render('inicio');
// });

router.get('/nosotros', paginaNosotros);

router.get('/viajes', paginaViajes);
router.get('/viajes/:viaje', paginaDetalleViaje);//El comodin ":viaje" indica como se va a llamar en los parametros del req

router.get('/testimoniales', paginaTestimoniales);
router.post('/testimoniales', guardarTestimonial);


export default router;
