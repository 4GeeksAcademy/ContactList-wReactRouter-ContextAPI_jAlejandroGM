import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { Layout } from "./pages/Layout";
import { Home } from "./pages/Home";
import { Contacts } from "./pages/Contacts";
import { PageNotFound } from "./pages/PageNotFound";
import { ContactForm } from "./pages/ContactForm";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />} errorElement={<h1>Not found!</h1>} >
      <Route path="/" element={<Home />} />
      <Route path="/contacts" element={<Contacts />} />
      <Route path="/form" element={<ContactForm />} />
      <Route path="form/:id" element={<ContactForm />} />
      <Route path="*" element={<PageNotFound />} />
    </Route>
  )
);