// Smart Jogger App
// Uses Geolocation API, Canvas API, Network Information API

const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const distanceEl = document.getElementById('distance');
const networkStatusEl = document.getElementById('networkStatus');
const canvas = document.getElementById('mapCanvas');
const ctx = canvas.getContext('2d');

let watchId = null;
let path = [];
let totalDistance = 0;
let lastPosition = null;

function updateNetworkStatus() {
  if ('connection' in navigator) {
    const conn = navigator.connection;
    let type = conn.effectiveType || conn.type || 'unknown';
    let downlink = conn.downlink ? ` (${conn.downlink} Mbps)` : '';
    networkStatusEl.textContent = `${type}${downlink}`;
  } else {
    networkStatusEl.textContent = 'Not supported';
  }
}

function handleNetworkChange() {
  updateNetworkStatus();
  alert('Network connection changed!');
}

function toCanvasCoords(lat, lng, bounds) {
  // Map lat/lng to canvas coordinates
  const {minLat, maxLat, minLng, maxLng} = bounds;
  const x = ((lng - minLng) / (maxLng - minLng)) * canvas.width;
  const y = canvas.height - ((lat - minLat) / (maxLat - minLat)) * canvas.height;
  return {x, y};
}

function getBounds(points) {
  let minLat = Infinity, maxLat = -Infinity, minLng = Infinity, maxLng = -Infinity;
  points.forEach(p => {
    if (p.lat < minLat) minLat = p.lat;
    if (p.lat > maxLat) maxLat = p.lat;
    if (p.lng < minLng) minLng = p.lng;
    if (p.lng > maxLng) maxLng = p.lng;
  });
  // Add padding
  if (minLat === maxLat) { minLat -= 0.0005; maxLat += 0.0005; }
  if (minLng === maxLng) { minLng -= 0.0005; maxLng += 0.0005; }
  return {minLat, maxLat, minLng, maxLng};
}

function drawPath() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (path.length < 2) return;
  const bounds = getBounds(path);
  ctx.beginPath();
  path.forEach((point, i) => {
    const {x, y} = toCanvasCoords(point.lat, point.lng, bounds);
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });
  ctx.strokeStyle = '#007bff';
  ctx.lineWidth = 3;
  ctx.stroke();
  // Draw start/end points
  const start = toCanvasCoords(path[0].lat, path[0].lng, bounds);
  ctx.fillStyle = 'green';
  ctx.beginPath();
  ctx.arc(start.x, start.y, 6, 0, 2 * Math.PI);
  ctx.fill();
  const end = toCanvasCoords(path[path.length-1].lat, path[path.length-1].lng, bounds);
  ctx.fillStyle = 'red';
  ctx.beginPath();
  ctx.arc(end.x, end.y, 6, 0, 2 * Math.PI);
  ctx.fill();
}

function haversine(lat1, lng1, lat2, lng2) {
  const R = 6371; // km
  const dLat = (lat2-lat1) * Math.PI/180;
  const dLng = (lng2-lng1) * Math.PI/180;
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(lat1*Math.PI/180) * Math.cos(lat2*Math.PI/180) *
            Math.sin(dLng/2) * Math.sin(dLng/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

function onPositionUpdate(pos) {
  const {latitude: lat, longitude: lng} = pos.coords;
  path.push({lat, lng});
  if (lastPosition) {
    totalDistance += haversine(lastPosition.lat, lastPosition.lng, lat, lng);
  }
  lastPosition = {lat, lng};
  distanceEl.textContent = totalDistance.toFixed(2);
  drawPath();
}

function startRun() {
  path = [];
  totalDistance = 0;
  lastPosition = null;
  distanceEl.textContent = '0.00';
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (navigator.geolocation) {
    watchId = navigator.geolocation.watchPosition(onPositionUpdate, err => {
      alert('Geolocation error: ' + err.message);
    }, { enableHighAccuracy: true, maximumAge: 1000, timeout: 10000 });
    startBtn.disabled = true;
    stopBtn.disabled = false;
  } else {
    alert('Geolocation not supported');
  }
}

function stopRun() {
  if (watchId !== null) {
    navigator.geolocation.clearWatch(watchId);
    watchId = null;
  }
  startBtn.disabled = false;
  stopBtn.disabled = true;
}

startBtn.addEventListener('click', startRun);
stopBtn.addEventListener('click', stopRun);

// Network Information API
updateNetworkStatus();
if ('connection' in navigator) {
  navigator.connection.addEventListener('change', handleNetworkChange);
} 