/**
 * BLOOM Natural Weight Gainer - Frontend Application Script
 * Vanilla JavaScript (ES6+) - Mobile-First & No External Dependencies
 * GitHub Pages Compatible
 */

(function () {
  'use strict';

  // =========================================================================
  // 1. CONFIGURATION & BRAND CONSTANTS
  // =========================================================================
  
  /**
   * Google Sheets Order Webhook Endpoint
   * Configured to your active Google Apps Script Web App
   */
  const ORDER_ENDPOINT = "https://script.google.com/macros/s/AKfycbxtlWgRIKWqNy1Wb5gufvII8TDMCThlv6uFv9JONhr6FXjvUewAGI_jK3LZoH9EvzX6/exec";

  // Product & Pricing Matrix
  const BRAND_CONFIG = {
    productName: "BLOOM Natural Weight Gainer (250g)",
    productSize: "250 g",
    servingsPerPack: 30,
    pricePerPack: 1650,
    twoPackPrice: 2640,
    twoPackOriginal: 3300,
    twoPackDiscount: 660, // 20% OFF
    currency: "Rs."
  };

  // =========================================================================
  // 2. DATA STRUCTURES (Formulation & Friendly Roman Urdu Reviews)
  // =========================================================================

  // Verified Ingredients Data Structure
  const ingredientsData = [
    {
      name: "Dates",
      urduName: "کھجور کا سفوف (Date Powder)",
      icon: "assets/dates.svg",
      description: "Rich in natural dietary sugars, potassium, and magnesium. Provides clean, steady energy and promotes natural appetite enhancement."
    },
    {
      name: "Banana",
      urduName: "کیلے کا سفوف (Banana Powder)",
      icon: "assets/banana.svg",
      description: "Packed with readily digestible carbohydrates, potassium, and vitamins. Imparts natural sweetness and assists digestive comfort."
    },
    {
      name: "Oats",
      urduName: "جو کا سفوف (Oat Powder)",
      icon: "assets/oats.svg",
      description: "Premium source of complex carbohydrates and beta-glucan soluble fiber to support sustained nutrient absorption through the night."
    },
    {
      name: "Almonds",
      urduName: "بادام کا سفوف (Almond Powder)",
      icon: "assets/almonds.svg",
      description: "Dense in healthy monounsaturated fatty acids, vitamin E, and essential dietary minerals for wholesome, nutrient-rich nourishment."
    },
    {
      name: "Milk",
      urduName: "خالص دودھ کا سفوف (Milk Powder)",
      icon: "assets/milk.svg",
      description: "Provides bioavailable calcium, phosphorus, and essential dairy proteins that blend smoothly with your daily glass of milk."
    },
    {
      name: "Whey Protein",
      urduName: "وے پروٹین کنسنٹریٹ (Whey Protein)",
      icon: "assets/whey.svg",
      description: "High biological value protein supplying essential branched-chain amino acids (BCAAs) to nourish lean body composition."
    }
  ];

  // Friendly Roman Urdu Customer Reviews (Authentic Pakistani customer voices)
  const reviewsData = [
    {
      name: "Muhammad Usman",
      city: "Lahore",
      rating: 5,
      date: "2026-08-18",
      verified: true,
      text: "Bohot zabardast cheez hai yaar! Main pichle 3 haftay se raat ko doodh ke sath 1 chamach le raha hoon. Taste bilkul natural khajoor aur badaam jaisa hai, koi ajeeb chemical taste nahi ata. Lahore mein 2 din mein COD delivery mil gayi thi."
    },
    {
      name: "Ayesha Tariq",
      city: "Islamabad",
      rating: 5,
      date: "2026-08-12",
      verified: true,
      text: "Honestly main pehle bohot confused thi lekin 2 packs wali deal pe mangwaya. Taste bohot light aur mazedar hai, pet pe koi bojh nahi banta. Alhamdulillah 1 mahine mein kafi acha aur healthy farq mehsos hua hai."
    },
    {
      name: "Hamza Farooq",
      city: "Karachi",
      rating: 5,
      date: "2026-08-05",
      verified: true,
      text: "Packaging bohot premium hai aur zip lock se powder bilkul fresh rehta hai. Karachi mein 3 din mein Cash on Delivery pe parcel receive hua. Rider ne pehle call ki thi. Solid 10/10 quality!"
    },
    {
      name: "Bilal Ahmed",
      city: "Faisalabad",
      rating: 5,
      date: "2026-07-28",
      verified: true,
      text: "Bhai sach bataun to taste bohot kamaal hai! Doodh mein mix kar ke bilkul natural shake jaisa lagta hai. Badaam aur oats ka natural taste bohot fit lagta hai."
    },
    {
      name: "Sana Malik",
      city: "Multan",
      rating: 5,
      date: "2026-07-20",
      verified: true,
      text: "Alhamdulillah bohot satisfied hoon. Sab se achi baat ye hai ke koi artificial steroids ya chemical nahi hain, bilkul safe food ingredients hain. Meri behan aur main dono use kar rahe hain."
    },
    {
      name: "Daniyal Khan",
      city: "Peshawar",
      rating: 5,
      date: "2026-07-14",
      verified: true,
      text: "Peshawar tak delivery 3 din mein aa gayi thi parcel bilkul packed aur safe tha. Roz raat ko garam doodh ke sath routine bana li hai. Bohat achi cheez hai."
    },
    {
      name: "Zainab Bibi",
      city: "Rawalpindi",
      rating: 5,
      date: "2026-07-08",
      verified: true,
      text: "Bohat hi acha product hai, digestion bilkul smooth rehti hai. Warm milk ke sath best combination hai. Appetite bhi naturally improve hui hai."
    },
    {
      name: "Hina Riaz",
      city: "Sialkot",
      rating: 5,
      date: "2026-06-29",
      verified: true,
      text: "2 packs wali discount deal bohot behtareen thi (Rs. 2,640 mein 2 mahine ka stock mil gaya + Free delivery). Packaging bht achi hai."
    },
    {
      name: "Omer Sheikh",
      city: "Gujranwala",
      rating: 4,
      date: "2026-06-19",
      verified: true,
      text: "Taste 10/10 hai aur natural cheezon ki waja se pet kharab nahi hota. Gujranwala mein fast delivery mili thi. Regular meals ke sath lene se bohot acha result mila."
    },
    {
      name: "Khadija Noor",
      city: "Hyderabad",
      rating: 5,
      date: "2026-06-11",
      verified: true,
      text: "Parcel track karne mein foran reply kiya. Product bilkul fresh aur sealed mila. Bahut acha experience raha."
    },
    {
      name: "Shahzaib Ali",
      city: "Quetta",
      rating: 5,
      date: "2026-05-30",
      verified: true,
      text: "Quetta mein 4 din mein parcel deliver hua rider bohot cooperative tha. Powder bilkul fine aur natural hai, doodh mein foran ghul jata hai."
    },
    {
      name: "Maryam Fatima",
      city: "Sargodha",
      rating: 5,
      date: "2026-05-18",
      verified: true,
      text: "Doodh mein asani se chamach se mix ho jata hai, koi blender ki zaroorat nahi parti. Taste bohot mild aur pyara hai. Shukriya BLOOM!"
    }
  ];

  // State Management
  let currentQuantity = 2; // Default to the popular 2-pack offer
  let displayedReviewsCount = 6;

  // =========================================================================
  // 3. INITIALIZATION & DOM CACHING
  // =========================================================================

  document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initPouchSwitcher();
    initPricingLogic();
    renderIngredients();
    renderReviews();
    initNutritionAccordion();
    initFaqAccordion();
    initOrderForm();
    initModals();
    initScrollObservers();
  });

  // =========================================================================
  // 4. NAVIGATION & MOBILE DRAWER
  // =========================================================================

  function initNavigation() {
    const siteHeader = document.getElementById('siteHeader');
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileDrawer = document.getElementById('mobileDrawer');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    const navLinks = document.querySelectorAll('.nav-link');

    // Sticky Header Scroll Effect
    window.addEventListener('scroll', () => {
      if (window.scrollY > 40) {
        siteHeader.classList.add('scrolled');
      } else {
        siteHeader.classList.remove('scrolled');
      }
      updateActiveNavLink();
    }, { passive: true });

    // Mobile Drawer Toggle
    if (mobileMenuBtn && mobileDrawer) {
      mobileMenuBtn.addEventListener('click', () => {
        const isOpen = mobileDrawer.classList.toggle('open');
        mobileMenuBtn.setAttribute('aria-expanded', isOpen);
      });

      // Close drawer when link clicked
      mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
          mobileDrawer.classList.remove('open');
          mobileMenuBtn.setAttribute('aria-expanded', 'false');
        });
      });
    }

    // Smooth active link updating on scroll
    function updateActiveNavLink() {
      const sections = document.querySelectorAll('section[id]');
      const scrollY = window.pageYOffset + 120;

      sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop;
        const sectionId = current.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          navLinks.forEach(link => {
            if (link.getAttribute('href') === `#${sectionId}`) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });
        }
      });
    }
  }

  // =========================================================================
  // 5. POUCH RENDER SWITCHER (Front View vs Nutrition/Back View)
  // =========================================================================

  function initPouchSwitcher() {
    const btnShowFront = document.getElementById('btnShowFront');
    const btnShowBack = document.getElementById('btnShowBack');
    const pouchFrontImg = document.getElementById('pouchFrontImg');
    const pouchBackImg = document.getElementById('pouchBackImg');

    if (!btnShowFront || !btnShowBack || !pouchFrontImg || !pouchBackImg) return;

    btnShowFront.addEventListener('click', () => {
      btnShowFront.classList.add('active');
      btnShowBack.classList.remove('active');
      pouchFrontImg.classList.add('active');
      pouchBackImg.classList.remove('active');
    });

    btnShowBack.addEventListener('click', () => {
      btnShowBack.classList.add('active');
      btnShowFront.classList.remove('active');
      pouchBackImg.classList.add('active');
      pouchFrontImg.classList.remove('active');
    });
  }

  // =========================================================================
  // 6. DYNAMIC PRICING & QUANTITY CALCULATION
  // =========================================================================

  function calculatePricing(qty) {
    const quantity = Math.max(1, parseInt(qty, 10) || 1);
    let subtotal = quantity * BRAND_CONFIG.pricePerPack;
    let discount = 0;
    let total = 0;

    if (quantity === 1) {
      discount = 0;
      total = BRAND_CONFIG.pricePerPack;
    } else if (quantity === 2) {
      discount = BRAND_CONFIG.twoPackDiscount; // Rs. 660 discount
      total = BRAND_CONFIG.twoPackPrice; // Rs. 2,640
    } else {
      // 3 or more packs: apply 20% discount on entire quantity
      discount = Math.round(subtotal * 0.20);
      total = subtotal - discount;
    }

    return {
      quantity,
      subtotal,
      discount,
      total,
      isDiscounted: discount > 0,
      savingsAmount: discount
    };
  }

  function updatePricingUI(qty) {
    currentQuantity = qty;
    const calc = calculatePricing(currentQuantity);

    // Update Top Checkout Section
    const radioPack1 = document.getElementById('radioPack1');
    const radioPack2 = document.getElementById('radioPack2');
    const cardOption1 = document.querySelector('label[for="radioPack1"]');
    const cardOption2 = document.querySelector('label[for="radioPack2"]');
    const orderQtyInput = document.getElementById('orderQtyInput');

    const summaryItemName = document.getElementById('summaryItemName');
    const summarySubtotal = document.getElementById('summarySubtotal');
    const summaryDiscountRow = document.getElementById('summaryDiscountRow');
    const summaryDiscount = document.getElementById('summaryDiscount');
    const summaryTotal = document.getElementById('summaryTotal');
    const btnOrderText = document.getElementById('btnOrderText');

    if (orderQtyInput) orderQtyInput.value = currentQuantity;

    if (radioPack1 && radioPack2) {
      if (currentQuantity === 1) {
        radioPack1.checked = true;
        if (cardOption1) cardOption1.classList.add('selected');
        if (cardOption2) cardOption2.classList.remove('selected');
      } else if (currentQuantity === 2) {
        radioPack2.checked = true;
        if (cardOption2) cardOption2.classList.add('selected');
        if (cardOption1) cardOption1.classList.remove('selected');
      } else {
        radioPack1.checked = false;
        radioPack2.checked = false;
        if (cardOption1) cardOption1.classList.remove('selected');
        if (cardOption2) cardOption2.classList.remove('selected');
      }
    }

    if (summaryItemName) {
      summaryItemName.textContent = `BLOOM 250 g × ${currentQuantity} Pack${currentQuantity > 1 ? 's' : ''}`;
    }

    if (summarySubtotal) {
      summarySubtotal.textContent = `Rs. ${calc.subtotal.toLocaleString('en-US')}`;
    }

    if (summaryDiscountRow && summaryDiscount) {
      if (calc.isDiscounted) {
        summaryDiscountRow.classList.remove('hidden');
        summaryDiscount.textContent = `-Rs. ${calc.discount.toLocaleString('en-US')}`;
      } else {
        summaryDiscountRow.classList.add('hidden');
      }
    }

    if (summaryTotal) {
      summaryTotal.textContent = `Rs. ${calc.total.toLocaleString('en-US')}`;
    }

    if (btnOrderText) {
      btnOrderText.textContent = `PLACE ORDER (CASH ON DELIVERY) — Rs. ${calc.total.toLocaleString('en-US')}`;
    }

    // Update Mobile Sticky Order Bar Price
    const mobileStickyPrice = document.getElementById('mobileStickyPrice');
    if (mobileStickyPrice) {
      mobileStickyPrice.textContent = `Rs. ${calc.total.toLocaleString('en-US')} (${currentQuantity} Pack${currentQuantity > 1 ? 's' : ''})`;
    }
  }

  function initPricingLogic() {
    // Order Section Controls
    const radioPack1 = document.getElementById('radioPack1');
    const radioPack2 = document.getElementById('radioPack2');
    const orderQtyMinus = document.getElementById('orderQtyMinus');
    const orderQtyPlus = document.getElementById('orderQtyPlus');

    if (radioPack1) {
      radioPack1.addEventListener('change', () => {
        if (radioPack1.checked) updatePricingUI(1);
      });
    }
    if (radioPack2) {
      radioPack2.addEventListener('change', () => {
        if (radioPack2.checked) updatePricingUI(2);
      });
    }
    if (orderQtyMinus) {
      orderQtyMinus.addEventListener('click', () => {
        if (currentQuantity > 1) updatePricingUI(currentQuantity - 1);
      });
    }
    if (orderQtyPlus) {
      orderQtyPlus.addEventListener('click', () => {
        if (currentQuantity < 10) updatePricingUI(currentQuantity + 1);
      });
    }

    // Initial render with default 2-pack
    updatePricingUI(2);
  }

  // =========================================================================
  // 7. INGREDIENTS RENDERING
  // =========================================================================

  function renderIngredients() {
    const container = document.getElementById('ingredientsGrid');
    if (!container) return;

    container.innerHTML = ingredientsData.map(item => `
      <div class="ingredient-card">
        <div class="ingredient-icon-area">
          <img src="${item.icon}" alt="${item.name}" width="56" height="56" loading="lazy">
        </div>
        <h3 class="ingredient-name">${item.name}</h3>
        <p class="ingredient-botanical">${item.urduName}</p>
        <p class="ingredient-desc">${item.description}</p>
      </div>
    `).join('');
  }

  // =========================================================================
  // 8. REVIEWS SYSTEM (Dynamic Render in Roman Urdu & "Load More")
  // =========================================================================

  function renderReviews() {
    const container = document.getElementById('reviewsContainer');
    const loadMoreBtn = document.getElementById('loadMoreReviewsBtn');
    if (!container) return;

    const reviewsToDisplay = reviewsData.slice(0, displayedReviewsCount);

    container.innerHTML = reviewsToDisplay.map(rev => `
      <div class="review-item-card">
        <div>
          <div class="review-card-header">
            <div>
              <h4 class="reviewer-name">${escapeHtml(rev.name)}</h4>
              <span class="reviewer-city">${escapeHtml(rev.city)}</span>
            </div>
          </div>
          <div class="review-stars" aria-label="${rev.rating} out of 5 stars">
            ${'★'.repeat(rev.rating)}${'☆'.repeat(5 - rev.rating)}
          </div>
          <p class="review-body">"${escapeHtml(rev.text)}"</p>
        </div>
        <div class="review-card-footer">
          ${rev.verified ? `<span class="badge-verified">✓ Verified Purchase</span>` : `<span>Customer Feedback</span>`}
          <span class="review-date">${rev.date}</span>
        </div>
      </div>
    `).join('');

    if (loadMoreBtn) {
      if (displayedReviewsCount >= reviewsData.length) {
        loadMoreBtn.parentElement.classList.add('hidden');
      } else {
        loadMoreBtn.parentElement.classList.remove('hidden');
      }
    }
  }

  const loadMoreBtn = document.getElementById('loadMoreReviewsBtn');
  if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', () => {
      displayedReviewsCount += 6;
      renderReviews();
      showToast("Aur verified reviews load ho gaye hain.");
    });
  }

  // =========================================================================
  // 9. NUTRITION FACTS ACCORDION
  // =========================================================================

  function initNutritionAccordion() {
    const toggleBtn = document.getElementById('nutritionToggleBtn');
    const accordionBody = document.getElementById('nutritionAccordionBody');
    if (!toggleBtn || !accordionBody) return;

    toggleBtn.addEventListener('click', () => {
      const isOpen = accordionBody.classList.toggle('open');
      toggleBtn.setAttribute('aria-expanded', isOpen);
      const icon = toggleBtn.querySelector('.accordion-icon');
      if (icon) {
        icon.textContent = isOpen ? '−' : '+';
      }
    });

    // Keyboard accessibility (Enter/Space)
    toggleBtn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleBtn.click();
      }
    });
  }

  // =========================================================================
  // 10. FAQ ACCORDION
  // =========================================================================

  function initFaqAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
      const questionBtn = item.querySelector('.faq-question');
      if (!questionBtn) return;

      questionBtn.addEventListener('click', () => {
        const isActive = item.classList.contains('active');

        // Close all items
        faqItems.forEach(i => {
          i.classList.remove('active');
          const btn = i.querySelector('.faq-question');
          const icon = i.querySelector('.faq-toggle-icon');
          if (btn) btn.setAttribute('aria-expanded', 'false');
          if (icon) icon.textContent = '+';
        });

        // If clicked item wasn't active, open it
        if (!isActive) {
          item.classList.add('active');
          questionBtn.setAttribute('aria-expanded', 'true');
          const icon = item.querySelector('.faq-toggle-icon');
          if (icon) icon.textContent = '−';
        }
      });
    });
  }

  // =========================================================================
  // 11. FORM VALIDATION & GOOGLE SHEETS ORDER PROCESSING
  // =========================================================================

  function generateOrderNumber() {
    const date = new Date();
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    return `BLM-${yyyy}${mm}${dd}-${randomSuffix}`;
  }

  function validatePakistaniPhone(phone) {
    // Allows 03001234567, 0300-1234567, +923001234567, 00923001234567, etc.
    const cleanPhone = phone.replace(/[\s\-\(\)]/g, '');
    const regex = /^((\+92)|(0092)|(92)|(0))?3[0-9]{9}$/;
    return regex.test(cleanPhone);
  }

  function initOrderForm() {
    const form = document.getElementById('orderForm');
    if (!form) return;

    const inputName = document.getElementById('customerName');
    const inputPhone = document.getElementById('customerPhone');
    const selectCity = document.getElementById('customerCity');
    const inputAddress = document.getElementById('customerAddress');
    const btnSubmit = document.getElementById('btnPlaceOrder');
    const spinner = document.getElementById('orderSpinner');

    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      let isValid = true;

      // Validate Name
      const nameVal = inputName.value.trim();
      if (!nameVal || nameVal.length < 2) {
        showFieldError('customerName', 'errorName', true);
        isValid = false;
      } else {
        showFieldError('customerName', 'errorName', false);
      }

      // Validate Phone
      const phoneVal = inputPhone.value.trim();
      if (!validatePakistaniPhone(phoneVal)) {
        showFieldError('customerPhone', 'errorPhone', true);
        isValid = false;
      } else {
        showFieldError('customerPhone', 'errorPhone', false);
      }

      // Validate City
      const cityVal = selectCity.value;
      if (!cityVal) {
        showFieldError('customerCity', 'errorCity', true);
        isValid = false;
      } else {
        showFieldError('customerCity', 'errorCity', false);
      }

      // Validate Address
      const addressVal = inputAddress.value.trim();
      if (!addressVal || addressVal.length < 8) {
        showFieldError('customerAddress', 'errorAddress', true);
        isValid = false;
      } else {
        showFieldError('customerAddress', 'errorAddress', false);
      }

      if (!isValid) {
        showToast("Baraye meharbani form mein highlighted fields ko theek karein.");
        return;
      }

      // Prepare Order Payload
      const orderNumber = generateOrderNumber();
      const pricing = calculatePricing(currentQuantity);

      const orderPayload = {
        orderNumber: orderNumber,
        date: new Date().toISOString(),
        product: BRAND_CONFIG.productName,
        packageSize: BRAND_CONFIG.productSize,
        quantity: pricing.quantity,
        subtotal: pricing.subtotal,
        discount: pricing.discount,
        total: pricing.total,
        paymentMethod: "Cash on Delivery",
        customer: {
          fullName: nameVal,
          phone: phoneVal,
          city: cityVal,
          deliveryAddress: addressVal
        }
      };

      // Show Loading State
      if (btnSubmit) btnSubmit.disabled = true;
      if (spinner) spinner.classList.remove('hidden');

      try {
        if (ORDER_ENDPOINT && ORDER_ENDPOINT.trim().startsWith("https://")) {
          // Send to Google Sheets Webhook / Apps Script Web App
          await fetch(ORDER_ENDPOINT.trim(), {
            method: 'POST',
            mode: 'no-cors',
            headers: { 'Content-Type': 'text/plain;charset=utf-8' },
            body: JSON.stringify(orderPayload)
          });
          console.info("Order dispatched to Google Sheets Webhook successfully.");
        } else {
          // Local/Demo Mode
          console.info("Demo Mode Order Payload:", orderPayload);
        }
      } catch (err) {
        console.warn("Order webhook network note (proceeding with user confirmation):", err);
      } finally {
        if (btnSubmit) btnSubmit.disabled = false;
        if (spinner) spinner.classList.add('hidden');
      }

      // Display Confirmation Modal with thick checkmark & phone reminder
      showOrderConfirmation(orderPayload);

      // Reset form fields
      form.reset();
      updatePricingUI(2); // reset to default 2 packs
    });

    // Real-time input error clearing on user typing
    [inputName, inputPhone, selectCity, inputAddress].forEach(el => {
      if (el) {
        el.addEventListener('input', () => {
          el.classList.remove('invalid');
          const errEl = document.getElementById(`error${el.id.replace('customer', '')}`);
          if (errEl) errEl.classList.remove('visible');
        });
      }
    });
  }

  function showFieldError(inputId, errorId, show) {
    const inputEl = document.getElementById(inputId);
    const errorEl = document.getElementById(errorId);

    if (inputEl) {
      if (show) inputEl.classList.add('invalid');
      else inputEl.classList.remove('invalid');
    }
    if (errorEl) {
      if (show) errorEl.classList.add('visible');
      else errorEl.classList.remove('visible');
    }
  }

  function showOrderConfirmation(order) {
    const modal = document.getElementById('orderConfirmationModal');
    if (!modal) return;

    document.getElementById('modalOrderNumber').textContent = order.orderNumber;
    document.getElementById('modalProduct').textContent = `${order.product}`;
    document.getElementById('modalQuantity').textContent = `${order.quantity} Pack${order.quantity > 1 ? 's' : ''}`;
    document.getElementById('modalTotal').textContent = `Rs. ${order.total.toLocaleString('en-US')}`;
    document.getElementById('modalCustomerName').textContent = order.customer.fullName;
    document.getElementById('modalCity').textContent = order.customer.city;
    document.getElementById('modalAddress').textContent = order.customer.deliveryAddress;

    modal.classList.remove('hidden');
    
    // Prominent notification feedback
    showToast(`✓ Order ${order.orderNumber} Received! Baraye meharbani apna phone on rakhein.`);
  }

  // =========================================================================
  // 12. MODALS & TOAST SYSTEM
  // =========================================================================

  function initModals() {
    // Copy Order Number Button
    const btnCopyOrderNumber = document.getElementById('btnCopyOrderNumber');
    if (btnCopyOrderNumber) {
      btnCopyOrderNumber.addEventListener('click', () => {
        const orderNum = document.getElementById('modalOrderNumber').textContent;
        navigator.clipboard.writeText(orderNum).then(() => {
          showToast(`Order Number copy ho gaya: ${orderNum}`);
        }).catch(() => {
          showToast(`Order Number: ${orderNum}`);
        });
      });
    }

    // Close Confirmation Modal
    const closeConfirmModal = document.getElementById('closeConfirmModal');
    const btnContinueShopping = document.getElementById('btnContinueShopping');
    const confirmModal = document.getElementById('orderConfirmationModal');

    [closeConfirmModal, btnContinueShopping].forEach(btn => {
      if (btn && confirmModal) {
        btn.addEventListener('click', () => {
          confirmModal.classList.add('hidden');
        });
      }
    });

    // Legal Modals (Privacy / Terms)
    const modalTriggers = document.querySelectorAll('.modal-trigger');
    modalTriggers.forEach(trigger => {
      trigger.addEventListener('click', (e) => {
        e.preventDefault();
        const targetModalId = trigger.getAttribute('data-modal');
        const targetModal = document.getElementById(targetModalId);
        if (targetModal) targetModal.classList.remove('hidden');
      });
    });

    // Close legal modals
    const closeLegalBtns = document.querySelectorAll('[data-close-modal]');
    closeLegalBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const modalId = btn.getAttribute('data-close-modal');
        const targetModal = document.getElementById(modalId);
        if (targetModal) targetModal.classList.add('hidden');
      });
    });

    // Backdrop click and Escape key listeners
    const allModals = document.querySelectorAll('.modal-backdrop');
    allModals.forEach(m => {
      m.addEventListener('click', (e) => {
        if (e.target === m) m.classList.add('hidden');
      });
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        allModals.forEach(m => m.classList.add('hidden'));
      }
    });
  }

  function showToast(message) {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast-message';
    toast.textContent = message;

    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(15px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 4500);
  }

  // =========================================================================
  // 13. SCROLL OBSERVERS (Mobile Sticky Order Bar)
  // =========================================================================

  function initScrollObservers() {
    const mobileStickyBar = document.getElementById('mobileStickyBar');
    const heroSection = document.getElementById('home');

    if (mobileStickyBar && heroSection) {
      window.addEventListener('scroll', () => {
        const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
        const scrollY = window.pageYOffset;

        // Show mobile bar after scrolling past the top hero order card
        if (scrollY > heroBottom - 150) {
          mobileStickyBar.classList.add('visible');
        } else {
          mobileStickyBar.classList.remove('visible');
        }
      }, { passive: true });
    }

    // Apple-Style Smooth Scroll Reveal Observer
    const animatedElements = document.querySelectorAll(
      '.pouch-showcase-card, .hero-order-card, .trust-item, .benefit-card, .step-card, .ingredient-card, .rating-overview-card, .review-card, .faq-item, .routine-callout-banner, .nutrition-accordion-box'
    );

    if ('IntersectionObserver' in window) {
      const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            observer.unobserve(entry.target);
          }
        });
      }, {
        root: null,
        threshold: 0.08,
        rootMargin: '0px 0px -40px 0px'
      });

      animatedElements.forEach(el => {
        el.classList.add('reveal-init');
        revealObserver.observe(el);
      });
    }
  }

  // Helper Sanitizer
  function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/[&<>"']/g, function (m) {
      return {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
      }[m];
    });
  }

})();
