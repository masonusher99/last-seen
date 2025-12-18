const lockNotifications = document.getElementById("lockNotifications");

function pushLockNotification(title, body) {
  const notif = document.createElement("div");
  notif.className = "notification";

  notif.innerHTML = `
    <div class="notification-header">
      <span>Messages</span>
      <span>now</span>
    </div>
    <div class="notification-title">${title}</div>
    <div class="notification-body">${body}</div>
  `;

  notif.addEventListener("click", () => {
    show("messages"); // unlocks + opens Messages
  });

  lockNotifications.prepend(notif);
}
/* DOUBLE TAP TO ZOOM FIX */
let lastTouch = 0;
document.addEventListener("touchend", e => {
  const now = Date.now();
  if (now - lastTouch <= 300) {
    e.preventDefault();
  }
  lastTouch = now;
}, { passive: false });

const screens = {
  lock: document.getElementById("screenLock"),
  messages: document.getElementById("screenMessages")
};

function show(screen) {
  Object.values(screens).forEach(s => s.classList.remove("active"));
  screens[screen].classList.add("active");
}

/* TIME */
function updateTime() {
  const d = new Date();
  lockTime.textContent = d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  lockDate.textContent = d.toDateString();
}
updateTime();
setInterval(updateTime, 1000);

/* LOCK NOTIFICATION */
const lockNotifs = document.getElementById("lockNotifs");

function pushNotification(text) {
  const n = document.createElement("div");
  n.className = "notification";
  n.textContent = text;
  n.onclick = () => show("messages");
  lockNotifs.prepend(n);
}

/* AUTO NOTIFICATION */
setTimeout(() => {
  pushNotification("Unknown: Are you awake?");
}, 2000);

/* MESSAGES */
const thread = document.getElementById("thread");
const input = document.getElementById("msgInput");

function addBubble(text, who = "them") {
  const b = document.createElement("div");
  b.className = "bubble " + (who === "me" ? "me" : "");
  b.textContent = text;

  const meta = document.createElement("div");
  meta.className = "meta";
  meta.textContent = "now";

  b.appendChild(meta);
  thread.appendChild(b);
  thread.scrollTop = thread.scrollHeight;
}

sendBtn.onclick = () => {
  if (!input.value.trim()) return;
  addBubble(input.value, "me");
  input.value = "";

  setTimeout(() => {
    addBubble("You replied too fast.");
  }, 800);
};
