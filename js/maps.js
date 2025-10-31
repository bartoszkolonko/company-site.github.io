// ===== GOOGLE MAPS INTEGRATION =====

let map;
let marker;
let infoWindow;

// Company location data
const companyLocation = {
    lat: 52.2297, // Warsaw coordinates (example)
    lng: 21.0122,
    name: 'ProfessionalWeld',
    address: 'ul. Przemysłowa 15, 00-001 Warszawa',
    phone: '+48 123 456 789',
    email: 'biuro@professionalweld.pl',
    website: 'www.professionalweld.pl'
};

// Initialize Google Maps
function initMap() {
    try {
        // Create map
        map = new google.maps.Map(document.getElementById('map'), {
            zoom: 15,
            center: companyLocation,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            styles: getMapStyles(),
            zoomControl: true,
            mapTypeControl: false,
            scaleControl: true,
            streetViewControl: true,
            rotateControl: false,
            fullscreenControl: true
        });

        // Create marker
        marker = new google.maps.Marker({
            position: companyLocation,
            map: map,
            title: companyLocation.name,
            icon: {
                url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(getCustomMarkerSvg()),
                scaledSize: new google.maps.Size(40, 50),
                anchor: new google.maps.Point(20, 50)
            },
            animation: google.maps.Animation.DROP
        });

        // Create info window
        infoWindow = new google.maps.InfoWindow({
            content: createInfoWindowContent()
        });

        // Show info window on marker click
        marker.addListener('click', function() {
            infoWindow.open(map, marker);
        });

        // Auto-open info window after a delay
        setTimeout(() => {
            infoWindow.open(map, marker);
        }, 1000);

        // Add map event listeners
        addMapEventListeners();

        console.log('Google Maps initialized successfully');
        
    } catch (error) {
        console.error('Error initializing Google Maps:', error);
        showMapError();
    }
}

// Custom map styles for professional look
function getMapStyles() {
    return [
        {
            "featureType": "all",
            "elementType": "geometry.fill",
            "stylers": [{"weight": "2.00"}]
        },
        {
            "featureType": "all",
            "elementType": "geometry.stroke",
            "stylers": [{"color": "#9c9c9c"}]
        },
        {
            "featureType": "all",
            "elementType": "labels.text",
            "stylers": [{"visibility": "on"}]
        },
        {
            "featureType": "landscape",
            "elementType": "all",
            "stylers": [{"color": "#f2f2f2"}]
        },
        {
            "featureType": "landscape",
            "elementType": "geometry.fill",
            "stylers": [{"color": "#ffffff"}]
        },
        {
            "featureType": "landscape.man_made",
            "elementType": "geometry.fill",
            "stylers": [{"color": "#ffffff"}]
        },
        {
            "featureType": "poi",
            "elementType": "all",
            "stylers": [{"visibility": "off"}]
        },
        {
            "featureType": "road",
            "elementType": "all",
            "stylers": [{"saturation": -100}, {"lightness": 45}]
        },
        {
            "featureType": "road",
            "elementType": "geometry.fill",
            "stylers": [{"color": "#eeeeee"}]
        },
        {
            "featureType": "road",
            "elementType": "labels.text.fill",
            "stylers": [{"color": "#7b7b7b"}]
        },
        {
            "featureType": "road",
            "elementType": "labels.text.stroke",
            "stylers": [{"color": "#ffffff"}]
        },
        {
            "featureType": "road.highway",
            "elementType": "all",
            "stylers": [{"visibility": "simplified"}]
        },
        {
            "featureType": "road.arterial",
            "elementType": "labels.icon",
            "stylers": [{"visibility": "off"}]
        },
        {
            "featureType": "transit",
            "elementType": "all",
            "stylers": [{"visibility": "off"}]
        },
        {
            "featureType": "water",
            "elementType": "all",
            "stylers": [{"color": "#46bcec"}, {"visibility": "on"}]
        },
        {
            "featureType": "water",
            "elementType": "geometry.fill",
            "stylers": [{"color": "#c8d7d4"}]
        },
        {
            "featureType": "water",
            "elementType": "labels.text.fill",
            "stylers": [{"color": "#070707"}]
        },
        {
            "featureType": "water",
            "elementType": "labels.text.stroke",
            "stylers": [{"color": "#ffffff"}]
        }
    ];
}

// Custom marker SVG
function getCustomMarkerSvg() {
    return `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 50">
            <defs>
                <linearGradient id="markerGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" style="stop-color:#ff6b35;stop-opacity:1" />
                    <stop offset="100%" style="stop-color:#f39c12;stop-opacity:1" />
                </linearGradient>
            </defs>
            <path d="M20 0C8.954 0 0 8.954 0 20c0 11.046 20 30 20 30s20-18.954 20-30C40 8.954 31.046 0 20 0z" 
                  fill="url(#markerGradient)" stroke="#fff" stroke-width="2"/>
            <circle cx="20" cy="20" r="8" fill="#fff"/>
            <path d="M16 16h8v8h-8z" fill="url(#markerGradient)"/>
        </svg>
    `;
}

