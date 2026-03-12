export const getDeviceInfo = () => {
  if (typeof window === "undefined") return null;

  const ua = navigator.userAgent;

  let os = "Unknown OS";
  if (/Android/i.test(ua)) os = "Android";
  else if (/iPhone|iPad|iPod/i.test(ua)) os = "iOS";
  else if (/Windows/i.test(ua)) os = "Windows";
  else if (/Mac/i.test(ua)) os = "MacOS";
  else if (/Linux/i.test(ua)) os = "Linux";

  let deviceName = "Desktop";
  if (/Mobile/i.test(ua)) deviceName = "Mobile";
  if (/Tablet/i.test(ua)) deviceName = "Tablet";

  return {
    name: deviceName,
    os,
  };
};
