const initialTickets = [
  {
    id: "INC-001",
    title: "Equipo no enciende",
    description:
      "La computadora de escritorio no enciende al presionar el botón de encendido.",
    requester: "María Torres",
    category: "Hardware",
    priority: "Alta",
    status: "En progreso",
    assignee: "Carlos Rojas",
    date: "2026-10-22",
    comments: "Se revisará la fuente de alimentación.",
  },
  {
    id: "INC-002",
    title: "Error al iniciar sesión",
    description: "El usuario no puede acceder al sistema corporativo.",
    requester: "José Medina",
    category: "Accesos",
    priority: "Media",
    status: "Asignado",
    assignee: "Ana Flores",
    date: "2026-10-22",
    comments: "",
  },
  {
    id: "INC-003",
    title: "Conexión Wi-Fi intermitente",
    description: "La conexión inalámbrica se desconecta de manera recurrente.",
    requester: "Lucía Vargas",
    category: "Redes",
    priority: "Alta",
    status: "Nuevo",
    assignee: "Sin asignar",
    date: "2026-10-23",
    comments: "",
  },
  {
    id: "INC-004",
    title: "Instalación de software",
    description: "Solicitud de instalación de una herramienta autorizada.",
    requester: "Pedro Salas",
    category: "Software",
    priority: "Baja",
    status: "Resuelto",
    assignee: "Carlos Rojas",
    date: "2026-10-21",
    comments: "Aplicación instalada y verificada.",
  },
  {
    id: "INC-005",
    title: "Impresora sin conexión",
    description: "La impresora de oficina aparece como desconectada.",
    requester: "Elena Paredes",
    category: "Hardware",
    priority: "Media",
    status: "Cerrado",
    assignee: "Ana Flores",
    date: "2026-10-20",
    comments: "Se reinició la cola de impresión.",
  },
];
const initialArticles = [
  {
    id: 1,
    title: "Verificar una conexión Wi-Fi",
    category: "Redes",
    description:
      "Pasos básicos para diagnosticar problemas de conectividad inalámbrica.",
    steps: [
      "Verificar que el Wi-Fi esté activado.",
      "Comprobar si otros dispositivos tienen conexión.",
      "Reiniciar el adaptador de red y volver a conectarse.",
      "Si persiste, registrar el incidente con capturas.",
    ],
  },
  {
    id: 2,
    title: "Restablecimiento de contraseña",
    category: "Accesos",
    description:
      "Procedimiento general cuando el usuario no puede iniciar sesión.",
    steps: [
      "Confirmar la identidad del solicitante según el procedimiento interno.",
      "Verificar el bloqueo de la cuenta.",
      "Realizar el restablecimiento autorizado.",
      "Solicitar al usuario que valide el acceso.",
    ],
  },
  {
    id: 3,
    title: "Diagnóstico inicial de equipo",
    category: "Hardware",
    description: "Comprobaciones iniciales para un equipo que no enciende.",
    steps: [
      "Verificar conexión del cable de alimentación.",
      "Comprobar toma eléctrica y periféricos.",
      "Registrar luces o sonidos observados.",
      "Escalar al técnico responsable si continúa sin encender.",
    ],
  },
  {
    id: 4,
    title: "Aplicación no responde",
    category: "Software",
    description: "Acciones iniciales ante una aplicación congelada.",
    steps: [
      "Esperar unos segundos y verificar si responde.",
      "Cerrar la aplicación de forma segura si es posible.",
      "Volver a abrir y comprobar el problema.",
      "Registrar el mensaje de error y la versión de la aplicación.",
    ],
  },
  {
    id: 5,
    title: "Revisión de impresora",
    category: "Hardware",
    description: "Comprobaciones básicas para una impresora fuera de línea.",
    steps: [
      "Verificar alimentación y conexión.",
      "Comprobar que tenga papel y no presente atascos.",
      "Revisar la impresora seleccionada en el equipo.",
      "Realizar una página de prueba.",
    ],
  },
  {
    id: 6,
    title: "Recopilar evidencia del incidente",
    category: "Software",
    description: "Qué información incluir para facilitar el diagnóstico.",
    steps: [
      "Describir el problema y cuándo comenzó.",
      "Anotar mensajes de error.",
      "Adjuntar capturas sin exponer contraseñas.",
      "Indicar el equipo y el impacto del incidente.",
    ],
  },
];
let tickets =
  JSON.parse(localStorage.getItem("sigiTickets") || "null") || initialTickets;
