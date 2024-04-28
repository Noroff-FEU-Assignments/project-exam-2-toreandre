// Function to determine if the user is on an Android device to show Android deeplink for scooters in map
export const isAndroid = () => {
    return /Android/i.test(navigator.userAgent);
};
  
// function to determine if the user is on an iOS device to show iOS deeplink for scooters in map
export const isIOS = () => {
    return /iPhone|iPad|iPod/i.test(navigator.userAgent);
};