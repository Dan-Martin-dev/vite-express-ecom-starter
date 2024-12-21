import '/home/vare/project/microservices_1/ecommerce_1/vite-express-ecom-starter/frontend/src/styles/MovingBar.css'

const MovingBar: React.FC = () => {
  return (
      <div className="relative w-full h-9 overflow-hidden bg-black">
        <div className="absolute top-0 left-0 w-full h-full bg-black text-xs text-white flex items-center justify-center animate-slide-left-right">
          <div className="flex-shrink-0 whitespace-nowrap">
            <p className="text-center">
              25% OFF EFECTIVO / TRANSFERENCIA &nbsp;&nbsp;&nbsp;&nbsp; 
              6 CUOTAS SIN INTERES + ENVIOS A TODA CABA &nbsp;&nbsp;&nbsp;&nbsp; 
              WINTER SALE VUELA TODO! &nbsp;&nbsp;&nbsp;&nbsp;
              25% OFF EFECTIVO / TRANSFERENCIA &nbsp;&nbsp;&nbsp;&nbsp; 
              6 CUOTAS SIN INTERES + ENVIOS A TODA CABA &nbsp;&nbsp;&nbsp;&nbsp; 
              WINTER SALE VUELA TODO! &nbsp;&nbsp;&nbsp;&nbsp;
              25% OFF EFECTIVO / TRANSFERENCIA &nbsp;&nbsp;&nbsp;&nbsp; 
              6 CUOTAS SIN INTERES + ENVIOS A TODA CABA &nbsp;&nbsp;&nbsp;&nbsp; 
              WINTER SALE VUELA TODO! &nbsp;&nbsp;&nbsp;&nbsp;
              25% OFF EFECTIVO / TRANSFERENCIA &nbsp;&nbsp;&nbsp;&nbsp; 
              6 CUOTAS SIN INTERES + ENVIOS A TODA CABA &nbsp;&nbsp;&nbsp;&nbsp; 
              WINTER SALE VUELA TODO! &nbsp;&nbsp;&nbsp;&nbsp;
            </p>
          </div>
        </div>
      </div>
    );
  };
  
  export default MovingBar;