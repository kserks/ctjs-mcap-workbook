import  { ConstantColorConstraint } from "Elementa";

export default function (r, g, b, a=1){
  // https://csscolor.ru/hex/d411f2
  return new ConstantColorConstraint( new java.awt.Color(r, g, b, a) )
}

