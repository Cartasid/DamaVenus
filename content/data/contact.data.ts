export type ContactFormField = {
  id: string;
  name: string;
  type: "text" | "email" | "textarea";
  required: boolean;
  label: string;
  placeholder?: string;
  helperText: string;
};

export type ContactContent = {
  intro: {
    headline: string;
    subhead: string;
    invitation?: string;
  };
  primaryContact: {
    email: string;
    label?: string;
  };
  form: {
    fields: ContactFormField[];
    ctaLabel: string;
    success: {
      title: string;
      message: string;
    };
  };
  alternatePaths: Array<{
    id: "press" | "booking" | "general";
    label: string;
    href?: string;
    email?: string;
    note: string;
  }>;
};

export const contactContent: ContactContent = {
  intro: {
    headline: "Let’s Create the Next Chapter.",
    subhead: "For bookings, collaborations, and selected requests."
  },
  primaryContact: {
    email: "booking@damavenus.com",
    label: "Direct booking contact"
  },
  form: {
    fields: [
      {
        id: "fullName",
        name: "fullName",
        type: "text",
        required: true,
        label: "Full Name",
        placeholder: "e.g. Ana Martínez",
        helperText: "Please share the name used for correspondence."
      },
      {
        id: "email",
        name: "email",
        type: "email",
        required: true,
        label: "Email Address",
        placeholder: "name@company.com",
        helperText: "We’ll respond to this address."
      },
      {
        id: "message",
        name: "message",
        type: "textarea",
        required: true,
        label: "Inquiry",
        helperText: "Include timeline, scope, and context so we can match the right format."
      }
    ],
    ctaLabel: "Send Inquiry",
    success: {
      title: "Inquiry received.",
      message: "Thank you for reaching out. We’ll return with the right format."
    }
  },
  alternatePaths: [
    {
      id: "press",
      label: "Press & EPK",
      href: "/press",
      email: "press@damavenus.com",
      note: "Images, bio, and release facts for press inquiries."
    },
    {
      id: "booking",
      label: "Booking",
      email: "booking@damavenus.com",
      note: "For live bookings and curated performance formats."
    },
    {
      id: "general",
      label: "General",
      note: "For all other selected requests, please use the contact form."
    }
  ]
};
