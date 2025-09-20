// js/admin.js
import { db, ref, onValue, update } from "./firebase-config.js";

// ✅ Admin login
document.getElementById("loginBtn").addEventListener("click", () => {
  const user = document.getElementById("username").value;
  const pass = document.getElementById("password").value;

  if (user === "Cheesyorder" && pass === "Chessy$2023") {
    document.getElementById("login").style.display = "none";
    document.getElementById("dashboard").style.display = "block";
    loadOrders();
  } else {
    alert("Invalid credentials!");
  }
});

// ✅ Load all orders in realtime
function loadOrders() {
  const ordersRef = ref(db, "orders/");
  onValue(ordersRef, (snapshot) => {
    const data = snapshot.val();
    let list = "";
    for (let userId in data) {
      list += `<h3>User: ${userId}</h3>`;
      for (let orderId in data[userId]) {
        const order = data[userId][orderId];
        list += `<div>
          <b>${order.item}</b> (${order.status})
          <button onclick="resendOrder('${userId}','${orderId}')">Resend</button>
        </div>`;
      }
    }
    document.getElementById("ordersList").innerHTML = list;
  });
}

// ✅ Resend order back to user
window.resendOrder = function (userId, orderId) {
  update(ref(db, "orders/" + userId + "/" + orderId), {
    status: "resent"
  });
};