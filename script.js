const orderForm = document.querySelector("#order-form");
const formMessage = document.querySelector("#form-message");
const eventDate = orderForm.querySelector('input[name="date"]');

const today = new Date();
const localToday = new Date(today.getTime() - today.getTimezoneOffset() * 60000)
  .toISOString()
  .split("T")[0];
eventDate.min = localToday;

orderForm.addEventListener("submit", (event) => {
  event.preventDefault();
  formMessage.classList.remove("is-error");

  if (!orderForm.reportValidity()) {
    return;
  }

  const order = Object.fromEntries(new FormData(orderForm).entries());
  const quantity = order.quantity === "custom" ? "more than 4 dozen" : `${order.quantity} cookies`;
  const date = new Date(`${order.date}T12:00:00`).toLocaleDateString(undefined, {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  formMessage.textContent = `Thanks, ${order.name}! Your ${quantity} request for ${date} is ready. This demo does not send orders to the bakery yet.`;
  orderForm.reset();
  eventDate.min = localToday;
});