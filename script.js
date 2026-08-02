function dinero(numero){

return "$"+Number(numero).toLocaleString("es-MX",{
minimumFractionDigits:2,
maximumFractionDigits:2
});

}

function generarResumen(){

const cliente=document.getElementById("cliente").value;

const subcuenta=parseFloat(document.getElementById("subcuenta").value)||0;

const credito=parseFloat(document.getElementById("credito").value)||0;

const mensual=parseFloat(document.getElementById("mensual").value)||0;

let periodo = 0;

if(tipoPago=="Semanal"){
    periodo = mensual / 4;
}
else if(tipoPago=="Quincenal"){
    periodo = mensual / 2;
}
else{
    periodo = mensual;
}

const meses=parseFloat(document.getElementById("meses").value)||0;

const tipoPago=document.getElementById("tipoPago").value;

const porcentaje=parseFloat(document.getElementById("honorarios").value)||15;

const originacion=parseFloat(document.getElementById("originacion").value)||4500;

const honorarios=credito*(porcentaje/100);

const recibe=credito-honorarios-originacion;

const totalPagado=mensual*meses;

const fecha=new Date().toLocaleDateString("es-MX");

let html=`

<div style="

max-width:900px;

margin:auto;

background:white;

border-radius:30px;

overflow:hidden;

box-shadow:0 0 30px rgba(0,0,0,.20);

font-family:Arial,Helvetica,sans-serif;

">

<div style="

background:#003168;

padding:35px;

color:white;

text-align:center;

">

<img src="logo.png"

style="width:130px;margin-bottom:15px;">

<h1 style="margin:0;font-size:38px;">

Resumen Financiero

</h1>

<div style="font-size:20px;margin-top:8px;">

Patrimonio Feliz

</div>

</div>

<div style="padding:35px;">

<div style="

display:flex;

justify-content:space-between;

margin-bottom:25px;

font-size:20px;

">

<div>

<b>Cliente:</b>

${cliente}

</div>

<div>

<b>Fecha:</b>

${fecha}

</div>

</div>

<h2 style="

color:#003168;

text-align:center;

margin-bottom:30px;

">

Resumen de tu Trámite Infonavit

</h2>

<div style="

display:grid;

grid-template-columns:1fr 1fr;

gap:18px;

">

<div style="
background:#f8f8f8;
padding:20px;
border-left:8px solid #003168;
border-radius:15px;
">

<div style="color:#777;font-size:18px;">
Saldo en Subcuenta
</div>

<div style="
font-size:34px;
font-weight:bold;
color:#003168;
margin-top:8px;
">
${dinero(subcuenta)}
</div>

</div>

<div style="
background:#f8f8f8;
padding:20px;
border-left:8px solid #Fa8200;
border-radius:15px;
">

<div style="color:#777;font-size:18px;">
Crédito Autorizado
</div>

<div style="
font-size:34px;
font-weight:bold;
color:#Fa8200;
margin-top:8px;
">
${dinero(credito)}
</div>

</div>

<div style="
background:#f8f8f8;
padding:20px;
border-left:8px solid #1F8A45;
border-radius:15px;
">

<div style="color:#777;font-size:18px;">
Pago Mensual
</div>

<div style="
font-size:34px;
font-weight:bold;
color:#1F8A45;
margin-top:8px;
">
${dinero(mensual)}
</div>

</div>

<div style="
background:#f8f8f8;
padding:20px;
border-left:8px solid #1F8A45;
border-radius:15px;
">

<div style="color:#777;font-size:18px;">
Pago ${tipoPago}
</div>

<div style="
font-size:34px;
font-weight:bold;
color:#1F8A45;
margin-top:8px;
">
${dinero(pagoPeriodo)}
</div>

</div>

<div style="
background:#f8f8f8;
padding:20px;
border-left:8px solid #7B3FB6;
border-radius:15px;
">

<div style="color:#777;font-size:18px;">
Tiempo Real de Pago
</div>

<div style="
font-size:34px;
font-weight:bold;
color:#7B3FB6;
margin-top:8px;
">
${meses} meses
</div>

</div>

<div style="
background:#f8f8f8;
padding:20px;
border-left:8px solid #C0392B;
border-radius:15px;
">

<div style="color:#777;font-size:18px;">
Monto Total Pagado
</div>

<div style="
font-size:34px;
font-weight:bold;
color:#C0392B;
margin-top:8px;
">
${dinero(totalPagado)}
</div>

</div>

<div style="
background:#f8f8f8;
padding:20px;
border-left:8px solid #555;
border-radius:15px;
">

<div style="color:#777;font-size:18px;">
Honorarios (${porcentaje}%)
</div>

<div style="
font-size:34px;
font-weight:bold;
color:#555;
margin-top:8px;
">
${dinero(honorarios)}
</div>

</div>

<div style="
background:#f8f8f8;
padding:20px;
border-left:8px solid #555;
border-radius:15px;
">

<div style="color:#777;font-size:18px;">
Gastos de Originación
</div>

<div style="
font-size:34px;
font-weight:bold;
color:#555;
margin-top:8px;
">
${dinero(originacion)}
</div>

</div>

</div>

<div style="
display:flex;
justify-content:space-around;
align-items:center;
margin-top:45px;
flex-wrap:wrap;
gap:30px;
">

<div style="
width:280px;
height:280px;
border-radius:50%;
background:#27AE60;
display:flex;
flex-direction:column;
justify-content:center;
align-items:center;
color:white;
box-shadow:0 10px 25px rgba(0,0,0,.25);
">

<div style="
font-size:28px;
font-weight:bold;
letter-spacing:1px;
">

RECIBES

</div>

<div style="
font-size:44px;
font-weight:bold;
margin-top:18px;
text-align:center;
line-height:50px;
">

${dinero(recibe)}

</div>

</div>

<div style="
width:230px;
height:230px;
border-radius:50%;
background:#D63031;
display:flex;
flex-direction:column;
justify-content:center;
align-items:center;
color:white;
box-shadow:0 10px 25px rgba(0,0,0,.25);
">

<div style="
font-size:24px;
font-weight:bold;
">

PAGAS

</div>

<div style="
font-size:36px;
font-weight:bold;
margin-top:15px;
text-align:center;
line-height:40px;
">

${dinero(totalPagado)}

</div>

</div>

</div>

<div style="margin-top:45px;">

<div style="
background:#FFF7E8;
border-left:10px solid #F58220;
padding:25px;
border-radius:18px;
font-size:20px;
line-height:34px;
color:#444;
">

<b>¿Qué significa este resultado?</b>

<br><br>

Con este trámite recibirás un importe aproximado de

<b style="color:#27AE60;">
${dinero(recibe)}
</b>

después de descontar los honorarios de gestión y los gastos de originación.

<br><br>

El monto total que terminarás pagando durante la vida del crédito será aproximadamente

<b style="color:#D63031;">
${dinero(totalPagado)}
</b>

de acuerdo con la mensualidad y el plazo capturados.

</div>

</div>

<footer style="

margin-top:45px;

background:#003168;

color:white;

padding:35px;

text-align:center;

">

<img src="logo.png"

style="width:90px;margin-bottom:15px;">

<div style="

font-size:30px;

font-weight:bold;

margin-bottom:12px;

">

Patrimonio Feliz

</div>

<div style="font-size:18px;line-height:34px;">

📞 Oficina: <b>244 444 7172</b><br>

📲 WhatsApp: <b>244 148 2331</b><br>

✉️ contactopatrimoniofeliz@gmail.com<br>

🌐 patrimoniofeliz.com

</div>

<div style="

margin-top:25px;

font-size:15px;

opacity:.85;

">

Este resumen es una estimación elaborada con la información proporcionada por el cliente.

</div>

</footer>

</div>

`;

document.getElementById("resultado").innerHTML=html;

}
