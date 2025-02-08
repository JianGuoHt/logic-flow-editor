/**
 * This JavaScript function returns the file extension of a given file name.
 */
export function getFileExtension(fileName = '') {
  const lastIndex = fileName.lastIndexOf('.');
  const ext = fileName.slice(Math.max(0, lastIndex + 1));
  return ext;
}

/**
 * This function creates a hidden file input element, allows the user to select a file, and returns a
 * promise that resolves with the selected file.
 * @returns A Promise object is being returned.
 */
export function createFileInput(fileAttr: { accept: string }) {
  return new Promise((resolve) => {
    const file = document.createElement('input');
    file.setAttribute('type', 'file');
    file.setAttribute('accept', fileAttr?.accept || '');

    file.style.display = 'none';
    document.body.append(file);

    file.click();

    file.addEventListener('change', () => {
      const fileList = file.files;
      file.remove();

      resolve({
        fileList,
      });
    });
  });
}
