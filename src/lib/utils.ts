import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const normalizePath=(url:string):string=>{
  const clean=url.split("?")[0].split("#")[0];

  if(clean.length>1 && clean.endsWith("/")){
    return clean.slice(0,-1);
  }

  return clean;
}

export const isActiveLink=(
  pathname:string,href:string,exact=false
):boolean=>{
  const current=normalizePath(pathname);
  const target=normalizePath(href);

  if(exact){
    return current===target;
  }

  return current===target || current.startsWith(target+"/");
}