let articles =
  JSON.parse(localStorage.getItem("sigiArticles") || "null") || initialArticles;
let activities = JSON.parse(
  localStorage.getItem("sigiActivities") || "null",
) || [
  { text: "INC-001 pasó a En progreso", time: "Hoy" },
  { text: "INC-004 fue marcado como Resuelto", time: "Ayer" },
  { text: "INC-005 fue cerrado", time: "20 oct." },
];
let nextId =
  Math.max(6, ...tickets.map((t) => Number(t.id.split("-")[1]) || 0)) + 1;
const statuses = ["Nuevo", "Asignado", "En progreso", "Resuelto", "Cerrado"];
function save() {
  localStorage.setItem("sigiTickets", JSON.stringify(tickets));
  localStorage.setItem("sigiArticles", JSON.stringify(articles));
  localStorage.setItem("sigiActivities", JSON.stringify(activities));
}
function esc(s = "") {
  return String(s).replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );
}
function statusClass(s) {
  return (
    {
      Nuevo: "b-new",
      Asignado: "b-new",
      "En progreso": "b-progress",
      Resuelto: "b-resolved",
      Cerrado: "b-closed",
    }[s] || ""
  );
}
function priorityClass(s) {
  return { Alta: "b-high", Media: "b-medium", Baja: "b-low" }[s] || "";
}
function badge(s, cl) {
  return `<span class="badge ${cl}">${esc(s)}</span>`;
}
function toast(msg) {
  document.getElementById("toastRoot").innerHTML =
    `<div class="toast">✓ &nbsp;${esc(msg)}</div>`;
  setTimeout(() => (document.getElementById("toastRoot").innerHTML = ""), 2600);
}
function showPage(p) {
  document.querySelectorAll(".page").forEach((x) => x.classList.add("hidden"));
  document.getElementById("page-" + p).classList.remove("hidden");
  document
    .querySelectorAll(".nav")
    .forEach((x) => x.classList.toggle("active", x.dataset.page === p));
  document.getElementById("crumbPage").textContent = {
    dashboard: "Panel principal",
    tickets: "Incidentes / Tickets",
    knowledge: "Base de conocimientos",
    reports: "Reportes y métricas",
    admin: "Administración",
  }[p];
  document.getElementById("sidebar").classList.remove("open");
  renderAll();
}
document
  .querySelectorAll(".nav")
  .forEach((b) => b.addEventListener("click", () => showPage(b.dataset.page)));
document.getElementById("menuBtn").onclick = () =>
  document.getElementById("sidebar").classList.toggle("open");
