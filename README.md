# Smart Jogger

A web app for outdoor runners that tracks your route, draws your path, and monitors your network connection in real time.

## Features
- **Start/Stop Run:** Track your run with a single click.
- **Live Path Drawing:** See your running path drawn live on a map-like canvas.
- **Distance Calculation:** Displays the total distance you have run.
- **Network Alerts:** Get notified if your network connection changes or is lost.
- **Modern Sporty UI:** Sporty, glassmorphism-inspired design with frosted glass cards, blue accents, and a clean, modern look.
- **Minimalist SVG Navigation:** Bottom navigation bar with simple, 1D SVG icons for Home, Stats, Run, Friends, and Settings.
- **Fully Responsive:** Optimized for both desktop and mobile screens. All elements adapt for a great mobile experience.

## Web APIs Used

### 1. Geolocation API
- Tracks your real-time location as you run.
- Used to update your path and calculate distance.

### 2. Canvas API
- Draws your running path on a canvas.
- Visualizes your route with start (green) and end (red) points.

### 3. Network Information API
- Monitors your network connection type and speed.
- Alerts you if your connection changes (e.g., WiFi to cellular).

## How to Run
1. **Download or clone this repository.**
2. **Open `index.html` in your web browser.**
3. **Allow location access** when prompted.
4. Click **Start Run** to begin tracking. Move around to see your path and distance update live.
5. The app will alert you if your network connection changes.

## Demo
- Try switching your network (WiFi to mobile, or disconnect/reconnect) to see the alert and status change.
- The blue line on the canvas shows your route. Green dot = start, red dot = end.
- The bottom navigation bar uses minimalist SVG icons and is fully responsive.

## Requirements
- Modern browser (Chrome, Edge, Firefox, etc.)
- Location permissions enabled

---

**Made for the TAP Frontend Developer Assignment** 