// src/Comnponent/notificationUtils.js

export const requestNotificationPermission = async () => {
  if ("Notification" in window) {
    const permission = await Notification.requestPermission();
    return permission;
  }
  return "denied";
};

export const showBrowserNotification = (title, message) => {
  if (Notification.permission === "granted") {
    new Notification(title, {
      body: message,
      icon: "/notif-icon.png", // Optional icon (add to public/)
    });
  }
};
