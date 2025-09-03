function verifyFormPublish(form, htmltext) {
  if (form.title.value.trim().length < 3) {
    return { state: false, message: "Title should be at least 3 characters." };
  }
  if (form.title.value.trim().length > 80) {
    return { state: false, message: "Title should not exceed 80 characters." };
  }

  if (!form.description.value || form.description.value.length < 15) {
    return {
      state: false,
      message: "Description should be at least 100 letters.",
    };
  }

  if (form.description.value.length > 200) {
    return {
      state: false,
      message: "Description should not exceed 400 letters.",
    };
  }

  if (!htmltext || htmltext.trim() === "") {
    return { state: false, message: "Content should not be empty." };
  }

  if (htmltext < 20) {
    return { state: false, message: "Content should be at least 400 letters." };
  }

  if (Array.isArray(form.tags.value) && form.tags.value.length > 7) {
    return { state: false, message: "Tags should not be more than 7." };
  }

  return { state: true, message: "Form publishing..." };
}

export default verifyFormPublish;
