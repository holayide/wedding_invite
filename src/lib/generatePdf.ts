import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import type { Invitee } from "@/types";

export async function generateInvitationPdf(invitee: Invitee) {
  try {
    const url = "/Nanya&Jindu-edding.pdf";
    const existingPdfBytes = await fetch(url).then((res) => res.arrayBuffer());

    const pdfDoc = await PDFDocument.load(existingPdfBytes);

    const helveticaBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    const helvetica = await pdfDoc.embedFont(StandardFonts.Helvetica);

    const pages = pdfDoc.getPages();
    const firstPage = pages[0];
    const { width, height } = firstPage.getSize();

    firstPage.drawText(invitee.name, {
      x: width / 2 - helveticaBold.widthOfTextAtSize(invitee.name, 24) / 2,
      y: height / 2,
      size: 24,
      font: helveticaBold,
      color: rgb(0.77, 0.64, 0.39),
    });

    firstPage.drawText(`Code: ${invitee.code}`, {
      x: width - 50,
      y: 20,
      size: 8,
      font: helvetica,
      color: rgb(0.5, 0.5, 0.5),
    });

    const pdfBytes = await pdfDoc.save();

    const blob = new Blob([new Uint8Array(pdfBytes)], {
      type: "application/pdf",
    });
    const link = document.createElement("a");

    // Create a clean filename: "john-doe-invitation-code.pdf"
    const safeName = invitee.name.replace(/[^a-zA-Z0-9]/g, "-").toLowerCase();

    link.href = URL.createObjectURL(blob);
    link.download = `${safeName}-invitation-${invitee.code}.pdf`;
    link.click();

    URL.revokeObjectURL(link.href);
  } catch (error) {
    console.error("Error generating PDF:", error);
  }
}
