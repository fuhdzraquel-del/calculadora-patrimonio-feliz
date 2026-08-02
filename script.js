function dinero(numero){
    return "$" + Number(numero).toLocaleString("es-MX",{
        minimumFractionDigits:2,
        maximumFractionDigits:2
    });
}

function generarResumen(){

let cliente=document.getElementById("cliente").value;

let subcuenta=parseFloat(document.getElementById("subcuenta").value)||0;
let credito=parseFloat(document.getElementById("credito").value)||0;
let mensual=parseFloat(document.getElementById("mensual").value)||0;
let pagoPeriodo=parseFloat(document.getElementById("semanal").value)||0;
let meses=parseFloat(document.getElementById("meses").value)||0;

let tipoPago=document.getElementById("tipoPago").value;

let porcentaje=parseFloat(document.getElementById("honorarios").value)||15;
let originacion=parseFloat(document.getElementById("originacion").value)||4500;

let honorarios=credito*(porcentaje/100);

let recibe=credito-honorarios-originacion;

let totalPagado=mensual*meses;

let fecha=new Date().toLocaleDateString("es-MX");

document.getElementById("resultado").innerHTML=`

<div class="tarjeta">

<h2 class="titulo">
Resumen Financiero de tu Trámite Infonavit
</h2>

<div style="text-align:center;font-size:22px;margin-bottom:25px;">

<b>Cliente:</b> ${cliente}<br>

<b>Fecha:</b> ${fecha}

</div>

<div class="datos">

<div class="caja">
<h3>Saldo en Subcuenta</h3>
<span>${dinero(subcuenta)}</span>
</div>

<div class="caja">
<h3>Crédito Autorizado</h3>
<span>${dinero(credito)}</span>
</div>

<div class="caja">
<h3>Pago Mensual</h3>
<span>${dinero(mensual)}</span>
</div>

<div class="caja">
<h3>Pago ${tipoPago}</h3>
<span>${dinero(pagoPeriodo)}</span>
</div>

<div class="caja">
<h3>Tiempo de Pago</h3>
<span>${meses} meses</span>
</div>

<div class="caja">
<h3>Total Pagado</h3>
<span>${dinero(totalPagado)}</span>
</div>

<div class="caja">
<h3>Honorarios (${porcentaje}%)</h3>
<span>${dinero(honorarios)}</span>
</div>

<div class="caja">
<h3>Originación</h3>
<span>${dinero(originacion)}</span>
</div>

</div>

<div class="resumen">

<div class="circulo recibe">

<div>RECIBES</div>

<div style="font-size:34px;margin-top:10px;">
${dinero(recibe)}
</div>

</div>

<div class="circulo paga">

<div>PAGAS</div>

<div style="font-size:34px;margin-top:10px;">
${dinero(totalPagado)}
</div>

</div>

</div>

<footer>

<b>Patrimonio Feliz</b><br>

📞 Oficina: 244 444 7172<br>

📲 WhatsApp: 244 148 2331<br>

✉️ contactopatrimoniofeliz@gmail.com<br>

🌐 patrimoniofeliz.com

</footer>

</div>

`;

}