// Create info window content
function createInfoWindowContent() {
    return `
        <div class="map-info-window">
            <div class="info-header">
                <h3>${companyLocation.name}</h3>
                <div class="info-rating">
                    <div class="stars">★★★★★</div>
                    <span class="rating-text">5.0 (24 opinie)</span>
                </div>
            </div>
            <div class="info-content">
                <div class="info-item">
                    <i class="fas fa-map-marker-alt"></i>
                    <span>${companyLocation.address}</span>
                </div>
                <div class="info-item">
                    <i class="fas fa-phone"></i>
                    <a href="tel:${companyLocation.phone}">${companyLocation.phone}</a>
                </div>
                <div class="info-item">
                    <i class="fas fa-envelope"></i>
                    <a href="mailto:${companyLocation.email}">${companyLocation.email}</a>
                </div>
                <div class="info-item">
                    <i class="fas fa-globe"></i>
                    <a href="https://${companyLocation.website}" target="_blank">${companyLocation.website}</a>
                </div>
            </div>
            <div class="info-actions">
                <button onclick="getDirections()" class="directions-btn">
                    <i class="fas fa-route"></i> Wyznacz trasę
                </button>
                <button onclick="shareLocation()" class="share-btn">
                    <i class="fas fa-share"></i> Udostępnij
                </button>
            </div>
        </div>
    `;
}

// Add map event listeners
function addMapEventListeners() {
    // Resize map when window resizes
    window.addEventListener('resize', function() {
        if (map) {
            google.maps.event.trigger(map, 'resize');
            map.setCenter(companyLocation);
        }
    });

    // Close info window when clicking on map
    map.addListener('click', function() {
        if (infoWindow) {
            infoWindow.close();
        }
    });

    // Animate marker on mouseover
    marker.addListener('mouseover', function() {
        if (marker.getAnimation() !== null) {
            marker.setAnimation(null);
        } else {
            marker.setAnimation(google.maps.Animation.BOUNCE);
            setTimeout(() => {
                marker.setAnimation(null);
            }, 1500);
        }
    });
}

// Get directions to company
function getDirections() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            function(position) {
                const userLocation = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                
                const directionsUrl = `https://www.google.com/maps/dir/${userLocation.lat},${userLocation.lng}/${companyLocation.lat},${companyLocation.lng}`;
                window.open(directionsUrl, '_blank');
            },
            function(error) {
                // Fallback - just open Google Maps with company location
                const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${companyLocation.lat},${companyLocation.lng}`;
                window.open(mapsUrl, '_blank');
            }
        );
    } else {
        // Geolocation not supported - open Google Maps
        const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${companyLocation.lat},${companyLocation.lng}`;
        window.open(mapsUrl, '_blank');
    }
}

// Share location
function shareLocation() {
    const shareData = {
        title: companyLocation.name,
        text: `Sprawdź lokalizację ${companyLocation.name}`,
        url: `https://www.google.com/maps/search/?api=1&query=${companyLocation.lat},${companyLocation.lng}`
    };

    if (navigator.share) {
        navigator.share(shareData)
            .then(() => console.log('Location shared successfully'))
            .catch((error) => console.log('Error sharing location:', error));
    } else {
        // Fallback - copy to clipboard
        const textArea = document.createElement('textarea');
        textArea.value = `${companyLocation.name}\n${companyLocation.address}\n${shareData.url}`;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        
        showNotification('Lokalizacja skopiowana do schowka!', 'success');
    }
}

