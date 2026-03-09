import jsPDF from "jspdf";
import type { Invitee } from "@/store/inviteStore";

export function generateInvitationPdf(invitee: Invitee) {
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a5" });
  const w = doc.internal.pageSize.getWidth();
  const h = doc.internal.pageSize.getHeight();

  // Background
  doc.setFillColor(252, 249, 243);
  doc.rect(0, 0, w, h, "F");

  // Border
  doc.setDrawColor(197, 164, 100);
  doc.setLineWidth(1);
  doc.rect(8, 8, w - 16, h - 16);
  doc.setLineWidth(0.3);
  doc.rect(11, 11, w - 22, h - 22);

  // Header ornament
  doc.setFontSize(28);
  doc.setTextColor(197, 164, 100);
  doc.text("♥", w / 2, 30, { align: "center" });

  // Title
  doc.setFontSize(22);
  doc.setTextColor(60, 50, 40);
  doc.text("Wedding Invitation", w / 2, 45, { align: "center" });

  // Subtitle
  doc.setFontSize(11);
  doc.setTextColor(120, 100, 80);
  doc.text("You are cordially invited to celebrate", w / 2, 58, {
    align: "center",
  });
  doc.text("the union of love", w / 2, 64, { align: "center" });

  // Guest name
  doc.setFontSize(18);
  doc.setTextColor(60, 50, 40);
  doc.text("Dear", w / 2, 82, { align: "center" });
  doc.setFontSize(20);
  doc.setTextColor(197, 164, 100);
  doc.text(invitee.name, w / 2, 94, { align: "center" });

  // Details
  doc.setFontSize(10);
  doc.setTextColor(100, 85, 70);
  doc.text("Please join us for the celebration", w / 2, 115, {
    align: "center",
  });
  doc.text("of this joyous occasion.", w / 2, 122, { align: "center" });

  // Invite code
  doc.setFontSize(9);
  doc.setTextColor(150, 130, 110);
  doc.text(`Invite Code: ${invitee.code}`, w / 2, 145, { align: "center" });

  // Footer
  doc.setFontSize(8);
  doc.setTextColor(180, 160, 140);
  doc.text("With love and blessings", w / 2, h - 25, { align: "center" });

  const safeName = invitee.name.replace(/[^a-zA-Z0-9]/g, "-").toLowerCase();
  doc.save(`invitation-${safeName}-${invitee.code}.pdf`);
}
