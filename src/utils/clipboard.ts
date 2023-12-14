const clipboard = {
  set: async (content: any) => await navigator.clipboard.writeText(content),
  read: async () => await navigator.clipboard.readText(),
};
export default clipboard;
