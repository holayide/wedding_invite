import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import type { Invitee } from "@/types";

export async function generateInvitationPdf(invitee: Invitee) {
  try {
    const url = "/Promise_and_prudence_2026.pdf";
    const existingPdfBytes = await fetch(url).then((res) => res.arrayBuffer());

    const pdfDoc = await PDFDocument.load(existingPdfBytes);

    const helveticaBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

    const pages = pdfDoc.getPages();
    const firstPage = pages[0];
    const { width } = firstPage.getSize();

    // Invitee Name
    let nameSize = 25;
    const maxNameWidth = width - 160;
    while (
      helveticaBold.widthOfTextAtSize(invitee.name, nameSize) > maxNameWidth &&
      nameSize > 14
    ) {
      nameSize -= 1;
    }

    const nameWidth = helveticaBold.widthOfTextAtSize(invitee.name, nameSize);
    firstPage.drawText(invitee.name, {
      x: (width - nameWidth) / 2,
      y: 855,
      size: nameSize,
      font: helveticaBold,
      color: rgb(0.46, 0.2, 0.23), // Burgundy matching invitation accent
    });

    // Invitee Code at top-left, after the cotton/brown drape design
    firstPage.drawText(String(invitee.code), {
      x: 105,
      y: 1090,
      size: 14,
      font: helveticaBold,
      color: rgb(0.44, 0.43, 0.41), // Charcoal matching invitation text
    });

    const pdfBytes = await pdfDoc.save();

    const blob = new Blob([new Uint8Array(pdfBytes)], {
      type: "application/pdf",
    });
    const link = document.createElement("a");

    link.href = URL.createObjectURL(blob);
    link.download = "Promise_and_prudence_2026.pdf";
    link.click();

    URL.revokeObjectURL(link.href);
  } catch (error) {
    console.error("Error generating PDF:", error);
  }
}
