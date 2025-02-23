export default {
  title: "Image",
  name: "siteImage",
  type: "image",

  fields: [
    {
      name: "caption",
      type: "string",
      title: "Caption",
      description: "Alt tekst for bilde(required)",
      options: {
        isHighlighted: true, // <-- make this field easily accessible
      },
    },
  ],
};
