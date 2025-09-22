import { supabase } from "./supabase.js";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// Supabase connection
const supabaseUrl = "https://supabase.com";
const supabaseKey = "https://yrsxneflvjehttaralyz.supabase.co";
export const supabase = createClient(supabaseUrl, supabaseKey);

// Add new order
export async function addOrder(userId, item) {
  const { data, error } = await supabase
    .from("orders")
    .insert([{ user_id: userId, item_name: item, status: "pending" }]);
  console.log(data, error);
}

// Realtime subscription
supabase
  .channel("public:orders")
  .on("postgres_changes", { event: "*", schema: "public", table: "orders" }, (payload) => {
    console.log("Order changed:", payload);
  })
  .subscribe();
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
import { supabase } from "./supabase.js";

// Example: fetch all users
async function loadUsers() {
  let { data, error } = await supabase.from("users").select("*");
  if (error) {
    console.error("Error loading users:", error);
  } else {
    console.log("Users:", data);
  }
}

// ✅ Resend order back to user
window.resendOrder = function (userId, orderId) {
  update(ref(db, "orders/" + userId + "/" + orderId), {
    status: "resent"
  });
};
