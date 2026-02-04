/* ============================================
   US PRIME REALTY - APPLICATION JAVASCRIPT
   Handles modals, tabs, and interactions
   ============================================ */

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', function () {
  // Initialize all interactive features
  initModals();
  initTabs();
  initDataTabs();
  initDropdowns();
  initWelcomeBanner();
  initModalTabs();
  initDarkMode();
  initMarketingCharts();
  initMarketingTabs();
});

/* ============================================
   MARKETING TABS (Phase 3)
   ============================================ */
function initMarketingTabs() {
  // Combine both internal tabs and sidebar sub-items
  const allTriggers = document.querySelectorAll('.marketing-tab, .nav-subitems .nav-subitem');
  const views = document.querySelectorAll('.marketing-view');

  if (allTriggers.length === 0) return;

  allTriggers.forEach(trigger => {
    trigger.addEventListener('click', function (e) {
      if (this.tagName === 'A') e.preventDefault();

      const viewId = this.dataset.view;
      if (!viewId) return;

      // Deactivate all triggers and views
      allTriggers.forEach(t => t.classList.remove('active'));
      views.forEach(v => v.classList.remove('active'));

      // Activate clicked trigger (and its counterparts)
      // e.g. clicking sidebar 'Emails' should also highlight top-bar 'Emails' if it exists
      const relatedTriggers = document.querySelectorAll(`[data-view="${viewId}"]`);
      relatedTriggers.forEach(t => t.classList.add('active'));

      // Activate View
      const targetView = document.getElementById(viewId);
      if (targetView) targetView.classList.add('active');
    });
  });
}


/* ============================================
   MARKETING CHARTS (Chart.js)
   ============================================ */
function initMarketingCharts() {
  const ctxAcquisition = document.getElementById('acquisitionChart');
  const ctxSources = document.getElementById('sourcesChart');

  if (ctxAcquisition && window.Chart) {
    new Chart(ctxAcquisition, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
          label: 'New Leads',
          data: [65, 59, 80, 81, 56, 125],
          borderColor: '#3b82f6',
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          tension: 0.4,
          fill: true
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false }
        },
        scales: {
          y: { beginAtZero: true, grid: { color: 'rgba(0,0,0,0.05)' } },
          x: { grid: { display: false } }
        }
      }
    });
  }

  if (ctxSources && window.Chart) {
    new Chart(ctxSources, {
      type: 'doughnut',
      data: {
        labels: ['Organic', 'Social', 'Paid', 'Referral'],
        datasets: [{
          data: [45, 25, 20, 10],
          backgroundColor: [
            '#3b82f6',
            '#8b5cf6',
            '#f97316',
            '#10b981'
          ],
          borderWidth: 0
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: 'right' }
        },
        cutout: '70%'
      }
    });
  }
}

/* ============================================
   DARK MODE FUNCTIONALITY
   ============================================ */
function initDarkMode() {
  // Check for saved preference
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    document.body.classList.add('dark-mode');
  }
}

function toggleDarkMode() {
  const body = document.body;
  body.classList.toggle('dark-mode');

  // Save preference
  const isDark = body.classList.contains('dark-mode');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');

  // Show toast notification
  showToast(isDark ? '🌙 Dark mode enabled' : '☀️ Light mode enabled');
}

/* ============================================
   INTEGRATIONS DROPDOWN
   ============================================ */
function toggleIntegrationsDropdown() {
  const menu = document.getElementById('integrationsMenu');
  if (menu) {
    menu.classList.toggle('active');
  }
}

// Close integrations menu when clicking outside
document.addEventListener('click', function (e) {
  const dropdown = document.querySelector('.integrations-dropdown');
  const menu = document.getElementById('integrationsMenu');
  if (dropdown && menu && !dropdown.contains(e.target)) {
    menu.classList.remove('active');
  }
});

/* ============================================
   MODAL FUNCTIONALITY
   ============================================ */
