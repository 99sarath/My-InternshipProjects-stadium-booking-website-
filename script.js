$(document).ready(function(){
    $("#owl-slider").owlCarousel({
        items: 1,
        // nav: true,
        dots: false,
        loop: true,
        autoplay: true,
        autoplayTimeout: 6000
    });
});

// Simulated seating data (you might get this from an API or database)
const totalSeats = 100;
const seats = new Array(totalSeats).fill(0); // 0 = available, 1 = booked

// Function to create seats
function createSeats() {
    const seatingPlan = document.querySelector('.seating-plan');
    for (let i = 0; i < totalSeats; i++) {
        const seat = document.createElement('div');
        seat.className = 'seat';
        seat.dataset.seatId = i;
        seat.addEventListener('click', toggleSeatSelection);
        seatingPlan.appendChild(seat);
    }
}

// Function to toggle seat selection
function toggleSeatSelection(event) {
    const seat = event.target;
    seat.classList.toggle('selected');
    updateSelectedSeats();
}

// Function to update the selected seats display
function updateSelectedSeats() {
    const selectedSeats = document.querySelectorAll('.seat.selected');
    const selectedSeatsDisplay = document.getElementById('selected-seats');
    if (selectedSeats.length === 0) {
        selectedSeatsDisplay.textContent = 'None';
    } else {
        const seats = Array.from(selectedSeats).map(seat => seat.dataset.seatId);
        selectedSeatsDisplay.textContent = seats.join(', ');
    }
}

// Function to book selected seats (in this example, it just marks them as booked)
function bookTickets() {
    const selectedSeats = document.querySelectorAll('.seat.selected');
    selectedSeats.forEach(seat => {
        const seatId = seat.dataset.seatId;
        seats[seatId] = 1; // Mark seat as booked
        seat.classList.remove('selected');
        seat.classList.add('booked');
    });
    updateSelectedSeats();
    // You might want to send the booked seat information to the server here
}

// Initialize the seating plan
createSeats();
