// Mock implementation of a production PDF generator utility
// In a real environment, you would use 'pdfkit' or 'html-pdf'
exports.generatePDFReceipt = (data) => {
  return {
    success: true,
    message: "PDF generated successfully stream buffer ready",
    filename: `Receipt_${data._id || Date.now()}.pdf`,
    generatedAt: new Date()
  };
};
