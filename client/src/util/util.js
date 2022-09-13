const handleAutoClose = (setShow) => {
  setTimeout(() => {
    setShow(false)
  }, 500);
}

export const util = {
  handleAutoClose
}