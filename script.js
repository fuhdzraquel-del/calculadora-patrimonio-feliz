// ... (resto de tus funciones dinero() y window.onload, esas no cambian)

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

  // 2. Cálculos financieros
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
  const recibe = netoCredito - originacion;
  const totalPagado = mensual * meses;

  const hoy = new Date();
  const fechaTexto = hoy.toLocaleDateString("es-MX", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  });

  // 3. Renderizado con Marco Azul Exterior y Bordes Suaves
  const html = `
  <!-- BOTÓN DE DESCARGA -->
  <div style="text-align: center; margin-bottom: 20px;">
    <button onclick="descargarImagen()" style="background: #287a38; max-width: 350px; font-size: 18px; padding: 14px 24px; border-radius: 10px; cursor: pointer; color: white; border: none; font-weight: bold; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
      📥 DESCARGAR IMAGEN
    </button>
  </div>

  <!-- INFOGRAFÍA MARCO EXTERIOR AZUL (#003168) -->
  <div id="infografia-para-descargar" style="position: relative; background: #ffffff; border: 12px solid #003168; border-radius: 24px; padding: 25px; box-sizing: border-box; width: 850px; margin: 0 auto; font-family: system-ui, -apple-system, sans-serif;">
    
    <!-- Encabezado -->
    <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:15px; border-bottom: 2px solid #e2e8f0; padding-bottom: 15px;">
      <div>
        <h1 style="margin:0; font-size:38px; color:#003168; font-weight:900; line-height:1;">Resumen Financiero</h1>
        <h2 style="margin:4px 0 0 0; font-size:26px; color:#003168; font-weight:500;">de Tu Trámite Infonavit</h2>
        <div style="width:55px; height:5px; background:#287a38; margin-top:8px; border-radius:3px;"></div>
      </div>
      <div>
        <img src="logo.png" style="max-height:65px; object-fit:contain;" alt="Logo">
      </div>
    </div>

    <!-- Banner Informativo -->
    <div style="background:#003168; color:white; border-radius:14px; padding:12px 20px; display:flex; align-items:center; justify-content:space-between; gap:12px; margin-bottom:20px;">
      <div style="display:flex; align-items:center; gap:12px;">
        <div style="background:white; color:#003168; width:26px; height:26px; border-radius:50%; font-weight:bold; font-style:italic; display:flex; align-items:center; justify-content:center; font-size:16px; flex-shrink:0;">i</div>
        <div style="font-size:13px; line-height:1.4;">
          Este resumen te muestra de forma clara cuánto recibirás, cuánto pagarás y los costos del trámite.<br>
          <span style="font-size:15px; color:#ffd700;"><b>Cliente:</b> <u>${cliente !== "" ? cliente : "Cliente"}</u></span>
        </div>
      </div>
      <div style="font-size:12px; opacity:0.9; text-align:right; white-space:nowrap; background:rgba(255,255,255,0.12); padding:5px 12px; border-radius:8px;">
        📅 <b>Fecha:</b> ${fechaTexto}
      </div>
    </div>

    <!-- TABLA PRINCIPAL CON BORDES REDONDEADOS Y DIVISORES GRISES -->
    <div style="border: 1px solid #cbd5e1; border-radius: 16px; overflow: hidden; margin-bottom: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.02);">
      <table style="width: 100%; border-collapse: collapse; background: #ffffff;">
        
        <tr style="border-bottom: 1px solid #e2e8f0;">
          <td style="padding: 12px 15px; width: 35%;">
            <div style="display:flex; align-items:center; gap:10px;">
              <div style="font-size:22px; width:36px; height:36px; border:2px solid #003168; border-radius:50%; display:flex; align-items:center; justify-content:center; background:#f0f4f8;">🏠</div>
              <div style="font-weight:bold; color:#003168; font-size:13px;">Saldo en Subcuenta<br>de Vivienda</div>
            </div>
          </td>
          <td style="padding: 12px; width: 25%; font-size:20px; font-weight:800; color:#287a38; text-align:center; border-left: 1px solid #f1f5f9; border-right: 1px solid #f1f5f9;">
            ${dinero(subcuenta)}
          </td>
          <td style="padding: 12px 15px; font-size:12px; color:#475569;">Es el dinero que tienes disponible en tu Subcuenta de Vivienda.</td>
        </tr>

        <tr style="border-bottom: 1px solid #e2e8f0;">
          <td style="padding: 12px 15px;">
            <div style="display:flex; align-items:center; gap:10px;">
              <div style="font-size:22px; width:36px; height:36px; border:2px solid #003168; border-radius:50%; display:flex; align-items:center; justify-content:center; background:#f0f4f8;">📋</div>
              <div style="font-weight:bold; color:#003168; font-size:13px;">Crédito Autorizado</div>
            </div>
          </td>
          <td style="padding: 12px; font-size:20px; font-weight:800; color:#287a38; text-align:center; border-left: 1px solid #f1f5f9; border-right: 1px solid #f1f5f9;">
            ${dinero(credito)}
          </td>
          <td style="padding: 12px 15px; font-size:12px; color:#475569;">Es el monto que Infonavit te autoriza para tu trámite.</td>
        </tr>

        <tr style="border-bottom: 1px solid #e2e8f0;">
          <td style="padding: 12px 15px;">
            <div style="display:flex; align-items:center; gap:10px;">
              <div style="font-size:22px; width:36px; height:36px; border:2px solid #003168; border-radius:50%; display:flex; align-items:center; justify-content:center; background:#f0f4f8;">📅</div>
              <div style="font-weight:bold; color:#003168; font-size:13px;">Pago Mensual</div>
            </div>
          </td>
          <td style="padding: 12px; text-align:center; border-left: 1px solid #f1f5f9; border-right: 1px solid #f1f5f9;">
            <div style="font-size:22px; font-weight:800; color:#287a38;">${dinero(mensual)}</div>
            <div style="font-size:12px; font-weight:bold; color:#003168; margin-top:2px;">
              Pago ${tipoPago}: <span style="color:#287a38; font-size:15px;">${dinero(pagoPeriodo)}</span>
            </div>
          </td>
          <td style="padding: 12px 15px; font-size:12px; color:#475569;">
            Tu pago mensual es de <b>${dinero(mensual)}</b>.<br>
            El pago ${tipoPago.toLowerCase()} es de <b>${dinero(pagoPeriodo)}</b> (ya que te pagan${tipoPago.toLowerCase()}mente).
          </td>
        </tr>

        <tr style="border-bottom: 1px solid #e2e8f0;">
          <td style="padding: 12px 15px;">
            <div style="display:flex; align-items:center; gap:10px;">
              <div style="font-size:22px; width:36px; height:36px; border:2px solid #003168; border-radius:50%; display:flex; align-items:center; justify-content:center; background:#f0f4f8;">⏱️</div>
              <div style="font-weight:bold; color:#003168; font-size:13px;">Tiempo de Pago Real</div>
            </div>
          </td>
          <td style="padding: 12px; text-align:center; border-left: 1px solid #f1f5f9; border-right: 1px solid #f1f5f9;">
            <div style="font-size:18px; font-weight:800; color:#287a38;">${tiempoTexto}</div>
            <div style="font-size:12px; font-weight:bold; color:#003168;">(${meses} meses)</div>
          </td>
          <td style="padding: 12px 15px; font-size:12px; color:#475569;">El patrón aporta bimestralmente, lo que reduce tu plazo de pago a solo ${meses} meses.</td>
        </tr>

        <tr>
          <td style="padding: 12px 15px;">
            <div style="display:flex; align-items:center; gap:10px;">
              <div style="font-size:22px; width:36px; height:36px; border:2px solid #003168; border-radius:50%; display:flex; align-items:center; justify-content:center; background:#f0f4f8;">💰</div>
              <div style="font-weight:bold; color:#003168; font-size:13px;">Monto Total a Pagar</div>
            </div>
          </td>
          <td style="padding: 12px; font-size:20px; font-weight:800; color:#287a38; text-align:center; border-left: 1px solid #f1f5f9; border-right: 1px solid #f1f5f9;">
            ${dinero(totalPagado)}
          </td>
          <td style="padding: 12px 15px; font-size:12px; color:#475569;">
            Es el total que pagarás durante los ${meses} meses.
            <div style="background:#e8f5e9; border-radius:6px; padding:4px 8px; margin-top:4px; font-weight:bold; color:#287a38; font-size:11px; text-align:center; display:inline-block;">
              ${dinero(mensual)} x ${meses} meses =${dinero(totalPagado)}
            </div>
          </td>
        </tr>

      </table>
    </div>

    <!-- DESGLOSE DE COSTOS REMARCADOS -->
    <div style="border: 2px solid #003168; border-radius: 16px; overflow: hidden; margin-bottom: 20px;">
      <div style="background:#003168; color:white; padding:6px 18px; font-size:13px; font-weight:bold;">
        Desglose de Costos del Trámite
      </div>

      <table style="width: 100%; border-collapse: collapse; background: #ffffff;">
        <tr style="border-bottom: 1px dashed #cbd5e1;">
          <td style="padding: 10px 15px; width: 35%;">
            <div style="display:flex; align-items:center; gap:10px;">
              <div style="font-size:16px; font-weight:bold; width:32px; height:32px; border:2px solid #c5221f; color:#c5221f; border-radius:50%; display:flex; align-items:center; justify-content:center;">%</div>
              <div>
                <b style="color:#c5221f; font-size:12px;">Menos Honorarios de Gestión (${porcentaje}%)</b>
                <div style="font-size:10px; color:#64748b;">Armado de expediente, asesoría y trámite.</div>
              </div>
            </div>
          </td>
          <td style="padding: 10px; width: 25%; font-size:18px; font-weight:800; color:#c5221f; text-align:center; border-left: 1px solid #f1f5f9; border-right: 1px solid #f1f5f9;">
            -${dinero(honorarios)}
          </td>
          <td style="padding: 10px 15px;">
            <div style="background:#fef2f2; border-radius:8px; padding:5px 8px; text-align:center; border: 1px solid #fee2e2;">
              <div style="font-size:10px; color:#c5221f; font-weight:bold;">${dinero(credito)} -${dinero(honorarios)} =</div>
              <div style="font-size:16px; font-weight:800; color:#c5221f;">${dinero(netoCredito)}</div>
            </div>
          </td>
        </tr>

        <tr>
          <td style="padding: 10px 15px;">
            <div style="display:flex; align-items:center; gap:10px;">
              <div style="font-size:18px; width:32px; height:32px; border:2px solid #c5221f; color:#c5221f; border-radius:50%; display:flex; align-items:center; justify-content:center;">👛</div>
              <div>
                <b style="color:#c5221f; font-size:12px;">Menos Gastos de Originación</b>
                <div style="font-size:10px; color:#64748b;">Inscripción del trámite ante la institución.¡Claro que sí! Entiendo perfectamente lo que necesitas. Te explico detalladamente dónde colocar el código.

Lo que buscas es añadir un texto informativo debajo del valor calculado para los **"Gastos de Originación"** (que en tu imagen de ejemplo es "-$4,500.00").

Para lograr esto, debemos editar la parte de tu script que genera la tabla de "Desglose de Costos".

Aquí tienes los pasos y el código corregido:

### 1. Ubica esta sección en tu script actual:

Busca dentro de la función `generarResumen()` la línea que dice: `<!-- DESGLOSE DE COSTOS REMARCADOS -->`.

Unas líneas más abajo, encontrarás la estructura de la tabla de costos (`<table ...>`).

### 2. Dónde insertar el código:

Debes buscar la celda (`<td>`) de la tabla que muestra el monto negativo de la originación, que es esta:
`${dinero(originacion)}`.

Justo después de ese valor, y **antes** de cerrar la celda (`</td>`), insertaremos tu código HTML.

### 3. Código Corregido y Completo

Aquí tienes la versión actualizada y corregida de tu función `generarResumen()`. He comentado el cambio exacto para que lo visualices fácilmente:

```javascript
// ... (resto de tus funciones dinero() y window.onload, esas no cambian)

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

  // 2. Cálculos financieros
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
  const recibe = netoCredito - originacion;
  const totalPagado = mensual * meses;

  const hoy = new Date();
  const fechaTexto = hoy.toLocaleDateString("es-MX", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  });

  // 3. Renderizado con Marco Azul Exterior y Bordes Suaves
  const html = `
  <!-- BOTÓN DE DESCARGA -->
  <div style="text-align: center; margin-bottom: 20px;">
    <button onclick="descargarImagen()" style="background: #287a38; max-width: 350px; font-size: 18px; padding: 14px 24px; border-radius: 10px; cursor: pointer; color: white; border: none; font-weight: bold; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
      📥 DESCARGAR IMAGEN
    </button>
  </div>

  <!-- INFOGRAFÍA MARCO EXTERIOR AZUL (#003168) -->
  <div id="infografia-para-descargar" style="position: relative; background: #ffffff; border: 12px solid #003168; border-radius: 24px; padding: 25px; box-sizing: border-box; width: 850px; margin: 0 auto; font-family: system-ui, -apple-system, sans-serif;">
    
    <!-- Encabezado -->
    <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:15px; border-bottom: 2px solid #e2e8f0; padding-bottom: 15px;">
      <div>
        <h1 style="margin:0; font-size:38px; color:#003168; font-weight:900; line-height:1;">Resumen Financiero</h1>
        <h2 style="margin:4px 0 0 0; font-size:26px; color:#003168; font-weight:500;">de Tu Trámite Infonavit</h2>
        <div style="width:55px; height:5px; background:#287a38; margin-top:8px; border-radius:3px;"></div>
      </div>
      <div>
        <img src="logo.png" style="max-height:65px; object-fit:contain;" alt="Logo">
      </div>
    </div>

    <!-- Banner Informativo -->
    <div style="background:#003168; color:white; border-radius:14px; padding:12px 20px; display:flex; align-items:center; justify-content:space-between; gap:12px; margin-bottom:20px;">
      <div style="display:flex; align-items:center; gap:12px;">
        <div style="background:white; color:#003168; width:26px; height:26px; border-radius:50%; font-weight:bold; font-style:italic; display:flex; align-items:center; justify-content:center; font-size:16px; flex-shrink:0;">i</div>
        <div style="font-size:13px; line-height:1.4;">
          Este resumen te muestra de forma clara cuánto recibirás, cuánto pagarás y los costos del trámite.<br>
          <span style="font-size:15px; color:#ffd700;"><b>Cliente:</b> <u>${cliente !== "" ? cliente : "Cliente"}</u></span>
        </div>
      </div>
      <div style="font-size:12px; opacity:0.9; text-align:right; white-space:nowrap; background:rgba(255,255,255,0.12); padding:5px 12px; border-radius:8px;">
        📅 <b>Fecha:</b> ${fechaTexto}
      </div>
    </div>

    <!-- TABLA PRINCIPAL CON BORDES REDONDEADOS Y DIVISORES GRISES -->
    <div style="border: 1px solid #cbd5e1; border-radius: 16px; overflow: hidden; margin-bottom: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.02);">
      <table style="width: 100%; border-collapse: collapse; background: #ffffff;">
        
        <tr style="border-bottom: 1px solid #e2e8f0;">
          <td style="padding: 12px 15px; width: 35%;">
            <div style="display:flex; align-items:center; gap:10px;">
              <div style="font-size:22px; width:36px; height:36px; border:2px solid #003168; border-radius:50%; display:flex; align-items:center; justify-content:center; background:#f0f4f8;">🏠</div>
              <div style="font-weight:bold; color:#003168; font-size:13px;">Saldo en Subcuenta<br>de Vivienda</div>
            </div>
          </td>
          <td style="padding: 12px; width: 25%; font-size:20px; font-weight:800; color:#287a38; text-align:center; border-left: 1px solid #f1f5f9; border-right: 1px solid #f1f5f9;">
            ${dinero(subcuenta)}
          </td>
          <td style="padding: 12px 15px; font-size:12px; color:#475569;">Es el dinero que tienes disponible en tu Subcuenta de Vivienda.</td>
        </tr>

        <tr style="border-bottom: 1px solid #e2e8f0;">
          <td style="padding: 12px 15px;">
            <div style="display:flex; align-items:center; gap:10px;">
              <div style="font-size:22px; width:36px; height:36px; border:2px solid #003168; border-radius:50%; display:flex; align-items:center; justify-content:center; background:#f0f4f8;">📋</div>
              <div style="font-weight:bold; color:#003168; font-size:13px;">Crédito Autorizado</div>
            </div>
          </td>
          <td style="padding: 12px; font-size:20px; font-weight:800; color:#287a38; text-align:center; border-left: 1px solid #f1f5f9; border-right: 1px solid #f1f5f9;">
            ${dinero(credito)}
          </td>
          <td style="padding: 12px 15px; font-size:12px; color:#475569;">Es el monto que Infonavit te autoriza para tu trámite.</td>
        </tr>

        <tr style="border-bottom: 1px solid #e2e8f0;">
          <td style="padding: 12px 15px;">
            <div style="display:flex; align-items:center; gap:10px;">
              <div style="font-size:22px; width:36px; height:36px; border:2px solid #003168; border-radius:50%; display:flex; align-items:center; justify-content:center; background:#f0f4f8;">📅</div>
              <div style="font-weight:bold; color:#003168; font-size:13px;">Pago Mensual</div>
            </div>
          </td>
          <td style="padding: 12px; text-align:center; border-left: 1px solid #f1f5f9; border-right: 1px solid #f1f5f9;">
            <div style="font-size:22px; font-weight:800; color:#287a38;">${dinero(mensual)}</div>
            <div style="font-size:12px; font-weight:bold; color:#003168; margin-top:2px;">
              Pago ${tipoPago}: <span style="color:#287a38; font-size:15px;">${dinero(pagoPeriodo)}</span>
            </div>
          </td>
          <td style="padding: 12px 15px; font-size:12px; color:#475569;">
            Tu pago mensual es de <b>${dinero(mensual)}</b>.<br>
            El pago ${tipoPago.toLowerCase()} es de <b>${dinero(pagoPeriodo)}</b> (ya que te pagan ${tipoPago.toLowerCase()}mente).
          </td>
        </tr>

        <tr style="border-bottom: 1px solid #e2e8f0;">
          <td style="padding: 12px 15px;">
            <div style="display:flex; align-items:center; gap:10px;">
              <div style="font-size:22px; width:36px; height:36px; border:2px solid #003168; border-radius:50%; display:flex; align-items:center; justify-content:center; background:#f0f4f8;">⏱️</div>
              <div style="font-weight:bold; color:#003168; font-size:13px;">Tiempo de Pago Real</div>
            </div>
          </td>
          <td style="padding: 12px; text-align:center; border-left: 1px solid #f1f5f9; border-right: 1px solid #f1f5f9;">
            <div style="font-size:18px; font-weight:800; color:#287a38;">${tiempoTexto}</div>
            <div style="font-size:12px; font-weight:bold; color:#003168;">(${meses} meses)</div>
          </td>
          <td style="padding: 12px 15px; font-size:12px; color:#475569;">El patrón aporta bimestralmente, lo que reduce tu plazo de pago a solo ${meses} meses.</td>
        </tr>

        <tr>
          <td style="padding: 12px 15px;">
            <div style="display:flex; align-items:center; gap:10px;">
              <div style="font-size:22px; width:36px; height:36px; border:2px solid #003168; border-radius:50%; display:flex; align-items:center; justify-content:center; background:#f0f4f8;">💰</div>
              <div style="font-weight:bold; color:#003168; font-size:13px;">Monto Total a Pagar</div>
            </div>
          </td>
          <td style="padding: 12px; font-size:20px; font-weight:800; color:#287a38; text-align:center; border-left: 1px solid #f1f5f9; border-right: 1px solid #f1f5f9;">
            ${dinero(totalPagado)}
          </td>
          <td style="padding: 12px 15px; font-size:12px; color:#475569;">
            Es el total que pagarás durante los ${meses} meses.
            <div style="background:#e8f5e9; border-radius:6px; padding:4px 8px; margin-top:4px; font-weight:bold; color:#287a38; font-size:11px; text-align:center; display:inline-block;">
              ${dinero(mensual)} x ${meses} meses = ${dinero(totalPagado)}
            </div>
          </td>
        </tr>

      </table>
    </div>

    <!-- DESGLOSE DE COSTOS REMARCADOS -->
    <div style="border: 2px solid #003168; border-radius: 16px; overflow: hidden; margin-bottom: 20px;">
      <div style="background:#003168; color:white; padding:6px 18px; font-size:13px; font-weight:bold;">
        Desglose de Costos del Trámite
      </div>

      <table style="width: 100%; border-collapse: collapse; background: #ffffff;">
        <tr style="border-bottom: 1px dashed #cbd5e1;">
          <td style="padding: 10px 15px; width: 35%;">
            <div style="display:flex; align-items:center; gap:10px;">
              <div style="font-size:16px; font-weight:bold; width:32px; height:32px; border:2px solid #c5221f; color:#c5221f; border-radius:50%; display:flex; align-items:center; justify-content:center;">%</div>
              <div>
                <b style="color:#c5221f; font-size:12px;">Menos Honorarios de Gestión (${porcentaje}%)</b>
                <div style="font-size:10px; color:#64748b;">Armado de expediente, asesoría y trámite.</div>
              </div>
            </div>
          </td>
          <td style="padding: 10px; width: 25%; font-size:18px; font-weight:800; color:#c5221f; text-align:center; border-left: 1px solid #f1f5f9; border-right: 1px solid #f1f5f9;">
            -${dinero(honorarios)}
          </td>
          <td style="padding: 10px 15px;">
            <div style="background:#fef2f2; border-radius:8px; padding:5px 8px; text-align:center; border: 1px solid #fee2e2;">
              <div style="font-size:10px; color:#c5221f; font-weight:bold;">${dinero(credito)} - ${dinero(honorarios)} =</div>
              <div style="font-size:16px; font-weight:800; color:#c5221f;">${dinero(netoCredito)}</div>
            </div>
          </td>
        </tr>

        <tr>
          <td style="padding: 10px 15px;">
            <div style="display:flex; align-items:center; gap:10px;">
              <div style="font-size:18px; width:32px; height:32px; border:2px solid #c5221f; color:#c5221f; border-radius:50%; display:flex; align-items:center; justify-content:center;">👛</div>
              <div>
                <b style="color:#c5221f; font-size:12px;">Menos Gastos de Originación</b>
                <div style="font-size:10px; color:#64748b;">Inscripción del trámite ante la institución.</div>
              </div>
            </div>
          </td>
          
          <!-- AQUÍ ESTÁ EL CAMBIO IMPORTANTE -->
          <td style="padding: 10px; font-size:18px; font-weight:800; color:#c5221f; text-align:center; border-left: 1px solid #f1f5f9; border-right: 1px solid #f1f5f9;">
            -${dinero(originacion)}
            <br> <!-- Salto de línea para que quede abajo -->
            <span style="font-size:9px; color:#64748b; font-weight:normal;"> <!-- Estilos para texto pequeño -->
              Inscripción del trámite ante la institución.<br>
              + IVA, según corresponda<br>
              + Cargo por domiciliación / terminal, según forma de pago
            </span>
          </td>
          <!-- FIN DEL CAMBIO IMPORTANTE -->

          <td style="padding: 10px 15px;">
            <div style="background:#f0fdf4; border-radius:8px; padding:5px 8px; text-align:center; border: 1px solid #dcfce7;">
              <div style="font-size:10px; color:#166534; font-weight:bold;">${dinero(netoCredito)} - ${dinero(originacion)} =</div>
              <div style="font-size:16px; font-weight:800; color:#287a38;">${dinero(recibe)}</div>
            </div>
          </td>
        </tr>
      </table>
    </div>

    <!-- ... (resto del código inferior de la infografía y pie de página, esos no cambian) -->
  </div>
  `;

  const contenedorResultado = document.getElementById("resultado");
  if (contenedorResultado) {
    contenedorResultado.innerHTML = html;
  }
}
