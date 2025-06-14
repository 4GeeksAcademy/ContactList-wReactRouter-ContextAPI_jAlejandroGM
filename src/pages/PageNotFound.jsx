import { Link } from "react-router-dom";

export const PageNotFound = () => {
    return (
        <div className="container d-flex flex-column align-items-center justify-content-center vh-100 text-center">
            <h1 className="display-1 fw-bold">404</h1>
            <p className="fs-3">😕 <span className="text-danger">Página no encontrada</span></p>
            <p className="lead">
                La página que estás buscando no existe o ha sido movida.
            </p>
            <Link to="/" className="btn btn-primary mt-3">
                Volver al inicio
            </Link>
        </div>
    );
};