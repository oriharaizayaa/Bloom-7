# BLOOM Natural Weight Gainer — E-Commerce Landing Page & Google Sheets Order API

A complete, responsive, single-product e-commerce landing page for **BLOOM Natural Weight Gainer (250 g)** with automated **Google Sheets Live Order Recording** built directly in.

---

## 📊 Live Google Sheets Database
Your orders are structured to go directly into your Google Sheet:
* **[BLOOM — Orders Tracker (Live Customer Database)](https://docs.google.com/spreadsheets/d/1HlLU1TO_454Fk20jK6WuTtScNBwXlK7THhEVcvoZQsc/edit)**

Columns tracked automatically for each order:
1. **Order Number** (e.g. `BLM-20260825-4827`)
2. **Date & Time** (Pakistan Standard Time)
3. **Customer Name**
4. **Phone Number**
5. **City**
6. **Delivery Address**
7. **Product**
8. **Quantity (Packs)**
9. **Subtotal (PKR)**
10. **Discount (PKR)**
11. **Total (PKR)**
12. **Payment Method** (Cash on Delivery)
13. **Order Status** (Pending Confirmation / Dispatched / Delivered / Cancelled)

---

## ⚡ How to Connect Your Google Sheet to the Website (2 Minutes Setup)

1. **Open your Google Sheet**:
   Open **[BLOOM — Orders Tracker](https://docs.google.com/spreadsheets/d/1HlLU1TO_454Fk20jK6WuTtScNBwXlK7THhEVcvoZQsc/edit)**.

2. **Open Apps Script**:
   In the Google Sheets top menu, click **Extensions** &rarr; **Apps Script**.

3. **Paste the Webhook Code**:
   Delete any default code in `Code.gs` and paste the contents of `google-apps-script-code.js`.

4. **Deploy as Web App**:
   * Click **Deploy** &rarr; **New deployment**.
   * Click the gear icon (&gear;) next to *Select type* and select **Web app**.
   * Fill in:
     * **Description**: `BLOOM Order Receiver API`
     * **Execute as**: `Me` (your Google Account)
     * **Who has access**: `Anyone` *(Crucial: allows customers on your website to send their orders)*
   * Click **Deploy**, then click **Authorize access** with your Google account.

5. **Copy the Web App URL & Paste into `script.js`**:
   Copy the generated URL (format: `https://script.google.com/macros/s/AKfycb.../exec`) and paste it into `script.js`:
   ```javascript
   const ORDER_ENDPOINT = "https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec";
   ```

Now, every time a customer fills out the order form and clicks **PLACE ORDER**, their order will instantly be appended as a new row in your Google Sheet!

---

## 🚀 How to Deploy to GitHub Pages

1. Create a repository on GitHub (e.g., `bloom-nutrition`).
2. Upload all files (`index.html`, `style.css`, `script.js`, `google-apps-script-code.js`, `README.md`, and the `assets/` folder) to the `main` branch.
3. In GitHub, navigate to **Settings** &rarr; **Pages** &rarr; **Branch (`main` / root `/`)** &rarr; **Save**.
4. Your website will be live in 1–2 minutes at `https://<your-username>.github.io/<repo-name>/`.
