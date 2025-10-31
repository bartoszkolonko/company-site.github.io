// ===== WELDING COST CALCULATOR =====

document.addEventListener('DOMContentLoaded', function() {
    initCalculator();
});

function initCalculator() {
    const calculatorForm = document.getElementById('calculator-form');
    const resultSection = document.getElementById('calculator-result');
    
    // Calculator rates and settings
    const calculatorSettings = {
        hourlyRates: {
            'tig': 80,      // TIG welding rate per hour
            'mig': 60,      // MIG/MAG welding rate per hour
            'konstrukcja': 70,  // Steel constructions rate per hour
            'balustrada': 65,   // Railings rate per hour
            'naprawa': 75       // Repairs rate per hour
        },
        complexityMultipliers: {
            '1': 1.0,       // Simple (standard)
            '1.2': 1.2,     // Medium (+20%)
            '1.5': 1.5,     // Complex (+50%)
            '1.8': 1.8      // Very complex (+80%)
        },
        minimumCost: 200,   // Minimum project cost
        vatRate: 0.23       // VAT rate (23%)
    };
    
    // Initialize form validation
    initFormValidation();
    
    // Add event listeners for real-time calculation
    const formInputs = calculatorForm.querySelectorAll('input, select');
    formInputs.forEach(input => {
        input.addEventListener('input', calculateCostRealTime);
        input.addEventListener('change', calculateCostRealTime);
    });
    
    // Initial calculation to show result structure
    calculateCostRealTime();
}

function initFormValidation() {
    const form = document.getElementById('calculator-form');
    const inputs = form.querySelectorAll('input[required], select[required]');
    
    inputs.forEach(input => {
        input.addEventListener('blur', validateInput);
        input.addEventListener('input', clearValidationError);
    });
}

function validateInput(event) {
    const input = event.target;
    const value = input.value.trim();
    
    // Remove existing error styling
    input.classList.remove('error');
    
    // Validate based on input type
    if (input.hasAttribute('required') && !value) {
        showValidationError(input, 'To pole jest wymagane');
        return false;
    }
    
    if (input.type === 'number') {
        const numValue = parseFloat(value);
        const min = parseFloat(input.min) || 0;
        const max = parseFloat(input.max) || Infinity;
        
        if (value && (isNaN(numValue) || numValue < min || numValue > max)) {
            showValidationError(input, `Wartość musi być liczbą między ${min} a ${max}`);
            return false;
        }
    }
    
    return true;
}

function showValidationError(input, message) {
    input.classList.add('error');
    
    // Remove existing error message
    const existingError = input.parentNode.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // Add new error message
    const errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.textContent = message;
    input.parentNode.appendChild(errorElement);
}

function clearValidationError(event) {
    const input = event.target;
    input.classList.remove('error');
    
    const errorMessage = input.parentNode.querySelector('.error-message');
    if (errorMessage) {
        errorMessage.remove();
    }
}

function calculateCostRealTime() {
    // Get form values
    const workType = document.getElementById('work-type').value;
    const workHours = parseFloat(document.getElementById('work-hours').value) || 0;
    const materialCost = parseFloat(document.getElementById('material-cost').value) || 0;
    const complexity = document.getElementById('complexity').value;
    
    // Calculate costs
    const result = calculateWeldingCost(workType, workHours, materialCost, complexity);
    
    // Update display
    updateCostDisplay(result);
}

function calculateWeldingCost(workType, workHours, materialCost, complexity) {
    const settings = {
        hourlyRates: {
            'tig': 80,
            'mig': 60,
            'konstrukcja': 70,
            'balustrada': 65,
            'naprawa': 75
        },
        complexityMultipliers: {
            '1': 1.0,
            '1.2': 1.2,
            '1.5': 1.5,
            '1.8': 1.8
        },
        minimumCost: 200,
        vatRate: 0.23
    };
    
    // Calculate labor cost
    const hourlyRate = settings.hourlyRates[workType] || 0;
    const baseLaborCost = hourlyRate * workHours;
    
    // Apply complexity multiplier
    const complexityMultiplier = parseFloat(complexity) || 1;
    const complexityAddition = baseLaborCost * (complexityMultiplier - 1);
    const totalLaborCost = baseLaborCost + complexityAddition;
    
    // Calculate total cost before VAT
    const subtotal = totalLaborCost + materialCost;
    
    // Apply minimum cost
    const finalSubtotal = Math.max(subtotal, settings.minimumCost);
    
    // Calculate VAT
    const vatAmount = finalSubtotal * settings.vatRate;
    const totalWithVat = finalSubtotal + vatAmount;
    
    return {
        laborCost: totalLaborCost,
        materialCost: materialCost,
        complexityAddition: complexityAddition,
        subtotal: finalSubtotal,
        vatAmount: vatAmount,
        total: totalWithVat,
        hourlyRate: hourlyRate,
        workHours: workHours,
        isMinimumApplied: subtotal < settings.minimumCost
    };
}

