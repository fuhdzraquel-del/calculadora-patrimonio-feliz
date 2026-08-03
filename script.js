function dinero(numero) {
  return "$" + Number(numero || 0).toLocaleString("es-MX", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}

// ESTA FUNCIÓN LIMPIA LOS CAMPOS AUTOMÁTICAMENTE AL CARGAR LA PÁGINA
window.onload = function() {
  if (document.getElementById("cliente")) document.getElementById("cliente").value = "";
  if (document.getElementById("subcuenta")) document.getElementById("subcuenta").value = "";
  if (document.getElementById("credito")) document.getElementById("credito").value = "";
  if (document.getElementById("mensual")) document.getElementById("mensual").value = "";
  if (document.getElementById("meses")) document.getElementById("meses").value = "";
  
  // Mantiene SOLAMENTE los valores estándar prellenados
  if (document.getElementById("honorarios")) document.getElementById("honorarios").value = "15";
  if (document.getElementById("originacion")) document.getElementById("originacion").value = "4500";
};

function generarResumen() {
  // 1. Lectura de campos del formulario
  const cliente = document.getElementById("cliente") ? document.getElementById("cliente").value.trim() : "Cliente";
  const subcuenta = parseFloat(document.getElementById("subcuenta") ? document.getElementById("subcuenta").value : 0) || 0;
  const credito = parseFloat(document.getElementById("credito") ? document.getElementById("credito").value : 0) || 0;
  const mensual = parseFloat(document.getElementById("mensual") ? document.getElementById("mensual").value : 0) || 0;
  const meses = parseFloat(document.getElementById("meses") ? document.getElementById("meses").value : 0) || 0;
  const tipoPago = document.getElementById("tipoPago") ? document.getElementById("tipoPago").value : "Semanal";
  const porcentaje = parseFloat(document.getElementById("honorarios") ? document.getElementById("honorarios").value : 15) || 15;
  const originacion = parseFloat(document.getElementById("originacion") ? document.getElementById("originacion").value : 4500) || 0;

  // 2. Cálculos financieros precisos
  let pagoPeriodo = mensual;
  if (tipoPago === "Semanal") pagoPeriodo = mensual / 4;
  if (tipoPago === "Quincenal") pagoPeriodo = mensual / 2;

  const anios = Math.floor(meses / 12);
  const mesesRestantes = meses % 12;
  let tiempoTexto = "";
  if (anios > 0) tiempoTexto += anios + " año" + (anios > 1 ? "s" : "");
  if (mesesRestantes > 0) {
    if (tiempoTexto !== "") tiempoTexto += " y ";
    tiempoTexto += mesesRestantes + " mes" + (mesesRestantes > 1 ? "es" : "");
  }
  if (tiempoTexto === "") tiempoTexto = meses + " meses";

  const honorarios = credito * (porcentaje / 100);
  const netoCredito = credito - honorarios;
  // Resta exacta: Crédito - Honorarios - Gastos de Originación
  const recibe = credito - honorarios - originacion; 
  const totalPagado = mensual * meses;

  // Fecha actual en formato día/mes/año
  const hoy = new Date();
  const fechaTexto = hoy.toLocaleDateString("es-MX", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  });

  // 3. Renderizado HTML de la Infografía
  const html = `
  <!-- BOTÓN DE DESCARGA -->
  <div style="text-align: center; margin-bottom: 20px;">
    <button onclick="descargarImagen()" style="background: #287a38; max-width: 350px; font-size: 18px; padding: 14px; border-radius: 10px;">
      📥 DESCARGAR IMAGEN
    </button>
  </div>

  <!-- INFOGRAFÍA PARA EL CLIENTE -->
  <div id="infografia-para-descargar" class="infografia-canvas">
    
    <!-- Encabezado -->
    <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:15px;">
      <div>
        <h1 style="margin:0; font-size:40px; color:#002349; font-weight:900; line-height:1;">Resumen Financiero</h1>
        <h2 style="margin:4px 0 0 0; font-size:30px; color:#002349; font-weight:500;">de Tu Trámite Infonavit</h2>
        <div style="width:55px; height:5px; background:#287a38; margin-top:8px; border-radius:3px;"></div>
      </div>
      <div>
        <img src="logo.png" style="max-height:60px; object-fit:contain;" alt="Logo">
      </div>
    </div>

    <!-- Banner Informativo con Nombre en 2º renglón y Fecha a la derecha -->
    <div style="background:#002349; color:white; border-radius:18px; padding:12px 20px; display:flex; align-items:center; justify-content:space-between; gap:12px; margin-bottom:20px;">
      <div style="display:flex; align-items:center; gap:12px;">
        <div style="background:white; color:#002349; width:26px; height:26px; border-radius:50%; font-weight:bold; font-style:italic; display:flex; align-items:center; justify-content:center; font-size:16px; flex-shrink:0;">i</div>
        <div style="font-size:13px; line-height:1.4;">
          Este resumen te muestra de forma clara cuánto recibirás, cuánto pagarás y los costos del trámite.<br>
          <span style="font-size:15px; color:#ffd700;"><b>Cliente:</b> <u>${cliente !== "" ? cliente : "Cliente"}</u></span>
        </div>
      </div>
      <div style="font-size:12px; opacity:0.9; text-align:right; white-space:nowrap; background:rgba(255,255,255,0.1); padding:4px 10px; border-radius:8px;">
        📅 <b>Fecha:</b> ${fechaTexto}
      </div>
    </div>

    <!-- Tabla Principal -->
    <table class="tabla-infografia">
      <tr>
        <td class="col-1">
          <div class="flex-title">
            <div class="icon-circle">🏠</div>
            <div class="title-text">Saldo en Subcuenta<br>de Vivienda</div>
          </div>
        </td>
        <td class="col-2"><div class="monto-green">${dinero(subcuenta)}</div></td>
        <td class="col-3">Es el dinero que tienes disponible en tu Subcuenta de Vivienda.</td>
      </tr>

      <tr>
        <td class="col-1">
          <div class="flex-title">
            <div class="icon-circle">📋</div>
            <div class="title-text">Crédito Autorizado</div>
          </div>
        </td>
        <td class="col-2"><div class="monto-green">${dinero(credito)}</div></td>
        <td class="col-3">Es el monto que Infonavit te autoriza para tu trámite.</td>
      </tr>

      <tr>
        <td class="col-1">
          <div class="flex-title">
            <div class="icon-circle">📅</div>
            <div class="title-text">Pago Mensual</div>
          </div>
        </td>
        <td class="col-2">
          <div class="monto-green" style="font-size:26px;">${dinero(mensual)}</div>
          <div style="font-size:14px; font-weight:bold; color:#002349; margin-top:2px;">
            Pago ${tipoPago}<br>
            <span style="color:#287a38; font-size:19px;">${dinero(pagoPeriodo)}</span>
          </div>
        </td>
        <td class="col-3">
          Tu pago mensual es de <b>${dinero(mensual)}</b>.<br>
          El pago ${tipoPago.toLowerCase()} es de <b>${dinero(pagoPeriodo)}</b> (ya que te pagan ${tipoPago.toLowerCase()}mente).
        </td>
      </tr>

      <tr>
        <td class="col-1">
          <div class="flex-title">
            <div class="icon-circle">⏱️</div>
            <div class="title-text">Tiempo de Pago Real</div>
          </div>
        </td>
        <td class="col-2">
          <div style="font-size:22px; font-weight:800; color:#287a38;">${tiempoTexto}</div>
          <div style="font-size:14px; font-weight:bold; color:#002349;">(${meses} meses)</div>
        </td>
        <td class="col-3">El patrón aporta bimestralmente, lo que reduce tu plazo de pago a solo ${meses} meses.</td>
      </tr>

      <tr>
        <td class="col-1">
          <div class="flex-title">
            <div class="icon-circle">💰</div>
            <div class="title-text">Monto Total a Pagar</div>
          </div>
        </td>
        <td class="col-2"><div class="monto-green">${dinero(totalPagado)}</div></td>
        <td class="col-3">
          Es el total que pagarás durante los ${meses} meses.
          <div style="background:#e4f0e5; border-radius:6px; padding:6px 10px; margin-top:5px; font-weight:bold; color:#287a38; font-size:11px; text-align:center;">
            ${dinero(mensual)} x ${meses} meses = <br>${dinero(totalPagado)}
          </div>
        </td>
      </tr>
    </table>

    <!-- Desglose de Costos -->
    <div style="border:2px solid #002349; border-radius:16px; margin-top:18px;">
      <div style="background:#002349; color:white; padding:5px 18px; border-radius:10px 0 10px 0; font-size:14px; font-weight:bold; display:inline-block;">
        Desglose de Costos del Trámite
      </div>

      <table class="tabla-infografia" style="margin-top:5px;">
        <tr>
          <td class="col-1" style="border-bottom:1px dashed #ccc;">
            <div class="flex-title">
              <div class="icon-circle" style="border-color:#c5221f; color:#c5221f;">%</div>
              <div>
                <b style="color:#c5221f; font-size:13px;">Menos Honorarios de Gestión (${porcentaje}%)</b>
                <div style="font-size:11px; color:#666;">Armado de expediente, asesoría y trámite.</div>
              </div>
            </div>
          </td>
          <td class="col-2" style="border-bottom:1px dashed #ccc;"><div class="monto-red">-${dinero(honorarios)}</div></td>
          <td class="col-3" style="border-bottom:1px dashed #ccc;">
            <div style="background:#fce8e6; border-radius:8px; padding:8px; text-align:center;">
              <div style="font-size:11px; color:#c5221f; font-weight:bold;">${dinero(credito)} - ${dinero(honorarios)} =</div>
              <div style="font-size:20px; font-weight:800; color:#c5221f;">${dinero(netoCredito)}</div>
            </div>
          </td>
        </tr>

        <tr>
          <td class="col-1" style="border-bottom:none;">
            <div class="flex-title">
              <div class="icon-circle" style="border-color:#c5221f; color:#c5221f;">👛</div>
              <div>
                <b style="color:#c5221f; font-size:13px;">Menos Gastos de Originación</b>
                <div style="font-size:11px; color:#666;">Inscripción del trámite ante la institución.</div>
              </div>
            </div>
          </td>
          <td class="col-2" style="border-bottom:none;"><div class="monto-red">-${dinero(originacion)}</div></td>
          <td class="col-3" style="border-bottom:none; text-align:center;"><span style="font-size:30px; opacity:0.3;">🏛️</span></td>
        </tr>
      </table>
    </div>

    <!-- Sección Inferior + Círculo -->
    <div style="margin-top:18px; width:62%;">
      <div style="background:#002349; color:white; border-radius:12px; padding:4px 12px; display:inline-flex; align-items:center; gap:5px; font-size:12px; font-weight:bold; margin-bottom:10px;">
        ✓ En resumen:
      </div>
      <div style="display:flex; gap:10px; align-items:flex-start;">
        <div style="font-size:36px; color:#287a38; line-height:1;">💵</div>
        <div>
          <h3 style="margin:0; font-size:17px; color:#287a38; font-weight:800; line-height:1.2;">
            ¡Vas a recibir <u>más dinero</u> del que terminarás pagando!
          </h3>
          <p style="margin:4px 0 0 0; font-size:11px; color:#555; line-height:1.3;">
            Este trámite te permite aprovechar tu crédito Infonavit de forma inteligente, con un plazo corto y pagos accesibles.
          </p>
        </div>
      </div>
    </div>

    <!-- Círculo Verde Derecha -->
    <div class="circle-summary">
      <div style="font-size:17px; font-weight:800; color:#002349;">Recibes:</div>
      <div style="font-size:25px; font-weight:900; color:#287a38; margin:2px 0;">${dinero(recibe)}</div>
      <div style="width:75%; height:2px; background:#287a38; margin:4px 0;"></div>
      <div style="font-size:14px; font-weight:800; color:#002349;">Pagas solo:</div>
      <div style="font-size:21px; font-weight:900; color:#287a38;">${dinero(totalPagado)}</div>
    </div>

    <!-- Pie de página -->
    <div style="border-top:1px solid #e0e0e0; margin-top:20px; padding-top:8px; display:flex; justify-content:space-between; align-items:center; font-size:10px; color:#555; width:62%;">
      <div>🛡️ Estamos contigo en todo el proceso.</div>
      <div>🤝 Asesoría profesional.</div>
    </div>

  </div>
  `;

  const contenedorResultado = document.getElementById("resultado");
  if (contenedorResultado) {
    contenedorResultado.innerHTML = html;
  }
}

// FUNCIÓN PARA DESCARGAR COMO IMAGEN PNG
function descargarImagen() {
  const elemento = document.getElementById("infografia-para-descargar");
  const cliente = document.getElementById("cliente") ? document.getElementById("cliente").value.trim() : "Cliente";

  if (!elemento) return;

  html2canvas(elemento, {
    scale: 2,
    useCORS: true
  }).then(canvas => {
    const enlace = document.createElement("a");
    const nombreLimpio = cliente ? cliente.replace(/\s+/g, '_') : 'Cliente';
    enlace.download = `Resumen_Infonavit_${nombreLimpio}.png`;
    enlace.href = canvas.toDataURL("image/png");
    enlace.click();
  });
}