// Show map error when Google Maps fails to load
function showMapError() {
    const mapContainer = document.getElementById('map');
    mapContainer.innerHTML = `
        <div class="map-error">
            <div class="error-content">
                <i class="fas fa-exclamation-triangle"></i>
                <h4>Nie można załadować mapy</h4>
                <p>Przepraszamy, wystąpił problem z załadowaniem mapy Google.</p>
                <div class="fallback-info">
                    <h5>Nasza lokalizacja:</h5>
                    <p><strong>${companyLocation.address}</strong></p>
                    <div class="fallback-actions">
                        <a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(companyLocation.address)}" 
                           target="_blank" class="btn btn-primary">
                            <i class="fas fa-external-link-alt"></i>
                            Otwórz w Google Maps
                        </a>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Initialize map with fallback for missing Google Maps API
function initMapWithFallback() {
    if (typeof google !== 'undefined' && google.maps) {
        initMap();
    } else {
        console.warn('Google Maps API not loaded, showing fallback');
        setTimeout(() => {
            if (typeof google === 'undefined' || !google.maps) {
                showMapError();
            }
        }, 3000); // Wait 3 seconds for API to load
    }
}

// Alternative map providers (fallback)
function initOpenStreetMap() {
    // This would require Leaflet.js library
    console.log('Initializing OpenStreetMap fallback');
    
    const mapContainer = document.getElementById('map');
    mapContainer.innerHTML = `
        <div class="map-fallback">
            <div class="fallback-content">
                <i class="fas fa-map-marker-alt"></i>
                <h4>${companyLocation.name}</h4>
                <p>${companyLocation.address}</p>
                <a href="https://www.openstreetmap.org/?mlat=${companyLocation.lat}&mlon=${companyLocation.lng}&zoom=15" 
                   target="_blank" class="btn btn-primary">
                    Pokaż na mapie
                </a>
            </div>
        </div>
    `;
}

// Enhanced location services
function checkLocationServices() {
    if ('geolocation' in navigator) {
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const userLocation = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    };
                    
                    // Calculate distance to company
                    const distance = calculateDistance(
                        userLocation.lat, 
                        userLocation.lng, 
                        companyLocation.lat, 
                        companyLocation.lng
                    );
                    
                    resolve({ userLocation, distance });
                },
                (error) => {
                    console.log('Geolocation error:', error);
                    reject(error);
                },
                {
                    enableHighAccuracy: true,
                    timeout: 5000,
                    maximumAge: 300000 // 5 minutes
                }
            );
        });
    } else {
        return Promise.reject('Geolocation not supported');
    }
}

// Calculate distance between two points
function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Earth's radius in kilometers
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
        Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const distance = R * c;
    
    return Math.round(distance * 10) / 10; // Round to 1 decimal place
}

// Add CSS styles for map components
const mapStyles = `
    .map-info-window {
        max-width: 300px;
        font-family: var(--font-primary);
    }
    
    .info-header h3 {
        margin: 0 0 0.5rem 0;
        color: var(--secondary-color);
        font-size: 1.2rem;
    }
    
    .info-rating {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        margin-bottom: 1rem;
    }
    
    .stars {
        color: var(--accent-color);
        font-size: 1rem;
    }
    
    .rating-text {
        font-size: 0.9rem;
        color: var(--gray-600);
    }
    
    .info-content {
        margin-bottom: 1rem;
    }
    
    .info-item {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        margin-bottom: 0.5rem;
        font-size: 0.9rem;
    }
    
    .info-item i {
        color: var(--primary-color);
        width: 16px;
        text-align: center;
    }
    
    .info-item a {
        color: var(--secondary-color);
        text-decoration: none;
    }
    
    .info-item a:hover {
        color: var(--primary-color);
        text-decoration: underline;
    }
    
    .info-actions {
        display: flex;
        gap: 0.5rem;
    }
    
    .directions-btn,
    .share-btn {
        padding: 0.5rem 1rem;
        border: none;
        border-radius: var(--border-radius-sm);
        cursor: pointer;
        font-size: 0.85rem;
        font-weight: 500;
        transition: all var(--transition-fast);
    }
    
    .directions-btn {
        background: var(--primary-gradient);
        color: white;
        flex: 1;
    }
    
    .share-btn {
        background: var(--gray-200);
        color: var(--gray-700);
    }
    
    .directions-btn:hover,
    .share-btn:hover {
        transform: translateY(-1px);
    }
    
    .map-error,
    .map-fallback {
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        background: var(--gray-100);
        text-align: center;
        padding: 2rem;
    }
    
    .error-content,
    .fallback-content {
        max-width: 300px;
    }
    
    .error-content i,
    .fallback-content i {
        font-size: 3rem;
        color: var(--primary-color);
        margin-bottom: 1rem;
    }
    
    .error-content h4,
    .fallback-content h4 {
        color: var(--secondary-color);
        margin-bottom: 0.5rem;
    }
    
    .fallback-info {
        margin-top: 1.5rem;
        padding-top: 1.5rem;
        border-top: 1px solid var(--gray-300);
    }
    
    .fallback-actions {
        margin-top: 1rem;
    }
`;

// Inject map styles
const mapStyleSheet = document.createElement('style');
mapStyleSheet.textContent = mapStyles;
document.head.appendChild(mapStyleSheet);

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Check if we're in the contact section and initialize map
    const mapContainer = document.getElementById('map');
    if (mapContainer) {
        // Add intersection observer to load map when visible
        const mapObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    initMapWithFallback();
                    mapObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        mapObserver.observe(mapContainer);
    }
});

// Make initMap available globally for Google Maps callback
window.initMap = initMap;

console.log('Maps.js loaded successfully');