import  { ConstantColorConstraint } from "Elementa";

function sRGBa (r, g, b, a=1){
  // https://csscolor.ru/hex/d411f2
  return new ConstantColorConstraint( new java.awt.Color(r, g, b, a) )
}

export default sRGBa
