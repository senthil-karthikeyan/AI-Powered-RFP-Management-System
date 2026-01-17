import sgMail from "@sendgrid/mail";

import { env } from "@/env";

sgMail.setApiKey(env.SENDGRID_API_KEY!);

type SendRfpEmailInput = {
  to: string;
  rfp: {
    id: string;
    title: string;
    structuredContent: any;
  } | null;
  vendorId: string;
};

export const sendRfpEmail = async ({
  to,
  rfp,
  vendorId,
}: SendRfpEmailInput) => {
  const { budget, ...rest } = rfp?.structuredContent || {};
  await sgMail.send({
    from: env.EMAIL_FROM!,
    to,
    templateId: env.SENDGRID_RFP_TEMPLATE_ID!,
    dynamicTemplateData: {
      title: rfp?.title,
      budget: budget?.currency + " " + budget?.amount,
      ...rest,
    },
    headers: {
      "Message-ID": `<RFP_${rfp?.id}VENDOR_${vendorId}@yourdomain.com>`,
    },
  });
};
