document.addEventListener('DOMContentLoaded', function() {
    // View toggle functionality
    const cardViewBtn = document.getElementById('cardViewBtn');
    const tableViewBtn = document.getElementById('tableViewBtn');
    const cardView = document.getElementById('cardView');
    const tableView = document.getElementById('tableView');
    
    cardViewBtn.addEventListener('click', function() {
        cardView.style.display = 'grid';
        tableView.style.display = 'none';
        cardViewBtn.classList.add('active');
        tableViewBtn.classList.remove('active');
    });
    
    tableViewBtn.addEventListener('click', function() {
        cardView.style.display = 'none';
        tableView.style.display = 'block';
        cardViewBtn.classList.remove('active');
        tableViewBtn.classList.add('active');
    });
    
    // Sample vacancies data (in a real app, this would come from an API)
    const vacancies = [
        {
            id: 1,
            name: "Prime Retail Space - Delhi",
            location: "Delhi",
            type: "Retail",
            area: "1200",
            price: "₹75,000/month",
            description: "Premium ground floor retail space in high footfall area of South Delhi.",
            image: "images/retail-1.jpg"
        },
        {
            id: 2,
            name: "Food Court Kiosk - Mumbai",
            location: "Mumbai",
            type: "Food Court",
            area: "300",
            price: "₹1,20,000/month",
            description: "Well-positioned kiosk in popular mall food court with high visibility.",
            image: "images/food-court-2.jpg"
        },
        {
            id: 3,
            name: "Office Space - Bangalore",
            location: "Bangalore",
            type: "Office",
            area: "2500",
            price: "₹2,00,000/month",
            description: "Modern office space in tech hub with excellent amenities and parking.",
            image: "images/office-1.jpg"
        },
        {
            id: 4,
            name: "Hotel Property - Hyderabad",
            location: "Hyderabad",
            type: "Hotel",
            area: "5000",
            price: "Contact for pricing",
            description: "Prime hotel property in commercial district with 30 rooms ready for licensing.",
            image: "images/hotel-2.jpg"
        },
        {
            id: 5,
            name: "Advertisement Hoarding - Delhi",
            location: "Delhi",
            type: "Advertisement",
            area: "NA",
            price: "₹50,000/month",
            description: "High visibility hoarding on major highway with 100,000+ daily impressions.",
            image: "images/ad-space-2.jpg"
        },
        {
            id: 6,
            name: "Mixed-Use Space - Mumbai",
            location: "Mumbai",
            type: "Retail",
            area: "800",
            price: "₹90,000/month",
            description: "Versatile space suitable for retail or office use in central Mumbai.",
            image: "images/commercial-2.jpg"
        }
    ];
    
    // Render vacancies based on view
    function renderVacancies(filteredVacancies = vacancies) {
        // Clear existing content
        cardView.innerHTML = '';
        document.getElementById('tableBody').innerHTML = '';
        
        // Render card view
        filteredVacancies.forEach(vacancy => {
            const card = document.createElement('div');
            card.className = 'vacancy-card';
            card.innerHTML = `
                <img src="${vacancy.image}" alt="${vacancy.name}">
                <div class="vacancy-info">
                    <h3>${vacancy.name}</h3>
                    <div class="vacancy-meta">
                        <span><i class="fas fa-map-marker-alt"></i> ${vacancy.location}</span>
                        <span><i class="fas fa-tag"></i> ${vacancy.type}</span>
                    </div>
                    <p class="vacancy-desc">${vacancy.description}</p>
                    <div class="vacancy-actions">
                        <span class="price">${vacancy.price}</span>
                        <a href="inquiry.html?property=${encodeURIComponent(vacancy.name)}" class="btn primary">Inquire</a>
                    </div>
                </div>
            `;
            cardView.appendChild(card);
        });
        
        // Render table view
        filteredVacancies.forEach(vacancy => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${vacancy.name}</td>
                <td>${vacancy.location}</td>
                <td>${vacancy.type}</td>
                <td>${vacancy.area}</td>
                <td><a href="inquiry.html?property=${encodeURIComponent(vacancy.name)}" class="btn primary">Inquire</a></td>
            `;
            document.getElementById('tableBody').appendChild(row);
        });
    }
    
    // Filter functionality
    const locationFilter = document.getElementById('locationFilter');
    const typeFilter = document.getElementById('typeFilter');
    
    function applyFilters() {
        const locationValue = locationFilter.value;
        const typeValue = typeFilter.value;
        
        const filtered = vacancies.filter(vacancy => {
            return (locationValue === '' || vacancy.location === locationValue) &&
                   (typeValue === '' || vacancy.type === typeValue);
        });
        
        renderVacancies(filtered);
    }
    
    locationFilter.addEventListener('change', applyFilters);
    typeFilter.addEventListener('change', applyFilters);
    
    // Initial render
    renderVacancies();
});