import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "../components/Layout";
import ListadoPeliculas from "../views/ListadoPeliculas";
import DetallePelicula from "../views/DetallePelicula";
import Login from "../views/Login";
import NotFound from "../views/NotFound";
import RutaProtegida from "../components/RutaProtegida";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            index
            element={
              <RutaProtegida>
                <ListadoPeliculas />
              </RutaProtegida>
            }
          />
          <Route path="login" element={<Login />} />
          <Route path="movies/:id" element={<DetallePelicula />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;