function statCard(label, num, icon, foot) {
  return `<div class="stat"><div class="stat-top"><span>${label}</span><span class="stat-icon">${icon}</span></div><div class="num">${num}</div><div class="small">${foot}</div></div>`;
}
function count(s) {
  return tickets.filter((t) => t.status === s).length;
}
function renderDashboard() {
  let open = tickets.filter(
    (t) => !["Resuelto", "Cerrado"].includes(t.status),
  ).length;
  document.getElementById("stats").innerHTML =
    statCard(
      "Total de incidentes",
      tickets.length,
      "▤",
      "Tickets registrados",
    ) +
    statCard("Pendientes", open, "◷", "Requieren seguimiento") +
    statCard("En progreso", count("En progreso"), "⚙", "Atención en curso") +
    statCard(
      "Resueltos / cerrados",
      count("Resuelto") + count("Cerrado"),
      "✓",
      "Incidentes atendidos",
    );
  document.getElementById("recentRows").innerHTML =
    tickets
      .slice()
      .sort((a, b) => b.id.localeCompare(a.id))
      .slice(0, 5)
      .map(
        (t) =>
          `<tr><td><span class="ticket-id">${esc(t.id)}</span><div style="font-weight:650;margin-top:3px">${esc(t.title)}</div></td><td>${badge(t.priority, priorityClass(t.priority))}</td><td>${badge(t.status, statusClass(t.status))}</td><td>${esc(t.assignee)}</td></tr>`,
      )
      .join("") ||
    '<tr><td colspan="4" class="empty">Sin incidentes registrados</td></tr>';
  document.getElementById("statusChart").innerHTML = statuses
    .map(
      (s) =>
        `<div class="progress-row"><div class="progress-label"><span>${s}</span><b>${count(s)}</b></div><div class="bar"><span style="width:${tickets.length ? (count(s) / tickets.length) * 100 : 0}%"></span></div></div>`,
    )
    .join("");
  document.getElementById("activity").innerHTML =
    activities
      .slice(0, 4)
      .map(
        (a) =>
          `<div class="activity"><span class="dot"></span><div><div>${esc(a.text)}</div><div class="small">${esc(a.time)}</div></div></div>`,
      )
      .join("") || '<div class="empty">Sin actividad reciente</div>';
}
function renderTickets() {
  let q = (document.getElementById("ticketSearch")?.value || "").toLowerCase(),
    s = document.getElementById("statusFilter")?.value || "Todos",
    p = document.getElementById("priorityFilter")?.value || "Todas";
  let arr = tickets.filter(
    (t) =>
      (!q ||
        (t.id + " " + t.title + " " + t.requester).toLowerCase().includes(q)) &&
      (s === "Todos" || t.status === s) &&
      (p === "Todas" || t.priority === p),
  );
  document.getElementById("ticketRows").innerHTML = arr
    .map(
      (t) =>
        `<tr><td><span class="ticket-id">${esc(t.id)}</span><div style="font-weight:650;margin-top:3px">${esc(t.title)}</div></td><td>${esc(t.requester)}</td><td>${esc(t.category)}</td><td>${badge(t.priority, priorityClass(t.priority))}</td><td>${badge(t.status, statusClass(t.status))}</td><td>${esc(t.assignee)}</td><td>${esc(t.date)}</td><td><button class="linkbtn" onclick="viewTicket('${t.id}')">Ver / editar</button></td></tr>`,
    )
    .join("");
  document
    .getElementById("ticketEmpty")
    .classList.toggle("hidden", arr.length !== 0);
}
["ticketSearch", "statusFilter", "priorityFilter"].forEach((id) =>
  document.getElementById(id).addEventListener("input", renderTickets),
);
function openCreate() {
  document.getElementById("modalRoot").innerHTML =
    `<div class="modal-bg" onclick="if(event.target===this)closeModal()"><div class="modal"><div class="modal-head"><div><div class="eyebrow">Nuevo registro</div><h2>Registrar incidente</h2></div><button class="close" onclick="closeModal()">✕</button></div><form id="createForm"><div class="form-grid"><div class="field full"><label>Título del incidente *</label><input class="input" name="title" required maxlength="100" placeholder="Ej. No hay conexión a internet"></div><div class="field"><label>Solicitante *</label><input class="input" name="requester" required placeholder="Nombre del usuario"></div><div class="field"><label>Categoría *</label><select class="select" name="category"><option>Hardware</option><option>Software</option><option>Redes</option><option>Accesos</option><option>Otro</option></select></div><div class="field"><label>Prioridad *</label><select class="select" name="priority"><option>Media</option><option>Alta</option><option>Baja</option></select></div><div class="field"><label>Asignar técnico</label><select class="select" name="assignee"><option>Sin asignar</option><option>Carlos Rojas</option><option>Ana Flores</option><option>Soporte TI</option></select></div><div class="field full"><label>Descripción *</label><textarea class="textarea" name="description" required placeholder="Describe el problema, cuándo ocurre y su impacto…"></textarea></div></div><div class="form-actions"><button type="button" class="btn" onclick="closeModal()">Cancelar</button><button class="btn primary" type="submit">Guardar incidente</button></div></form></div></div>`;
  document.getElementById("createForm").onsubmit = (e) => {
    e.preventDefault();
    let d = Object.fromEntries(new FormData(e.target));
    let t = {
      id: "INC-" + String(nextId++).padStart(3, "0"),
      ...d,
      status: d.assignee === "Sin asignar" ? "Nuevo" : "Asignado",
      date: new Date().toISOString().slice(0, 10),
      comments: "",
    };
    tickets.unshift(t);
    activities.unshift({
      text: t.id + " fue registrado: " + t.title,
      time: "Ahora",
    });
    save();
    closeModal();
    showPage("tickets");
    toast("Incidente " + t.id + " registrado correctamente");
  };
}
function closeModal() {
  document.getElementById("modalRoot").innerHTML = "";
}
function viewTicket(id) {
  let t = tickets.find((x) => x.id === id);
  if (!t) return;
  document.getElementById("modalRoot").innerHTML =
    `<div class="modal-bg" onclick="if(event.target===this)closeModal()"><div class="modal"><div class="modal-head"><div><div class="eyebrow">${esc(t.id)}</div><h2>${esc(t.title)}</h2></div><button class="close" onclick="closeModal()">✕</button></div><div class="detail-line"><strong>Descripción</strong>${esc(t.description)}</div><div class="form-grid" style="margin-top:12px"><div class="detail-line"><strong>Solicitante</strong>${esc(t.requester)}</div><div class="detail-line"><strong>Categoría</strong>${esc(t.category)}</div><div class="detail-line"><strong>Prioridad</strong>${badge(t.priority, priorityClass(t.priority))}</div><div class="detail-line"><strong>Fecha de registro</strong>${esc(t.date)}</div></div><form id="editTicketForm" style="margin-top:18px"><div class="form-grid"><div class="field"><label>Estado</label><select class="select" name="status">${statuses.map((s) => `<option ${s === t.status ? "selected" : ""}>${s}</option>`).join("")}</select></div><div class="field"><label>Responsable</label><select class="select" name="assignee">${["Sin asignar", "Carlos Rojas", "Ana Flores", "Soporte TI"].map((s) => `<option ${s === t.assignee ? "selected" : ""}>${s}</option>`).join("")}</select></div><div class="field full"><label>Comentarios / solución aplicada</label><textarea class="textarea" name="comments">${esc(t.comments || "")}</textarea></div></div><div class="form-actions"><button type="button" class="btn danger" onclick="deleteTicket('${t.id}')">Eliminar</button><button type="button" class="btn" onclick="closeModal()">Cerrar</button><button type="submit" class="btn primary">Guardar cambios</button></div></form></div></div>`;
  document.getElementById("editTicketForm").onsubmit = (e) => {
    e.preventDefault();
    let d = Object.fromEntries(new FormData(e.target));
    let old = t.status;
    Object.assign(t, d);
    if (old !== t.status)
      activities.unshift({
        text: t.id + " cambió de " + old + " a " + t.status,
        time: "Ahora",
      });
    save();
    closeModal();
    renderAll();
    toast("Cambios guardados");
  };
}
function deleteTicket(id) {
  if (!confirm("¿Seguro que deseas eliminar " + id + "?")) return;
  tickets = tickets.filter((t) => t.id !== id);
  activities.unshift({ text: id + " fue eliminado", time: "Ahora" });
  save();
  closeModal();
  renderAll();
  toast("Incidente eliminado");
}
function renderArticles() {
  let q = (document.getElementById("articleSearch")?.value || "").toLowerCase(),
    cat = document.getElementById("articleCategory")?.value || "Todas";
  let a = articles.filter(
    (x) =>
      (cat === "Todas" || x.category === cat) &&
      (x.title + " " + x.description + " " + x.category)
        .toLowerCase()
        .includes(q),
  );
  document.getElementById("articleGrid").innerHTML =
    a
      .map(
        (x) =>
          `<article class="article"><div class="tag">${esc(x.category)}</div><h3>${esc(x.title)}</h3><p>${esc(x.description)}</p><button class="linkbtn" onclick="viewArticle(${x.id})">Leer procedimiento →</button></article>`,
      )
      .join("") || '<div class="empty">No hay artículos que coincidan.</div>';
}
document
  .getElementById("articleSearch")
  .addEventListener("input", renderArticles);
