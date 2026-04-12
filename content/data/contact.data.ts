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
    href: "/contact";
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
    subhead: "Bookings. Collaborations. Exclusive partnerships."
  },
  primaryContact: {
    href: "/contact",
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
        label: "Name",
        placeholder: "e.g. Ana Martínez",
        helperText: "Please share the name used for correspondence."
      },
      {
        id: "organization",
        name: "organization",
        type: "text",
        required: false,
        label: "Organization / Role",
        placeholder: "e.g. Press, Agency, Academy Member",
        helperText: "Your affiliation helps us route your inquiry."
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
        id: "subject",
        name: "subject",
        type: "text",
        required: false,
        label: "Subject",
        placeholder: "e.g. Industry Access Request, Booking Inquiry",
        helperText: "Brief subject line for your inquiry."
      },
      {
        id: "message",
        name: "message",
        type: "textarea",
        required: true,
        label: "Message",
        helperText: "Include timeline, scope, and context so we can match the right format."
      }
    ],
    ctaLabel: "Send Inquiry",
    success: {
      title: "Inquiry received.",
      message: "Your inquiry has been received. The Office of Dáma Venus will contact you shortly."
    }
  },
  alternatePaths: [
    {
      id: "press",
      label: "Press & EPK",
      href: "/press",
      email: "press@damavenus.com",
      note: "High-resolution imagery, artist biography, and release materials."
    },
    {
      id: "booking",
      label: "Booking",
      email: "booking@damavenus.com",
      note: "Live shows, festival appearances, and exclusive performances."
    },
    {
      id: "general",
      label: "General",
      note: "For all other inquiries, use the form above."
    }
  ]
};