function initModals() {
  // Close modal when clicking overlay
  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', function (e) {
      if (e.target === this) {
        closeModal(this.id);
      }
    });
  });

  // Close modal on ESC key
  document.addEventListener('keydown', function (e) {
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
      tab.addEventListener('click', function () {
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
    tab.addEventListener('click', function () {
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
      tab.addEventListener('click', function () {
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
    button.addEventListener('click', function (e) {
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
  document.addEventListener('click', function () {
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
    closeBtn.addEventListener('click', function () {
      const banner = this.closest('.welcome-banner');
      if (banner) {
        banner.style.display = 'none';
      }
    });
  }
}

/* ============================================
   VIEW TOGGLE (Grid/List) 
   ============================================ */
let currentView = 'grid';

function switchView(viewType) {
  currentView = viewType;
  const gridViews = document.querySelectorAll('.database-grid');
  const listViews = document.querySelectorAll('.database-list');
  const gridBtn = document.getElementById('gridViewBtn');
  const listBtn = document.getElementById('listViewBtn');

  if (viewType === 'grid') {
    gridViews.forEach(el => el.classList.remove('hidden'));
    listViews.forEach(el => el.classList.add('hidden'));
    if (gridBtn) gridBtn.classList.add('active');
    if (listBtn) listBtn.classList.remove('active');
  } else {
    gridViews.forEach(el => el.classList.add('hidden'));
    listViews.forEach(el => el.classList.remove('hidden'));
    if (gridBtn) gridBtn.classList.remove('active');
    if (listBtn) listBtn.classList.add('active');
  }
}

// Make globally available
window.switchView = switchView;

// Initialize existing view toggles
document.querySelectorAll('.view-toggle').forEach(toggle => {
  const buttons = toggle.querySelectorAll('.view-toggle-btn');
  buttons.forEach(btn => {
    btn.addEventListener('click', function () {
      buttons.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
    });
  });
});

/* ============================================
   STAR TOGGLE FUNCTIONALITY
   ============================================ */
function toggleStar(event, btn) {
  event.preventDefault();
  event.stopPropagation();

  const card = btn.closest('.database-card, .list-item');
  const itemName = card ? card.dataset.name : '';
  const isStarred = btn.classList.contains('starred');

  if (isStarred) {
    btn.classList.remove('starred');
    btn.title = 'Add to starred';
    btn.querySelector('svg').setAttribute('fill', 'none');
    showToast(`"${itemName}" removed from Starred`);
  } else {
    btn.classList.add('starred');
    btn.title = 'Remove from starred';
    btn.querySelector('svg').setAttribute('fill', 'currentColor');
    showToast(`"${itemName}" added to Starred`);
  }

  updateStarredSidebar();
}

// Make globally available
window.toggleStar = toggleStar;

/* ============================================
   UPDATE STARRED SIDEBAR
   ============================================ */
function updateStarredSidebar() {
  const starredItems = document.querySelectorAll('.star-btn.starred');
  const badge = document.querySelector('.nav-section-collapsible .nav-item-badge');
  const subitems = document.querySelector('.nav-subitems');

  if (badge) {
    badge.textContent = starredItems.length;
  }

  // Update sidebar starred items dynamically
  if (subitems) {
    const starredNames = [];
    starredItems.forEach(btn => {
      const card = btn.closest('.database-card, .list-item');
      if (card && card.dataset.name) {
        starredNames.push(card.dataset.name);
      }
    });

    // Update count in badge
    if (badge) {
      badge.textContent = starredNames.length;
    }
  }
}

/* ============================================
   TOAST NOTIFICATION
   ============================================ */
function showToast(message) {
  // Remove existing toast
  const existingToast = document.querySelector('.toast-notification');
  if (existingToast) {
    existingToast.remove();
  }

  // Create toast
  const toast = document.createElement('div');
  toast.className = 'toast-notification';
  toast.innerHTML = `
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
    <span>${message}</span>
  `;
  document.body.appendChild(toast);

  // Animate in
  setTimeout(() => toast.classList.add('show'), 10);

  // Remove after delay
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 2500);
}

/* ============================================
   CARD MENU
   ============================================ */
function showCardMenu(event, btn) {
  event.preventDefault();
  event.stopPropagation();
  // Future: Show context menu with options like Edit, Delete, Duplicate, etc.
  console.log('Card menu clicked');
}

window.showCardMenu = showCardMenu;

/* ============================================
   CARD CLICK NAVIGATION
   ============================================ */
document.addEventListener('click', function (e) {
  const card = e.target.closest('.database-card, .list-item');
  if (card && !e.target.closest('.card-action-btn, .list-item-actions')) {
    const href = card.dataset.href;
    if (href) {
      window.location.href = href;
    }
  }
});

/* ============================================
   SMOOTH SCROLL FOR ANCHOR LINKS
   ============================================ */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
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
  card.addEventListener('mouseenter', function () {
    this.style.transform = 'translateY(-4px)';
  });
  card.addEventListener('mouseleave', function () {
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
    headerCheckbox.addEventListener('change', function () {
      rowCheckboxes.forEach(checkbox => {
        checkbox.checked = this.checked;
      });
    });
  }

  rowCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', function () {
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
  input.addEventListener('input', function () {
    const searchTerm = this.value.toLowerCase();
    // This is UI-only - actual search would need backend
    console.log('Searching for:', searchTerm);
  });
});
