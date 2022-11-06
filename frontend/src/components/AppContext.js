/* On créer create Contexte
 Lorsque React affiche un composant qui s'abonne à cet objet Context , 
 il lira la valeur actuelle du contexte depuis le Provider le plus proche 
 situé plus haut dans l'arborescence. */

import { createContext } from "react";

export const UidContext = createContext();
