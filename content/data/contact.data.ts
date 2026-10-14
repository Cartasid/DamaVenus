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
    headline:
      "Intellectual Property Licensing & Strategic Architectural Partnerships. Accessing the 2027 Performance Framework.",
    subhead:
      "Licensing. Strategic partnerships. Performance opportunities. 2027 Performance Framework access."
  },
  primaryContact: {
    href: "/contact",
    email: "booking@damavenus.com",
    label: "Strategic access contact"
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
        helperText: "Your affiliation helps us route your request."
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
        placeholder: "e.g. IP Licensing, Strategic Partnership, Performance Access",
        helperText: "Briefly identify the purpose of your request."
      },
      {
        id: "message",
        name: "message",
        type: "textarea",
        required: true,
        label: "Message",
        helperText: "Include timeline, scope, territory, and relevant project context."
      }
    ],
    ctaLabel: "Request Strategic Access",
    success: {
      title: "Request received.",
      message: "Your request has been received. The Office of Dáma Venus will contact you shortly."
    }
  },
  alternatePaths: [
    {
      id: "press",
      label: "Press & EPK",
      href: "/press",
      email: "press@damavenus.com",
      note: "Current official EPK, high-resolution imagery, biography, and release materials."
    },
    {
      id: "booking",
      label: "Performance / Booking",
      email: "booking@damavenus.com",
      note: "Live performances, festival appearances, and selected performance opportunities."
    },
    {
      id: "general",
      label: "Strategic Request",
      note: "For IP licensing, architectural partnerships, and other strategic requests, use the form above."
    }
  ]
};
