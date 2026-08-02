function dinero(numero) {
  return "$" + Number(numero).toLocaleString("es-MX", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}

function generarResumen() {
  const cliente = document.getElementById("cliente").value || "Cliente";
  const subcuenta = parseFloat(document.getElementById("subcuenta").value) || 0;
  const credito = parseFloat(document.getElementById("credito").value) || 0;
  const mensual = parseFloat(document.getElementById("mensual").value) || 0;
  const meses = parseFloat(document.getElementById("meses").value) || 0;
  const tipoPago = document.getElementById("tipoPago").value || "Semanal";
  const porcentaje = parseFloat(document.getElementById("honorarios").value) || 15;
  const originacion = parseFloat(document.getElementById("originacion").value) || 4500;

  // Cálculo de Pago por Período
  let pagoPeriodo = mensual;
  if (tipoPago === "Semanal") {
    pagoPeriodo = mensual / 4;
  } else if (tipoPago === "Quincenal") {
    pagoPeriodo = mensual / 2;
  }

  // Años y Meses desglosados
  const anios = Math.floor(meses / 12);
  const mesesRestantes = meses % 12;
  let tiempoTexto = "";
  if (anios > 0) {
    tiempoTexto += `${anios} año${anios > 1 ? 's' : ''}`;
  }
  if (mesesRestantes > 0) {
    if (tiempoTexto !== "") tiempoTexto += " y ";
    tiempoTexto += `${mesesRestantes} mes${mesesRestantes > 1 ? 'es' : ''}`;
  }
  if (tiempoTexto === "") tiempoTexto = `${meses} meses`;

  // Totales
  const honorarios = credito * (porcentaje / 100);
  const netoCredito = credito - honorarios;
  const recibe = credito - honorarios - originacion;
  const totalPagado = mensual * meses;

  let html = `
  <div class="infografia-canvas">
    
    <!-- Header Infonavit -->
    <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:15px;">
      <div>
        <h1 style="margin:0; font-size:42px; color:#002349; font-weight:900; letter-spacing:-0.5px; line-height:1;">
          Resumen Financiero
        </h1>
        <h2 style="margin:4px 0 0 0; font-size:32px; color:#002349; font-weight:500;">
          de Tu Trámite Infonavit
        </h2>
        <div style="width:55px; height:5px; background:#287a38; margin-top:10px; border-radius:3px;"></div>
      </div>
      <div>
        <img src="logo.png" style="max-height:65px; object-fit:contain;" alt="Logo">
      </div>
    </div>

    <!-- Banner Info Azul -->
    <div style="background:#002349; color:white; border-radius:30px; padding:10px 20px; display:flex; align-items:center; gap:15px; margin-bottom:20px;">
      <div style="background:white; color:#002349; width:26px; height:26px; border-radius:50%; font-weight:bold; font-style:italic; display:flex; align-items:center; justify-content:center; font-size:18px; flex-shrink:0;">i</div>
      <div style="font-size:13.5px; line-height:1.2; font-weight:500;">
        Este resumen te muestra de forma clara cuánto recibirás, cuánto pagarás y los costos del trámite para <b>${cliente}</b>.
      </div>
    </div>

    <!-- Tabla Principal de Filas -->
    <table class="tabla-infografia">
      
      <!-- Fila 1: Subcuenta -->
      <tr>
        <td class="col-1">
          <div class="flex-title">
            <div class="icon-circle">
              <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
            </div>
            <div class="title-text">Saldo en Subcuenta<br>de Vivienda</div>
          </div>
        </td>
        <td class="col-2">
          <div class="monto-green">${dinero(subcuenta)}</div>
        </td>
        <td class="col-3">
          Es el dinero que tienes disponible en tu Subcuenta de Vivienda.
        </td>
      </tr>

      <!-- Fila 2: Crédito Autorizado -->
      <tr>
        <td class="col-1">
          <div class="flex-title">
            <div class="icon-circle">
              <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            </div>
            <div class="title-text">Crédito Autorizado</div>
          </div>
        </td>
        <td class="col-2">
          <div class="monto-green">${dinero(credito)}</div>
        </td>
        <td class="col-3">
          Es el monto que Infonavit te autoriza para tu trámite.
        </td>
      </tr>

      <!-- Fila 3: Pago Mensual -->
      <tr>
        <td class="col-1">
          <div class="flex-title">
            <div class="icon-circle">
              <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
            </div>
            <div class="title-text">Pago Mensual</div>
          </div>
        </td>
        <td class="col-2">
          <div class="monto-green" style="font-size:26px;">${dinero(mensual)}</div>
          <div style="font-size:15px; font-weight:bold; color:#002349; margin-top:2px;">
            Pago ${tipoPago}<br>
            <span style="color:#287a38; font-size:20px;">${dinero(pagoPeriodo)}</span>
          </div>
        </td>
        <td class="col-3">
          Tu pago mensual es de <b>${dinero(mensual)}</b>.<br>
          El pago ${tipoPago.toLowerCase()} es de <b>${dinero(pagoPeriodo)}</b> (ya que te pagan ${tipoPago.toLowerCase()}mente).
        </td>
      </tr>

      <!-- Fila 4: Tiempo de Pago Real -->
      <tr>
        <td class="col-1">
          <div class="flex-title">
            <div class="icon-circle">
              <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            </div>
            <div class="title-text">Tiempo de Pago Real</div>
          </div>
        </td>
        <td class="col-2">
          <div style="font-size:24px; font-weight:800; color:#287a38;">${tiempoTexto}</div>
          <div style="font-size:15px; font-weight:bold; color:#002349;">(${meses} meses)</div>
        </td>
        <td class="col-3">
          El patrón aporta bimestralmente, lo que reduce tu plazo de pago considerablemente a solo ${meses} meses.
        </td>
      </tr>

      <!-- Fila 5: Monto Total a Pagar -->
      <tr>
        <td class="col-1">
          <div class="flex-title">
            <div class="icon-circle">
              <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
            </div>
            <div class="title-text">Monto Total a Pagar</div>
          </div>
        </td>
        <td class="col-2">
          <div class="monto-green">${dinero(totalPagado)}</div>
        </td>
        <td class="col-3">
          Es el total que pagarás durante los ${meses} meses.
          <div style="background:#e4f0e5; border-radius:6px; padding:6px 10px; margin-top:5px; font-weight:bold; color:#287a38; font-size:12px; text-align:center;">
            ${dinero(mensual)} x ${meses} meses = <br>${dinero(totalPagado)}
          </div>
        </td>
      </tr>
    </table>

    <!-- Bloque Desglose de Costos -->
    <div style="border:2px solid #002349; border-radius:18px; margin-top:20px; position:relative;">
      
      <div style="background:#002349; color:white; padding:6px 20px; border-radius:12px 0 12px 0; font-size:15px; font-weight:bold; display:inline-block;">
        Desglose de Costos del Trámite
      </div>

      <table class="tabla-infografia" style="margin-top:5px;">
        <!-- Honorarios -->
        <tr>
          <td class="col-1" style="border-bottom: 1px dashed #cccccc;">
            <div class="flex-title">
              <div class="icon-circle" style="border-color:#c5221f; color:#c5221f;">%</div>
              <div>
                <b style="color:#c5221f; font-size:14px;">Menos Honorarios de Gestión (${porcentaje}%)</b>
                <div style="font-size:11px; color:#666;">Incluye armado de expediente, asesoría, aprobación sin trabas y comprobación.</div>
              </div>
            </div>
          </td>
          <td class="col-2" style="border-bottom: 1px dashed #cccccc;">
            <div class="monto-red">-${dinero(honorarios)}</div>
          </td>
          <td class="col-3" style="border-bottom: 1px dashed #cccccc;">
            <div style="background:#fce8e6; border-radius:8px; padding:10px; text-align:center;">
              <div style="font-size:12px; color:#c5221f; font-weight:bold;">${dinero(credito)} - ${dinero(honorarios)} =</div>
              <div style="font-size:22px; font-weight:800; color:#c5221f; margin-top:2px;">${dinero(netoCredito)}</div>
            </div>
          </td>
        </tr>

        <!-- Gastos Originacion -->
        <tr>
          <td class="col-1" style="border-bottom:none;">
            <div class="flex-title">
              <div class="icon-circle">👛</div>
              <div>
                <b style="color:#287a38; font-size:14px;">Mas Gastos de Originación</b>
                <div style="font-size:11px; color:#666;">Costo de inscripción del trámite ante la institución.</div>
              </div>
            </div>
          </td>
          <td class="col-2" style="border-bottom:none;">
            <div class="monto-green">${dinero(originacion)}</div>
          </td>
          <td class="col-3" style="border-bottom:none; text-align:center;">
            <div style="font-size:35px; opacity:0.25;">🏛️</div>
          </td>
        </tr>
      </table>
    </div>

    <!-- Sección Inferior: En Resumen + Círculo Flotante -->
    <div style="margin-top:20px; width:65%;">
      
      <div style="background:#002349; color:white; border-radius:15px; padding:5px 15px; display:inline-flex; align-items:center; gap:6px; font-size:13px; font-weight:bold; margin-bottom:12px;">
        <span style="color:#287a38; background:white; border-radius:50%; width:16px; height:16px; display:flex; align-items:center; justify-content:center; font-size:10px;">✓</span> 
        En resumen:
      </div>

      <div style="display:flex; gap:12px; align-items:flex-start;">
        <div style="font-size:40px; color:#287a38; line-height:1;">💵</div>
        <div>
          <h3 style="margin:0; font-size:19px; color:#287a38; font-weight:800; line-height:1.2;">
            ¡Vas a recibir <span style="text-decoration:underline;">más dinero</span> del que terminarás pagando!
          </h3>
          <p style="margin:6px 0 0 0; font-size:12px; color:#555; line-height:1.35;">
            Este trámite te permite aprovechar tu crédito Infonavit de forma inteligente, con un plazo corto, pagos accesibles y beneficios que hacen la diferencia.
          </p>
        </div>
      </div>

    </div>

    <!-- Círculo Gigante Recibes / Pagas Posicionado a la Derecha -->
    <div class="circle-summary">
      <div style="font-size:19px; font-weight:800; color:#002349;">Recibes:</div>
      <div style="font-size:30px; font-weight:900; color:#287a38; margin:2px 0;">${dinero(recibe)}</div>
      <div style="width:75%; height:2px; background:#287a38; margin:6px 0;"></div>
      <div style="font-size:15px; font-weight:800; color:#002349; margin-top:2px;">Pagas solo:</div>
      <div style="font-size:24px; font-weight:900; color:#287a38;">${dinero(totalPagado)}</div>
    </div>

    <!-- Pie de Página -->
    <div style="border-top:1px solid #e0e0e0; margin-top:25px; padding-top:10px; display:flex; justify-content:space-between; align-items:center; font-size:11px; color:#555; width:65%;">
      <div style="display:flex; align-items:center; gap:5px;">
        <span style="color:#287a38; font-weight:bold;">🛡️</span>
        Estamos contigo en todo el proceso para que tu trámite sea fácil, rápido y sin complicaciones.
      </div>
      <div style="display:flex; align-items:center; gap:5px;">
        <span>🤝</span> Asesoría profesional y acompañamiento en cada paso.
      </div>
    </div>

  </div>
  `;

  document.getElementById("resultado").innerHTML = html;
}
