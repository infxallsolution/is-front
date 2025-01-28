export const success = (messageApi, { content }) => {
  messageApi.open({
    type: "success",
    content: `${content}`,
  });
};
export const error = (messageApi, { content }) => {
  messageApi.open({
    type: "error",
    content: `${content}`,
  });
};
export const warning = (messageApi, { content }) => {
  messageApi.open({
    type: "warning",
    content: `${content}`,
  });
};
