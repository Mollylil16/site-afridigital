import emailjs from "@emailjs/browser";

export interface CollabData {
  fullName: string;
  email: string;
  collabType: string;
  message: string;
}

export interface ContactData {
  fullName: string;
  projectScope: string;
  message: string;
  email?: string; // Add optional email for contacts
}

const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "";
const collabTemplateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID_COLLAB || "";
const contactTemplateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID_CONTACT || "";
const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "";

const isEmailJsConfigured = !!(serviceId && publicKey && (collabTemplateId || contactTemplateId));

export async function sendCollaborationProposal(data: CollabData): Promise<{ success: boolean; error?: string }> {
  if (isEmailJsConfigured) {
    try {
      const templateParams = {
        from_name: data.fullName,
        reply_to: data.email,
        collab_type: data.collabType,
        message: data.message,
        to_email: "afridigital01@gmail.com",
      };

      const result = await emailjs.send(serviceId, collabTemplateId, templateParams, publicKey);
      if (result.status === 200) {
        return { success: true };
      } else {
        return { success: false, error: `EmailJS responded with status: ${result.status}` };
      }
    } catch (err: unknown) {
      console.error("EmailJS Collab send failed:", err);
      const errorMsg = err && typeof err === "object" && "text" in err 
        ? String((err as { text: unknown }).text) 
        : "Unknown EmailJS error";
      return { success: false, error: errorMsg };
    }
  } else {
    // Simulated/development feedback
    console.log(
      "%c[EmailJS Simulation] Collaboration proposal received:",
      "color: #F5A623; font-weight: bold;",
      data
    );
    console.log(
      "To enable actual email sending, configure environment variables: NEXT_PUBLIC_EMAILJS_SERVICE_ID, NEXT_PUBLIC_EMAILJS_TEMPLATE_ID_COLLAB, NEXT_PUBLIC_EMAILJS_PUBLIC_KEY"
    );
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 800));
    return { success: true };
  }
}

export async function sendContactInquiry(data: ContactData): Promise<{ success: boolean; error?: string }> {
  if (isEmailJsConfigured) {
    try {
      const templateParams = {
        from_name: data.fullName,
        project_scope: data.projectScope,
        message: data.message,
        reply_to: data.email || "no-reply@afridigital.ci",
        to_email: "afridigital01@gmail.com",
      };

      const result = await emailjs.send(serviceId, contactTemplateId, templateParams, publicKey);
      if (result.status === 200) {
        return { success: true };
      } else {
        return { success: false, error: `EmailJS responded with status: ${result.status}` };
      }
    } catch (err: unknown) {
      console.error("EmailJS Contact send failed:", err);
      const errorMsg = err && typeof err === "object" && "text" in err 
        ? String((err as { text: unknown }).text) 
        : "Unknown EmailJS error";
      return { success: false, error: errorMsg };
    }
  } else {
    // Simulated/development feedback
    console.log(
      "%c[EmailJS Simulation] Contact inquiry received:",
      "color: #F5A623; font-weight: bold;",
      data
    );
    console.log(
      "To enable actual email sending, configure environment variables: NEXT_PUBLIC_EMAILJS_SERVICE_ID, NEXT_PUBLIC_EMAILJS_TEMPLATE_ID_CONTACT, NEXT_PUBLIC_EMAILJS_PUBLIC_KEY"
    );
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 800));
    return { success: true };
  }
}
