/* ============================================
   US PRIME REALTY - APPLICATION JAVASCRIPT
   Handles modals, tabs, and interactions
   ============================================ */

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', function() {
  // Initialize all interactive features
  initModals();
  initTabs();
  initDataTabs();
  initDropdowns();
  initWelcomeBanner();
  initModalTabs();
});

/* ============================================
   MODAL FUNCTIONALITY
   ============================================ */
function initModals() {
  // Close modal when clicking overlay
  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', function(e) {
      if (e.target === this) {
        closeModal(this.id);
      }
    });
  });

  // Close modal on ESC key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal-overlay.active').forEach(modal => {
        closeModal(modal.id);
      });
    }
  });
}

function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

// Make functions globally available
window.openModal = openModal;
window.closeModal = closeModal;

/* ============================================
   TAB FUNCTIONALITY
   ============================================ */
function initTabs() {
  // General tab functionality
  document.querySelectorAll('.tabs').forEach(tabContainer => {
    const tabs = tabContainer.querySelectorAll('.tab');
    tabs.forEach(tab => {
      tab.addEventListener('click', function() {
        tabs.forEach(t => t.classList.remove('active'));
        this.classList.add('active');
      });
    });
  });
}

/* ============================================
   DATA TABS (Grid View)
   ============================================ */
function initDataTabs() {
  const dataTabs = document.querySelectorAll('.data-tab');
  const tableContainers = {
    contacts: document.getElementById('contactsTable'),
    properties: document.getElementById('propertiesTable'),
    deals: document.getElementById('dealsTable'),
    tasks: document.getElementById('tasksTable')
  };

  dataTabs.forEach(tab => {
    tab.addEventListener('click', function() {
      const targetTab = this.dataset.tab;
      
      // Update active tab
      dataTabs.forEach(t => t.classList.remove('active'));
      this.classList.add('active');
      
      // Show/hide tables
      Object.keys(tableContainers).forEach(key => {
        if (tableContainers[key]) {
          if (key === targetTab) {
            tableContainers[key].classList.remove('hidden');
          } else {
            tableContainers[key].classList.add('hidden');
          }
        }
      });

      // Update record count
      const footer = document.querySelector('.grid-footer-left span');
      if (footer && tableContainers[targetTab]) {
        const rows = tableContainers[targetTab].querySelectorAll('tbody tr').length;
        footer.textContent = `${rows} records`;
      }
    });
  });
}

/* ============================================
   MODAL TABS
   ============================================ */
function initModalTabs() {
  document.querySelectorAll('.modal-tabs').forEach(tabContainer => {
    const tabs = tabContainer.querySelectorAll('.modal-tab');
    tabs.forEach(tab => {
      tab.addEventListener('click', function() {
        tabs.forEach(t => t.classList.remove('active'));
        this.classList.add('active');
      });
    });
  });
}

/* ============================================
   DROPDOWN FUNCTIONALITY
   ============================================ */
function initDropdowns() {
  // Toggle dropdown on button click
  document.querySelectorAll('.dropdown > button').forEach(button => {
    button.addEventListener('click', function(e) {
      e.stopPropagation();
      const menu = this.nextElementSibling;
      if (menu && menu.classList.contains('dropdown-menu')) {
        // Close all other dropdowns
        document.querySelectorAll('.dropdown-menu.active').forEach(m => {
          if (m !== menu) m.classList.remove('active');
        });
        menu.classList.toggle('active');
      }
    });
  });

  // Close dropdowns when clicking outside
  document.addEventListener('click', function() {
    document.querySelectorAll('.dropdown-menu.active').forEach(menu => {
      menu.classList.remove('active');
    });
  });
}

/* ============================================
   WELCOME BANNER
   ============================================ */
function initWelcomeBanner() {
  const closeBtn = document.querySelector('.welcome-close');
  if (closeBtn) {
    closeBtn.addEventListener('click', function() {
      const banner = this.closest('.welcome-banner');
      if (banner) {
        banner.style.display = 'none';
      }
    });
  }
}

/* ============================================
   VIEW TOGGLE
   ============================================ */
document.querySelectorAll('.view-toggle').forEach(toggle => {
  const buttons = toggle.querySelectorAll('.view-toggle-btn');
  buttons.forEach(btn => {
    btn.addEventListener('click', function() {
      buttons.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
    });
  });
});

/* ============================================
   SMOOTH SCROLL FOR ANCHOR LINKS
   ============================================ */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href !== '#') {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  });
});

/* ============================================
   UTILITY FUNCTIONS
   ============================================ */
function formatDate(date) {
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
}

function formatCurrency(amount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0
  }).format(amount);
}

/* ============================================
   HOVER EFFECTS FOR CARDS
   ============================================ */
document.querySelectorAll('.database-card, .feature-card, .kanban-card').forEach(card => {
  card.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-4px)';
  });
  card.addEventListener('mouseleave', function() {
    this.style.transform = '';
  });
});

/* ============================================
   CHECKBOX SELECT ALL
   ============================================ */
document.querySelectorAll('.grid-table').forEach(table => {
  const headerCheckbox = table.querySelector('thead input[type="checkbox"]');
  const rowCheckboxes = table.querySelectorAll('tbody input[type="checkbox"]');

  if (headerCheckbox) {
    headerCheckbox.addEventListener('change', function() {
      rowCheckboxes.forEach(checkbox => {
        checkbox.checked = this.checked;
      });
    });
  }

  rowCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', function() {
      const allChecked = Array.from(rowCheckboxes).every(cb => cb.checked);
      const someChecked = Array.from(rowCheckboxes).some(cb => cb.checked);
      
      if (headerCheckbox) {
        headerCheckbox.checked = allChecked;
        headerCheckbox.indeterminate = someChecked && !allChecked;
      }
    });
  });
});

/* ============================================
   SEARCH FUNCTIONALITY (UI only)
   ============================================ */
document.querySelectorAll('.header-search-input, .toolbar-search input').forEach(input => {
  input.addEventListener('input', function() {
    const searchTerm = this.value.toLowerCase();
    // This is UI-only - actual search would need backend
    console.log('Searching for:', searchTerm);
  });
});