function updateCostDisplay(result) {
    // Update labor cost
    document.getElementById('labor-cost').textContent = 
        formatCurrency(result.laborCost);
    
    // Update material cost
    document.getElementById('material-cost-display').textContent = 
        formatCurrency(result.materialCost);
    
    // Update complexity addition
    document.getElementById('complexity-cost').textContent = 
        formatCurrency(result.complexityAddition);
    
    // Update total cost
    document.getElementById('total-cost').textContent = 
        formatCurrency(result.total);
    
    // Update cost breakdown details
    updateCostBreakdown(result);
}

function updateCostBreakdown(result) {
    const breakdown = document.querySelector('.cost-breakdown');
    
    // Update existing cost items or create detailed breakdown
    const laborItem = breakdown.querySelector('.cost-item:nth-child(1) .cost-value');
    const materialItem = breakdown.querySelector('.cost-item:nth-child(2) .cost-value');
    const complexityItem = breakdown.querySelector('.cost-item:nth-child(3) .cost-value');
    const totalItem = breakdown.querySelector('.cost-item.total .cost-value');
    
    if (laborItem) laborItem.textContent = formatCurrency(result.laborCost);
    if (materialItem) materialItem.textContent = formatCurrency(result.materialCost);
    if (complexityItem) complexityItem.textContent = formatCurrency(result.complexityAddition);
    if (totalItem) totalItem.textContent = formatCurrency(result.total);
    
    // Add additional info if minimum cost is applied
    updateMinimumCostWarning(result.isMinimumApplied);
}

function updateMinimumCostWarning(isMinimumApplied) {
    const costNote = document.querySelector('.cost-note');
    
    if (isMinimumApplied && costNote) {
        costNote.innerHTML = `
            * Zastosowano minimalny koszt projektu (200 zł). 
            Podana cena ma charakter orientacyjny. 
            Ostateczna wycena zostanie przedstawiona po oględzinach projektu.
        `;
        costNote.style.color = 'var(--primary-color)';
        costNote.style.fontWeight = '500';
    } else if (costNote) {
        costNote.innerHTML = `
            * Podana cena ma charakter orientacyjny. 
            Ostateczna wycena zostanie przedstawiona po oględzinach projektu.
        `;
        costNote.style.color = '';
        costNote.style.fontWeight = '';
    }
}