document
  .getElementById("articleCategory")
  .addEventListener("change", renderArticles);
function viewArticle(id) {
  let a = articles.find((x) => x.id === id);
  document.getElementById("modalRoot").innerHTML =
    `<div class="modal-bg" onclick="if(event.target===this)closeModal()"><div class="modal"><div class="modal-head"><div><div class="eyebrow">${esc(a.category)}</div><h2>${esc(a.title)}</h2></div><button class="close" onclick="closeModal()">✕</button></div><p>${esc(a.description)}</p><ol>${a.steps.map((s) => `<li style="margin:10px 0">${esc(s)}</li>`).join("")}</ol><div class="form-actions"><button class="btn primary" onclick="closeModal()">Entendido</button></div></div></div>`;
}
function addArticle() {
  document.getElementById("modalRoot").innerHTML =
    `<div class="modal-bg" onclick="if(event.target===this)closeModal()"><div class="modal"><div class="modal-head"><h2>Agregar artículo</h2><button class="close" onclick="closeModal()">✕</button></div><form id="articleForm"><div class="field" style="margin-bottom:12px"><label>Título *</label><input class="input" name="title" required></div><div class="field" style="margin-bottom:12px"><label>Categoría</label><select class="select" name="category"><option>Hardware</option><option>Software</option><option>Redes</option><option>Accesos</option></select></div><div class="field" style="margin-bottom:12px"><label>Descripción *</label><textarea class="textarea" name="description" required></textarea></div><div class="field"><label>Pasos (uno por línea) *</label><textarea class="textarea" name="steps" required placeholder="Paso 1\nPaso 2\nPaso 3"></textarea></div><div class="form-actions"><button type="button" class="btn" onclick="closeModal()">Cancelar</button><button class="btn primary">Guardar artículo</button></div></form></div></div>`;
  document.getElementById("articleForm").onsubmit = (e) => {
    e.preventDefault();
    let d = Object.fromEntries(new FormData(e.target));
    articles.unshift({
      id: Math.max(0, ...articles.map((a) => a.id)) + 1,
      title: d.title,
      category: d.category,
      description: d.description,
      steps: d.steps
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean),
    });
    save();
    closeModal();
    renderArticles();
    toast("Artículo agregado");
  };
}
function renderReports() {
  let done = count("Resuelto") + count("Cerrado");
  document.getElementById("reportStats").innerHTML =
    statCard("Total de tickets", tickets.length, "▤", "Registros disponibles") +
    statCard(
      "Prioridad alta",
      tickets.filter((t) => t.priority === "Alta").length,
      "⚑",
      "Requieren atención prioritaria",
    ) +
    statCard("Resueltos", done, "✓", "Resueltos o cerrados") +
    statCard(
      "Sin asignar",
      tickets.filter((t) => t.assignee === "Sin asignar").length,
      "◷",
      "Pendientes de asignación",
    );
  document.getElementById("reportStatus").innerHTML = statuses
    .map(
      (s) =>
        `<div class="progress-row"><div class="progress-label"><span>${s}</span><b>${count(s)} (${tickets.length ? ((count(s) / tickets.length) * 100).toFixed(0) : 0}%)</b></div><div class="bar"><span style="width:${tickets.length ? (count(s) / tickets.length) * 100 : 0}%"></span></div></div>`,
    )
    .join("");
  document.getElementById("reportPriority").innerHTML = [
    "Alta",
    "Media",
    "Baja",
  ]
    .map((s) => {
      let n = tickets.filter((t) => t.priority === s).length;
      return `<div class="progress-row"><div class="progress-label"><span>${badge(s, priorityClass(s))}</span><b>${n}</b></div><div class="bar"><span style="width:${tickets.length ? (n / tickets.length) * 100 : 0}%"></span></div></div>`;
    })
    .join("");
  document.getElementById("reportRows").innerHTML = tickets
    .map(
      (t) =>
        `<tr><td class="ticket-id">${esc(t.id)}</td><td>${esc(t.title)}</td><td>${badge(t.priority, priorityClass(t.priority))}</td><td>${badge(t.status, statusClass(t.status))}</td><td>${esc(t.assignee)}</td><td>${esc(t.date)}</td></tr>`,
    )
    .join("");
}
function exportCSV() {
  let rows = [
    [
      "ID",
      "Título",
      "Descripción",
      "Solicitante",
      "Categoría",
      "Prioridad",
      "Estado",
      "Responsable",
      "Fecha",
      "Comentarios",
    ],
    ...tickets.map((t) => [
      t.id,
      t.title,
      t.description,
      t.requester,
      t.category,
      t.priority,
      t.status,
      t.assignee,
      t.date,
      t.comments || "",
    ]),
  ];
  let csv =
    "\ufeff" +
    rows
      .map((r) =>
        r.map((v) => '"' + String(v ?? "").replace(/"/g, '""') + '"').join(";"),
      )
      .join("\r\n");
  let blob = new Blob([csv], { type: "text/csv;charset=utf-8;" }),
    url = URL.createObjectURL(blob),
    a = document.createElement("a");
  a.href = url;
  a.download = "reporte_incidentes.csv";
  a.click();
  URL.revokeObjectURL(url);
  toast("Reporte CSV exportado");
}
document.getElementById("profileForm").onsubmit = (e) => {
  e.preventDefault();
  document.getElementById("userName").textContent =
    document.getElementById("profileName").value;
  toast("Perfil actualizado");
};
document.getElementById("slaForm").onsubmit = (e) => {
  e.preventDefault();
  localStorage.setItem(
    "sigiSla",
    JSON.stringify({
      response: document.getElementById("slaResponse").value,
      resolution: document.getElementById("slaResolution").value,
    }),
  );
  toast("Parámetros SLA guardados");
};
function resetDemo() {
  if (
    !confirm(
      "Esto eliminará los cambios locales y restaurará los datos de demostración. ¿Continuar?",
    )
  )
    return;
  tickets = JSON.parse(JSON.stringify(initialTickets));
  articles = JSON.parse(JSON.stringify(initialArticles));
  activities = [
    { text: "INC-001 pasó a En progreso", time: "Hoy" },
    { text: "INC-004 fue marcado como Resuelto", time: "Ayer" },
    { text: "INC-005 fue cerrado", time: "20 oct." },
  ];
  nextId = 6;
  save();
  renderAll();
  toast("Datos de demostración restaurados");
}
function renderAll() {
  renderDashboard();
  renderTickets();
  renderArticles();
  renderReports();
}
let sla = JSON.parse(localStorage.getItem("sigiSla") || "null");
if (sla) {
  document.getElementById("slaResponse").value = sla.response;
  document.getElementById("slaResolution").value = sla.resolution;
}
renderAll();
