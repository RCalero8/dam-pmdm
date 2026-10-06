$(function(){
    var alfabeto = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ";
    
    //Quitar acentos
    function acentos(caracter) {
        var con = "áéíóúüÁÉÍÓÚÜ";
        var sin = "aeiouuAEIOUU";
        var i = con.indexOf(caracter);
        return i === -1 ? caracter : sin[i];
    }
})