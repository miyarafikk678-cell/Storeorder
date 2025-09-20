// js/user.js
import { db, ref, push, set, onValue, update } from "./firebase-config.js";

const userId = "user" + Math.floor(Math.random() * 1000); // demo user ID

// ✅ Place new order
document.getElementById("orderBtn").addEventListener("click", () => {
  const item = document.getElementById("orderItem").value;
  if (!item) return alert("Enter item!");

  const newOrderRef = push(ref(db, "orders/" + userId));
  set(newOrderRef, {
    item: item,
    status: "pending",
    timestamp: Date.now()
  });
  document.getElementById("orderItem").value = "";
});

// ✅ Listen to my orders in realtime
function loadMyOrders() {
  const myOrdersRef = ref(db, "orders/" + userId);
  onValue(myOrdersRef, (snapshot) => {
    const data = snapshot.val();
    let list = "";
    for (let orderId in data) {
      const order = data[orderId];
      list += `<div>
        ${order.item} - ${order.status}
        ${order.status === "resent" ? `<button onclick="confirmOrder('${orderId}')">Confirm</button>` : ""}
      </div>`;
    }
    document.getElementById("myOrders").innerHTML = list;
  });
}
loadMyOrders();

// ✅ Confirm received order
window.confirmOrder = function (orderId) {
  update(ref(db, "orders/" + userId + "/" + orderId), {
    status: "confirmed"
  });
};