function formatCurrency(amount) {
    return new Intl.NumberFormat('pl-PL', {
        style: 'currency',
        currency: 'PLN',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(amount);
}

// Global function for manual calculation trigger (called from HTML button)
window.calculateCost = function() {
    const form = document.getElementById('calculator-form');
    const inputs = form.querySelectorAll('input[required], select[required]');
    let isValid = true;
    
    // Validate all required inputs
    inputs.forEach(input => {
        if (!validateInput({ target: input })) {
            isValid = false;
        }
    });
    
    if (!isValid) {
        showNotification('Proszę poprawić błędy w formularzu', 'error');
        return;
    }
    
    // Show loading
    showSpinner();
    
    // Simulate calculation delay for better UX
    setTimeout(() => {
        calculateCostRealTime();
        hideSpinner();
        
        // Scroll to results
        const resultSection = document.getElementById('calculator-result');
        resultSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Show success notification
        showNotification('Wycena została obliczona pomyślnie!', 'success');
        
        // Add animation to result
        resultSection.classList.add('highlight-result');
        setTimeout(() => {
            resultSection.classList.remove('highlight-result');
        }, 2000);
        
    }, 500);
};

// Advanced calculator features
function initAdvancedFeatures() {
    // Add preset project types
    addProjectPresets();
    
    // Add calculator history
    initCalculatorHistory();
    
    // Add export functionality
    initExportFeatures();
}

function addProjectPresets() {
    const presets = {
        'balustrada-wewnetrzna': {
            workType: 'balustrada',
            workHours: 8,
            materialCost: 800,
            complexity: '1'
        },
        'brama-wjazdowa': {
            workType: 'konstrukcja',
            workHours: 12,
            materialCost: 1500,
            complexity: '1.2'
        },
        'konstrukcja-dachu': {
            workType: 'konstrukcja',
            workHours: 40,
            materialCost: 5000,
            complexity: '1.5'
        }
    };
    
    // Add preset buttons to calculator (if desired)
    const presetContainer = document.createElement('div');
    presetContainer.className = 'calculator-presets';
    presetContainer.innerHTML = `
        <h4>Szybkie szacunki dla popularnych projektów:</h4>
        <div class="preset-buttons">
            <button type="button" class="btn btn-secondary preset-btn" data-preset="balustrada-wewnetrzna">
                Balustrada wewnętrzna
            </button>
            <button type="button" class="btn btn-secondary preset-btn" data-preset="brama-wjazdowa">
                Brama wjazdowa
            </button>
            <button type="button" class="btn btn-secondary preset-btn" data-preset="konstrukcja-dachu">
                Konstrukcja dachu
            </button>
        </div>
    `;
    
    const calculatorForm = document.getElementById('calculator-form');
    calculatorForm.insertBefore(presetContainer, calculatorForm.firstChild);
    
    // Add preset button handlers
    const presetButtons = document.querySelectorAll('.preset-btn');
    presetButtons.forEach(button => {
        button.addEventListener('click', function() {
            const presetKey = this.getAttribute('data-preset');
            const preset = presets[presetKey];
            
            if (preset) {
                applyPreset(preset);
                showNotification(`Zastosowano preset: ${this.textContent}`, 'info');
            }
        });
    });
}

function applyPreset(preset) {
    document.getElementById('work-type').value = preset.workType;
    document.getElementById('work-hours').value = preset.workHours;
    document.getElementById('material-cost').value = preset.materialCost;
    document.getElementById('complexity').value = preset.complexity;
    
    // Trigger calculation
    calculateCostRealTime();
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${getNotificationIcon(type)}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close">&times;</button>
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => notification.classList.add('show'), 100);
    
    // Auto hide after 5 seconds
    setTimeout(() => hideNotification(notification), 5000);
    
    // Close button handler
    notification.querySelector('.notification-close').addEventListener('click', () => {
        hideNotification(notification);
    });
}

function hideNotification(notification) {
    notification.classList.remove('show');
    setTimeout(() => {
        if (notification.parentNode) {
            document.body.removeChild(notification);
        }
    }, 300);
}

function getNotificationIcon(type) {
    const icons = {
        'success': 'check-circle',
        'error': 'exclamation-triangle',
        'warning': 'exclamation-circle',
        'info': 'info-circle'
    };
    return icons[type] || 'info-circle';
}

// Add CSS for calculator enhancements
const calculatorStyles = `
    .calculator-presets {
        margin-bottom: 2rem;
        padding: 1rem;
        background: var(--gray-100);
        border-radius: var(--border-radius-lg);
        border: 1px solid var(--gray-200);
    }
    
    .calculator-presets h4 {
        margin-bottom: 1rem;
        color: var(--secondary-color);
        font-size: 1.1rem;
    }
    
    .preset-buttons {
        display: flex;
        gap: 0.5rem;
        flex-wrap: wrap;
    }
    
    .preset-btn {
        font-size: 0.9rem;
        padding: 0.5rem 1rem;
    }
    
    .error {
        border-color: #e74c3c !important;
        background-color: rgba(231, 76, 60, 0.05);
    }
    
    .error-message {
        color: #e74c3c;
        font-size: 0.85rem;
        margin-top: 0.25rem;
        display: block;
    }
    
    .highlight-result {
        animation: highlightPulse 2s ease-in-out;
    }
    
    @keyframes highlightPulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.02); }
    }
    
    .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        background: white;
        border-radius: var(--border-radius-md);
        box-shadow: var(--shadow-lg);
        padding: 1rem;
        display: flex;
        align-items: center;
        gap: 1rem;
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        border-left: 4px solid var(--primary-color);
        max-width: 350px;
    }
    
    .notification.show {
        transform: translateX(0);
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        flex: 1;
    }
    
    .notification-success {
        border-left-color: #27ae60;
    }
    
    .notification-error {
        border-left-color: #e74c3c;
    }
    
    .notification-warning {
        border-left-color: #f39c12;
    }
    
    .notification-close {
        background: none;
        border: none;
        font-size: 1.2rem;
        cursor: pointer;
        color: var(--gray-500);
        padding: 0.25rem;
    }
    
    .notification-close:hover {
        color: var(--gray-700);
    }
`;

// Inject calculator styles
const calculatorStyleSheet = document.createElement('style');
calculatorStyleSheet.textContent = calculatorStyles;
document.head.appendChild(calculatorStyleSheet);

// Initialize advanced features when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(initAdvancedFeatures, 100);
});

console.log('Calculator.js loaded successfully');