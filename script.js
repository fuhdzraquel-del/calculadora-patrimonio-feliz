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
  const tipoPago = document.getElementById("tipoPago").value;
  const porcentaje = parseFloat(document.getElementById("honorarios").value) || 15;
  const originacion = parseFloat(document.getElementById("originacion").value) || 4500;

  // Cálculos de frecuencia de pago
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
  const netoCredito = credito - honorarios; // Crédito menos honorarios
  const recibe = credito - honorarios - originacion;
  const totalPagado = mensual * meses;

  let html = `
  <div class="infografia-card">
    
    <!-- Encabezado Principal -->
    <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:20px;">
      <div>
        <h1 style="margin:0; font-size:36px; color:#0b2545; font-weight:800; line-height:1.1;">
          Resumen Financiero
        </h1>
        <h2 style="margin:5px 0 0 0; font-size:28px; color:#0b2545; font-weight:600;">
          de Tu Trámite Infonavit
        </h2>
        <div style="width:60px; height:4px; background:#2d6a4f; margin-top:8px; border-radius:2px;"></div>
      </div>
      <div style="text-align:right;">
        <img src="logo.png" style="max-height:60px; object-fit:contain;" alt="Logo">
      </div>
    </div>

    <!-- Barra de mensaje informativo -->
    <div style="background:#0b2545; color:white; border-radius:50px; padding:12px 25px; display:flex; align-items:center; gap:15px; margin-bottom:25px;">
      <div style="background:white; color:#0b2545; width:28px; height:28px; border-radius:50%; font-weight:bold; font-style:italic; display:flex; align-items:center; justify-content:center; font-size:18px; flex-shrink:0;">i</div>
      <div style="font-size:14px; line-height:1.3;">
        Este resumen te muestra de forma clara cuánto recibirás, cuánto pagarás y los costos del trámite para <b>${cliente}</b>.
      </div>
    </div>

    <!-- Sección de Filas Principales -->
    <div>
      <!-- Saldo Subcuenta -->
      <div class="info-row">
        <div class="row-icon-title">
          <div class="icon-badge">🏠</div>
          <b style="font-size:17px; color:#0b2545;">Saldo en Subcuenta<br>de Vivienda</b>
        </div>
        <div class="text-amount-green">${dinero(subcuenta)}</div>
        <div class="subtext-gray">Es el dinero que tienes disponible en tu Subcuenta de Vivienda.</div>
      </div>

      <!-- Crédito Autorizado -->
      <div class="info-row">
        <div class="row-icon-title">
          <div class="icon-badge">📋</div>
          <b style="font-size:17px; color:#0b2545;">Crédito Autorizado</b>
        </div>
        <div class="text-amount-green">${dinero(credito)}</div>
        <div class="subtext-gray">Es el monto que Infonavit te autoriza para tu trámite.</div>
      </div>

      <!-- Pago Mensual / Período -->
      <div class="info-row">
        <div class="row-icon-title">
          <div class="icon-badge">📅</div>
          <b style="font-size:17px; color:#0b2545;">Pago Mensual</b>
        </div>
        <div>
          <div class="text-amount-green">${dinero(mensual)}</div>
          <div style="font-size:14px; font-weight:bold; color:#0b2545; margin-top:2px;">
            Pago ${tipoPago}: <span style="color:#2d6a4f;">${dinero(pagoPeriodo)}</span>
          </div>
        </div>
        <div class="subtext-gray">
          Tu pago mensual es de ${dinero(mensual)}.<br>
          El pago ${tipoPago.toLowerCase()} es de ${dinero(pagoPeriodo)}.
        </div>
      </div>

      <!-- Tiempo de Pago Real -->
      <div class="info-row">
        <div class="row-icon-title">
          <div class="icon-badge">⏱️</div>
          <b style="font-size:17px; color:#0b2545;">Tiempo de Pago Real</b>
        </div>
        <div>
          <div style="font-size:22px; font-weight:bold; color:#2d6a4f;">${tiempoTexto}</div>
          <div style="font-size:14px; color:#5f6368; font-weight:bold;">(${meses} meses)</div>
        </div>
        <div class="subtext-gray">El patrón aporta bimestralmente, lo que reduce tu plazo de pago a solo ${meses} meses.</div>
      </div>

      <!-- Monto Total a Pagar -->
      <div class="info-row">
        <div class="row-icon-title">
          <div class="icon-badge">💰</div>
          <b style="font-size:17px; color:#0b2545;">Monto Total a Pagar</b>
        </div>
        <div class="text-amount-green">${dinero(totalPagado)}</div>
        <div>
          <div style="background:#e8f5e9; border-radius:8px; padding:8px 12px; font-size:13px; color:#2d6a4f; font-weight:bold;">
            ${dinero(mensual)} x ${meses} meses = ${dinero(totalPagado)}
          </div>
        </div>
      </div>
    </div>

    <!-- Sección Desglose de Costos del Trámite -->
    <div style="border:2px solid #0b2545; border-radius:18px; margin-top:25px; overflow:hidden;">
      <div style="background:#0b2545; color:white; padding:8px 20px; font-weight:bold; font-size:16px; width:fit-content; border-bottom-right-radius:12px;">
        Desglose de Costos del Trámite
      </div>

      <div style="padding:15px 20px;">
        <!-- Honorarios -->
        <div class="info-row">
          <div class="row-icon-title">
            <div class="icon-badge" style="border-color:#c5221f; color:#c5221f;">%</div>
            <div>
              <b style="color:#c5221f; font-size:15px;">Menos Honorarios de Gestión (${porcentaje}%)</b>
              <div class="subtext-gray" style="font-size:12px;">Incluye armado de expediente, asesoría, aprobación y gestión.</div>
            </div>
          </div>
          <div class="text-amount-red">-${dinero(honorarios)}</div>
          <div style="background:#fce8e6; border-radius:8px; padding:8px 12px; text-align:center;">
            <div style="font-size:11px; color:#c5221f;">${dinero(credito)} - ${dinero(honorarios)} =</div>
            <div style="font-size:18px; font-weight:bold; color:#c5221f;">${dinero(netoCredito)}</div>
          </div>
        </div>

        <!-- Gastos de Originación -->
        <div class="info-row" style="border-bottom:none;">
          <div class="row-icon-title">
            <div class="icon-badge">👛</div>
            <div>
              <b style="color:#2d6a4f; font-size:15px;">Mas Gastos de Originación</b>
              <div class="subtext-gray" style="font-size:12px;">Costo de inscripción del trámite ante la institución.</div>
            </div>
          </div>
          <div class="text-amount-green">${dinero(originacion)}</div>
          <div style="text-align:center; font-size:30px; opacity:0.3;">🏛️</div>
        </div>
      </div>
    </div>

    <!-- Sección En Resumen + Círculo Recibes/Pagas -->
    <div style="display:flex; justify-content:space-between; align-items:center; margin-top:25px; gap:20px; flex-wrap:wrap;">
      <div style="flex:1; min-width:280px;">
        <div style="background:#0b2545; color:white; border-radius:20px; padding:6px 16px; display:inline-flex; align-items:center; gap:8px; font-weight:bold; font-size:14px; margin-bottom:15px;">
          <span>✔</span> En resumen:
        </div>
        <div style="display:flex; gap:15px; align-items:flex-start;">
          <div style="font-size:45px; color:#2d6a4f; line-height:1;">💵</div>
          <div>
            <h3 style="margin:0; font-size:20px; color:#2d6a4f; font-weight:800;">
              ¡Vas a recibir más dinero del que terminarás pagando!
            </h3>
            <p style="margin:8px 0 0 0; font-size:13px; color:#5f6368; line-height:1.4;">
              Este trámite te permite aprovechar tu crédito Infonavit de forma inteligente, con un plazo corto y pagos accesibles.
            </p>
          </div>
        </div>
      </div>

      <!-- Círculo Verde Derecha -->
      <div class="circle-summary">
        <div style="font-size:18px; font-weight:bold; color:#0b2545;">Recibes:</div>
        <div style="font-size:28px; font-weight:800; color:#2d6a4f; margin:4px 0;">${dinero(recibe)}</div>
        <div style="width:80%; height:2px; background:#2d6a4f; margin:6px 0;"></div>
        <div style="font-size:15px; font-weight:bold; color:#0b2545; margin-top:2px;">Pagas solo:</div>
        <div style="font-size:22px; font-weight:800; color:#2d6a4f;">${dinero(totalPagado)}</div>
      </div>
    </div>

    <!-- Pie de página de la Infografía -->
    <div style="border-top:1px solid #e0e0e0; margin-top:25px; padding-top:15px; display:flex; justify-content:space-between; align-items:center; font-size:12px; color:#5f6368;">
      <div style="display:flex; align-items:center; gap:6px;">
        <span style="color:#2d6a4f; font-weight:bold;">✔</span>
        Estamos contigo en todo el proceso para que tu trámite sea fácil, rápido y sin complicaciones.
      </div>
      <div style="display:flex; align-items:center; gap:6px; font-weight:600;">
        <span>🤝</span> Asesoría profesional y acompañamiento en cada paso.
      </div>
    </div>

  </div>
  `;

  document.getElementById("resultado").innerHTML = html;
}
