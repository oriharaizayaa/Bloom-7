/**
 * ============================================================================
 * BLOOM Natural Weight Gainer - Google Sheets Order API Webhook (Apps Script)
 * ============================================================================
 * 
 * Instructions:
 * 1. Open your Google Sheet: https://docs.google.com/spreadsheets/d/1HlLU1TO_454Fk20jK6WuTtScNBwXlK7THhEVcvoZQsc/edit
 * 2. In Google Sheets top menu, click: Extensions -> Apps Script
 * 3. Delete any default code and paste this ENTIRE code block into Code.gs
 * 4. Click 'Save' (floppy disk icon).
 * 5. Click: Deploy -> New deployment
 * 6. Select type: 'Web app' (gear icon)
 * 7. Set:
 *    - Description: BLOOM Order Receiver API
 *    - Execute as: 'Me' (your email)
 *    - Who has access: 'Anyone' (IMPORTANT: allows the frontend to submit orders)
 * 8. Click 'Deploy' -> 'Authorize access' with your Google account.
 * 9. Copy the generated 'Web app URL' (format: https://script.google.com/macros/s/.../exec).
 * 10. Paste the URL into script.js at: const ORDER_ENDPOINT = "YOUR_WEB_APP_URL";
 * ============================================================================
 */

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000); // 10 second lock to avoid concurrent write conflicts
  
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var rawContent = e.postData.contents;
    var data = JSON.parse(rawContent);
    
    var orderNumber = data.orderNumber || "BLM-UNKNOWN";
    
    // Format timestamp for Pakistan Standard Time
    var formattedDate = Utilities.formatDate(new Date(), "Asia/Karachi", "yyyy-MM-dd HH:mm:ss");
    
    var customerName = (data.customer && data.customer.fullName) || data.fullName || "";
    var phone = (data.customer && data.customer.phone) || data.phone || "";
    var city = (data.customer && data.customer.city) || data.city || "";
    var address = (data.customer && data.customer.deliveryAddress) || data.address || "";
    var product = data.product || "BLOOM Natural Weight Gainer (250g)";
    var quantity = data.quantity || 1;
    var subtotal = data.subtotal || 0;
    var discount = data.discount || 0;
    var total = data.total || 0;
    var paymentMethod = data.paymentMethod || "Cash on Delivery";
    var status = "Pending Confirmation";
    
    // Append row into Google Sheets
    sheet.appendRow([
      orderNumber,
      formattedDate,
      customerName,
      "'" + phone, // Prefix with apostrophe so leading zeros in 0300... stay intact
      city,
      address,
      product,
      quantity,
      subtotal,
      discount,
      total,
      paymentMethod,
      status
    ]);
    
    return ContentService
      .createTextOutput(JSON.stringify({ "status": "success", "orderNumber": orderNumber }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ "status": "error", "message": error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

function doGet(e) {
  return ContentService
    .createTextOutput("BLOOM Google Sheets Order API is active and ready to receive customer orders.")
    .setMimeType(ContentService.MimeType.TEXT);
}
